import { StyleSheet, Platform } from 'react-native';
import { Colors, Spacings, ScaleHeight, ScaleWidth, width, Fonts } from '../../../common/foundation';


const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "white",
    alignSelf: 'center',
  },
  mapContainer: {
    flex: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: ScaleHeight(10),
    paddingBottom: ScaleHeight(80)
  },
  signupButton: {
    width: "95%",
    height: ScaleHeight(50),
    marginBottom: ScaleHeight(10),
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
  footerContainer: {
    width: "100%",
    padding: ScaleWidth(10),
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  fixedMarker: {
    position: "absolute",
    top: 0,
    bottom: Platform.OS == 'ios' ? ScaleHeight(55) : ScaleHeight(160),
    left: 0,
    right: Platform.OS == 'ios' ? ScaleWidth(-35) : ScaleWidth(0),
    alignItems: "center",
    justifyContent: "center",
  },
  address: {
    color: Colors.black,
    fontSize: Spacings.wSpace5,
    fontFamily: 'Actor',
    textAlign: "left",
    marginHorizontal: (15),
    marginVertical: Spacings.hSpace9,
    width: "100%"
  },
  sheetContainer: {
    padding: Spacings.wSpace4,
    borderRadius: Spacings.wSpace7,
  },
  pin: {
    width: ScaleWidth(50),
    height: ScaleWidth(50),

    zIndex: 3,
    position: 'absolute',
    marginTop: Platform.OS=='ios'? ScaleHeight(-20):ScaleHeight(-73),
    marginLeft:Platform.OS=='ios'? ScaleWidth(-8):ScaleHeight(-27),
    left: '50%',
    top: '50%'
  },
  current_locationButton:{
    width:ScaleWidth(35),
    height: ScaleWidth(35),
    position: 'absolute',
    right: ScaleHeight(20),
    top: ScaleHeight(20),
    backgroundColor:Colors.white,
    borderRadius:ScaleWidth(20),
    alignItems:"center",
    justifyContent: 'center',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
  },
  current_location:{
    width:ScaleWidth(25),
    height: ScaleWidth(25),
    resizeMode:'contain'
  }
})

export default styles