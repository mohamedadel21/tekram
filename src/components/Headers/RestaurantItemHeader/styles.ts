import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../../common/foundation";

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: Colors.inputBackground,
        flexDirection: 'row',
        
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
        marginLeft: ScaleWidth(20),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',      
        left: 0,
        right: 0,
        
        
      },
    title:{
        marginLeft: ScaleWidth(20),
        color:Colors.darkBlue,
        fontFamily:Fonts.bold,
        fontSize:ScaleWidth(15),
        lineHeight: ScaleWidth(36),
        textAlign:'center'

    },
    discount: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        textAlign:'center'

    },deliveryTimeType:{
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.regular,
        color: Colors.gray,
        textAlign:'center'
    },
    discountButton: {
        height: ScaleWidth(40),
        paddingHorizontal: ScaleWidth(10),
        borderRadius: ScaleWidth(8),
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: ScaleHeight(-20),
        right: ScaleWidth(15),
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .5,
        elevation: 5,
    }
})

export default styles