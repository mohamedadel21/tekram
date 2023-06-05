import React, { useState } from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors, ScaleWidth, } from "../../common/foundation";

const RecentSearchItem = ({
    name,
    style,
    onPress,
    onDelete,
    deleteIcon
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container,style]}>
            <Text style={styles.name}>{name}</Text>
            {deleteIcon ? (
                <TouchableOpacity onPress={onDelete}>
                <AntDesign name='close' color={Colors.darkBlue} size={ScaleWidth(13)} style={styles.close}/>
            </TouchableOpacity>
                ) : null}
        </TouchableOpacity>
    )
}

export default RecentSearchItem;
