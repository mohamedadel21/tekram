import React, { useState, useReducer, useEffect } from "react";
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
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IMAGES from "../../../common/images";
import styles from "./styles";
import { Colors, ScaleWidth, width, height, Spacings } from "../../../common/foundation";
import { validateNumber, validateExpiryDate } from "../../../common/validation";
import style from "../../SplashScreen/style";


const reducer = (state: any, { key, value }: { key: any; value: any }) => {
  return { ...state, [key]: value };
};


const PaymentForm = (props: any) => {
  const { t } = useTranslation();

  const initailFormState = {
    isPassword: true,
    buttonDisabled: true,
    nickName: "",
    street: "",
    phone: "",
    building: "",
  };
  const [form, updateForm] = useReducer(reducer, initailFormState);


  useEffect(() => {

    const date = form?.expiryDate && form?.expiryDate?.split('/');
    const CurrentDate = new Date();
    const MonthNumber =
      CurrentDate.getMonth() + 1 > 9
        ? `0${CurrentDate.getMonth() + 1}`
        : CurrentDate.getMonth() + 1;


    updateForm({
      key: "buttonDisabled",
      value:
        !String(form?.cardHolderName).trim() ||
        !validateNumber(String(form?.cardNumber).trim()) || String(form?.cardNumber).length != 16 ||
        !validateNumber(String(form?.cvv).trim()) || String(form?.cvv).length != 3 ||
        !validateExpiryDate(String(form?.expiryDate).trim()) || (Number(date[1]) <= CurrentDate.getFullYear().toString().slice(2, 4) && Number(date[0]) <= MonthNumber)
    });
  }, [form?.cardHolderName, form?.cardNumber, form?.cvv, form?.expiryDate]);

  const validate = (condition: any, key: any, message: any) => {
    if (condition) {
      updateForm({ key: key, value: message });
    } else {
      updateForm({ key: key, value: "" });
    }
  };
  const onChangeTextCardHolderName = (value: any) => {
    updateForm({ key: "cardHolderName", value: value });

    validate(!String(value).trim(), "cardHolderNameError", t("auth.requiredField"));
  };

  const onChangeTextCardNumber = (value: any) => {
    updateForm({ key: "cardNumber", value: value });

    validate(
      !validateNumber(String(value).trim()) || String(value).length != 16
      ,
      "cardNumberError",
      t("auth.requiredField")
    );
  };

  const onChangeTextCVV = (value: any) => {
    updateForm({ key: "cvv", value: value });

    validate(
      !validateNumber(String(value).trim()) || String(value).length != 3
      ,
      "cvvError",
      t("auth.requiredField")
    );
  };
  const onChangeTextExpiryDate = (value: any) => {
    const date = value && value?.split('/');
    const CurrentDate = new Date();
    const MonthNumber =
      CurrentDate.getMonth() + 1 > 9
        ? `0${CurrentDate.getMonth() + 1}`
        : CurrentDate.getMonth() + 1;

    if (value.split('').length == 3 && !value?.split('')?.includes('/')) {
      const textArray = value?.split('');
      updateForm({ key: "expiryDate", value: `${textArray[0]}${textArray[1]}/${textArray[2]}` });

    } else {
      updateForm({ key: "expiryDate", value: value });
    }
    validate(
      !validateExpiryDate(String(value).trim()) || (Number(date[1]) <= CurrentDate.getFullYear().toString().slice(2, 4) && Number(date[0]) <= MonthNumber)
      ,
      "expiryDateError",
      t("payment.invalidExpiryDate")
    );





  };



  return (
    <View style={styles.container}>
      <HomeHeader
        title={t("payment.newPayment")}
        navigation={props.navigation}
      />
  <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      >


        <Input
          value={form?.cardHolderName}
          mainStyle={styles.name}
          placeholder={t("auth.enter") + t("payment.cardHolderName")}
          title={t("payment.cardHolderName")}
          error={form?.cardHolderNameError}
          onChangeText={onChangeTextCardHolderName}
        />

        <Input
          value={form?.cardNumber}
          mainStyle={styles.number}
          placeholder={t("auth.enter") + t("payment.cardNumber")}
          title={t("payment.cardNumber")}
          keyboardType={'number-pad'}
          error={form?.cardNumberError}
          onChangeText={onChangeTextCardNumber}
          maxLength={16}
        />

        <View style={styles.row}>
          <Input
            value={form?.expiryDate}
            inputStyle={styles.expiresInPUT}
            mainStyle={styles.expires}
            title={t("payment.expiryDate")}
            placeholder={t("payment.MMYY")}
            error={form?.expiryDateError}
            onChangeText={onChangeTextExpiryDate}
            maxLength={5}
          />

          <Input
            value={form?.cvv}
            inputStyle={styles.cvvInput}
            mainStyle={styles.cvv}

            placeholder={t("payment.CVV")}
            title={t("payment.CVV")}
            keyboardType={'number-pad'}
            error={form?.cvvError}
            onChangeText={onChangeTextCVV}
            maxLength={3}
          />

        </View>



      </KeyboardAwareScrollView>
      <AppButton
        style={styles.signupButton}
        textStyle={styles.signupText}
        title={t("profile.save")}
        disabled={form?.buttonDisabled}
      />

    </View>
  );
};

export default PaymentForm;
