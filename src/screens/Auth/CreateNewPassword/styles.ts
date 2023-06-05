import { Colors, Fonts, ScaleHeight,ScaleWidth,width } from './../../../common/foundation';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'flex-start',
        
    },
    request: {
        fontFamily: Fonts.regular,
        fontSize: ScaleWidth(12),
        marginLeft:ScaleWidth(20),
        color: Colors.gray,
        maxWidth: ScaleWidth(230),
        lineHeight: ScaleHeight(18)
},
    password: {
    marginTop: ScaleHeight(30)
  },
 signupButton: {
    width: width - ScaleWidth(50),
    height: ScaleHeight(50),
    marginTop: ScaleHeight(20),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
  },
  signupText:{
    color: Colors.darkBlue,
    fontFamily: Fonts.bold,
    fontSize: ScaleWidth(13),
    
  },
})
export default styles;