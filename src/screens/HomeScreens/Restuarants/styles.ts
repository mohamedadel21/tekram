import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from '../../../common/foundation';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',

  },
  burgerImage:{
    width: ScaleHeight(140),
    height: ScaleHeight(140),
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
  upTo50OFFOnSelectedStores:{
    marginTop:ScaleHeight(30),
    width: width - ScaleWidth(220),
    color: Colors.darkBlue,
    fontSize: ScaleWidth(14),
    fontFamily: Fonts.regular
  },
  flatList: {
    marginTop: ScaleHeight(20),
    alignSelf:'center'
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
  input: {
    width:width-ScaleWidth(40),
    marginTop: ScaleHeight(15),
  },
  row: {
    marginTop: ScaleHeight(10),
    flexDirection: 'row',
    marginLeft: ScaleHeight(5),

  },
})
export default styles;