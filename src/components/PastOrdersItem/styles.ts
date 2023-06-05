import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    container: {
        marginRight: ScaleWidth(10),
        backgroundColor: Colors.white,
        flexDirection: 'row',
        marginVertical: ScaleHeight(10),
        borderBottomWidth:ScaleWidth(1),
        borderColor:Colors.inputBackground,
        paddingBottom:ScaleHeight(10),
        width:"100%"

    },
    name: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
    },
    imageStyle: {
        borderTopLeftRadius: ScaleWidth(15),
        borderTopRightRadius: ScaleWidth(15)
        
    },
    productView: {
        marginLeft: ScaleWidth(10),
        flexGrow:1
        
    },
    image: {
        width:  ScaleWidth(70),
        height: ScaleHeight(68),
        borderRadius:ScaleWidth(5)
    },
    date: {
        fontSize: ScaleWidth(8),
        fontFamily: Fonts.light,
        color: Colors.gray,
        marginTop: ScaleWidth(5),
        marginBottom: ScaleWidth(10),
    },
    deliveryText: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.regular,
        color: Colors.gray,
        marginLeft: ScaleWidth(5),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        bottom: ScaleHeight(20)
    },
    dotSign:{
        fontFamily:  Fonts.bold,
        fontSize: ScaleWidth(45),
    },
    orderStatus: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.regular,
    },

   
     trackView: {
        marginRight: ScaleWidth(5),
    },
    trackButton: {
        backgroundColor: Colors.primary,
        top: ScaleHeight(10),
        borderRadius: ScaleWidth(8),
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
    },
    rate: {
        fontSize: ScaleWidth(12),
        color: Colors.darkBlue,
        fontFamily: Fonts.regular,
        padding: ScaleHeight (7),
        alignItems: 'center'
    },
    orderCode: {
        fontSize: ScaleWidth(11),
        color: Colors.darkBlue,
        fontFamily: Fonts.bold,
        alignItems: 'center'
    },
    dot: { width: ScaleWidth(6), height: ScaleWidth(6), borderRadius: ScaleWidth(4), backgroundColor: Colors.black }

})

export default styles