import React from "react";
import { Text, TouchableOpacity, View, I18nManager } from "react-native";
import { Colors, ScaleWidth } from "../../common/foundation";
import styles from "./styles";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from "react-i18next";


const PaymentItem = ({ onPress, number, type, expiresOn, isSelectedValue, showRadio, showEditButton,onEdit }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{number}</Text>
        <Text style={styles.phone}>{type}</Text>
        <Text style={styles.addressInfo}>{expiresOn}</Text>

      </View>

      {showRadio ?
        <Ionicons name={isSelectedValue ? 'radio-button-on' : 'radio-button-off-sharp'} size={ScaleWidth(24)} color={Colors.darkBlue} />
        : null}

      {showEditButton ? <TouchableOpacity onPress={onEdit}>

        <Text style={styles.edit}>{t("profile.edit")}</Text>
      </TouchableOpacity> : null}


    </TouchableOpacity>

  );
};

export default PaymentItem;
