import { StyleSheet } from 'react-native';
import {
  Colors,
  height,
  Spacings,
  Fonts,
  width,
  ScaleWidth,
  ScaleHeight,
} from '../../common/foundation';

export default StyleSheet.create({
  inputContainer: {
    width: width - ScaleWidth(50),
    marginTop: Spacings.hSpace8,
    alignSelf: 'center'
  },
  label: {
    marginBottom: Spacings.wSpace9,
    textAlign: 'left',
    fontFamily: Fonts.regular,
    color:Colors.gray

  },
  phoneInputWrapper: {
    width: '100%',
    height: ScaleHeight(40),
    marginTop: ScaleHeight(5),
    backgroundColor: Colors.white,

  },
  error: {
    fontFamily: Fonts.regular,
    color: Colors.denger,
    marginTop: ScaleHeight(5),
    marginLeft: ScaleHeight(5),
    fontSize:ScaleWidth(10)
  },
  textinputStyle: {
    padding: 0,
    margin: 0,
    height: ScaleHeight(40),
    fontFamily: Fonts.regular,
    color:Colors.darkBlue,
    fontSize:ScaleWidth(13)
  },
  pickerStyle: {
    borderWidth: ScaleWidth(1),
    borderColor: Colors.darkBlue,
    backgroundColor: Colors.white,
    borderTopLeftRadius: ScaleWidth(10),
    borderBottomLeftRadius: ScaleWidth(10),
  },
});
