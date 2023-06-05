import { Colors, Fonts, ScaleHeight,Spacings, ScaleWidth, width } from '../../../common/foundation';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'flex-start',

  },
  RBSheetRefTitle:{
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    fontSize:ScaleWidth(13),
    alignSelf:"center",
    

  }
  ,checkBoxView:{
    width:width-ScaleWidth(60),
    alignSelf:'center',
    alignItems:'center',
    flexDirection:'row',
    marginTop: ScaleHeight(20)

  }
  ,
  checkboxText:{
    fontFamily: Fonts.medium,
    color: Colors.darkBlue,
    fontSize:ScaleWidth(13),
    flexGrow:1
  }
  ,
  regionView:{

    height:ScaleHeight(45),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"center",
    width:"100%",
    borderBottomColor:Colors.inputBackground,
    borderBottomWidth:ScaleWidth(1)

  },
  regionText:{
    fontFamily: Fonts.regular,
    color: Colors.black,
    fontSize:ScaleWidth(13)
  },
  input: {
    marginTop: ScaleHeight(30)
  },
 
  mainContainer: {
    width: width - ScaleWidth(50),
    alignSelf:'center',
    marginTop:ScaleWidth(20)
  },
  subContainer: {
    width: width - ScaleWidth(50),
    height:ScaleHeight(45),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: ScaleWidth(10),
    borderWidth: ScaleWidth(1),
    borderColor: Colors.inputBackground,
    paddingHorizontal: ScaleWidth(10)
  },
  placeholder:{
    flex: 1,
    color: Colors.placeHolder,
    lineHeight: ScaleHeight(40),
    fontFamily: Fonts.regular,
    fontSize:ScaleWidth(12),
    marginLeft:ScaleWidth(6)
  },
  title: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    marginLeft: ScaleHeight(2),
    marginBottom: ScaleHeight(6),
    fontSize:ScaleWidth(13)

  },
  mapHeader:{ width:width-ScaleWidth(50),
    alignSelf:'center',
    flexDirection:'row',
    marginTop:ScaleHeight(20)
  },
  locationPin:{
    color: Colors.gray,
    fontFamily: Fonts.regular,
    fontSize:ScaleWidth(13),
    flexGrow:1
  },
  refineMap:{
    color: Colors.darkBlue,
    fontFamily: Fonts.regular,
    fontSize:ScaleWidth(13),
    textDecorationLine:'underline'
  },
  mapContainer: {
    width:width-ScaleWidth(40),
    height:ScaleHeight(150),
    alignItems: "center",
    justifyContent: "center",
    alignSelf:'center',
    marginTop:ScaleWidth(10)
    
},
fixedMarker:{
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  profilePic: {
    width: ScaleWidth(100),
    height: ScaleWidth(100),
    borderRadius: ScaleWidth(50),
    borderColor: Colors.white,
    borderWidth: ScaleWidth(6),

  },
  profilePicView:{
    width: ScaleWidth(100),
    height: ScaleWidth(100),
    borderRadius: ScaleWidth(50),
    marginTop: ScaleWidth(-50),
    alignSelf:'center',


  },
  bannerView: {
    width: width,
    height: ScaleHeight(130),
    backgroundColor: Colors.primary,
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
  backButton: {
    height: ScaleWidth(36),
    width: ScaleWidth(36),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .5,
    elevation: 5,
    backgroundColor: Colors.white,
    borderRadius: ScaleWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ScaleHeight(40),
    marginLeft: ScaleHeight(25),


  },name: {
    marginTop: ScaleHeight(20)
  },
  search:{
    marginVertical: ScaleHeight(20)

  },
  email: {
    marginTop: ScaleHeight(20),
  },
  signupButton: {
    width: width - ScaleWidth(50),
    height: ScaleHeight(50),
    marginTop: ScaleHeight(20),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
    position:'absolute',
    bottom:ScaleHeight(30)
  },
  depositContainer: {
    padding: Spacings.wSpace4,
    borderRadius: Spacings.wSpace7,
  },
  signupText:
  {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13)
  },
  cameraButton:{
    height: ScaleWidth(30),
    width: ScaleWidth(30),
    backgroundColor:Colors.white,
    borderRadius:ScaleWidth(15),
    position:'absolute',
    bottom:ScaleHeight(10),
    right:ScaleHeight(7),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPic:{
    height: ScaleWidth(15),
    width: ScaleWidth(15),
  }

})
export default styles;