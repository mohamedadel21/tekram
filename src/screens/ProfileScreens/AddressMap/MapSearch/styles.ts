import { StyleSheet } from 'react-native';
import { Colors, height, Spacings, width, Fonts, ScaleWidth } from '../../../../common/foundation';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  depositAmountText: {
    textAlign: 'center',
    flexGrow: 1,
    fontFamily: Fonts.medium,
    fontSize:ScaleWidth(13),
    color:Colors.darkBlue


  },
  howMuch: {
    textAlign: 'left',
    color: Colors.inActiveText,
    marginVertical: Spacings.hSpace5,
    fontSize: Spacings.wSpace4
  },
  

});
