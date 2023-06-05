import { StyleSheet } from 'react-native';
import { Colors, Spacings,ScaleHeight, ScaleWidth, width, Fonts } from '../../../common/foundation';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  name: {
    marginTop: ScaleHeight(30)
  }, 
  login: {
    fontSize: ScaleWidth(22),
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    marginVertical: ScaleHeight(30),
    marginLeft: ScaleWidth(20),
    alignSelf:'flex-start',
    flexGrow:1
},
search:{
  marginVertical: ScaleHeight(20)

},
skipButton:{
  marginVertical: ScaleHeight(35),
  marginRight: ScaleWidth(20),
},
skip: {
  fontSize: ScaleWidth(14),
  fontFamily: Fonts.regular,
  color: Colors.darkBlue,
  textDecorationLine:'underline'
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
  },
  signupText:
  {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13)
  },
  alreadyView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop:ScaleHeight(20)
  },
  alreadyText:{
    fontFamily:Fonts.regular,
    color:Colors.gray,
    fontSize:ScaleWidth(13)
  },
  loginText:{
    fontFamily:Fonts.regular,
    color:Colors.darkBlue,
    fontSize:ScaleWidth(13),
    marginLeft:ScaleWidth(5)
  },
  seperatorView:{
    width:width-ScaleWidth(65),
    borderTopWidth:ScaleWidth(1),
    borderColor:Colors.placeHolder,
    marginTop: ScaleHeight(40),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },
  signupWith:{
    fontFamily:Fonts.regular,
    color:Colors.text3,
    fontSize:ScaleWidth(13),
    position: 'absolute',
    backgroundColor:Colors.white,
    
  },
  signupButtonFB:{
    width:(width-ScaleWidth(50))/2,
    height: ScaleHeight(50),
    backgroundColor:Colors.white,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
  },
  signupButtonGoogle:{
    width:(width-ScaleWidth(50))/2,
    height: ScaleHeight(50),
    backgroundColor:Colors.white,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
    marginLeft:ScaleWidth(10)
  },
  row:{
    flexDirection:'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ScaleHeight(40),
    width:"100%",
    marginBottom:ScaleHeight(30)

  },
  forgotPasswordButton:{
    marginTop: ScaleHeight(20),
    alignSelf: 'center',

  },
  forgotPasswordText:{
    fontFamily:Fonts.regular,
    color:Colors.darkBlue,
    fontSize:ScaleWidth(13),
    textDecorationLine:'underline'
  },

  RBSheetRefTitle: {
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    fontSize: ScaleWidth(13),
    alignSelf: "center",
    marginBottom: ScaleHeight(20)

  },
  mainContainer: {
    width: width - ScaleWidth(50),
    alignSelf: 'center',
    marginTop: ScaleWidth(20)
  },
  regionView: {

    height: ScaleHeight(45),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    width: "100%",
    borderBottomColor: Colors.inputBackground,
    borderBottomWidth: ScaleWidth(1)

  },
  depositContainer: {
    padding: Spacings.wSpace4,
    borderRadius: Spacings.wSpace7,
  },
  regionText: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    fontSize: ScaleWidth(13)
  },
  subContainer: {
    width: width - ScaleWidth(50),
    height: ScaleHeight(45),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: ScaleWidth(10),
    borderWidth: ScaleWidth(1),
    borderColor: Colors.inputBackground,
    paddingHorizontal: ScaleWidth(10)
  },
  placeholder: {
    flex: 1,
    color: Colors.placeHolder,
    lineHeight: ScaleHeight(40),
    fontFamily: Fonts.regular,
    fontSize: ScaleWidth(12),
    marginLeft: ScaleWidth(6)
  },
  title: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    marginLeft: ScaleHeight(2),
    marginBottom: ScaleHeight(6),
    fontSize: ScaleWidth(13)

  },
});
