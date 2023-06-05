import React, { useState, useReducer, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppButton from "../../../components/AppButton";
import AuthHeader from "../../../components/Headers/AuthHeader";
import Input from "../../../components/Input";
import { validateNumber } from "../../../common/validation";
import { OTPVerificationEmail ,OTPVerificationNumber} from "../../../redux/actions/AuthAction";
import { useSelector, useDispatch } from 'react-redux';
import PhoneInput from "../../../components/PhoneInput";
import CountriesPhoneNumberLength from '../../../common/CountriesPhoneNumberLength'

import styles from "./styles";

const reducer = (state: any, { key, value }: { key: any; value: any }) => {
  return { ...state, [key]: value };
};

const ResetPassword = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    OPTVerificationData,
    OPTVerificationLoading,

  } = useSelector(
    state => state.AuthReducer,
  );
  const initailFormState = {
    buttonDisabled: true,
    phone: "",
    phoneCode: "LB",
    selectedLength: [7, 8],
    callingCode: "+961"

  };
  const [form, updateForm] = useReducer(reducer, initailFormState);

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

    if(form?.phone){
      validate(!validateNumber(form?.phone) || selectedLength?.length == 2 ? !(String(form?.phone).length >= selectedLength[0] && String(form?.phone).length <= selectedLength[1]) : String(form?.phone).length != selectedLength, "phoneError", t("auth.validatePhone"));
      }
  }, [form?.phoneCode]);


  useEffect(() => {
    updateForm({
      key: "buttonDisabled",
      value: !validateNumber(form?.phone) ||
        !(form?.phone) ||
        form?.selectedLength?.length == 2 ? !(String(form?.phone).length >= form?.selectedLength[0] && String(form?.phone).length <= form?.selectedLength[1]) : String(form?.phone).length != form?.selectedLength

    });
  }, [form?.phone, form?.phoneCode, form?.selectedLength]);

  const validate = (condition: any, key: any, message: any) => {
    if (condition) {
      updateForm({ key: key, value: message });
    } else {
      updateForm({ key: key, value: "" });
    }
  };

  const onChangeTextPhone = (value: any) => {
    updateForm({ key: "phone", value: value });
    validate(!validateNumber(value) || form?.selectedLength?.length == 2 ? !(String(value).length >= form?.selectedLength[0] && String(value).length <= form?.selectedLength[1]) : String(value).length != form?.selectedLength, "phoneError", t("auth.validatePhone"));
  };


  const onChangeCode = (value: any) => {
    updateForm({ key: "phoneCode", value: value.cca2 });
    updateForm({ key: "callingCode", value: "+" + value.callingCode[0] });


  };
  const sendNewPassword = () => {

    dispatch(OTPVerificationNumber(String(form?.phone).trim(),String(form?.callingCode).trim(), form?.fullName, true, (data: any) => {
      console.log("data", data);

      if (data?.i_Result == true) {
        props.navigation.navigate("VerificationCode", { form: form, screenFrom: "restPassword" });

      } else {
        Alert.alert("", data?.Exception_Message)
      }
    }))

  };
  return (
    <View style={styles.container}>
      <AuthHeader
        navigation={props.navigation}
        title={t("auth.resetPassword")}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.request}>{t("auth.requestReset")}</Text>

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

        <AppButton
          style={styles.signupButton}
          textStyle={styles.signupText}
          title={t("auth.sendNewPassword")}
          disabled={OPTVerificationLoading || form?.buttonDisabled}
          onPress={sendNewPassword}
          loading={OPTVerificationLoading}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ResetPassword;
