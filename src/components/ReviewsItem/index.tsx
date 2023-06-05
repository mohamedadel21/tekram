import React from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import styles from "./styles";
import { Colors, Fonts, ScaleHeight, ScaleWidth } from "../../common/foundation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IMAGES from "../../common/images";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-popup-menu';

const MyReviewsItems = ({
    imageUrl,
    name,
    style,
    imageStyle,
    onPress,
    date,
    reviews,
    rate,
    onDelete,
    onEdit
}) => (

    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
        <View style={styles.review}>
            <View style={styles.review}>
                <View>
                    <Image
                        source={imageUrl?{ uri: imageUrl }:IMAGES.default} // no images from backend yet
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

            {<Menu>
                <MenuTrigger text={<Ionicons
                    name="ellipsis-vertical"
                    size={ScaleWidth(18)}
                    color={Colors.gray}
                    style={styles.icon}
                />} />
                <MenuOptions optionsContainerStyle={{ width: ScaleWidth(80), borderRadius: ScaleWidth(10) }}>
                    <MenuOption style={{ height: ScaleHeight(30), justifyContent: 'center', alignItems: 'center', }} onSelect={onDelete}  >
                        <View style={styles.row}>
                            <EvilIcons name='trash' size={ScaleWidth(17)} color={Colors.darkBlue} />
                            <Text style={{ color: Colors.darkBlue, fontFamily: Fonts.regular, fontSize: ScaleWidth(12),marginLeft:ScaleWidth(3) }}>Delete</Text>
                        </View>
                    </MenuOption>

                </MenuOptions>
            </Menu>}

        </View>
        <Text style={styles.description}>
            {reviews}
        </Text>

    </TouchableOpacity>

);

export default MyReviewsItems;
