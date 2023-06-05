import React, { useState, useReducer, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-community/async-storage';
import AppButton from "../../../components/AppButton";
import AuthHeader from "../../../components/Headers/AuthHeader";
import Input from "../../../components/Input";
import styles from "./styles";
import { ChangePassword } from "../../../redux/actions/AuthAction";
import { useSelector, useDispatch } from 'react-redux';
const reducer = (state: any, { key, value }: { key: any; value: any }) => {
  return { ...state, [key]: value };
};

const ChangePasswordScreen = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const initailFormState = {
    isOldPassword: true,
    isNewPassword: true,
    isConfirmPassword: true,
    buttonDisabled: true,
    oldPassword: "",
    newPassword: "",
    ConfirmNewPassword: ""
  };
  const [form, updateForm] = useReducer(reducer, initailFormState);

  const {
    changePasswordData,
    changePasswordLoading,
  } = useSelector(
    state => state.AuthReducer,
  );

  useEffect(() => {
    updateForm({
      key: "buttonDisabled",
      value:
        String(form?.oldPassword).trim().replace(" ","").length < 8 ||
        String(form?.newPassword).trim().replace(" ","").length < 8 ||
        String(form?.ConfirmNewPassword).trim().replace(" ","").length < 8 ||
        String(form?.newPassword).trim().replace(" ","") != String(form?.ConfirmNewPassword).trim().replace(" ","") ||
        String(form?.oldPassword).trim().replace(" ","") == String(form?.newPassword).trim().replace(" ","")
    });
  }, [form?.newPassword, form?.ConfirmNewPassword, form?.oldPassword]);

 

  const validate = (condition: any, key: any, message: any) => {
    if (condition) {
      updateForm({ key: key, value: message });
    } else {
      updateForm({ key: key, value: "" });
    }
  };

  const onChangeTextOldPassword = (value: any) => {
    updateForm({ key: "oldPassword", value: String(value).trim().replace(" ","") });

    validate(
      String(value).trim().replace(" ","").length < 8,
      "oldPasswordError",
      String(value).trim().replace(" ","") == String(form?.newPassword).trim().replace(" ","") ? t("auth.sameOldPassword") : t("auth.validatePassword")
    );
  };
  const onChangeTextNewPassword = (value: any) => {
    updateForm({ key: "newPassword", value: String(value).trim().replace(" ","") });

    validate(
      String(value).length < 8 || String(value).trim().replace(" ","") == String(form?.oldPassword).trim().replace(" ",""),
      "newPasswordError",
      String(value).trim().replace(" ","") == String(form?.oldPassword).trim().replace(" ","") ? t("auth.sameOldPassword") : t("auth.validatePassword")
    );
  };
  const onChangeConfirmPassword = (value: any) => {
    updateForm({ key: "ConfirmNewPassword", value: String(value).trim().replace(" ","") });

    validate(
      String(value).trim().replace(" ","").length < 8 || String(form?.newPassword).trim().replace(" ","") != String(value).trim().replace(" ",""),
      "confirmPasswordError",
      t("auth.validateConfirmPassword")
    );
  };

  const isOldPasswordOnPress = () => {
    updateForm({ key: "isOldPassword", value: !form?.isOldPassword });
  };
  const isNewPasswordOnPress = () => {
    updateForm({ key: "isNewPassword", value: !form?.isNewPassword });
  };
  const isConfirmPasswordOnPress = () => {
    updateForm({ key: "isConfirmPassword", value: !form?.isConfirmPassword });
  };

  const resetPasswordAction = () => {
    dispatch(ChangePassword(form?.oldPassword, form?.newPassword, async (data) => {
      if (data.i_Result) {
        Alert.alert("", "Password Changed Successfully!");
        await AsyncStorage.setItem('password', form?.newPassword);
        props.navigation.goBack();
      } else {
        Alert.alert("", data?.Exception_Message);

      }
    }))
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        navigation={props.navigation}
        title={t("profile.changePassword")}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.request}>{t("auth.requestChangePassword")}</Text>
        <Input
          value={form?.oldPassword}
          isPassword={true}
          isPasswordOnPress={isOldPasswordOnPress}
          mainStyle={styles.password}
          placeholder={t("auth.enter") + t("auth.oldPassword")}
          title={t("auth.oldPassword")}
          secureTextEntry={form?.isOldPassword}
          error={form?.oldPasswordError}
          onChangeText={onChangeTextOldPassword}
        />

        <Input
          value={form?.newPassword}
          isPassword={true}
          isPasswordOnPress={isNewPasswordOnPress}
          mainStyle={styles.password}
          placeholder={t("auth.enter") + t("auth.newPassword")}
          title={t("auth.newPassword")}
          secureTextEntry={form?.isNewPassword}
          error={form?.newPasswordError}
          onChangeText={onChangeTextNewPassword}
        />
        <Input
          value={form?.ConfirmNewPassword}
          isPassword={true}
          isPasswordOnPress={isConfirmPasswordOnPress}
          mainStyle={styles.password}
          placeholder={t("auth.enter") + t("auth.confirmNewPassword")}
          title={t("auth.confirmNewPassword")}
          secureTextEntry={form?.isConfirmPassword}
          error={form?.confirmPasswordError}
          onChangeText={onChangeConfirmPassword}
        />
        <AppButton
          style={styles.signupButton}
          textStyle={styles.signupText}
          title={t("profile.save").toUpperCase()}
          disabled={changePasswordLoading || form?.buttonDisabled}
          onPress={resetPasswordAction}
          loading={changePasswordLoading}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ChangePasswordScreen;
