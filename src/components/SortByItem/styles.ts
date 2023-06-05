import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    extras:{
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: ScaleWidth(20),
        marginTop:  ScaleHeight(5),
        borderBottomWidth: ScaleWidth(1),
        borderColor: Colors.inputBackground,
        paddingVertical: ScaleHeight(13)
    },
    subTxt: {
        fontSize: ScaleWidth(13),
        fontFamily:  Fonts.regular,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(10)
    },
    iconView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: ScaleWidth(10)
    },
    icon: {
    marginRight: ScaleWidth(10)
    },
})

export default styles