import { StyleSheet, Text, View } from 'react-native'
import { Colors, Fonts, ScaleHeight, ScaleWidth } from '../../../common/foundation';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    logo: {
        marginTop: ScaleHeight(30),
        height:ScaleWidth(80),
        width:ScaleWidth(80),
        alignSelf:'center',
        borderRadius:ScaleWidth(20)
    },
    title:{
        fontFamily:Fonts.medium,
        fontSize:ScaleWidth(14),
        color:Colors.darkBlue,
        marginHorizontal:ScaleWidth(25),
        marginTop:ScaleHeight(30)
    },
    description:{
        fontFamily:Fonts.regular,
        fontSize:ScaleWidth(13),
        color:Colors.gray,
        marginHorizontal:ScaleWidth(25),
        marginTop:ScaleHeight(10)

    },
    description2:{
        fontFamily:Fonts.regular,
        fontSize:ScaleWidth(13),
        color:Colors.gray,
        marginHorizontal:ScaleWidth(25),
        marginTop:ScaleHeight(20)

    },
    tekramWord:{
        fontFamily:Fonts.medium,
        fontSize:ScaleWidth(14),
        color:Colors.black+'88',

    },
})
export default styles;