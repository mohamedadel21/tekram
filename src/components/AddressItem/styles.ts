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
        flex:1,
        textAlign:'left'
    },
    phone: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.light,
        color: Colors.gray,
        marginLeft: ScaleWidth(10),
        flex:1,
        marginTop:ScaleHeight(5),
        textAlign:'left'
    },
    addressInfo: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.light,
        color: Colors.gray,
        marginLeft: ScaleWidth(10),
        flex:1,
        textAlign:'left'
    },
    edit: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
    },
    icon: {
    marginRight: ScaleWidth(10)
    },
})

export default styles