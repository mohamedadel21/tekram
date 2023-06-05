import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    container: {

        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    title: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.bold,
        color: Colors.darkBlue,
        marginTop: ScaleWidth(20),
    },
    description: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.gray,
        marginTop: ScaleWidth(20),
    },
    image: {
        width: ScaleWidth(100),
        height: ScaleWidth(100)
    },

})

export default styles