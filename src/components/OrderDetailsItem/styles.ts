import { StyleSheet, Text, View } from 'react-native'
import { Colors, Fonts, ScaleHeight, ScaleWidth } from '../../common/foundation';




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,

        marginTop:ScaleHeight(10)
    },
    priceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    },
    title: {
        fontSize: ScaleWidth(14),
        color: Colors.darkBlue,
        fontFamily: Fonts.regular
    },
    number:{
        fontSize: ScaleWidth(14),
        color: Colors.darkBlue,
        fontFamily: Fonts.regular,
        width:ScaleWidth(50)
    },
    countView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: ScaleHeight(7),

    },
    minusButton: {
        height: ScaleHeight(25),
        width: ScaleWidth(25),
        borderWidth: ScaleWidth(0.5),
        borderRadius: ScaleHeight(12.5)
    },
    minus: {
        textAlign: 'center',
        fontSize: ScaleWidth(21),
        fontFamily: Fonts.regular,
        bottom: ScaleHeight(3)
    },
    plusButton: {
        height: ScaleHeight(25),
        width: ScaleWidth(25),
        borderRadius: ScaleHeight(12.5),
        backgroundColor: Colors.darkBlue
    },
    plus: {
        textAlign: 'center',
        fontSize: ScaleWidth(21),
        fontFamily: Fonts.regular,
        bottom: ScaleHeight(3),
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