import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    extras:{
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:  ScaleHeight(5),
        borderBottomWidth: ScaleWidth(1),
        borderColor: Colors.inputBackground,
        paddingVertical: ScaleHeight(13)

    },
    subTxt: {
        fontSize: ScaleWidth(13),
        fontFamily:  Fonts.regular,
        color: Colors.darkBlue,
        flex:1
    },
    currency: {
        fontSize: ScaleWidth(12),
        fontFamily: Fonts.regular,
        color: Colors.gray
    },
    subPrice: {
         fontSize: ScaleWidth(15),
        fontFamily:  Fonts.regular,
        color: Colors.darkBlue,
        marginRight:  ScaleWidth(2)
    },
    priceView:{
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})

export default styles