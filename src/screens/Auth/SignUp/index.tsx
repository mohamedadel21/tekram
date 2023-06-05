import React, { useEffect, useReducer, useState ,useRef} from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import styles from "./style";
import IMAGES from "../../../common/images";
import AuthHeader from "../../../components/Headers/AuthHeader";
import Input from "../../../components/Input";
import PhoneInput from "../../../components/PhoneInput";
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, validateName, validateNumber, validatePhone } from "../../../common/validation";
import AppButton from "../../../components/AppButton";
import { OTPVerificationNumber } from "../../../redux/actions/AuthAction";
import { useSelector, useDispatch } from 'react-redux';
import { Colors, ScaleHeight, ScaleWidth } from "../../../common/foundation";
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CountriesPhoneNumberLength from '../../../common/CountriesPhoneNumberLength'
import { GetRegionsAction } from "../../../redux/actions/AddressesAction";
import RBSheet from "react-native-raw-bottom-sheet";


const reducer = (state: any, { key, value }: { key: any; value: any }) => {
  return { ...state, [key]: value };
};

const SignupScreen = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const RBSheetRef = useRef();
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const {
    OPTVerificationData,
    OPTVerificationLoading,

  } = useSelector(
    state => state.AuthReducer,
  );

  const { 
    regionsData,
    regionsLoading,
  } = useSelector(
    state => state.AddressesReducer,
  );

  const initailFormState = {
    isPassword: true,
    isConfirmPassword: true,
    buttonDisabled: true,
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    phoneCode: "LB",
    selectedLength: [7, 8],
    region: null,
    area: null,
    List_Area: [],
    sheetType: "",
    sheetTitle: "",
    callingCode:"+961"
  };
  const [form, updateForm] = useReducer(reducer, initailFormState);

  useEffect(()=>{
    dispatch(GetRegionsAction())
  },[])
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
      value:
        !validateName(form?.fullName) ||
          (String(form?.email).length>0?!validateEmail(String(form?.email).trim()):false) ||
          !validateNumber(form?.phone) ||
          !(form?.phone) ||
          form?.selectedLength?.length == 2 ? !(String(form?.phone).length >= form?.selectedLength[0] && String(form?.phone).length <= form?.selectedLength[1]) : String(form?.phone).length != form?.selectedLength
          ||
          String(form?.password).trim().replace(" ","").length < 8 ||
          String(form?.password).trim().replace(" ","") != String(form?.confirmPassword ).trim().replace(" ","")

    });


  }, [form?.fullName, form?.email, form?.password, form?.phone,form?.phoneCode, form?.confirmPassword, acceptPolicy,form?.selectedLength]);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (form?.sheetType == "region") {
            updateForm({ key: "region", value: item });
            updateForm({ key: "List_Area", value: item?.List_Area });


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

  const onChangeTextEmail = (value: any) => {
    updateForm({ key: "email", value: value });

    validate(
      !validateEmail(String(value).trim()),
      "emailError",
      t("auth.validateEmail")
    );
  };
  const onChangeTextPassword = (value: any) => {
    updateForm({ key: "password", value: String(value).trim().replace(" ","") });

    validate(
      String(value).trim().replace(" ","").length < 8,
      "passwordError",
      t("auth.validatePassword")
    );
  };

  const onChangeTextconfirmPassword = (value: any) => {
    updateForm({ key: "confirmPassword", value: String(value).trim().replace(" ","") });

    validate(
      String(value).trim().replace(" ","").length < 8 || String(form?.password).trim().replace(" ","") != String(value).trim().replace(" ",""),
      "confirmPasswordError",
      t("auth.passwordDoesNotMatch")
    );
  };



  const isPasswordOnPress = () => {
    updateForm({ key: "isPassword", value: !form?.isPassword });
  };
  const isConfirmPasswordOnPress = () => {
    updateForm({ key: "isConfirmPassword", value: !form?.isConfirmPassword });
  };

  const onChangeTextPhone = (value: any) => {
    updateForm({ key: "phone", value: value });
    validate(!validateNumber(value) || form?.selectedLength?.length == 2 ? !(String(value).length >= form?.selectedLength[0] && String(value).length <= form?.selectedLength[1]) : String(value).length != form?.selectedLength, "phoneError", t("auth.validatePhone"));
  };

  const goToLogin = () => {
    props.navigation.navigate("Login");
  };

  const signupAction = () => {
    dispatch(OTPVerificationNumber(form?.phone,form?.callingCode, form?.fullName, false, (data: any) => {
      if (data?.i_Result == true) {
        props.navigation.navigate("VerificationCode", { form: form, screenFrom: "signup" });

      } else {
        Alert.alert("", data?.Exception_Message)
      }
    }))
  };
  const onChangeCode = (value: any) => {    
    updateForm({ key: "phoneCode", value: value.cca2 });
    updateForm({ key: "callingCode", value: "+"+value.callingCode[0] });

    
  };

  

  return (
    <View style={styles.container}>
      <AuthHeader navigation={props.navigation} title={t("auth.signup")} />
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
          autoCapitalize='none'
          onChangeText={onChangeTextName}
        />
        <Input
          value={form?.email}
          mainStyle={styles.email}
          placeholder={t("auth.yourEmail")}
          title={t("auth.email")}
          error={form?.emailError}
          onChangeText={onChangeTextEmail}
          keyboardType="email-address"
          autoCapitalize='none'
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
          onChangeText={onChangeTextPassword}
        />

        <Input
          value={form?.confirmPassword}
          isPassword={true}
          isPasswordOnPress={isConfirmPasswordOnPress}
          mainStyle={styles.email}
          placeholder={t("auth.ConfirmPassword")}
          title={t("auth.ConfirmPassword")}
          secureTextEntry={form?.isConfirmPassword}
          error={form?.confirmPasswordError}
          onChangeText={onChangeTextconfirmPassword}
        />

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
   

        <View
          style={styles.agreeOnTermsView}
        >
          <CheckBox

            value={acceptPolicy}
            onValueChange={newValue => setAcceptPolicy(newValue)}
            tintColors={{ true: Colors.darkBlue, false: Colors.gray }}
            boxType="square"
            lineWidth={1}
            style={styles.CheckBox}
          />
          <Text style={styles.agreeOnTerms}>
            By clicking Sign up , you accept the {""}

            <Text
              onPress={async () => {
                props.navigation.navigate("TermsAndPolicy", { type: "terms" })
              }}
              style={styles.terms}
            >
              Terms and Conditions {""}
            </Text>
            and {""}
            <Text
              onPress={async () => {
                props.navigation.navigate("TermsAndPolicy", { type: "privacy" })
              }}
              style={styles.policy}
            >
              Privacy Policy
            </Text>
          </Text>
        </View>


        <AppButton
          style={styles.signupButton}
          textStyle={styles.signupText}
          title={t("auth.SIGNUP")}
          disabled={OPTVerificationLoading || form?.buttonDisabled||!acceptPolicy}
          onPress={signupAction}
          loading={OPTVerificationLoading}
        />

        <View style={styles.alreadyView}>
          <Text style={styles.alreadyText}>{t("auth.alreadyHaveAccount")}</Text>
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginText}>{t("auth.login")}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: ScaleHeight(50) }} />
        {/*<View style={styles.seperatorView}>
          <Text style={styles.signupWith}>
            {" " + t("auth.signupWith") + " "}
          </Text>
        </View>

        <View style={styles.row}>
          <AppButton
            style={styles.signupButtonFB}
            textStyle={styles.signupText}
            title={"  " + t("auth.facebook")}
          >
            <Image resizeMode="contain" source={IMAGES.facebook} />
          </AppButton>
          <AppButton
            style={styles.signupButtonGoogle}
            textStyle={styles.signupText}
            title={"  " + t("auth.google")}
          >
            <Image resizeMode="contain" source={IMAGES.google} />
          </AppButton>
        </View>*/}
      </KeyboardAwareScrollView>

      <RBSheet
        ref={RBSheetRef}
        height={ScaleHeight(350)}
        openDuration={250}
        customStyles={{
          container: styles.depositContainer,
        }}

      >
        <Text style={styles.RBSheetRefTitle}>{t("auth.choose") + form?.sheetTitle} </Text>
        {form?.sheetType == "region" ?
          <FlatList
            data={regionsData}
            renderItem={renderItem}
            keyExtractor={(item, index) => JSON.stringify(item)}
          />
          : <FlatList
            data={form?.List_Area}
            renderItem={renderItem}
            keyExtractor={(item, index) => JSON.stringify(item)}
          />}
      </RBSheet>
    </View>
  );
};

export default SignupScreen;
