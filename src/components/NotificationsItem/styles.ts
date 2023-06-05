import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    container: {
        marginRight: ScaleWidth(10),
        backgroundColor: Colors.white,
        borderBottomWidth:ScaleWidth(1),
        borderColor:Colors.inputBackground,
        paddingVertical: ScaleHeight(13),
    },
    
    productView: {
        marginLeft: ScaleWidth(10),
    },
    name: {
        fontSize: ScaleWidth(14),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        left: ScaleWidth(7),
        marginTop: ScaleHeight(5),
        paddingRight:ScaleWidth(5)

    },
    date: {
        fontSize: ScaleWidth(9),
        fontFamily: Fonts.medium,
        color: Colors.darkBlue,
        marginTop: ScaleWidth(20),
        flex:1,
        textAlign:'right',
        paddingRight:ScaleWidth(5)
        
    },
})

export default styles