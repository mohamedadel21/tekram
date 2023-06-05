import {StyleSheet} from 'react-native';
import {Colors, ScaleHeight, ScaleWidth, width} from '../../common/foundation';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.logoBackground,
    justifyContent: 'center',
    alignItems:'center'
  },
  logo:{
    width:width-ScaleWidth(40),
  }
  
});
