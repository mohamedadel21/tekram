import { Colors, Fonts, ScaleHeight, ScaleWidth, width, height } from '../../../common/foundation';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',

  },
  input: {
    width:width-ScaleWidth(40),
    marginLeft: ScaleHeight(20),
    marginTop: ScaleHeight(15),
  },
  tabview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: ScaleWidth(11),
  },
  buttonFilter: {
        height: ScaleWidth(29),
        width: ScaleWidth(29),
        borderRadius: ScaleWidth(14.5),
        borderWidth: ScaleHeight(1),
        backgroundColor: Colors.white,
        marginTop: ScaleHeight(10),
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.darkBlue,
        marginLeft: ScaleWidth(11)
  },
  flatList: {
    marginTop: ScaleHeight(10),

  },
  buttonStyle:{
    width:ScaleWidth(50),
    height:ScaleHeight(50)
  },
  row: {
    marginTop: ScaleHeight(10),
    marginLeft: ScaleHeight(5),
    flexDirection: 'row'
  },
  header: {
    width: width - ScaleWidth(40),
    flexDirection: 'row'

  },
  tabContainer: {
    flexDirection: 'row'
  },
  tabsStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: ScaleWidth(3),
    width: width / 2 - ScaleWidth(30),
    height: ScaleHeight(50),
  },
  tabText: {
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13),
  },
  tabStyle: {
    backgroundColor: Colors.white,
    marginTop: ScaleHeight(10),
    alignSelf: 'center',
  },
  activeTextStyle: {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(14)

  },
  textStyle: {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(14)
  },
  tabContainerStyle: {
    backgroundColor: Colors.white,

  },
  SearchRestuarantItem:{
    width:width-ScaleWidth(0),
  }

})
export default styles;