import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    container: {
        marginRight: ScaleWidth(10),
        backgroundColor: Colors.white,
        flexDirection: 'row',
        marginVertical: ScaleHeight(10),
        borderBottomWidth: ScaleWidth(1),
        borderColor: Colors.inputBackground,
        paddingBottom: ScaleHeight(10),
        width:"100%"


    },
    name: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(7)

    },
    imageStyle: {
        borderTopLeftRadius: ScaleWidth(15),
        borderTopRightRadius: ScaleWidth(15)

    },
    productView: {
        marginLeft: ScaleWidth(10),
        flexGrow:1
    },
    image: {
        width: ScaleWidth(70),
        height: ScaleWidth(70),
        borderRadius: ScaleWidth(5)
    },
    description: {
        fontSize: ScaleWidth(8),
        fontFamily: Fonts.light,
        color: Colors.gray,
        marginLeft: ScaleWidth(7),
        marginTop: ScaleWidth(5),
        marginBottom: ScaleWidth(10),
        marginRight: ScaleWidth(70)
    },
    dollarSign: {
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(7),
        fontFamily: Fonts.bold,
        fontSize: ScaleWidth(10),
    },
    price: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginTop: ScaleWidth(5),
    },
    deliveryText: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.regular,
        color: Colors.gray,
        marginLeft: ScaleWidth(5),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: ScaleWidth(7),
    },
    motocycle: {
        width: ScaleWidth(20),
        height: ScaleWidth(20),
    },
    alarm: {
        width: ScaleWidth(12),
        height: ScaleWidth(12),

    },
    trackView: {
        marginRight: ScaleWidth(5),
    },
    trackButton: {
        backgroundColor: Colors.primary,
        top: ScaleHeight(10),
        borderRadius: ScaleWidth(8),
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
    },
    track: {
        fontSize: ScaleWidth(12),
        color: Colors.darkBlue,
        fontFamily: Fonts.regular,
        padding: ScaleHeight(7),
        alignItems: 'center'
    },
    orderCode: {
        fontSize: ScaleWidth(11),
        color: Colors.darkBlue,
        fontFamily: Fonts.bold,
        alignItems: 'center'
    },
    dot: { width: ScaleWidth(6), height: ScaleWidth(6), borderRadius: ScaleWidth(4), backgroundColor: Colors.black }
})

export default styles