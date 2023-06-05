import React from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import styles from "./styles";
import { Colors, ScaleWidth } from "../../common/foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import IMAGES from "../../common/images";

const StoreItemFavourite = ({
    imageUrl,
    name,
    rating,
    time,
    style,
    imageStyle,
    onPress,
    description,
    isFavorite,
    onPressFavourite
}) => (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
        <Image
            source={imageUrl ? { uri: imageUrl } : IMAGES.default} // no images from backend yet
            resizeMode="cover"
            style={[styles.image, imageStyle]}
            defaultSource={IMAGES.default}
        />

        <View style={styles.productView}>
            <Text style={styles.name} numberOfLines={1}>
                {name}
            </Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.row}>
                <AntDesign
                    name={"star"}
                    size={ScaleWidth(12)}
                    color={Colors.primary}
                />
                <Text style={styles.deliveryText}>{rating}</Text>
                <Image source={IMAGES.alarm} style={styles.alarm} resizeMode="contain" />
                <Text style={styles.deliveryText}>{time}</Text>
            </View>
        </View>

        <TouchableOpacity onPress={onPressFavourite} style={styles.favoriteButton}>
            <AntDesign
                name={isFavorite ? "heart" : "hearto"}
                size={ScaleWidth(15)}
                color={isFavorite ? Colors.darkBlue : Colors.text}
            />
        </TouchableOpacity>

    </TouchableOpacity>
);

export default StoreItemFavourite;
