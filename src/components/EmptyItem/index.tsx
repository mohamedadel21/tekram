import React from "react";
import { Text, TouchableOpacity, Image, I18nManager, View } from "react-native";
import { Colors, ScaleWidth } from "../../common/foundation";
import styles from "./styles";


const EmptyItem = ({ title, image,imageStyle, description }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={[styles.image,imageStyle]} resizeMode='contain' />
      <Text style={styles.title}>
        {title
        }
      </Text>
      <Text style={styles.description}>
        {description
        }

      </Text>
    </View>
  );
};

export default EmptyItem;
