import { Colors, Fonts,Spacings, ScaleHeight, ScaleWidth, width } from '../../../common/foundation';
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
  burgerImage:{
    width: ScaleHeight(140),
    height: ScaleHeight(140),
  },
  sheet: {
    padding: Spacings.wSpace4,
    borderRadius: Spacings.wSpace7,
    backgroundColor: Colors.white,

  },
  bannerView: {
    width: width - ScaleWidth(40),
    height: ScaleHeight(150),
    borderRadius: ScaleWidth(15),
    alignSelf: 'center',
    marginTop: ScaleHeight(30),
    backgroundColor:Colors.primary,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:ScaleWidth(20)
  },
  findYourFavoriteFoods:{
    width: width - ScaleWidth(220),
    color: Colors.darkBlue,
    fontSize: ScaleWidth(16),
    fontFamily: Fonts.medium
  },
  chooseDeliveryLocation:{
    color: Colors.darkBlue,
    fontSize: ScaleWidth(16),
    fontFamily: Fonts.medium
  },
  upTo50OFFOnSelectedStores:{
    marginTop:ScaleHeight(30),
    width: width - ScaleWidth(220),
    color: Colors.darkBlue,
    fontSize: ScaleWidth(14),
    fontFamily: Fonts.regular
  },
  flatList: {
    marginTop: ScaleHeight(10),
    marginLeft: ScaleHeight(20),

  },
  addressFlatList:{
    marginTop: ScaleHeight(30),

  },
  categories: {
    marginTop: ScaleHeight(20),
    marginLeft: ScaleHeight(20),
    color: Colors.darkBlue,
    fontSize: ScaleWidth(16),
    fontFamily: Fonts.bold
  },
  listHeader: { width, marginTop: ScaleHeight(20), flexDirection: 'row', alignItems: 'center', },
  BrowseByCategory: {
    color: Colors.darkBlue,
    fontSize: ScaleWidth(16),
    fontFamily: Fonts.bold,
    textAlign: 'left',
    marginLeft: ScaleWidth(20)
  },
  ViewAll: {
    color: Colors.darkBlue,
    fontSize: ScaleWidth(12),
    fontFamily: Fonts.regular,

    textAlign: 'center'
  },
  listHeaderRightContent: {
    position: 'absolute',
    right: ScaleWidth(20),
    flexDirection: 'row',


  },
  flatListFooter:{ marginHorizontal: ScaleWidth(20), flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: "center" },

  signupButton: {
    width: width - ScaleWidth(50),
    height: ScaleHeight(50),
    marginVertical: ScaleHeight(20),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
  },
  signupText:
  {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13)
  },
})
export default styles;