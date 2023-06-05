import React from "react";
import { Text, TouchableOpacity, Image, View ,} from "react-native";
import { Colors } from "../../common/foundation";
import IMAGES from "../../common/images";
import styles from "./styles";

const CategoryItem = ({ imageUrl, name,onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.imageView}>
      <Image
      source={imageUrl?{ uri: imageUrl }:IMAGES.defaultImage} // no images from backend yet
      resizeMode='contain'
        style={styles.image}
        defaultSource={IMAGES.defaultImage}
      />
    </View>
    <Text style={styles.txt} numberOfLines={1}>
      {name}
    </Text>
  </TouchableOpacity>
);

export default CategoryItem;
