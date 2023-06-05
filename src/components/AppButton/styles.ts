import { StyleSheet } from "react-native";
import { Colors ,Fonts,ScaleHeight,ScaleWidth} from "../../common/foundation";

const styles = StyleSheet.create({
    container: {

        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: ScaleWidth(10),
        flexDirection:'row'
    },
    txt: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.regular,
        color: "white"

    }
})

export default styles