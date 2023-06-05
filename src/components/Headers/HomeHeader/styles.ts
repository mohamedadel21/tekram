import { StyleSheet } from "react-native";
import { Colors ,Fonts,ScaleHeight,ScaleWidth,width} from "../../../common/foundation";

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: Colors.white,
        flexDirection:'row'
    },
    backButton:{
        height:ScaleWidth(36),
        width:ScaleWidth(36),
        shadowOffset: {width: 2, height: 2},
        shadowColor: Colors.gray,
        shadowOpacity: .5,
        elevation: 5,
        backgroundColor:Colors.white,
        borderRadius:ScaleWidth(10),
        marginTop:ScaleHeight(20),
        marginLeft:ScaleWidth(20),
        justifyContent:'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.bold,
        color: Colors.darkBlue,
        marginVertical:ScaleHeight(27),
        textAlign:'center',
      flexGrow:1,
      paddingRight:ScaleWidth(55)
    }
})

export default styles