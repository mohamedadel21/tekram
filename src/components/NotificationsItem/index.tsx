import React from "react";
import {
    Text,
    TouchableOpacity,
} from "react-native";
import styles from "./styles";
import IMAGES from "../../common/images";

const NotificationsItem = ({
    name,
    style,
    onPress,
    date,
}) => (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>

        <Text style={styles.name}>
            {name}
        </Text>
        <Text style={styles.date}>{date}</Text>

    </TouchableOpacity>
);

export default NotificationsItem;
