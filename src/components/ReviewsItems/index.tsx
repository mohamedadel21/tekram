import React from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import styles from "./styles";
import { Colors, ScaleWidth } from "../../common/foundation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import IMAGES from "../../common/images";


const ReviewsItems = ({
    imageUrl,
    name,
    style,
    imageStyle,
    onPress,
    date,
    reviews,
    rate,
}) => (
    <View style={[styles.container, style]}>
        <View style={styles.review}>
            <View style={styles.review}>
                <View>
                    <Image
                        source={imageUrl ? { uri: imageUrl } : IMAGES.default} // no images from backend yet
                        resizeMode="cover"
                        style={[styles.image, imageStyle]}
                        defaultSource={IMAGES.default}
                    />
                    <View style={styles.rateView}>
                        <Text style={styles.rate}>{rate}</Text>
                    </View>
                </View>

                <View style={styles.dataUser}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
            </View>

           
        </View>
        <Text style={styles.description}>
            {reviews}
        </Text>

    </View>
);

export default ReviewsItems;
