import { ScaleWidth, ScaleHeight, Fonts, Colors, width } from '../../../common/foundation';
import { StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    ScrollView: {
        backgroundColor: Colors.white,
    },

    imageStyle: {
        height: ScaleHeight(200)
    },
    flatList: {
        marginTop: ScaleHeight(10),
        marginLeft: ScaleHeight(20),

    },
    title: {
        fontSize: ScaleWidth(25),
        fontFamily: Fonts.medium,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(20),
        marginTop: ScaleHeight(17),

    },
    ratingButton: {
        height: ScaleWidth(30),
        borderRadius: ScaleWidth(10),
        marginLeft: ScaleWidth(20),
        flexDirection: 'row',
        marginTop: ScaleHeight(17),
    },
    rating: {
        fontSize: ScaleWidth(14),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(4)

    },
    ratingCount: {
        fontSize: ScaleWidth(14),
        fontFamily: Fonts.light,
        color: Colors.text3,
        marginLeft: ScaleWidth(3)

    },
    review: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(6),
        textDecorationLine: 'underline'
    },
    view: {
        marginHorizontal: ScaleWidth(20)
    },
    priceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dollarSign: {
        color: Colors.darkBlue,
        fontFamily: Fonts.bold,
        fontSize: ScaleWidth(16),
    },
    price: {
        fontSize: ScaleWidth(31),
        fontFamily: Fonts.bold,
        color: Colors.darkBlue,
    },
    countView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    count: {
        color: Colors.darkBlue,
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        marginHorizontal: ScaleWidth(7)
    },
    description: {
        fontSize: ScaleWidth(13),
        color: Colors.gray,
        marginVertical: ScaleHeight(7),
        lineHeight: ScaleHeight(21)
    },
    txt: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.medium,
        color: Colors.darkBlue,
        marginVertical: ScaleHeight(10),
        flexGrow:1
    },
    quality:{
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginVertical: ScaleHeight(10),
    },
    offerName: {
        fontSize: ScaleWidth(14),
        fontFamily: Fonts.medium,
        color: Colors.darkBlue,
        marginTop: ScaleHeight(7)
    },
    extras: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: ScaleHeight(21)

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
        alignSelf: 'flex-start',
        marginTop: ScaleHeight(21)
    },
    cartView: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    countCart: {
        width: ScaleWidth(30),
        height: ScaleHeight(30),
        borderRadius: ScaleHeight(50),
         backgroundColor: Colors.darkBlue,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        alignSelf: 'center',
        color: Colors.white,
        fontSize: ScaleWidth(14),
    },
    cartButton: {
        width: width - ScaleWidth(200),
        height: ScaleHeight(50),
        borderRadius: ScaleHeight(50),
        marginTop: ScaleHeight(20),
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
        backgroundColor: Colors.white
    },
    addToCartButton: {
        width: width - ScaleWidth(50),
        height: ScaleHeight(50),
        marginBottom: ScaleHeight(10),
        marginTop:ScaleHeight(5),
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:Colors.primary,
        alignSelf:'center',
        borderRadius:ScaleWidth(10),
        flexDirection:'row',
        

    },
    addToCart:
    {
        color: Colors.darkBlue,
        fontFamily: Fonts.medium,
        fontSize: ScaleWidth(13),
        flexGrow:1,
        marginLeft:ScaleWidth(15)
    },
    totalPrice:{
        color: Colors.darkBlue,
        fontFamily: Fonts.medium,
        fontSize: ScaleWidth(17),
        marginRight:ScaleWidth(15)

    }

})


export default styles
