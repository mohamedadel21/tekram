import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    container: {

        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "flex-start",
        alignSelf: "center",
        borderRadius: ScaleWidth(10),
        flexDirection: 'row',
        width: width - ScaleWidth(50),
        paddingBottom:ScaleHeight(20),
        marginVertical:ScaleHeight(10),
        borderColor:Colors.inputBackground,
        borderBottomWidth:ScaleWidth(1)
    },
    name: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(10),
        flex:1


    },
    phone: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.light,
        color: Colors.gray,
        marginLeft: ScaleWidth(10),
        flex:1,
        marginTop:ScaleHeight(5)
    },
    addressInfo: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.light,
        color: Colors.gray,
        marginLeft: ScaleWidth(10),
        flex:1
    },
    edit: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
    }
})

export default styles