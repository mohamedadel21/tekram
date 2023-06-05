import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginVertical: ScaleHeight(10),
        borderColor:Colors.inputBackground,
        paddingBottom:ScaleHeight(10),
        marginTop: ScaleHeight(30),
        marginHorizontal: ScaleWidth(25),
        
    },
    review: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
  
    image: {
        width:  ScaleWidth(48),
        height: ScaleWidth(48),
        borderRadius:ScaleWidth(27)
    },
    rateView: {
        borderRadius: ScaleWidth(8),
        alignSelf: 'flex-end' ,
        backgroundColor: Colors.primary,
        bottom: ScaleHeight(25),
        left: 5,

        
    },
    rate: {
        fontSize: ScaleWidth(10),
        color: Colors.darkBlue,
        fontFamily: Fonts.regular,
        padding: ScaleHeight(3),
    },
    dataUser: {
        marginLeft: ScaleWidth(15),
        bottom: ScaleHeight(13)
    },
    name: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.medium,
        color: Colors.black,
        paddingVertical: ScaleHeight(3)
    },
    date: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.light,
        color: Colors.gray,
        
    },
    icon: {
        bottom: ScaleHeight(13)
    },
    description:{
        fontSize: ScaleWidth(13),
        color: Colors.gray,
        fontFamily: Fonts.regular
    }
})

export default styles