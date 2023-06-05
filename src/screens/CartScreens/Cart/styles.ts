import { ScaleWidth, ScaleHeight, Fonts, Colors, width } from '../../../common/foundation';
import { StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    ScrollView: {
        paddingBottom: ScaleHeight(70)
    },
    view: {
        marginHorizontal: ScaleWidth(20)
    },
    promoCode: {
        paddingVertical: ScaleHeight(20)
    },
    verifyPromoCodeData: {

        color: Colors.green,
        fontFamily: Fonts.regular,
        fontSize: ScaleWidth(12),
        marginTop:ScaleHeight(-10),
        textAlign:'left',
    },
    showMoreAddresses:{
        color: Colors.darkBlue,
        fontFamily: Fonts.medium,
        fontSize: ScaleWidth(13),
        textDecorationLine:'underline'
    },
    moreAddressesButton:{
        width:width-ScaleWidth(40),
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    verifyPromoCodeDataError: {

        color: Colors.denger,
        fontFamily: Fonts.regular,
        fontSize: ScaleWidth(12),
        marginTop:ScaleHeight(-10),
        textAlign:'left',
    },

    priceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dollarSign: {
        color: Colors.darkBlue,
        fontFamily: Fonts.regular,
        fontSize: ScaleWidth(10),
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
    count: {
        color: Colors.darkBlue,
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        marginHorizontal: ScaleWidth(7)
    },
    txt: {
        fontSize: ScaleWidth(18),
        fontFamily: Fonts.bold,
        color: Colors.darkBlue,
        marginVertical: ScaleHeight(10)
    },
    date: {
        fontSize: ScaleWidth(12),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        paddingVertical: ScaleHeight(10),
        marginLeft: ScaleWidth(5)
    },
    extras: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: ScaleHeight(21),
        borderBottomColor: Colors.inputBackground,
        borderBottomWidth: ScaleWidth(1)

    },

    cashOnDelivery: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: ScaleHeight(10),

    },
    subTxt: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue
    },
    subPrice: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginRight: ScaleWidth(7)
    },
    special: {
        paddingVertical: ScaleHeight(21)
    },
    input: {
        alignSelf: 'center',
        height: ScaleHeight(45),
        width: width - ScaleWidth(37),

    },
    signupButton: {
        width: ScaleWidth(106),
        height: ScaleHeight(45),
        marginTop: ScaleHeight(20),
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    signupText:
    {
        color: Colors.darkBlue,
        fontFamily: Fonts.medium,
        fontSize: ScaleWidth(13)
    },
    items: {
        fontSize: ScaleWidth(12),
        fontFamily: Fonts.regular,
        color: Colors.gray
    },
    total: {
        fontSize: ScaleWidth(18),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginRight: ScaleWidth(2)
    },
    addressView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: ScaleHeight(5)
    },
    addNew: {
        fontSize: ScaleWidth(14),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        textDecorationLine: 'underline'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: ScaleWidth(5),
        marginBottom: ScaleWidth(15),

    },
    deliveryText: {
        marginVertical: ScaleHeight(5),
        fontSize: ScaleWidth(12),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(5),
    },
    alarm: {
        width: ScaleWidth(17),
        height: ScaleWidth(17),
        marginLeft: ScaleWidth(15),
    },
    dateSheet: {
        marginLeft: ScaleWidth(15),
    },
    setDeliveryButton: {
        width: width - ScaleWidth(50),
        height: ScaleHeight(50),
        bottom: ScaleHeight(20),
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
    },
    setDeliveryText:
    {
        color: Colors.darkBlue,
        fontFamily: Fonts.medium,
        fontSize: ScaleWidth(13)
    },
    txtSheet: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.bold,
        color: Colors.darkBlue,
        marginTop: ScaleHeight(20),
        marginLeft: ScaleWidth(15),
    },
    scheduleView: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: width - ScaleWidth(37),
    },
    day: {
        fontSize: ScaleWidth(12),
        color: Colors.darkBlue,
        fontFamily: Fonts.regular,
        paddingVertical: ScaleHeight(7),
        paddingHorizontal: ScaleWidth(20)
    },
    time: {
        fontSize: ScaleWidth(12),
        color: Colors.darkBlue,
        fontFamily: Fonts.regular,
        paddingVertical: ScaleHeight(7),
    },
    timeView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ScaleWidth(45)
    },
    checkoutButton: {
        width: width - ScaleWidth(40),
        height: ScaleHeight(50),
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
        position:"absolute",
        bottom: ScaleHeight(20)
    },
})


export default styles
