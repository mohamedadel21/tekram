import React, { useEffect, useReducer, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import styles from "./style";
import IMAGES from "../../../common/images";
import HomeHeader from "../../../components/Headers/HomeHeader";
import Input from "../../../components/Input";
import PhoneInput from "../../../components/PhoneInput";
import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, validateName, validateNumber, validatePhone } from "../../../common/validation";
import AppButton from "../../../components/AppButton";
import { OTPVerificationEmail } from "../../../redux/actions/AuthAction";
import { useSelector, useDispatch } from 'react-redux';
import { Colors, ScaleWidth } from "../../../common/foundation";
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Markdown from 'react-native-markdown-display';
import Privacy_policy from '../../../assets/files/Privacy_policy';
import Terms_and_Conditions from '../../../assets/files/Terms_and_Conditions';



const TermsAndPolicy = (props: any) => {
  const { t } = useTranslation();
  const type=props.route.params.type


  return (
    <View style={styles.container}>
      <HomeHeader navigation={props.navigation}  />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding:ScaleWidth(20)}}
      >
        <Markdown>
            {type =="privacy"?Privacy_policy:Terms_and_Conditions}
          </Markdown>
       
      </KeyboardAwareScrollView>
    </View>
  );
};

export default TermsAndPolicy;
