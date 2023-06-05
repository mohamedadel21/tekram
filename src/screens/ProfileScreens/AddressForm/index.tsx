import React, { useState, useReducer, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  I18nManager,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  Alert
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../../../components/Input";
import AppButton from "../../../components/AppButton";
import HomeHeader from "../../../components/Headers/HomeHeader";
import PhoneInput from "../../../components/PhoneInput";
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IMAGES from "../../../common/images";
import styles from "./styles";
import { Colors, ScaleWidth, width, height, Spacings, ScaleHeight } from "../../../common/foundation";
import { validateEmail, validateName, validateNumber } from "../../../common/validation";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { AddAddress, GetAddressesAction, GetRegionsAction } from "../../../redux/actions/AddressesAction";
import RBSheet from "react-native-raw-bottom-sheet";
import CheckBox from '@react-native-community/checkbox';
const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.155 * ASPECT_RATIO;
const LON_DELTA = 0.155 * ASPECT_RATIO;
import { CommonActions } from "@react-navigation/native";

const reducer = (state: any, { key, value }: { key: any; value: any }) => {
  return { ...state, [key]: value };
};

const AddressForm = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const RBSheetRef = useRef();

  const [searchQuery, setSearchQuery] = useState("")
  const timeout = useRef(null);

  const { addAddressData,
    addAddressLoading,
    regionsData,
    regionsLoading,
    addressesData
  } = useSelector(
    state => state.AddressesReducer,
  );

  const initailFormState = {
    isPassword: true,
    buttonDisabled: true,
    nickName: "",
    street: "",
    phone: "",
    building: "",
    sheetType: "",
    sheetTitle: "",
    region: null,
    area: null,
    unit: "",
    floor: "",
    List_Area: [],
    addressDetails: "",
    location: props?.route?.params?.locationUser,
    CUSTOMER_ADDRESS_ID: -1,
    IS_CURRENT: false,
    IS_DEFAULT: false,

  };
  const [form, updateForm] = useReducer(reducer, initailFormState);
  const map = useRef(null);
  const type = props?.route?.params?.type;
  const item = props?.route?.params?.item;
  const comeFrom = props?.route?.params?.comeFrom;
  const restaurantDetails = props?.route?.params?.restaurantDetails;

  console.log("comeFrom", comeFrom);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', e => {
      // Do something manually

      updateForm({ key: "location", value: props?.route?.params?.locationUser, });


    });

    return () => unsubscribe();
  }, [props.navigation]);

  useEffect(() => {


    if (type == 'edit') {
      let region = null;
      let area = null;

      regionsData?.filter(reg => {
        if (reg.REGION_ID == item.REGION_ID) {
          console.log("item.REGION_ID==item.REGION_ID", reg.REGION_ID, item.REGION_ID);

          region = reg
          updateForm({ key: "List_Area", value: reg.List_Area });
          updateForm({ key: "List_Area2", value: reg.List_Area });

          reg?.List_Area?.filter(item2 => {
            if (item2.AREA_ID == item.AREA_ID) {
              area = item2
            }
          })

          return
        }
      })
      updateForm({ key: "region", value: region });
      updateForm({ key: "area", value: area });

    }

  }, [regionsData])

  useEffect(() => {


    if (searchQuery == "") {
      updateForm({ key: "List_Area2", value: form.List_Area });

    } else {
      updateForm({ key: "List_Area2", value: form.List_Area?.filter(item => String(item?.AREA_NAME).toLowerCase().trim().includes(String(searchQuery).toLowerCase().trim())) });


    }

  }, [searchQuery])

  useEffect(() => {
    dispatch(GetRegionsAction())
    if (addressesData?.length > 0) {
      updateForm({ key: "IS_CURRENT", value: false });

    } else {
      updateForm({ key: "IS_CURRENT", value: true });
    }

    if (type == 'add') {
      updateForm({ key: "CUSTOMER_ADDRESS_ID", value: -1 });

    } else if (type == 'edit') {
      updateForm({ key: "CUSTOMER_ADDRESS_ID", value: item?.CUSTOMER_ADDRESS_ID });
      updateForm({ key: "nickName", value: item?.NICKNAME });
      updateForm({ key: "street", value: item?.STREET });
      updateForm({ key: "unit", value: item?.FLOOR });
      updateForm({ key: "floor", value: item?.UNIT });
      updateForm({ key: "IS_CURRENT", value: item?.IS_CURRENT });
      updateForm({ key: "IS_DEFAULT", value: item?.IS_DEFAULT });
      updateForm({ key: "addressDetails", value: item?.ADDRESS_DETAILS });
      updateForm({ key: "building", value: item?.BUILDING_NAME });

    }

  }, [])
  useEffect(() => {
    console.log("form?.street", form?.street);

    updateForm({
      key: "buttonDisabled",
      value:
        !String(form?.nickName).trim() ||
        !String(form?.building).trim() ||
        !String(form?.street).trim() ||
        !String(form?.unit).trim() ||
        !(form?.region) ||
        !(form?.area) ||
        !String(form?.floor).trim()
    });
  }, [form?.nickName, form?.unit, form?.building, form?.region, form?.area, form?.floor, form?.street]);

  const validate = (condition: any, key: any, message: any) => {
    if (condition) {
      updateForm({ key: key, value: message });
    } else {
      updateForm({ key: key, value: "" });
    }
  };
  const onChangeTextName = (value: any) => {
    updateForm({ key: "nickName", value: value });

    validate(!String(value).trim(), "nickNameError", t("auth.requiredField"));
  };

  const onChangeTextBuilding = (value: any) => {
    updateForm({ key: "building", value: value });

    validate(
      !(String(value).trim()),
      "buildingError",
      t("auth.requiredField")
    );
  };
  const onChangeTextStreet = (value: any) => {
    updateForm({ key: "street", value: value });

    validate(
      !(String(value).trim()),
      "streetError",
      t("auth.requiredField")
    );
  };



  const onChangeTextAddressDetails = (value: any) => {
    updateForm({ key: "addressDetails", value: value });
  };


  const addAddressAction = () => {
    dispatch(AddAddress(form, async (data) => {
      if (data.Customer_address) {
        dispatch(GetAddressesAction((data) => { }))
        if (comeFrom == "home") {
          if (form?.IS_CURRENT == true) {
            await AsyncStorage.setItem("LATITUDE", form?.location?.latitude + "")
            await AsyncStorage.setItem("LONGITUDE", form?.location?.longitude + "")
          }
          props.navigation.push("BottomTabsNavigation", { screen: "Home" })

        } else
          if (comeFrom == "signup") {
            await AsyncStorage.setItem("LATITUDE", form?.location?.latitude + "")
            await AsyncStorage.setItem("LONGITUDE", form?.location?.longitude + "")
            props.navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [{ name: "BottomTabsNavigation" }]
              })
            })
            return;
          } else
            if (comeFrom == "login") {
              await AsyncStorage.setItem("LATITUDE", form?.location?.latitude + "")
              await AsyncStorage.setItem("LONGITUDE", form?.location?.longitude + "")
              props.navigation.dispatch({
                ...CommonActions.reset({
                  index: 0,
                  routes: [{ name: "BottomTabsNavigation" }]
                })
              })
              return;
            }
            else if (comeFrom == "cart") {

              props.navigation.navigate("Cart", { restaurantDetails: restaurantDetails })
              if (form?.IS_CURRENT == true) {
                await AsyncStorage.setItem("LATITUDE", form?.location?.latitude + "")
                await AsyncStorage.setItem("LONGITUDE", form?.location?.longitude + "")
              }
            }
            else {
              if (form?.IS_CURRENT == true) {
                await AsyncStorage.setItem("LATITUDE", form?.location?.latitude + "")
                await AsyncStorage.setItem("LONGITUDE", form?.location?.longitude + "")
              }
              props.navigation.navigate("Addresses")
            }
      } else {
        Alert.alert("", data?.Exception_Message)
      }
    }))
  }

  const onChangeTextUnit = (value: any) => {
    updateForm({ key: "unit", value: value });

    validate(!String(value).trim(), "unitError", t("auth.requiredField"));
  };
  const onChangeTextFloor = (value: any) => {
    updateForm({ key: "floor", value: value });

    validate(!String(value).trim(), "floorError", t("auth.requiredField"));
  }; console.log("regionsData", regionsData);


  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (form?.sheetType == "region") {
            updateForm({ key: "region", value: item });
            updateForm({ key: "List_Area", value: item?.List_Area });
            updateForm({ key: "List_Area2", value: item?.List_Area });


          } else
            if (form?.sheetType == "area") {
              updateForm({ key: "area", value: item });

            }

          RBSheetRef.current.close();

        }}
        style={styles.regionView}>
        <Text style={[styles.regionText, form?.sheetType == "region" ? (form?.region?.REGION_NAME == item?.REGION_NAME ? { color: Colors.success } : {}) : (form?.area?.AREA_NAME == item?.AREA_NAME ? { color: Colors.success } : {})]}>{form?.sheetType == "region" ? item.REGION_NAME : item.AREA_NAME}</Text>
      </TouchableOpacity>
    )
  }

  const refineMap = () => {
    props.navigation.navigate("AddressMap", { type: "edit", item: item })
  }

  const onChangeTextSearch = (value: any) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setSearchQuery(value)
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <HomeHeader
        title={type == "edit" ? t("address.editAddress") : t("address.newAddress")}
        navigation={props.navigation}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {type == 'edit' ?
          (<View style={styles.mapHeader}>
            <Text style={styles.locationPin}>{t("address.locationPin")}</Text>
            <TouchableOpacity onPress={refineMap}>
              <Text style={styles.refineMap}>{t("address.refineMap")}</Text>
            </TouchableOpacity>
          </View>)
          : null}
        <View style={styles.mapContainer}>
          <MapView
            ref={map}
            provider={
              Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
            }
            scrollEnabled
            style={{ height: '100%', width: '100%', borderRadius: ScaleWidth(20) }}
            region={{
              latitude: form?.location?.latitude,
              longitude: form?.location?.longitude,
              latitudeDelta: LAT_DELTA,
              longitudeDelta: LON_DELTA,
            }}
          >
            <Marker
              coordinate={{
                latitude: form?.location?.latitude,
                longitude: form?.location?.longitude,
              }}
              title={form?.location?.address}

            >
              <FontAwesome5
                name={'map-marker-alt'}
                size={Spacings.wSpace1}
                color={Colors.darkBlue}
              />
            </Marker>

          </MapView>


        </View>

        <Input
          value={form?.nickName}
          mainStyle={styles.name}
          placeholder={t("auth.enter") + t("address.nickname")}
          title={t("address.nickname")}
          error={form?.nickNameError}
          onChangeText={onChangeTextName}
        />

        <Input
          value={form?.street}
          mainStyle={styles.name}
          placeholder={t("auth.enter") + t("address.street")}
          title={t("address.street")}
          error={form?.streetError}
          onChangeText={onChangeTextStreet}
        />
        <Input
          value={form?.building}
          mainStyle={styles.name}
          placeholder={t("auth.enter") + t("address.buildingApartment")}
          title={t("address.buildingApartment")}
          error={form?.buildingError}
          onChangeText={onChangeTextBuilding}
        />

        <View style={[styles.mainContainer]}>
          <Text style={styles.title}>{t("address.region")}</Text>
          <TouchableOpacity
            style={[
              styles.subContainer,
              form?.region ? { borderColor: Colors.primary } : null,
            ]}
            onPress={() => {
              updateForm({ key: "sheetType", value: "region" });
              updateForm({ key: "sheetTitle", value: t("address.region") });
              RBSheetRef.current.open();

            }}
          >
            <Text style={[styles.placeholder, form?.region?.REGION_NAME ? { color: Colors.darkBlue } : null]}>{form?.region?.REGION_NAME || (t("auth.enter") + t("address.region"))}</Text>
          </TouchableOpacity>
        </View>

        {form?.List_Area ? <View style={[styles.mainContainer]}>
          <Text style={styles.title}>{t("address.area")}</Text>
          <TouchableOpacity
            style={[
              styles.subContainer,
              form?.area ? { borderColor: Colors.primary } : null,
            ]}
            onPress={() => {
              updateForm({ key: "sheetType", value: "area" });
              updateForm({ key: "sheetTitle", value: t("address.area") });
              RBSheetRef.current.open();

            }}
          >
            <Text style={[styles.placeholder, form?.area?.AREA_NAME ? { color: Colors.darkBlue } : null]}>{form?.area?.AREA_NAME || (t("auth.enter") + t("address.area"))}</Text>
          </TouchableOpacity>
        </View> : null}

        <Input
          value={form?.unit}
          mainStyle={styles.name}
          placeholder={t("auth.enter") + t("address.unit")}
          title={t("address.unit")}
          error={form?.buildingError}
          onChangeText={onChangeTextUnit}
        />
        <Input
          value={form?.floor}
          mainStyle={styles.name}
          placeholder={t("auth.enter") + t("address.floor")}
          title={t("address.floor")}
          error={form?.buildingError}
          onChangeText={onChangeTextFloor}
        />

        <Input
          value={form?.addressDetails}
          mainStyle={styles.name}
          placeholder={t("auth.enter") + t("address.addressDetails")}
          title={t("address.addressDetails")}
          error={form?.addressDetailsError}
          keyboardType='numeric'
          onChangeText={onChangeTextAddressDetails}
        />

        {addressesData?.length > 0 && type != "edit" ?
          <View style={styles.checkBoxView}>

            <Text style={styles.checkboxText}>

              {t('address.setDefault')}{' '}

            </Text>

            <CheckBox
              value={form?.IS_CURRENT}
              onValueChange={newValue => updateForm({ key: "IS_CURRENT", value: newValue })}
              tintColors={{ true: Colors.darkBlue, false: Colors.gray }}
              boxType="square"
              lineWidth={1}
            />
          </View> :
          null


        }



        <View style={{ height: ScaleHeight(130) }} />
      </KeyboardAwareScrollView>
      <AppButton
        style={styles.signupButton}
        textStyle={styles.signupText}
        title={t("auth.SAVECHANGES")}
        disabled={form?.buttonDisabled}
        onPress={addAddressAction}
        loading={addAddressLoading}
      />
      <RBSheet
        ref={RBSheetRef}
        height={ScaleHeight(350)}
        openDuration={250}
        customStyles={{
          container: styles.depositContainer,
        }}

      >
        <Text style={[styles.RBSheetRefTitle, { marginBottom: form?.sheetType == "region" ? ScaleHeight(20) : 0 }]}>{t("auth.choose") + form?.sheetTitle} </Text>


        {form?.sheetType == "region" ?
          <FlatList
            data={regionsData?.sort(
              (objA, objB) =>
                objA.REGION_NAME.localeCompare(objB.REGION_NAME)
            )}
            renderItem={renderItem}
            keyExtractor={(item, index) => JSON.stringify(item)}
          />
          :
          <View>
            <Input
              mainStyle={styles.search}
              placeholder={t("address.search")}
              onChangeText={onChangeTextSearch}
            />
            <FlatList
              data={form?.List_Area2?.sort(
                (objA, objB) =>
                  objA.AREA_NAME.localeCompare(objB.AREA_NAME)
              )}
              renderItem={renderItem}
              keyExtractor={(item, index) => JSON.stringify(item)}
            />
          </View>
        }
      </RBSheet>

    </View>
  );
};

export default AddressForm;
