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

import AppButton from "../../../components/AppButton";
import AuthHeader from "../../../components/Headers/AuthHeader";
import Input from "../../../components/Input";
import { CreateNewPassword } from "../../../redux/actions/AuthAction";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./styles";

const reducer = (state: any, { key, value }: { key: any; value: any }) => {
  return { ...state, [key]: value };
};

const CreateNewPasswordScreen = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const result = props.route.params.result;
  const initailFormState = {
    isPassword: true,
    isConfirmPassword: true,
    buttonDisabled: true,
    password: "",
    ConfirmPassword: ""
  };
  const [form, updateForm] = useReducer(reducer, initailFormState);

  const { createNewPasswordData,
    createNewPasswordLoading } = useSelector(
      state => state.AuthReducer,
    );

  useEffect(() => {

    updateForm({
      key: "buttonDisabled",
      value:
        String(form?.password).trim().replace(" ", "").length < 8 ||
        String(form?.password).trim().replace(" ", "") != String(form?.confirmPassword).trim().replace(" ", "")
    });
  }, [form?.password, form?.confirmPassword]);

  const validate = (condition: any, key: any, message: any) => {
    if (condition) {
      updateForm({ key: key, value: message });
    } else {
      updateForm({ key: key, value: "" });
    }
  };

  const onChangeTextPassword = (value: any) => {
    updateForm({ key: "password", value: String(value).trim().replace(" ", "") });

    validate(
      String(value).trim().replace(" ", "").length < 8,
      "passwordError",
      t("auth.validatePassword")
    );
  };
  const onChangeConfirmPassword = (value: any) => {
    updateForm({ key: "confirmPassword", value: String(value).trim().replace(" ", "") });

    validate(
      String(value).trim().replace(" ", "").length < 8 || String(form?.password).trim().replace(" ", "") != String(value).trim().replace(" ", ""),
      "confirmPasswordError",
      t("auth.validateConfirmPassword")
    );
  };

  const isPasswordOnPress = () => {
    updateForm({ key: "isPassword", value: !form?.isPassword });
  };
  const isConfirmPasswordOnPress = () => {
    updateForm({ key: "isConfirmPassword", value: !form?.isConfirmPassword });
  };

  const resetPasswordAction = () => {
    dispatch(CreateNewPassword(form?.password, result?.phone,result?.callingCode, result?.OTP_VERIFICATION_ID, (data) => {
      if (data.Exception_Message == "") {
        Alert.alert("", "Password Changed Successfully!")
        props.navigation.navigate("Login")
      }
      else if (data.Exception_Message) {
        Alert.alert("", data?.Exception_Message);

      }
    }))
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        navigation={props.navigation}
        title={t("auth.createNewPassword")}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.request}>{t("auth.requestChangePassword")}</Text>
        <Input
          isPassword={true}
          isPasswordOnPress={isPasswordOnPress}
          mainStyle={styles.password}
          placeholder={t("auth.password")}
          title={t("auth.password")}
          secureTextEntry={form?.isPassword}
          error={form?.passwordError}
          onChangeText={onChangeTextPassword}
        />
        <Input
          isPassword={true}
          isPasswordOnPress={isConfirmPasswordOnPress}
          mainStyle={styles.password}
          placeholder={t("auth.password")}
          title={t("auth.confirmPassword")}
          secureTextEntry={form?.isConfirmPassword}
          error={form?.confirmPasswordError}
          onChangeText={onChangeConfirmPassword}
        />
        <AppButton
          style={styles.signupButton}
          textStyle={styles.signupText}
          title={t("auth.resetPassword").toUpperCase()}
          disabled={createNewPasswordLoading || form?.buttonDisabled}
          onPress={resetPasswordAction}
          loading={createNewPasswordLoading}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateNewPasswordScreen;
