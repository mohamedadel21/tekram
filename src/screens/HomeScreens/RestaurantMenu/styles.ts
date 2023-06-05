import { ScaleWidth, ScaleHeight, Fonts, Colors, width } from './../../../common/foundation';
import { StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,

    },
    scrollView: {
        backgroundColor: Colors.white,

    },
    imageStyle: {
        height: ScaleHeight(200)
    },
    favoriteButton: {
        height: ScaleWidth(30),
        width: ScaleWidth(30),
        borderRadius: ScaleWidth(20),
        backgroundColor: Colors.inputBackground,
        position: 'absolute',
        right: ScaleWidth(45),
        bottom: ScaleHeight(5),
        alignItems: "center",
        justifyContent: "center",

    },
    title: {
        fontSize: ScaleWidth(25),
        fontFamily: Fonts.medium,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(20),
        marginTop: ScaleHeight(20),
        flexGrow: 1

    },
    ratingView: {
        borderRadius: ScaleWidth(10),
        marginLeft: ScaleWidth(20),
        flexDirection: 'row',
        marginTop: ScaleHeight(10),
        backgroundColor: Colors.white,
        width
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
    seeReview: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(6),
        textDecorationLine: 'underline'
    }, combos: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.bold,
        color: Colors.darkBlue,
        marginLeft: ScaleWidth(20),

    },
    popular: {
        fontSize: ScaleWidth(16),
        fontFamily: Fonts.bold,
        color: Colors.darkBlue,
        marginTop: ScaleHeight(10),


    },
    flatList: {
        marginLeft: ScaleHeight(20),
    },
    divider: {
        borderBottomWidth: ScaleWidth(1),
        borderBottomColor: Colors.inputBackground,
        marginHorizontal: ScaleWidth(20),
        marginLeft: ScaleHeight(0),
    },
    addToCartButton: {
        width: width - ScaleWidth(50),
        height: ScaleHeight(50),
        marginBottom: ScaleHeight(10),
        marginTop: ScaleHeight(5),
        shadowOffset: { width: 2, height: 2 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        alignSelf: 'center',
        borderRadius: ScaleWidth(10),
        flexDirection: 'row',


    },
    addToCart:
    {
        color: Colors.darkBlue,
        fontFamily: Fonts.medium,
        fontSize: ScaleWidth(13),
        flexGrow: 1,
        marginLeft: ScaleWidth(15)
    },
    totalPrice: {
        color: Colors.darkBlue,
        fontFamily: Fonts.medium,
        fontSize: ScaleWidth(17),
        marginRight: ScaleWidth(15)

    },
    countCart: {
        color: Colors.darkBlue,
        fontFamily: Fonts.medium,
        fontSize: ScaleWidth(14),
    },
    countCartView: {
        height: ScaleWidth(30),
        width: ScaleWidth(30),
        backgroundColor: Colors.white,
        borderRadius: ScaleWidth(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: ScaleWidth(15)

    }
})


export default styles
