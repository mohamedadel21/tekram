import React from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import styles from "./styles";
import { Colors, ScaleWidth } from "../../common/foundation";
import IMAGES from "../../common/images";
import { useTranslation } from "react-i18next";

const PastOrdersItem = ({
    imageUrl,
    name,
    status,
    style,
    imageStyle,
    onPress,
    orderCode,
    rate,
    items,
    rateAction
}) => {
    const { t } = useTranslation()
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Image
                source={imageUrl ? { uri: imageUrl } : IMAGES.default} // no images from backend yet
                resizeMode="contain"
                style={[styles.image, imageStyle]}
                defaultSource={IMAGES.default}
            />

            <View style={styles.productView}>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={styles.date}>{items}</Text>
                <Text style={[styles.deliveryText, {
                    color: (status == 14 && Colors.darkBlue ||
                        status == 15 && Colors.orange ||
                        status == 16 && Colors.orange ||
                        status == 17 && Colors.orange ||
                        status == 18 && Colors.orange ||
                        status == 19 && Colors.success ||
                        status == 20 && Colors.success ||
                        status == 21 && Colors.success ||
                        status == 22 && Colors.denger)
                }]}><View style={[styles.dot, {
                    backgroundColor: (status == 14 && Colors.darkBlue ||
                        status == 15 && Colors.orange ||
                        status == 16 && Colors.orange ||
                        status == 17 && Colors.orange ||
                        status == 18 && Colors.orange ||
                        status == 19 && Colors.success ||
                        status == 20 && Colors.success ||
                        status == 21 && Colors.success ||
                        status == 22 && Colors.denger)
                }]} /> {
                        status == 14 && t("orders.Pending") ||
                        status == 15 && t("orders.Scheduled") ||
                        status == 16 && t("orders.Accepted") ||
                        status == 17 && t("orders.Prepairing") ||
                        status == 18 && t("orders.Picked") ||
                        status == 19 && t("orders.On_the_way") ||
                        status == 20 && t("orders.Reached_location") ||
                        status == 21 && t("orders.Delivered") ||
                        status == 22 && t("orders.Canceled")
                    }</Text>
            </View>


            <View style={styles.trackView}>
                <Text style={styles.orderCode}>{orderCode}</Text>
                {status == 21 ? <TouchableOpacity onPress={rateAction} style={styles.trackButton}>
                    <Text style={styles.rate} >{rate}</Text>
                </TouchableOpacity> : null}
            </View>

        </TouchableOpacity>
    )
}

export default PastOrdersItem;
