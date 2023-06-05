import React, { useState } from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import styles from "./styles";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { Colors, ScaleWidth, } from "../../common/foundation";

const SortByItem = ({
    isSelected,
    name,
    price,
    style,
    onPress,
    icon
}) => {
    const onPressHandler = () => {
        onPress()
    }
    return (

        <View style={[styles.extras, style]}>
            <View style={styles.iconView}>
                <Feather name={icon} color={Colors.darkBlue} size={ScaleWidth(19)} />
                <Text style={styles.subTxt}>{name}</Text>
            </View>

            <TouchableOpacity style={styles.icon} onPress={onPressHandler}>
                <Ionicons name={isSelected ? 'radio-button-on' : 'radio-button-off-sharp'} size={ScaleWidth(27)} color={Colors.darkBlue} />
            </TouchableOpacity>
        </View>
    )
}

export default SortByItem;
