import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from '../../../common/foundation';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',

  },
  header: {
    width: width - ScaleWidth(40),
    flexDirection: 'row'

  },
  buttonStyle:{
    width:ScaleWidth(47),
    height:ScaleHeight(47)
  },
  input: {
    width:width-ScaleWidth(95),
    marginLeft: ScaleHeight(25),
    marginTop: ScaleHeight(17),
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

  titles: {
    marginTop: ScaleHeight(25),
    marginLeft: ScaleHeight(20),
    color: Colors.darkBlue,
    fontSize: ScaleWidth(16),
    fontFamily: Fonts.medium
  },
    signupButton: {
        width: width - ScaleWidth(50),
        height: ScaleHeight(50),
        marginTop: ScaleHeight(20),
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
        zIndex: 1,
        position: 'absolute',
        bottom: 20
    },
    signupText:
    {
        color: Colors.darkBlue,
        fontFamily: Fonts.bold,
        fontSize: ScaleWidth(16)
    },
})
export default styles;