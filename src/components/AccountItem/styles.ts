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
        height: ScaleWidth(40),
        paddingBottom:ScaleHeight(10),
        marginVertical:ScaleHeight(5),
        borderColor:Colors.inputBackground,
        borderBottomWidth:ScaleWidth(1)
    },
    txt: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(20),
        flex:1


    },
    image: {
        width: ScaleWidth(16),
        height: ScaleWidth(16)
    },
    currency: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.medium,
        color: Colors.darkBlue,

    }
})

export default styles