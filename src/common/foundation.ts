import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

const currentDeviceHeight = Dimensions.get('window').height;
const iPhonePlusHeight = 763;
const scalingMultiplier = currentDeviceHeight / iPhonePlusHeight;
const currentDeviceWidth = Dimensions.get('window').width;


export const Colors = {
  primary: '#FFD037',
  logoBackground: '#263c6d',
  secondary: '#f2bda9',
  primaryLight: '#fcefe9',
  darkBlue: "#003F88",
  denger: '#c70606',
  success: '#21c45a',
  orange: 'orange',
  white: '#fff',
  black: '#000',
  none: '#00000000',
  text: '#171717',
  text2: "#292929",
  text3: "#4B4949",
  inActiveText: '#646466',
  shadow: '#646466',
  placeHolder: '#B8B8BC',
  inputBackground: '#ECECEC',
  gray: '#9796A1',
  containersBakground: '#FBFBFB',
  green: '#11763D',
  transparent: 'rgba(52, 52, 52,0.4)',
};

export const Fonts = {
  regular: "Lexend-Regular",
  bold: "Lexend-Bold",
  medium: "Lexend-Medium",
  light: "Lexend-Light"
};

export const ScaleWidth = function (value: any) {
  if (typeof value === 'number') {
    return value * scalingMultiplier;
  } else {
    let valueNumber = parseFloat(value) / 100;
    return currentDeviceWidth * valueNumber;
  }
};

export const ScaleHeight = function (value: any) {
  if (typeof value === 'number') {
    return value * scalingMultiplier + (value - value * scalingMultiplier) / 4;
  } else {
    let valueNumber = parseFloat(value) / 100;
    return currentDeviceHeight * valueNumber;
  }
};

export const Spacings = {
  wSpace: Math.ceil(width * 0.12),
  wSpace1: Math.ceil(width * 0.1),
  wSpace2: Math.ceil(width * 0.08),
  wSpace3: Math.ceil(width * 0.06),
  wSpace4: Math.ceil(width * 0.04),
  wSpace5: Math.ceil(width * 0.035),
  wSpace6: Math.ceil(width * 0.03),
  wSpace7: Math.ceil(width * 0.025),
  wSpace8: Math.ceil(width * 0.02),
  wSpace9: Math.ceil(width * 0.01),
  hSpace1: Math.ceil(height * 0.1),
  hSpace2: Math.ceil(height * 0.08),
  hSpace3: Math.ceil(height * 0.06),
  hSpace4: Math.ceil(height * 0.05),
  hSpace5: Math.ceil(height * 0.04),
  hSpace6: Math.ceil(height * 0.035),
  hSpace7: Math.ceil(height * 0.03),
  hSpace8: Math.ceil(height * 0.02),
  hSpace9: Math.ceil(height * 0.01),
  hSpace10: Math.ceil(height * 0.002),
  borderWidth: Math.ceil(width * 0.002),
};

export const Typography = StyleSheet.create({
  active: {
    fontSize: ScaleWidth(11),
    fontFamily: Fonts.regular,
    color: Colors.primary,
  },
  inActive: {
    fontSize: ScaleWidth(11),
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
  },
});
