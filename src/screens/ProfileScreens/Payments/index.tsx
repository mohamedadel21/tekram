import React, { useState, useReducer, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  I18nManager,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import HomeHeader from "../../../components/Headers/HomeHeader";
import EmptyItem from "../../../components/EmptyItem";
import AppButton from "../../../components/AppButton";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import IMAGES from "../../../common/images";
import styles from "./styles";
import { Colors, ScaleWidth } from "../../../common/foundation";
import PaymentItem from "../../../components/PaymentItem";


const Payments = (props: any) => {
  const { t } = useTranslation();

  const renderAddressItem = ({ item, index }) => {
    return (
      <PaymentItem
        number={`item ${index}`}
        type={`Visa Card`}
        expiresOn={`${t("payment.expiresOn")}23/26`}
      />
    );
  };

  return (
    <View style={styles.container}>

      <HomeHeader
        navigation={props.navigation}
        title={t("profile.payment")}
      />


{(false) ?
         <FlatList
         style={styles.flatList}
         data={[{}, {}, {}, {}, {}]}
         renderItem={renderAddressItem}
         keyExtractor={(item, index) => JSON.stringify(index)}
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
 
       /> :
        <EmptyItem image={IMAGES.no_payments} title={t("empty.NO_PAYMENT_INFORMATION")} description={t("empty.NO_PAYMENT_INFORMATION_DESC")} />}


     

      <AppButton
        style={styles.signupButton}
        textStyle={styles.signupText}
        title={t("profile.addNew")}
        onPress={() => props.navigation.navigate("PaymentForm")}
      />

    </View>
  );
};

export default Payments;
