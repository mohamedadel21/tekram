import React from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import styles from "./styles";
import { Colors, ScaleWidth } from "../../common/foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
import IMAGES from "../../common/images";

const SearchRestuarantItem = ({
    imageUrl,
    name,
    price,
    style,
    imageStyle,
    onPress,
    description,
    isFavorite,
    addOnPress,
    currency
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
                <Text style={styles.dollarSign}>{currency}{" "}
                    <Text style={styles.price}>{price}</Text>
                </Text>
            </View>
        </View>

        <TouchableOpacity onPress={addOnPress} style={styles.addButton}>
            <Ionicons
                name={"add"}
                size={ScaleWidth(15)}
                color={Colors.white}
            />
        </TouchableOpacity>

    </TouchableOpacity>
);

export default SearchRestuarantItem;
