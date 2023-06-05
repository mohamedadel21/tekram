import { StyleSheet } from "react-native";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width } from "../../common/foundation";

const styles = StyleSheet.create({
    container: {
        marginRight: ScaleWidth(10),
        shadowOffset: { width: 0, height: 5 },
        shadowColor: Colors.gray,
        shadowOpacity: .3,
        elevation: 3,
        backgroundColor: Colors.white,
        width: width - ScaleWidth(100),
        borderRadius: ScaleWidth(15),
        marginBottom: ScaleHeight(7),
        marginHorizontal: ScaleHeight(4)


    },ratingButton:{
        height: ScaleWidth(30),
        paddingHorizontal: ScaleWidth(5),
        borderRadius: ScaleWidth(10),
        backgroundColor: Colors.inputBackground,
        position: 'absolute',
        top: ScaleHeight(10),
        left: ScaleWidth(10),
        alignItems: "center",
        justifyContent: "center",
        flexDirection:'row'
    },
    rating:{
        fontSize: ScaleWidth(12),
        fontFamily: Fonts.regular,
        color: Colors.black,
        marginRight: ScaleWidth(4)

    },
    ratingCount:{
        fontSize: ScaleWidth(10),
        fontFamily: Fonts.light,
        color: Colors.text3,
        marginLeft: ScaleWidth(3)

    },
    discount:{
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.regular,
        color: Colors.darkBlue,
        marginRight: ScaleWidth(6)

    },
    discountButton:{
        height: ScaleWidth(20),
        paddingHorizontal: ScaleWidth(5),
        borderTopLeftRadius: ScaleWidth(3),
        borderBottomLeftRadius: ScaleWidth(3),
        backgroundColor: Colors.primary,
        position: 'absolute',
        bottom: ScaleHeight(20),
        right: ScaleWidth(0),
        alignItems: "center",
        justifyContent: "center",
    }
    ,
    favoriteButton: {
        height: ScaleWidth(30),
        width: ScaleWidth(30),
        borderRadius: ScaleWidth(20),
        backgroundColor: Colors.inputBackground,
        position: 'absolute',
        top: ScaleHeight(10),
        right: ScaleWidth(10),
        alignItems: "center",
        justifyContent: "center",
    },
    imageView: {
        height: ScaleWidth(50),
        width: ScaleWidth(50),

        alignItems: "center",
        justifyContent: "center",
    },
    name: {
        fontSize: ScaleWidth(13),
        fontFamily: Fonts.medium,
        color: Colors.darkBlue,
        marginTop: ScaleWidth(5),
        marginLeft: ScaleWidth(7)

    },
    imageStyle: {
        borderTopLeftRadius: ScaleWidth(15),
        borderTopRightRadius: ScaleWidth(15)

    },
    image: {
        width: width - ScaleWidth(100),
        height: ScaleHeight(120),
    },
    categories: {
        fontSize: ScaleWidth(11),
        fontFamily: Fonts.light,
        color: Colors.gray,
        marginLeft: ScaleWidth(7),
        marginTop: ScaleWidth(5),
    },
    deliveryText: {

        fontSize: ScaleWidth(12),
        fontFamily: Fonts.regular,
        color: Colors.gray,
        marginLeft: ScaleWidth(5),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: ScaleWidth(7),
        marginTop: ScaleWidth(5),
        marginBottom: ScaleWidth(15),

    },
    motocycle: {
        width: ScaleWidth(20),
        height: ScaleWidth(20),
    },
    alarm: {
        width: ScaleWidth(17),
        height: ScaleWidth(17),
        marginLeft: ScaleWidth(15),

    }
})

export default styles