import { StyleSheet } from "react-native";
import { Colors, Spacings, Fonts, ScaleHeight, ScaleWidth, width, height } from '../../../common/foundation';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  Welcome: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(26),
    alignSelf: "center",
    textAlign: "center",
    marginTop: ScaleHeight(60),
  }, depositContainer: {
    borderRadius: Spacings.wSpace7,
  },
  confirmation:{
    color: Colors.darkBlue,
    fontFamily: Fonts.regular,
    fontSize: ScaleWidth(13),
    marginTop: ScaleHeight(5),
    marginLeft:ScaleWidth(25)
  },
  Cancelorder:
  {
    color: Colors.darkBlue,
    fontFamily: Fonts.bold,
    fontSize: ScaleWidth(16),
    marginTop: ScaleHeight(20),
    marginLeft:ScaleWidth(25)
  },
  signupButton: {
    width: width - ScaleWidth(50),
    height: ScaleHeight(50),
    marginTop: ScaleHeight(20),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
  },
  cencelOrderButton:{
    width: width - ScaleWidth(50),
    height: ScaleHeight(50),
    marginTop: ScaleHeight(20),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
    position:'absolute',
    bottom:ScaleHeight(20)
  },
  signupText:
  {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize: ScaleWidth(13)
  },
  Login: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: ScaleWidth(16),
    alignSelf: "center",
    textAlign: "center",
    marginTop: ScaleHeight(10),
  },
  logo: {
    width: ScaleWidth(205),
    height: ScaleHeight(84),
    resizeMode: "contain",
    marginTop: ScaleHeight(229),
  },
  row: {
    flexDirection: "row",
    position: "absolute",
    bottom: 90,
  },
  header: {
    width,

    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    top: ScaleHeight(0),
  },
  content: {
    borderTopRightRadius: ScaleHeight(30),
    borderTopLeftRadius: ScaleHeight(30),
    width,
    height: height / 2.5,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginTop: ScaleHeight(-50),
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "absolute",
    top: height / 1.5,
  },
  Scroll: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexGrow: 1,
    paddingVertical: ScaleHeight(10),
  },

  YourlocationPoint: {
    height: ScaleWidth(15),
    width: ScaleWidth(15),
    borderRadius: ScaleWidth(7.5),
    borderColor: Colors.darkBlue,
    borderWidth: ScaleWidth(4),
    backgroundColor: Colors.darkBlue,
    marginLeft: ScaleWidth(20),
  },
  PickUpLocationPoint: {
    marginLeft: ScaleWidth(20),
  },
  DropOffLocationPoint: {
    height: ScaleWidth(15),
    width: ScaleWidth(15),
    borderRadius: ScaleWidth(7.5),
    borderColor: Colors.darkBlue,
    borderWidth: ScaleWidth(4),
    backgroundColor: Colors.darkBlue,
    marginLeft: ScaleWidth(20),
  },
  marker: {
    width: ScaleHeight(30),
    height: ScaleHeight(30),
  },
  divider: {
    height: ScaleHeight(35),
    width: ScaleWidth(1),
    marginVertical: ScaleHeight(2),
    backgroundColor: Colors.darkBlue,
    marginLeft: ScaleWidth(30),
  },
  key: {
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
    fontSize: ScaleWidth(14),
    marginLeft: ScaleWidth(5),
    textAlign: "left",
  },
  EstimatedDeliveryTime: {
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
    fontSize: ScaleWidth(12),
    textAlign: "left",
    marginLeft: ScaleHeight(20)
  },
  SCHEDULED_TIME: {
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    fontSize: ScaleWidth(14),
    textAlign: "left",
    marginTop: ScaleHeight(5),
    marginLeft: ScaleHeight(20)
  },
  cardTitle: {
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
    fontSize: ScaleWidth(12),
    textAlign: "left",
  },
  cardDescription: {
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    fontSize: ScaleWidth(14),
    textAlign: "left",
    marginTop: ScaleHeight(5)
  },
  cardDescription2: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    fontSize: ScaleWidth(11),
    textAlign: "left",
    marginTop: ScaleHeight(5)
  },
  value: {
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
    fontSize: ScaleWidth(11),
    marginLeft: ScaleWidth(5),
    marginRight: ScaleWidth(40),
    marginTop: ScaleHeight(3),
    textAlign: "left",
  },
  buttonGroup: {
    flexDirection: "row",
    width,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: ScaleHeight(25),
  },
  gpsButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: ScaleHeight(15),
    height: ScaleHeight(60),
    width: width - ScaleWidth(70),
    borderRadius: ScaleHeight(10),
    borderWidth: ScaleWidth(1),
    borderColor: Colors.primary,
  },
  gpsImage: {
    height: ScaleHeight(30),
    width: ScaleHeight(30),
  },
  textAreaContainer: {
    
  },
  textArea: {
    height: ScaleHeight(150),
    justifyContent: "flex-start",
    borderColor: Colors.inputBackground,
    borderWidth: ScaleWidth(1),
    padding: ScaleHeight(20),
    width: width - ScaleWidth(50),
    borderRadius: ScaleWidth(10),
    marginTop: ScaleHeight(20),
    color:Colors.darkBlue,
    fontFamily:Fonts.regular,
    alignSelf:'center',
    fontSize:ScaleWidth(13)

  },
});

export default styles;
