import { StyleSheet, I18nManager } from 'react-native';
import { Colors, ScaleWidth, ScaleHeight, width, Fonts } from '../../common/foundation';

export default StyleSheet.create({
  input: {
    flex: 1,
    color: Colors.darkBlue,
    textAlign: I18nManager.isRTL ? "right" : 'left',
    height: ScaleHeight(40),
    fontFamily: Fonts.regular,
    fontSize:ScaleWidth(12),
    marginLeft:ScaleWidth(6)
    
  },

  mainContainer: {
    width: width - ScaleWidth(50),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: ScaleWidth(10),
    paddingHorizontal: ScaleWidth(10),
    alignSelf:'center',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
    marginTop:ScaleHeight(10),
    height:ScaleHeight(50)

  },
  eyeIcon:{
    marginHorizontal:ScaleWidth(5)
  },
  placeholder:{
    flex: 1,
    color: Colors.placeHolder,
    lineHeight: ScaleHeight(40),
    fontFamily: Fonts.regular,
    fontSize:ScaleWidth(12),
    marginLeft:ScaleWidth(6)
  }

});
