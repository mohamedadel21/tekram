import { Colors, Fonts, ScaleHeight, ScaleWidth, Spacings } from '../../../common/foundation';
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
    color: Colors.gray,
    marginHorizontal: ScaleWidth(30),
    marginLeft: ScaleWidth(20),
  },
  codeFieldRoot: {
    marginTop: ScaleHeight(30),
    marginLeft: ScaleWidth(20),
    margin: ScaleWidth(25)
  },
  timerTxt:{

    fontFamily: Fonts.light,
    color: Colors.gray,
    fontSize: ScaleWidth(12)
  },

  cell: {
    width: ScaleWidth(45),
    height: ScaleHeight(45),
    lineHeight: ScaleHeight(40),
    fontSize: ScaleWidth(24),
    borderWidth: ScaleWidth(1),
    borderColor: Colors.inputBackground,
    textAlign: 'center',
    borderRadius: ScaleWidth(10),
    color: Colors.darkBlue,
    fontFamily: Fonts.regular,

  },
  focusCell: {
    borderColor: Colors.primary,

  },
  counter: {
    color: Colors.darkBlue,
    marginLeft:ScaleWidth(3),
    fontSize: ScaleWidth(12),
    fontFamily:Fonts.light

  },
  alreadyView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: ScaleHeight(7)
  },
  timer:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: ScaleHeight(20)
  },
  alreadyText: {
    fontFamily: Fonts.light,
    color: Colors.darkBlue,
    fontSize: ScaleWidth(13)
  },
  loginText: {
    fontFamily: Fonts.medium,
    color: Colors.darkBlue,
    fontSize: ScaleWidth(13),
    marginLeft: ScaleWidth(5),
    lineHeight: ScaleHeight(18),
    textDecorationLine: 'underline'
  },
})
export default styles;