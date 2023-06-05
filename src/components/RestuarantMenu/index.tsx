import React from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import IMAGES from "../../common/images";
import styles from "./styles";

const RestuarantMenu = ({
    imageUrl,
    name,
    price,
    style,
    imageStyle,
    onPress,
    description,
    currency,
    discountedPrice,
    isDiscounted
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
            <Text style={styles.dollarSign}>
                <Text style={[styles.price, isDiscounted ? { textDecorationLine: 'line-through' } : null]}>{currency} {parseFloat(price)?.toLocaleString()}</Text>{"  "}
                {isDiscounted ? <Text style={styles.discountedPrice}>{currency} {parseFloat(discountedPrice)?.toLocaleString()}</Text> : null}
            </Text>
        </View>

    </TouchableOpacity>
);

export default RestuarantMenu;
