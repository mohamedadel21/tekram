import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../../common/foundation";

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: Colors.white,
        marginTop: ScaleHeight(40),
        marginBottom: ScaleHeight(10),
        marginHorizontal: ScaleWidth(20),
        justifyContent: 'center',
        

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
       
    },
    deliverTo: {
        fontSize: ScaleWidth(12),
        fontFamily: Fonts.light,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(5),
    },
    address: {
        fontSize: ScaleWidth(12),
        fontFamily: Fonts.medium,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(5),
        textDecorationLine:'underline',
        marginRight:ScaleWidth(100)
    },
    addLocation: {
        fontSize: ScaleWidth(12),
        fontFamily: Fonts.medium,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(5),
        marginRight:ScaleWidth(100),
    },
    image:{
        height: ScaleWidth(35),
        width: ScaleWidth(35),
        borderRadius:ScaleWidth(10)
    },
    imageButton:{
        position: 'absolute',
        right:ScaleWidth(35),
    },
    name:{
        fontSize: ScaleWidth(12),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
    }
})

export default styles