import { Colors, Fonts, ScaleHeight, ScaleWidth, width, height } from '../../../common/foundation';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  txtStyle: {
    marginRight: ScaleWidth(50)
  },
  flatList: {
    marginTop: ScaleHeight(10),
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
  modal: {
    backgroundColor: Colors.white,
    padding: ScaleHeight(29),
    marginHorizontal: ScaleWidth(15),
    borderRadius: 15
  },
  titleModal: {
    fontSize: ScaleHeight(14),
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    textAlign: 'center'
  },
  subTitleModal: {
    fontSize: ScaleHeight(12),
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
    textAlign: 'center',
    marginTop: ScaleHeight(10)
  },
  buttonView: {
    flexDirection: 'row',
    alignSelf: 'center',
    top: ScaleHeight(15),
    
  },
  textStyle: {
    fontSize: ScaleHeight(13),
    color: Colors.darkBlue,
    fontFamily: Fonts.bold
  },
  buttonStyleDelete: {
    margin: ScaleWidth(10),
    height: ScaleHeight(45),
    width: ScaleWidth(120)
  },
  buttonStyleCancel: {
    margin: ScaleWidth(10),
    height: ScaleHeight(45),
    width: ScaleWidth(120),
    backgroundColor: Colors.white,
    borderWidth: ScaleWidth(0.5),
    borderColor: Colors.primary
  },
  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: ScaleWidth(80),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,

  },
  trashView: {
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems:'center',
    width:ScaleWidth(55),
    height:ScaleWidth(55)
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
})
export default styles;