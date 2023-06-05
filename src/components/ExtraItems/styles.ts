import { StyleSheet, Text, View } from 'react-native'
import { Colors, Fonts, ScaleHeight, ScaleWidth } from '../../common/foundation';




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        borderBottomColor:Colors.inputBackground,
        borderBottomWidth:ScaleWidth(1),
        paddingBottom:ScaleHeight(15),
        marginTop:ScaleHeight(10)
    },
    priceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:ScaleHeight(5)
    },
    addonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addonText: {

        color: Colors.darkBlue,
        fontFamily: Fonts.light,
        fontSize: ScaleWidth(11),
        marginTop: ScaleHeight(3)

    },
    addonPrice: {

        color: Colors.darkBlue,
        fontFamily: Fonts.light,
        fontSize: ScaleWidth(11),
        marginTop: ScaleHeight(3)

    },
    dollarSign: {
        color: Colors.darkBlue,
        fontFamily: Fonts.regular,
        fontSize: ScaleWidth(16),
    },
    price: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: ScaleHeight(9)
    },
    title: {
        fontSize: ScaleWidth(14),
        color: Colors.darkBlue,
        fontFamily: Fonts.regular
    },

    countView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: ScaleHeight(10),
        marginRight:ScaleWidth(2)

    },
    minusButton: {
       
      
    },
    minus: {
        fontSize: ScaleWidth(21),
        fontFamily: Fonts.regular,
    },
    plusButton: {
      
       
    },
    plus: {
        fontSize: ScaleWidth(21),
        fontFamily: Fonts.regular,
        color: Colors.white
    },
    outputCount: {
        color: Colors.darkBlue,
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        marginHorizontal: ScaleWidth(7)
    },
})


export default styles;