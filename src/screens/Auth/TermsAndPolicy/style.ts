import { StyleSheet } from 'react-native';
import { Colors, ScaleHeight, ScaleWidth, width, Fonts } from '../../../common/foundation';

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
    marginTop: ScaleHeight(25)
  },
  alreadyText: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    fontSize: ScaleWidth(13)
  },
  loginText: {
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
    fontSize: ScaleWidth(13),
    marginLeft: ScaleWidth(5)
  },
  seperatorView: {
    width: width - ScaleWidth(65),
    borderTopWidth: ScaleWidth(1),
    borderColor: Colors.placeHolder,
    marginTop: ScaleHeight(40),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },
  signupWith: {
    fontFamily: Fonts.regular,
    color: Colors.text3,
    fontSize: ScaleWidth(13),
    position: 'absolute',
    backgroundColor: Colors.white,

  },
  signupButtonFB: {
    width: (width - ScaleWidth(50)) / 2,
    height: ScaleHeight(50),
    backgroundColor: Colors.white,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
  },
  signupButtonGoogle: {
    width: (width - ScaleWidth(50)) / 2,
    height: ScaleHeight(50),
    backgroundColor: Colors.white,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
    marginLeft: ScaleWidth(10)
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ScaleHeight(40),
    width: "100%",
    marginBottom: ScaleHeight(30)

  },
  policy: {
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13),
    marginRight: ScaleWidth(30),
    color: Colors.darkBlue,
  },
  terms: {
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13),
    marginRight: ScaleWidth(30),
    color: Colors.darkBlue,
  },
  agreeOnTerms: {
    fontFamily: Fonts.regular,
    fontSize: ScaleWidth(12),
    marginRight: ScaleWidth(80),
    color: Colors.black,
    textAlign: "left",
    marginLeft:ScaleWidth(10)
  },
  agreeOnTermsView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: ScaleHeight(15),
    width,
    paddingLeft: ScaleWidth(15)
  },
  CheckBox: { marginLeft: ScaleWidth(15) },
});
