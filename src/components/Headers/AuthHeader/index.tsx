import React from "react";
import {Text,View, SafeAreaView, I18nManager,TouchableOpacity } from "react-native";
import { Colors, ScaleWidth } from "../../../common/foundation";
import styles from "./styles";
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const AuthHeader = ({  navigation,title, style, }) => {

  const onPress=()=>{
    navigation.goBack()
  }
  return (
    <SafeAreaView
      style={[styles.container, style]}
    >
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <EvilIcons
            name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
            size={ScaleWidth(25)}
            color={Colors.black}
          />
      </TouchableOpacity>

      <Text style={styles.txt}>
        {title}
      </Text>

     
    </SafeAreaView>
  );
};

export default AuthHeader;
