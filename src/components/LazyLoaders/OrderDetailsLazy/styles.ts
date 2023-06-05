import { StyleSheet, Text, View } from 'react-native'
import { ScaleHeight,width,ScaleWidth, height } from '../../../common/foundation'


const styles = StyleSheet.create({
    container: {
        width: width ,
        alignSelf: 'center',
        marginTop: ScaleHeight(20),
    },
    header: { 
        flexDirection: 'row', 
        marginTop: ScaleHeight(50) 
    },
    subHeader:{ 
        flex: 1, 
        marginLeft: 10, 
        justifyContent: 'center' 
    },
    line: {
        borderRadius: ScaleWidth(15),
        
    },
    categoriesLazy: {
        bottom: ScaleHeight(400),
        width:width,
        marginLeft:ScaleWidth(5),
        borderTopLeftRadius:ScaleWidth(100),
        borderTopRightRadius:ScaleWidth(100),
    },
    flatList: {
        marginTop: ScaleHeight(10),

    },
    restaurantsLazy: {
        bottom: ScaleHeight(80),
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
export default styles