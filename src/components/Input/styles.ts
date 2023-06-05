import { StyleSheet, I18nManager } from 'react-native';
import { Colors, ScaleWidth, ScaleHeight, width, Fonts } from '../../common/foundation';

export default StyleSheet.create({
  input: {
    flex: 1,
    color: Colors.darkBlue,
    textAlign: I18nManager.isRTL ? "right" : 'left',
    height: ScaleHeight(40),
    fontFamily: Fonts.regular,
    fontSize:ScaleWidth(13)

    
  },
  mainContainer: {
    width: width - ScaleWidth(50),
    alignSelf:'center'
  },
  subContainer: {
    width: width - ScaleWidth(50),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: ScaleWidth(10),
    borderWidth: ScaleWidth(1),
    borderColor: Colors.inputBackground,
    paddingHorizontal: ScaleWidth(10)
  },
  placeholder:{
    flex: 1,
    color: Colors.placeHolder,
    lineHeight: ScaleHeight(40),
    fontFamily: Fonts.regular,
    fontSize:ScaleWidth(12),
    marginLeft:ScaleWidth(6)
  },
  title: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    marginLeft: ScaleHeight(2),
    marginBottom: ScaleHeight(6),
    fontSize:ScaleWidth(13)

  }, error: {
    fontFamily: Fonts.regular,
    color: Colors.denger,
    marginTop: ScaleHeight(5),
    marginLeft: ScaleHeight(5),
    fontSize:ScaleWidth(10)
  },
  eyeIcon:{
    marginLeft:ScaleWidth(5),
    height: ScaleHeight(40),
    width: ScaleHeight(40),
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:Colors.white


  }

});
