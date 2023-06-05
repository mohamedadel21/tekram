import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    container: {
        marginRight: ScaleWidth(10),
        backgroundColor: Colors.white,
        flexDirection: 'row',
        marginTop: ScaleHeight(10),
        borderBottomWidth:ScaleWidth(1),
        borderColor:Colors.inputBackground,
        paddingBottom:ScaleHeight(10),

    
    },
    name: {
        fontSize: ScaleWidth(14),
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
        
    },
    image: {
        width:  ScaleWidth(70),
        height: ScaleHeight(68),
        borderRadius:ScaleWidth(5)
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
    dollarSign:{
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(7),
        fontFamily:  Fonts.medium,
        fontSize: ScaleWidth(14),
    },
    price: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginTop: ScaleWidth(5),
    },
    discountedPrice: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,

    },
    deliveryText: {

        fontSize: ScaleWidth(12),
        fontFamily: Fonts.regular,
        color: Colors.gray,
        marginLeft: ScaleWidth(5),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: ScaleWidth(7),
        marginTop: ScaleWidth(5),
        marginBottom: ScaleWidth(15),

    },
    motocycle: {
        width: ScaleWidth(20),
        height: ScaleWidth(20),
    },
    alarm: {
        width: ScaleWidth(17),
        height: ScaleWidth(17),
        marginLeft: ScaleWidth(15),

    }
})

export default styles