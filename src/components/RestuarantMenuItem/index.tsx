import React, { useState, useEffect } from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import styles from "./styles";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors, ScaleWidth, } from "../../common/foundation";

const RestuarantMenuItem = ({
    isSelected,
    name,
    price,
    currency,
    onPress,
    disabled
}) => {
    const [isSelectedValue, setIsSelectedValue] = useState(false);

    useEffect(() => {
        setIsSelectedValue(isSelected)
    }, [isSelected])
    const onPressHandler = () => {
        onPress()
        setIsSelectedValue(!isSelectedValue)
    }
    return (

        <TouchableOpacity disabled={disabled} style={styles.extras} onPress={onPressHandler}>
            <Text style={[styles.subTxt,{color:disabled?Colors.gray:Colors.darkBlue}]}>{name}</Text>
            <View style={styles.priceView}>
                <Text style={[styles.subPrice,{color:disabled?Colors.gray:Colors.darkBlue}]}>{price}</Text>
                <Text style={[styles.currency,{color:disabled?Colors.gray:Colors.darkBlue}]}>{currency}</Text>
                <Ionicons name={isSelectedValue ? 'radio-button-on' : 'radio-button-off-sharp'} size={ScaleWidth(24)} color={disabled?Colors.gray:Colors.darkBlue} />
            </View>
        </TouchableOpacity>
    )
}

export default RestuarantMenuItem;
