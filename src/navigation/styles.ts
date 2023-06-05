import {StyleSheet} from 'react-native';
import {Spacings, Colors, width, ScaleWidth, ScaleHeight} from '../common/foundation';

const styles = StyleSheet.create({
  tapStyles: {
    backgroundColor: Colors.black,
    height: Spacings.hSpace1,
    paddingBottom: Spacings.hSpace9,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: Colors.gray,
    shadowOpacity: .3,
    elevation: 3,
  },
  activeIcon: {
    tintColor: Colors.primary,
    height: Spacings.hSpace7,
    width: Spacings.hSpace7,
  },
  inActiveIcon: {
    tintColor: Colors.inActiveText,
    height: Spacings.hSpace7,
    width: Spacings.hSpace7,
  },
  numOfCartItems: {
    minWidth: ScaleWidth(15),
    height: ScaleWidth(15),
    borderRadius: ScaleWidth(15),
    paddingHorizontal: 2,
    backgroundColor: Colors.darkBlue,
    position: 'absolute',
    top: ScaleHeight(0),
    right: (width / 2.5) / 4 ,
    alignItems: 'center',
    justifyContent: 'center'
  },
  numOfCartItemsText: {
    fontSize: ScaleWidth(10),
    color: Colors.white
  }
});

export default styles;
