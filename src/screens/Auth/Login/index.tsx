import React, { useEffect, useReducer, useState, useRef } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert,Platform ,PermissionsAndroid} from "react-native";
import styles from "./style";
import IMAGES from "../../../common/images";
import AuthHeader from "../../../components/Headers/AuthHeader";
import Input from "../../../components/Input";
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, validateNumber } from "../../../common/validation";
import AppButton from "../../../components/AppButton";
import { Login, OTPVerificationNumber } from "../../../redux/actions/AuthAction";
import { useSelector, useDispatch } from 'react-redux';
import { GetAddressesAction } from "../../../redux/actions/AddressesAction";
import AsyncStorage from '@react-native-community/async-storage';
import { width, ScaleHeight, Colors } from "../../../common/foundation";
import { GetRegionsAction } from "../../../redux/actions/AddressesAction";
import RBSheet from "react-native-raw-bottom-sheet";
import PhoneInput from "../../../components/PhoneInput";
import CountriesPhoneNumberLength from '../../../common/CountriesPhoneNumberLength'
import { GOOGLE_MAPS_APIKEY } from '../../../utils/axios';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {  GetCurrencyList, UpdategGuestCurrencyAction } from "../../../redux/actions/ProfileAction";

const reducer = (state: any, { key, value }: { key: any; value: any }) => {
  return { ...state, [key]: value };
};

const LoginScreen = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const RBSheetRef = useRef();
  const popupRef = useRef();


  const { loginData,
    loginLoading } = useSelector(
      state => state.AuthReducer,
    );
  const initailFormState = {
    isPassword: true,
    buttonDisabled: true,
    email: "",
    password: "",

    region: null,
    area: null,
    List_Area: [],
    sheetType: "",
    sheetTitle: "",
    phone: "",
    phoneCode: "LB",
    selectedLength: [7, 8],
    callingCode: "+961"
  };
  const [form, updateForm] = useReducer(reducer, initailFormState);
  const [searchQuery, setSearchQuery] = useState("")
  const [isAccessLocation, setIsAccessLocation] = useState(false)
  const timeout = useRef(null);

  const {
    regionsData,
    regionsLoading,
  } = useSelector(
    state => state.AddressesReducer,
  );
  const { profileData,getCurrencyListData
  } = useSelector(
    state => state.ProfileReducer,
  );
  useEffect(() => {


    if (searchQuery == "") {
      updateForm({ key: "List_Area2", value: form.List_Area });

    } else {
      updateForm({ key: "List_Area2", value: form.List_Area?.filter(item => String(item?.AREA_NAME).toLowerCase().trim().includes(String(searchQuery).toLowerCase().trim())) });
    }

  }, [searchQuery])

  useEffect(() => {
    let selectedLength = null
    CountriesPhoneNumberLength.filter(code => {
      if (code.code == form?.phoneCode) {
        selectedLength = code.phoneLength
      }
    })
    updateForm({
      key: "selectedLength",
      value: selectedLength
    });

    if (form?.phone) {
      validate(!validateNumber(form?.phone) || selectedLength?.length == 2 ? !(String(form?.phone).length >= selectedLength[0] && String(form?.phone).length <= selectedLength[1]) : String(form?.phone).length != selectedLength, "phoneError", t("auth.validatePhone"));
    }
  }, [form?.phoneCode]);

  
  

  useEffect(() => {
    updateForm({
      key: "buttonDisabled",
      value: !validateNumber(form?.phone) ||
        !(form?.password) ||
        !(form?.phone) ||
        form?.selectedLength?.length == 2 ? !(String(form?.phone).length >= form?.selectedLength[0] && String(form?.phone).length <= form?.selectedLength[1]) : String(form?.phone).length != form?.selectedLength

    });
  }, [form?.phone, form?.selectedLength, form?.phoneCode, form?.password]);

  const requestPermissions=async()=> {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
      getLocation()

    }

    if (Platform.OS === 'android') {

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Tekram',
            'message': 'Tekram App access to your location '
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location")
          getLocation()
        } else {
          console.log("location permission denied")
          await AsyncStorage.setItem("LATITUDE", 0.000 + "")
          await AsyncStorage.setItem("LONGITUDE",0.00 + "")
  
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }
  requestPermissions()
  useEffect(() => {
    getLocation()
    dispatch(GetCurrencyList())
    dispatch(GetRegionsAction())
  }, [])

  const getLocation = async () => {

    Geolocation.getCurrentPosition(
      async info => {

        Geocoder.init(GOOGLE_MAPS_APIKEY);
        console.log("co ord",Math.round(info.coords.latitude * 100) / 100 ,
        Math.round(info.coords.longitude * 100) / 100);
        await AsyncStorage.setItem("LATITUDE", Math.round(info.coords.latitude * 100) / 100 + "")
        await AsyncStorage.setItem("LONGITUDE", Math.round(info.coords.longitude * 100) / 100 + "")

      },
      error => {
        console.log(JSON.stringify(error));
      },
    );
  };

  const validate = (condition: any, key: any, message: any) => {
    if (condition) {
      updateForm({ key: key, value: message });
    } else {
      updateForm({ key: key, value: "" });
    }
  };

 
  const onChangeTextPassword = (value: any) => {
    updateForm({ key: "password", value: value });

    validate(!value, "passwordError", t("auth.requiredField"));
  };

  const isPasswordOnPress = () => {
    updateForm({ key: "isPassword", value: !form?.isPassword });
  };
  const goToSignup = () => {
    props.navigation.navigate("SignUp");
  };
  const goToResetPassword = () => {
    props.navigation.navigate("ResetPassword");
  };

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

          setTimeout(() => {
            popupRef.current.open();
          }, 200)


        }}
        style={styles.regionView}>
        <Text style={[styles.regionText, form?.sheetType == "region" ? (form?.region?.REGION_NAME == item?.REGION_NAME ? { color: Colors.success } : {}) : (form?.area?.AREA_NAME == item?.AREA_NAME ? { color: Colors.success } : {})]}>{form?.sheetType == "region" ? item.REGION_NAME : item.AREA_NAME}</Text>
      </TouchableOpacity>
    )
  }

  const loginAction = () => {



    dispatch(Login(form?.phone, form?.callingCode, form?.password, (data) => {
      if (data.i_Result) {
        dispatch(GetAddressesAction(async (data) => {
          if (data?.length > 0) {
            data?.filter(async (item: any) => {
              if (item?.IS_CURRENT == true) {
                await AsyncStorage.setItem("LATITUDE", item?.LATITUDE + "")
                await AsyncStorage.setItem("LONGITUDE", item?.LONGITUDE + "")
              }
            })
            props.navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [{ name: "BottomTabsNavigation" }]
              })
            });
          } else {
            props.navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [{ name: "Addresses", params: { comeFrom: "login" } }]
              })
            });
          }
        }))
      }

      else if (data.Exception_Message) {
        Alert.alert("", data?.Exception_Message);

      }

    }, (error) => {

    }))


  };

  const onChangeTextPhone = (value: any) => {
    updateForm({ key: "phone", value: value });
    validate(!validateNumber(value) || form?.selectedLength?.length == 2 ? !(String(value).length >= form?.selectedLength[0] && String(value).length <= form?.selectedLength[1]) : String(value).length != form?.selectedLength, "phoneError", t("auth.validatePhone"));
  };


  const onChangeCode = (value: any) => {
    updateForm({ key: "phoneCode", value: value.cca2 });
    updateForm({ key: "callingCode", value: "+" + value.callingCode[0] });


  };
  const onChangeTextSearch = (value: any) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setSearchQuery(value)
    }, 1000);
  }

  const skipAction = async() => {
   const currency_id= await AsyncStorage.getItem("currency_id");

   let currency = null
   getCurrencyListData?.filter((item: any) => {
     if (item?.CURRENCY_ID == currency_id) {
       currency = item
     }
   })
   if(currency){
    dispatch(UpdategGuestCurrencyAction(currency))
   }

    getLocation()
    props.navigation.dispatch({
      ...CommonActions.reset({
        index: 0,
        routes: [{ name: "BottomTabsNavigation" }]
      })
    });  }

  const getStartedAction = async () => {

    await AsyncStorage.setItem("area_id", form?.area?.AREA_ID + "")
    popupRef.current.close()
    props.navigation.dispatch({
      ...CommonActions.reset({
        index: 0,
        routes: [{ name: "BottomTabsNavigation" }]
      })
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        width,
        flexDirection: 'row'
      }}>
        <Text style={styles.login}>
          {t("auth.login")}
        </Text>
        <TouchableOpacity onPress={skipAction} style={styles.skipButton}>

          <Text style={styles.skip}>
            {t("auth.skip")}
          </Text>
        </TouchableOpacity>

      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* <Input
          value={form?.email}
          mainStyle={styles.name}
          placeholder={t("auth.yourEmail")}
          title={t("auth.email")}
          error={form?.emailError}
          keyboardType='email-address'
          autoCapitalize='none'
          onChangeText={onChangeTextEmail}
        />
       */}
        <PhoneInput
          label={t('address.phoneNumber')}
          value={form?.phone}
          onChangeText={onChangeTextPhone}
          keyboardType={'number-pad'}
          inputType={'phone'}
          onChangeCode={onChangeCode}
          returnKeyType='done'
          error={form?.phoneError}

        />

        <Input
          value={form?.password}
          isPassword={true}
          isPasswordOnPress={isPasswordOnPress}
          mainStyle={styles.email}
          placeholder={t("auth.password")}
          title={t("auth.password")}
          secureTextEntry={form?.isPassword}
          error={form?.passwordError}
          autoCapitalize='none'
          onChangeText={onChangeTextPassword}
        />

        <AppButton
          style={styles.signupButton}
          textStyle={styles.signupText}
          title={t("auth.LOGIN")}
          disabled={loginLoading || form?.buttonDisabled}
          onPress={loginAction}
          loading={loginLoading}
        />

        <TouchableOpacity onPress={goToResetPassword} style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>{t("auth.forgotPassword")}</Text>
        </TouchableOpacity>

        <View style={styles.alreadyView}>
          <Text style={styles.alreadyText}>{t("auth.dontHaveAccount")}</Text>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={styles.loginText}>{t("auth.signup")}</Text>
          </TouchableOpacity>
        </View>
        {/*<View style={styles.seperatorView}>
          <Text style={styles.signupWith}>
            {" " + t("auth.loginWith") + " "}
          </Text>
        </View>

        <View style={styles.row}>
          <AppButton
            style={styles.signupButtonFB}
            textStyle={styles.signupText}
            title={"  " + t("auth.facebook")}
          // onPress={signupAction}
          >
            <Image resizeMode="contain" source={IMAGES.facebook} />
          </AppButton>
          <AppButton
            style={styles.signupButtonGoogle}
            textStyle={styles.signupText}
            title={"  " + t("auth.google")}
          //onPress={signupAction}
          >
            <Image resizeMode="contain" source={IMAGES.google} />
          </AppButton>
           </View>*/}
      </KeyboardAwareScrollView>

      <RBSheet
        ref={popupRef}
        height={ScaleHeight(350)}
        openDuration={250}
        customStyles={{
          container: styles.depositContainer,
        }}
      >
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
              popupRef.current.close();

              setTimeout(() => {
                RBSheetRef.current.open();
              }, 200)
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
              popupRef.current.close();

              setTimeout(() => {
                RBSheetRef.current.open();
              }, 200)

            }}
          >
            <Text style={[styles.placeholder, form?.area?.AREA_NAME ? { color: Colors.darkBlue } : null]}>{form?.area?.AREA_NAME || (t("auth.enter") + t("address.area"))}</Text>
          </TouchableOpacity>
        </View> : null}

        <AppButton
          title={t("onboarding.getStarted")}
          onPress={getStartedAction}
          style={styles.signupButton}
          textStyle={styles.signupText}
          disabled={!form?.region || !form?.area}
        />
      </RBSheet>

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
            /><FlatList
              data={form?.List_Area2?.sort(
                (objA, objB) =>
                  objA.AREA_NAME.localeCompare(objB.AREA_NAME)
              )}
              renderItem={renderItem}
              keyExtractor={(item, index) => JSON.stringify(item)}
            />
          </View>}
      </RBSheet>
    </SafeAreaView>
  );
};

export default LoginScreen;
