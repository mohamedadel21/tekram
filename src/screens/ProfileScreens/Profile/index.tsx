import React, { useState, useReducer, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  I18nManager,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input from "../../../components/Input";
import PhoneInput from "../../../components/PhoneInput";
import AppButton from "../../../components/AppButton";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import IMAGES from "../../../common/images";
import styles from "./styles";
import { Colors, Fonts, ScaleHeight, ScaleWidth } from "../../../common/foundation";
import { validateEmail, validateName, validatePhone, validateNumber } from "../../../common/validation";
import { launchImageLibrary } from 'react-native-image-picker';
import { GetProfileAction, GetUpdateCustomerPicAction, updateCustomerProfile, GetDeleteCustomerPicAction } from "../../../redux/actions/ProfileAction";
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import CountriesPhoneNumberLength from '../../../common/CountriesPhoneNumberLength'
import { GetRegionsAction } from "../../../redux/actions/AddressesAction";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import { MenuProvider } from 'react-native-popup-menu';

const reducer = (state: any, { key, value }: { key: any; value: any }) => {
  return { ...state, [key]: value };
};


const Profile = (props: any) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    profileData,
    profileLoading,
    updateCustomerPicData,
    updateCustomerPicLoading,
    updateCustomerData,
    updateCustomerLoading
  } = useSelector(
    state => state.ProfileReducer,
  );

  const {
    regionsData,
    regionsLoading,
  } = useSelector(
    state => state.AddressesReducer,
  );

  const initailFormState = {
    isPassword: true,
    buttonDisabled: true,
    fullName: "",
    email: "",
    phone: "",
    password: "",
    image: null,
    phoneCode: "LB",
    selectedLength: [7, 8],
    CURRENCY_ID: null,
    NOTIFICATION_TOKEN: null,

  };
  const [form, updateForm] = useReducer(reducer, initailFormState);

  console.log("email", String(form?.email), String(form?.email).length > 0);

  useEffect(() => {
    onChangeTextName(profileData?.NAME)
    onChangeTextPhone(profileData?.MOBILE_NUMBER)
    updateForm({ key: "fullName", value: profileData?.NAME });
    updateForm({ key: "phone", value: profileData?.User?.MOBILE_NUMBER });
    updateForm({ key: "CURRENCY_ID", value: profileData?.CURRENCY_ID });
    updateForm({ key: "NOTIFICATION_TOKEN", value: profileData?.NOTIFICATION_TOKEN });
    updateForm({ key: "image", value: profileData?.File_Url });
    updateForm({ key: "email", value: profileData?.User?.EMAIL });



    let selectedLength = [7, 8]
    let callingCode = "+961"
    CountriesPhoneNumberLength.filter(code => {
      if (code.phone == String(profileData?.User?.MOBILE_NUMBER_EXTENSION).replace("+", '')) {
        selectedLength = code.phoneLength
        callingCode = "+" + code.phone
      }
    })

    updateForm({
      key: "selectedLength",
      value: selectedLength
    });
    updateForm({
      key: "callingCode",
      value: callingCode
    });
  }, [profileData]);


  console.log("callingCode", form?.callingCode);

  let phoneCode = "LB"
  CountriesPhoneNumberLength.filter(code => {
    if (code.phone == String(profileData?.User?.MOBILE_NUMBER_EXTENSION).replace("+", '')) {
      phoneCode = code.code
    }
  })



  useEffect(() => { dispatch(GetProfileAction()) }, [])
  useEffect(() => {
    validate(!validateNumber(form?.phone) || form?.selectedLength?.length == 2 ? !(String(form?.phone).length >= form?.selectedLength[0] && String(form?.phone).length <= form?.selectedLength[1]) : String(form?.phone).length != form?.selectedLength, "phoneError", t("auth.validatePhone"));
    updateForm({

      key: "buttonDisabled",
      value:
        !validateName(form?.fullName) ||
          (String(form?.email).length > 0 && form?.email != undefined ? !validateEmail(String(form?.email).trim()) : false) ||

          !validateNumber(form?.phone) ||
          !(form?.phone) ||
          form?.selectedLength?.length == 2 ? !(String(form?.phone).length >= form?.selectedLength[0] && String(form?.phone).length <= form?.selectedLength[1]) : String(form?.phone).length != form?.selectedLength
    });


  }, [form?.fullName, form?.phone, form?.email, form?.selectedLength, form?.phoneCode]);

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
  }, [form?.phoneCode]);



  const validate = (condition: any, key: any, message: any) => {
    if (condition) {
      updateForm({ key: key, value: message });
    } else {
      updateForm({ key: key, value: "" });
    }
  };
  const onChangeTextName = (value: any) => {
    updateForm({ key: "fullName", value: value });

    validate(!validateName(value), "fullNameError", t("auth.validateName"));
  };
  const onChangeTextPhone = (value: any) => {
    updateForm({ key: "phone", value: value });
    console.log("value", value);

    validate(!validateNumber(value) || form?.selectedLength?.length == 2 ? !(String(value).length >= form?.selectedLength[0] && String(value).length <= form?.selectedLength[1]) : String(value).length != form?.selectedLength, "phoneError", t("auth.validatePhone"));
  };

  const pickImage = async () => {
    const options = {
      quality: 0.7,
      maxWidth: 800,
      maxHeight: 800,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options, async (response) => {
      console.log("Response = ", response);
      if (response.didCancel != true) {
        console.log(response);
        dispatch(GetUpdateCustomerPicAction(response?.assets, (data) => {
          if (data) {
            dispatch(GetProfileAction())
          }
        }))
        /* updateForm({
           key: "image",
           value: response?.assets[0]?.uri,
         });*/
      }

    });
  }

  const onChangeTextEmail = (value: any) => {
    updateForm({ key: "email", value: value });

    validate(
      !validateEmail(String(value).trim()),
      "emailError",
      t("auth.validateEmail")
    );
  };

  const onChangeCode = (value: any) => {
    console.log("value", value);

    updateForm({ key: "phoneCode", value: value.cca2 });
    updateForm({ key: "callingCode", value: "+" + value.callingCode[0] });

  };

  const deletePic = () => {
    dispatch(GetDeleteCustomerPicAction((data) => {
      if (data) {
        dispatch(GetProfileAction())
      }
    }))
  }
  const updateAction = () => {
    dispatch(updateCustomerProfile(form, (data) => {
      if (data.i_Result.CUSTOMER_ID) {
        dispatch(GetProfileAction())
        Alert.alert("", "Updated successfully!")

      } else {
        Alert.alert("", data?.Exception_Message)
      }
    }))
  }

  return (
    <MenuProvider>

      <View style={styles.container}>
        <View style={styles.bannerView}>
          <TouchableOpacity style={[styles.backButton]} onPress={() => props.navigation.goBack()}>
            <EvilIcons
              name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
              size={ScaleWidth(25)}
              color={Colors.darkBlue}
            />
          </TouchableOpacity>

        </View>
        <View style={styles.profilePicView}>
          {updateCustomerPicLoading ? <ActivityIndicator size="large" color={Colors.darkBlue} /> : <Image
            source={form?.image ? {
              uri:
                form?.image
            } : IMAGES.default}
            resizeMode='cover'
            style={styles.profilePic}
            defaultSource={IMAGES.default}
          />}

          {form?.image ?
            <Menu style={styles.trashButton}>
              <MenuTrigger text={
                <EvilIcons
                  name={'pencil'}
                  size={ScaleWidth(20)}
                  color={Colors.black}
                />
              } />
              <MenuOptions optionsContainerStyle={{ width: ScaleWidth(80), borderRadius: ScaleWidth(10) }}>
                <MenuOption style={{ height: ScaleHeight(30), justifyContent: 'center', alignItems: 'center', }} onSelect={deletePic}  >
                  <View style={styles.row2}>
                    <EvilIcons name='trash' size={ScaleWidth(17)} color={Colors.darkBlue} />
                    <Text style={{ color: Colors.darkBlue, fontFamily: Fonts.regular, fontSize: ScaleWidth(12), marginLeft: ScaleWidth(3) }}>{t("profile.delete")}</Text>
                  </View>
                </MenuOption>

                <MenuOption style={{ height: ScaleHeight(30), justifyContent: 'center', alignItems: 'center', }} onSelect={pickImage}  >
                  <View style={styles.row2}>
                    <EvilIcons name='pencil' size={ScaleWidth(17)} color={Colors.darkBlue} />
                    <Text style={{ color: Colors.darkBlue, fontFamily: Fonts.regular, fontSize: ScaleWidth(12), marginLeft: ScaleWidth(3) }}>{t("profile.change")}</Text>
                  </View>
                </MenuOption>

              </MenuOptions>
            </Menu>
            :

            <TouchableOpacity style={styles.trashButton} onPress={pickImage}>
              <EvilIcons name='pencil' size={ScaleWidth(20)} color={Colors.black} />

            </TouchableOpacity>
          }


        </View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Input
            value={form?.fullName}
            mainStyle={styles.name}
            placeholder={t("auth.yourName")}
            title={t("auth.fullName")}
            error={form?.fullNameError}
            onChangeText={onChangeTextName}
          />

          <Input
            value={form?.email}
            mainStyle={styles.name}
            placeholder={t("auth.yourEmail")}
            title={t("auth.email")}
            error={form?.emailError}
            keyboardType='email-address'
            onChangeText={onChangeTextEmail}
          />

          <PhoneInput
            defaultCode={phoneCode}
            label={t('address.phoneNumber')}
            value={form?.phone || profileData?.User?.MOBILE_NUMBER}
            onChangeText={onChangeTextPhone}
            keyboardType={'number-pad'}
            inputType={'phone'}
            onChangeCode={onChangeCode}
            returnKeyType='done'
            error={form?.phoneError}
            disabled={true}

          />


          <AppButton
            style={styles.signupButton}
            textStyle={styles.signupText}
            title={t("auth.SAVECHANGES")}
            disabled={form?.buttonDisabled}
            loading={updateCustomerLoading}
            onPress={updateAction}
          />


        </KeyboardAwareScrollView>
      </View>
    </MenuProvider>

  );
};

export default Profile;
