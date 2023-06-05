import React ,{useState,useEffect}from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  ImageBackground
} from "react-native";
import { Colors, ScaleWidth } from "../../common/foundation";
import IMAGES from "../../common/images";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-community/async-storage';

const RestuarantItem = ({
  imageUrl,
  name,
  isFavorite,
  rating,
  ratingCount,
  isDiscount,
  discount,
  categories,
  style,
  imageStyle,
  deliveryFee,
  deliveryTime,
  onPress,
  onpressFavourite,
  navigation
}) => {
  
  const [loggedIn, setLoggedIn] = useState();

  useEffect(()=>{
    checkAuthStatus()
  },[])
  const checkAuthStatus = async () => {
    const loggedInStatus = await AsyncStorage.getItem('loggedIn');
    setLoggedIn(loggedInStatus)
  }
  return(
  <TouchableOpacity style={[styles.container,style]} onPress={onPress}>
    <ImageBackground
      imageStyle={styles.imageStyle}
      source={imageUrl?{ uri: imageUrl }:IMAGES.default} // no images from backend yet
      resizeMode='cover'
      style={[styles.image,imageStyle]}
      defaultSource={IMAGES.default}
    >
      <TouchableOpacity onPress={()=>{
        if (loggedIn) {
          onpressFavourite()
        }else{
          navigation.navigate("SignUp")
        }
        }} style={styles.favoriteButton}>
        <AntDesign
          name={isFavorite ? "heart" : "hearto"}
          size={ScaleWidth(17)}
          color={isFavorite ? Colors.darkBlue : Colors.text}
        />
      </TouchableOpacity>

      <View style={styles.ratingButton}>
        <Text style={styles.rating}>{parseFloat(rating).toFixed(1)}</Text>
        <AntDesign
          name={"star"}
          size={ScaleWidth(13)}
          color={Colors.secondary}
        />
        <Text style={styles.ratingCount}>{"(" + ratingCount + ")"}</Text>
      </View>
      {isDiscount ? (
        <View style={styles.discountButton}>
          <Text style={styles.discount}>{discount}</Text>
        </View>
      ) : null}
    </ImageBackground>

    <Text style={styles.name} numberOfLines={1}>
      {name}
    </Text>
    <Text style={styles.categories}>{categories}</Text>
    <View style={styles.row}>
      <Image
        source={IMAGES.motocycle}
        style={styles.motocycle}
        resizeMode="contain"
      />
      <Text style={styles.deliveryText}>{deliveryFee}</Text>
      <Image source={IMAGES.alarm} style={styles.alarm} resizeMode="contain" />
      <Text style={styles.deliveryText}>{deliveryTime}</Text>
    </View>
  </TouchableOpacity>
);
      }

export default RestuarantItem;
