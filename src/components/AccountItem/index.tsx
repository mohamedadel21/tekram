import React from "react";
import { Text, TouchableOpacity, Image, I18nManager } from "react-native";
import { Colors, ScaleWidth } from "../../common/foundation";
import styles from "./styles";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


const AccountItem = ({ onPress, title, image, isIcon, iconName,isCurrencyChange,currenncy }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {isIcon ?
        <AntDesign name={iconName} size={ScaleWidth(20)} color={Colors.darkBlue} /> :
        <Image source={image} style={styles.image} resizeMode='contain' />}
      <Text style={styles.txt}>
        {title}
      </Text>
     {isCurrencyChange?<Text style={styles.currency}>{currenncy}</Text>:<EvilIcons name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'} size={ScaleWidth(24)} style={styles.icon} />} 
    </TouchableOpacity>

  );
};

export default AccountItem;
