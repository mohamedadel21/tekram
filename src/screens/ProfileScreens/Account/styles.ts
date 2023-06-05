import { Colors, Fonts, Spacings, ScaleHeight, ScaleWidth, width } from '../../../common/foundation';
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
  dialog:{backgroundColor:Colors.white},
  dialogButtonText:{ color: Colors.darkBlue, fontFamily: Fonts.regular },
  dialogDesc:{ color: Colors.black, fontFamily: Fonts.regular },
  confirmation:{ color: Colors.black, fontFamily: Fonts.bold },
  changeCurrencyButton: {
    width: width - ScaleWidth(50),
    height: ScaleHeight(50),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
    marginBottom:ScaleHeight(10)
  }, changeCurrencyButtonText:
  {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13)
  },
  changeCurrencyView: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', },
  sheetContainer: {
    borderRadius: Spacings.wSpace7,
    padding: ScaleWidth(20)
  },
  profilePic: {
    width: ScaleWidth(90),
    height: ScaleWidth(90),
    borderRadius: ScaleWidth(45),
    borderColor: Colors.white,
    borderWidth: ScaleWidth(6),
    position: 'absolute',
    right: ScaleHeight(20)
  },
  changeCurrency: {
    color: Colors.darkBlue,
    fontSize: ScaleWidth(16),
    fontFamily: Fonts.medium,
  },
  changeCurrencyText: {
    color: Colors.darkBlue,
    fontSize: ScaleWidth(13),
    fontFamily: Fonts.regular,
  },
  changeCurrencyItem: {
    width: "100%",
    height: ScaleHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:ScaleWidth(5)
  },

  bannerView: {
    width: width - ScaleWidth(40),
    height: ScaleHeight(150),
    borderRadius: ScaleWidth(15),
    alignSelf: 'center',
    marginTop: ScaleHeight(20),
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ScaleWidth(20)
  },
  name: {
    color: Colors.darkBlue,
    fontSize: ScaleWidth(18),
    fontFamily: Fonts.bold,
    marginRight: ScaleHeight(20),


  },
  email: {
    color: Colors.darkBlue,
    fontSize: ScaleWidth(13),
    fontFamily: Fonts.regular,
    marginRight: ScaleHeight(10),
    width: width / 2

  },
  flatList: {
    marginTop: ScaleHeight(10),
    marginLeft: ScaleHeight(20),

  },
  row: {
    marginTop: ScaleHeight(20),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  column: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: ScaleWidth(20),
  },
  text: {
    color: Colors.darkBlue,
    fontSize: ScaleWidth(13),
    fontFamily: Fonts.regular,
    marginTop: ScaleHeight(10),

  },
  icon: {
    width: ScaleWidth(20),
    height: ScaleWidth(20)
  },
  divider: {
    width: ScaleWidth(1),
    height: ScaleHeight(45),
    borderWidth: ScaleWidth(.5),
    borderColor: Colors.inputBackground

  },
  foodOrders: {
    marginTop: ScaleHeight(30),
    marginBottom: ScaleHeight(10),
    marginLeft: ScaleHeight(25),
    color: Colors.darkBlue,
    fontSize: ScaleWidth(15),
    fontFamily: Fonts.medium
  },
  more: {
    marginTop: ScaleHeight(20),
    marginBottom: ScaleHeight(10),
    marginLeft: ScaleHeight(25),
    color: Colors.darkBlue,
    fontSize: ScaleWidth(15),
    fontFamily: Fonts.medium
  },
  buttonAbout:{
    width:ScaleWidth(50),
    height:ScaleWidth(50),
    borderRadius:ScaleWidth(35),
    marginHorizontal:ScaleWidth(10),
    marginTop:ScaleHeight(30)
    
  },
  imageHelp:{
    width:ScaleWidth(50),
    height:ScaleWidth(50),
  },
  password: {
    marginTop: ScaleHeight(20),
    marginLeft: ScaleHeight(20),
    width:"90%"
  },
})
export default styles;