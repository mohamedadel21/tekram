import {StyleSheet} from 'react-native';
import {Colors, ScaleHeight, ScaleWidth, width,Fonts} from '../../common/foundation';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.white,
    alignItems:'center'
  },
  container2: {
    flex: 1,
    backgroundColor:Colors.white,
    alignItems:'center',
    justifyContent: 'center',

  },
  image:{
    width:width/3,
    height:width/3,
  },
  signupButton: {
    width: width /2,
    height: ScaleHeight(50),
    marginTop: ScaleHeight(50),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
  },
  signupText:
  {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13)
  },
  noInternet:{
    color: Colors.darkBlue,
    fontFamily: Fonts.bold,
    fontSize: ScaleWidth(20),
    marginTop:ScaleHeight(30)
  },
  noInternetDesc:{
    color: Colors.gray,
    fontFamily: Fonts.regular,
    fontSize: ScaleWidth(13),
    marginTop:ScaleHeight(20),
    textAlign:'center'
  }
});
