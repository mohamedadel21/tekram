
import { StyleSheet, Text, View } from 'react-native'
import { Colors, ScaleWidth, ScaleHeight, Fonts, width } from '../../../common/foundation';




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  profilePic: {
    width: ScaleWidth(90),
    height: ScaleWidth(90),
    borderRadius: ScaleWidth(50),
    borderColor: Colors.white,
    borderWidth: ScaleWidth(6),
    alignSelf: 'center',
    marginTop: ScaleHeight(-45),
  },
  dataView: {
    alignItems: 'center',
    flexGrow:1
  },
  name: {
    fontSize: ScaleWidth(20),
    color: Colors.darkBlue,
    fontFamily: Fonts.bold
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:ScaleHeight(-30)
  },
  dotSign: {
    fontFamily: Fonts.bold,
    fontSize: ScaleWidth(45),
  },
  orderStatus: {
    fontSize: ScaleWidth(12),
    fontFamily: Fonts.regular,
  },
  starContainerStyle: {
    marginTop: ScaleHeight(15),
  },
  textAreaContainer: {
    
  },
  textArea: {
    height: ScaleHeight(150),
    justifyContent: "flex-start",
    borderColor: Colors.inputBackground,
    borderWidth: ScaleWidth(1),
    padding: ScaleHeight(20),
    width: width - ScaleWidth(50),
    borderRadius: ScaleWidth(10),
    marginTop: ScaleHeight(19),
    color:Colors.darkBlue,
    fontFamily:Fonts.regular,
    fontSize:ScaleWidth(13)
  },
  signupButton: {
    width: width - ScaleWidth(50),
    height: ScaleHeight(50),
    marginTop: ScaleHeight(20),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
  }, signupText:
  {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13)
  },
})


export default styles;