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
        fontSize: ScaleWidth(14),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(7)

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
    description: {
        fontSize: ScaleWidth(8),
        fontFamily: Fonts.light,
        color: Colors.gray,
        marginLeft: ScaleWidth(7),
        marginTop: ScaleWidth(5),
        marginBottom: ScaleWidth(10),
        marginRight: ScaleWidth(70)
    },
    dollarSign:{
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(7),
        fontFamily:  Fonts.medium,
        fontSize: ScaleWidth(13),
    },
    price: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginTop: ScaleWidth(5),

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
        marginLeft: ScaleWidth(7),

    },
    motocycle: {
        width: ScaleWidth(20),
        height: ScaleWidth(20),
    },
    alarm: {
        width: ScaleWidth(12),
        height: ScaleWidth(12),
        marginLeft: ScaleWidth(15),

    },
    favoriteButton: {
        height: ScaleWidth(20),
        width: ScaleWidth(20),
        borderRadius: ScaleWidth(10),
        backgroundColor: Colors.white,
        position: 'absolute',
        top: ScaleHeight(0),
        right: ScaleWidth(70),
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
    },
})

export default styles