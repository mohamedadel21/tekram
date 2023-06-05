import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from '../../../common/foundation';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
  },
  input: {
    marginTop: ScaleHeight(30)
  },
  profilePic: {
    width: ScaleWidth(100),
    height: ScaleWidth(100),
    borderRadius: ScaleWidth(50),
    borderColor: Colors.white,
    borderWidth: ScaleWidth(6),
  },
  profilePicView:{
    width: ScaleWidth(100),
    height: ScaleWidth(100),
    borderRadius: ScaleWidth(50),
    marginTop: ScaleWidth(-50),
    alignSelf:'center',
  },
  bannerView: {
    width: width,
    height: ScaleHeight(130),
    backgroundColor: Colors.primary,
  },
  flatList: {
    marginTop: ScaleHeight(10),
  },
  row: {
    marginTop: ScaleHeight(20),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  column: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: ScaleWidth(20),
  },
  text: {
    color: Colors.darkBlue,
    fontSize: ScaleWidth(13),
    fontFamily: Fonts.regular,
    marginTop: ScaleHeight(10),
  },
  icon: {
    width: ScaleWidth(20),
    height: ScaleWidth(20)
  },
  divider: {
    width: ScaleWidth(1),
    height: ScaleHeight(45),
    borderWidth: ScaleWidth(.5),
    borderColor: Colors.inputBackground

  },
  foodOrders: {
    marginTop: ScaleHeight(30),
    marginBottom: ScaleHeight(10),
    marginLeft: ScaleHeight(25),
    color: Colors.darkBlue,
    fontSize: ScaleWidth(15),
    fontFamily: Fonts.medium
  },
  more: {
    marginTop: ScaleHeight(20),
    marginBottom: ScaleHeight(10),
    marginLeft: ScaleHeight(25),
    color: Colors.darkBlue,
    fontSize: ScaleWidth(15),
    fontFamily: Fonts.medium
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ScaleHeight(40),
    marginLeft: ScaleHeight(25),


  },name: {
    marginTop: ScaleHeight(30)
  },
  email: {
    marginTop: ScaleHeight(20),
  },
  signupButton: {
    width: width - ScaleWidth(50),
    height: ScaleHeight(50),
    marginTop: ScaleHeight(20),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
    position: 'absolute',
    bottom:ScaleHeight(20),
    alignSelf:'center'
  },
  signupText:
  {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13)
  },
  cameraButton:{
    height: ScaleWidth(30),
    width: ScaleWidth(30),
    backgroundColor:Colors.white,
    borderRadius:ScaleWidth(15),
    position:'absolute',
    bottom:ScaleHeight(10),
    right:ScaleHeight(7),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPic:{
    height: ScaleWidth(15),
    width: ScaleWidth(15),
  }

})
export default styles;