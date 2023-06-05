import React, { useState } from "react";
import { Text, TouchableOpacity, View, I18nManager } from "react-native";
import { Colors, ScaleWidth } from "../../common/foundation";
import styles from "./styles";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from "react-i18next";


const PaymentItems = ({ 
  onPress, 
  name, 
  phone, 
  addressInfo, 
  showRadio, 
  showEditButton,
  onEdit,
  choose,
  isSelected
 }) => {
  const { t } = useTranslation();
    const [isSelectedValue, setIsSelectedValue] = useState(isSelected);

    const onPressHandler = () => {
        onPress()
        setIsSelectedValue(!isSelectedValue)
    }


  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
       {phone? <Text style={styles.phone}>{phone}</Text>:null}
       {addressInfo? <Text style={styles.addressInfo}>{addressInfo}</Text>:null}

      </View>

      {showRadio ?
        <Ionicons name={isSelectedValue ? 'radio-button-on' : 'radio-button-off-sharp'} size={ScaleWidth(24)} color={Colors.darkBlue} />
        : null}

          {showEditButton ? <TouchableOpacity onPress={onEdit}>
          {choose ? (
            <TouchableOpacity style={styles.icon} onPress={onPressHandler}>
                    <Ionicons name={isSelectedValue ? 'radio-button-on' : 'radio-button-off-sharp'} size={ScaleWidth(27)} color={Colors.darkBlue} />
                </TouchableOpacity>
        ): (
          <Text style={styles.edit}>{t("profile.edit")}</Text>
          )}
          </TouchableOpacity> : null}


    </TouchableOpacity>

  );
};

export default PaymentItems;
