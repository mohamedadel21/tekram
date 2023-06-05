import React from "react";
import { FlatList, View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
  ShineOverlay


} from "rn-placeholder";
 import styles from './styles'
import { ScaleHeight, ScaleWidth, width } from "../../common/foundation";


const LazyLoaded = () => (

    <Placeholder style={styles.container} Animation={ShineOverlay}>
        <View style={styles.header}>

                <PlaceholderMedia  size={40} />
            <View style={styles.subHeader}>
                <PlaceholderLine width={30} />
                <PlaceholderLine width={40} />
            </View>
                <PlaceholderMedia  size={40} />

        </View>
            <PlaceholderLine style={styles.flatList}  height={40} />
        
        <PlaceholderLine 
            style={[styles.line,{bottom: ScaleHeight(20)}]} 
            height={ScaleHeight(150)}
            />

        <View style={styles.categoriesLazy}>
            <PlaceholderLine 
                width={30} 
                />
            <FlatList
                style={styles.flatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[{}, {}, {}, {}, {}]}
                renderItem={({}) => (
                    <PlaceholderMedia style={{ 
                        marginRight:ScaleWidth(10),
                        padding: ScaleWidth(2),
                        borderRadius: ScaleWidth(15)
                    }} size={70} />
                    )}
                    keyExtractor={(item,index)=>JSON.stringify(index)}
                    />
        </View>

        <View style={styles.restaurantsLazy}>
            <PlaceholderLine width={50} />
            <PlaceholderLine width={15} />
        </View>
        <View style={styles.restaurantsLazy}>
            <PlaceholderLine 
                height={ScaleHeight(150)}
                width={80} 
                style={[styles.line]} 
                />
            <PlaceholderLine 
                height={ScaleHeight(150)}
                width={80} 
                style={[styles.line,{marginLeft: 15}]} 
                />
        </View>

        <View style={[styles.restaurantsLazy,{bottom: ScaleHeight(200)}]}>
            <PlaceholderLine width={50} />
            <PlaceholderLine width={15} />
        </View>
        <View style={[styles.restaurantsLazy,{bottom: ScaleHeight(200)}]}>
            <PlaceholderLine 
                height={ScaleHeight(150)}
                width={80} 
                style={[styles.line]} 
                />
            <PlaceholderLine 
                height={ScaleHeight(150)}
                width={80} 
                style={[styles.line,{marginLeft: 15}]} 
                />
        </View>
        
    </Placeholder>
);


export default LazyLoaded;