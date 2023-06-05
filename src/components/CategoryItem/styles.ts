import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth } from "../../common/foundation";

const styles = StyleSheet.create({
    container: {

        alignItems: "center",
        borderRadius: ScaleWidth(10),
        marginRight:ScaleWidth(10),
        padding: ScaleWidth(2),
    },
    imageView: {
        height: ScaleWidth(50),
        width: ScaleWidth(50),
        backgroundColor: Colors.white,
        borderRadius: ScaleWidth(10),
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    txt: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.medium,
        color: Colors.darkBlue,
        marginTop:ScaleWidth(5)

    },
    image: {
        width: "70%",
        height: "70%",
    }
})

export default styles