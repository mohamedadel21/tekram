import React from "react";
import { Text, View, SafeAreaView, I18nManager, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { Colors, ScaleWidth } from "../../../common/foundation";
import styles from "./styles";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IMAGES from "../../../common/images";

const RatingHeader = ({
  navigation,
  isDiscount,
  discount,
  style,
  imageUrl
}) => {

  const onPress = () => {
    navigation.goBack()
  }
  return (

    <ImageBackground
      style={[styles.container, style]}
      source={imageUrl?{ uri: imageUrl }:IMAGES.default}
      resizeMode='cover'
      defaultSource={IMAGES.default}
    >
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <EvilIcons
          name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
          size={ScaleWidth(25)}
          color={Colors.black}
        />
      </TouchableOpacity>

    </ImageBackground>
  );
};

export default RatingHeader;
