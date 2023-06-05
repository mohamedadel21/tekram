import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../../common/foundation";

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        height: ScaleHeight(200)
    },
    backButton: {
        height: ScaleWidth(36),
        width: ScaleWidth(36),
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .5,
        elevation: 5,
        backgroundColor: Colors.white,
        borderRadius: ScaleWidth(10),
        marginTop: ScaleHeight(35),
        marginLeft: ScaleWidth(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    discount: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginRight: ScaleWidth(10)

    },
    discountButton: {
        height: ScaleWidth(24),
        paddingHorizontal: ScaleWidth(5),
        borderTopLeftRadius: ScaleWidth(8),
        borderBottomLeftRadius: ScaleWidth(8),
        backgroundColor: Colors.primary,
        position: 'absolute',
        bottom: ScaleHeight(10),
        right: ScaleWidth(0),
        alignItems: "center",
        justifyContent: "center",
    }
})

export default styles