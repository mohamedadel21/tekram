import { StyleSheet } from 'react-native';
import { Colors, ScaleHeight, ScaleWidth, height, width, Fonts } from '../../../common/foundation';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper:{  
  },

  card: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  onboardingImage: {
    width: ScaleWidth(200),
    height: ScaleHeight(200)
  },
  title: {

    fontSize: ScaleWidth(15),
    fontFamily: Fonts.bold,
    color: Colors.darkBlue,
    marginTop: ScaleHeight(33),
    textAlign: 'center',
    marginHorizontal: ScaleWidth(50)


  },
  description: {

    fontSize: ScaleWidth(12),
    fontFamily: Fonts.regular,
    color: Colors.gray,
    marginTop: ScaleHeight(20),
    textAlign: 'center',
    marginHorizontal: ScaleWidth(50)
  },
  getStarted: {
    width: "80%",
    height: ScaleHeight(50),
    marginTop: ScaleHeight(50),
    marginBottom: ScaleHeight(30),
    shadowOffset: {width: 2, height: 2},
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
    
  },
  getStartedText: {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
    fontSize:ScaleWidth(13)
  },
  skipButton:{
    backgroundColor:Colors.white,
    position:'absolute',
    top:ScaleHeight(50),
    right:ScaleWidth(20)
  },
  skipText:{
    textDecorationLine:'underline',
    color:Colors.darkBlue,
    fontSize:ScaleWidth(13),
    fontFamily:Fonts.regular
  }
});
