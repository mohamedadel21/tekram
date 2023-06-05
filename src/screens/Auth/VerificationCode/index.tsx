import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from "react-native-confirmation-code-field";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthHeader from "../../../components/Headers/AuthHeader";
import styles from "./styles";
import { OTPVerificationEmail,OTPVerificationNumber, Signup,VerifyOTPCode } from "../../../redux/actions/AuthAction";
import { useSelector, useDispatch } from 'react-redux';
import { Colors, ScaleHeight, ScaleWidth, Spacings } from "../../../common/foundation";
import { CommonActions } from "@react-navigation/native";
const CELL_COUNT = 6;

const VerificationCode = (props: any) => {
  const { t } = useTranslation();
  const form = props.route.params.form;
  const screenFrom = props.route.params.screenFrom;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [countDown, setCountDoun] = useState(59);
  const dispatch = useDispatch();
  const [layout, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });
  const { OPTVerificationData, signupData,
    signupLoading,
    OPTVerificationLoading ,verifyOtpCodeData,
    verifyOtpCodeLoading} = useSelector(
      state => state.AuthReducer,
    );
  var interval;

  useEffect(() => {
    _renderCountDown();
  }, []);
  const _renderCountDown = () => {
    interval = setInterval(() => {
      setCountDoun(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  };

  const resendCodeAction = () => {
    setValue("")
    dispatch(OTPVerificationNumber(form?.phone,form?.callingCode, form?.fullName, screenFrom == 'signup' ? false : true, (data: any) => {
      if (data?.i_Result == true) {
        setCountDoun(59)
      } else {
        Alert.alert("", data?.Exception_Message)
      }
    }))
  }
  
  useEffect(() => {
    onSubmitEditing()
  }, [value]);

  const onSubmitEditing = () => {
    if (String(value).length == CELL_COUNT) {
      if (screenFrom == 'signup') {
        dispatch(Signup(form?.fullName, form?.email, form?.password, form?.phone,form?.callingCode, value, (data: any) => {
          if (data?.i_Result) {

            props.navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [{ name: "Addresses",params:{comeFrom:"signup"} }]
              })
            });
                        /* props.navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [{ name: "BottomTabsNavigation" }]
              })
            });*/
          }  else if (data?.i_Result==null)  {            
            Alert.alert("", data?.Exception_Message)
          }
        }))
      }else {

      dispatch(VerifyOTPCode(value, form?.callingCode+form?.phone, (data: any) => {
        if (data?.i_Result) {
          data.i_Result.phone= form?.phone;
          data.i_Result.callingCode= form?.callingCode;
          props.navigation.navigate("NewPassword",{result:data?.i_Result});
        }  else if (data?.i_Result==null)  {            
          Alert.alert("", data?.Exception_Message)
        }
      }))
      
    }
    }
  }

  return (
    <View style={styles.container}>
      <AuthHeader
        navigation={props.navigation}
        title={t("auth.VerificationCode")}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text style={styles.request}>{t("auth.request", { email: form?.callingCode +form?.phone })}</Text>
        <CodeField
          ref={ref}
          // {...layout}
          caretHidden={true}
          value={value}
          onChangeText={(code)=>setValue(code)}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          returnKeyType="done"
          textContentType="oneTimeCode"
          onSubmitEditing={onSubmitEditing}
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <View style={styles.timer}>
          <Text style={styles.timerTxt}>{t('auth.timerTxt')}</Text>
          <Text style={styles.counter}>
            {countDown} {t('auth.sec')}
          </Text>
        </View>

        <View style={styles.alreadyView}>
          <Text style={styles.alreadyText}>{t("auth.dontReceiveEmail")}</Text>
          <TouchableOpacity disabled={countDown != 0} onPress={resendCodeAction}>
            <Text style={styles.loginText}>{t("auth.resendCode")}</Text>
          </TouchableOpacity>

          {OPTVerificationLoading ||verifyOtpCodeLoading? (
            <ActivityIndicator style={{ marginLeft: ScaleWidth(5) }} color={Colors.darkBlue} size="small" />
          ) : null}
        </View>

        {signupLoading ? (
          <ActivityIndicator style={{ marginTop: ScaleHeight(30), alignSelf: 'center' }} color={Colors.darkBlue} size="large" />
        ) : null}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default VerificationCode;
