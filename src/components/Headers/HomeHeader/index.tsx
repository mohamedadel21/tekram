import React from "react";
import { Text, View, SafeAreaView, I18nManager, TouchableOpacity } from "react-native";
import { Colors, ScaleWidth } from "../../../common/foundation";
import styles from "./styles";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeHeader = ({ navigation, title, style, buttonStyle, txtStyle }) => {

  const onPress = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView
      style={[styles.container, style]}
    >
      <TouchableOpacity style={[styles.backButton, buttonStyle]} onPress={onPress}>
        <AntDesign
          name={I18nManager.isRTL ? 'right' : 'left'}
          size={ScaleWidth(13)}
          color={Colors.darkBlue}
        />
      </TouchableOpacity>

      <Text style={[styles.txt, txtStyle]}>
        {title}
      </Text>


    </SafeAreaView>
  );
};

export default HomeHeader;
