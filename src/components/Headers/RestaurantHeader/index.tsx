import React from "react";
import { Text, View, Animated, I18nManager, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { Colors, ScaleWidth, ScaleHeight, width } from "../../../common/foundation";
import styles from "./styles";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import HomeHeader from '../HomeHeader';
import IMAGES from "../../../common/images";

const RestaurantHeader = ({
  navigation,
  isDiscount,
  deliveryTime,
  style,
  imageUrl,
  height,
  title,
  animHeaderValue,
  onLayout,
  blurRadius,
  deliveryTimeType
}) => {

  const onPress = () => {
    navigation.goBack()
  }

  const Header_Max_Height = height;
  const Header_Min_Height = ScaleHeight(50);



  const animateHeaderHeight = animHeaderValue?.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp'
  })
  return (
    <Animated.View
      style={[
        styles.header,
        {
        }

      ]}
      onLayout={onLayout}
    >
      
      <ImageBackground
        style={[styles.container, style,]}
        source={imageUrl?{ uri: imageUrl }:IMAGES.default} // no images from backend yet
        blurRadius={blurRadius}
        defaultSource={IMAGES.default}
        resizeMode='cover'

      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width, alignItems: 'flex-start', marginTop: ScaleHeight(35) }}>
          <TouchableOpacity style={styles.backButton} onPress={onPress}>
            <EvilIcons
              name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
              size={ScaleWidth(25)}
              color={Colors.black}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>

        {isDiscount ? (
          <View style={styles.discountButton}>
            <Text style={styles.discount}>{deliveryTime}</Text>
            <Text style={styles.deliveryTimeType}>{deliveryTimeType}</Text>
          </View>
        ) : null}

      </ImageBackground>
     
    </Animated.View>
  );
};

export default RestaurantHeader;
