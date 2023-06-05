import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: ScaleWidth(5),
        borderColor:Colors.darkBlue,
        borderWidth:ScaleWidth(1),
        paddingHorizontal:ScaleWidth(4),
        paddingVertical:ScaleHeight(4),
        alignSelf:'center',
        borderRadius:ScaleWidth(5)


    },
    name: {
        fontSize: ScaleWidth(12),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue
    },
    close:{marginLeft:ScaleWidth(4)}
})

export default styles