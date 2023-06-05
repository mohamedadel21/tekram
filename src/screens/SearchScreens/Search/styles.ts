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
  flatList: {
    marginTop: ScaleHeight(10),
    marginLeft: ScaleHeight(20),

  },
  row: {
    marginTop: ScaleHeight(10),
    marginLeft: ScaleHeight(20),
    flexWrap:'wrap',
    width:width-ScaleWidth(40),
    flexDirection:'row'

  },

  categories: {
    marginTop: ScaleHeight(25),
    marginLeft: ScaleHeight(20),
    color: Colors.darkBlue,
    fontSize: ScaleWidth(16),
    fontFamily: Fonts.bold
  },
  BrowseByCategory: {
    color: Colors.darkBlue,
    fontSize: ScaleWidth(16),
    fontFamily: Fonts.bold,
    textAlign: 'left',
    marginLeft: ScaleWidth(20)
  },

})
export default styles;