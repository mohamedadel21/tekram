import React from "react";
import { FlatList, View } from "react-native";
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade,
    ShineOverlay
    ,


} from "rn-placeholder";
import styles from './styles'
import { ScaleHeight, ScaleWidth, width } from "../../../common/foundation";


const RestaurantMenuItemLazy = () => (

    <Placeholder style={styles.container} Animation={ShineOverlay}>

        <PlaceholderLine
            style={[styles.line, { bottom: ScaleHeight(10), borderRadius: 0 }]}
            height={ScaleHeight(200)}
        />

        <View style={styles.categoriesLazy}>
            <PlaceholderMedia style={{
                width: ScaleWidth(150),
                height: ScaleHeight(30),

            }}
            />
            <PlaceholderMedia style={{
                width: ScaleWidth(60),
                height: ScaleHeight(30),
                marginTop: ScaleWidth(5)

            }}
            />

            <PlaceholderMedia style={{
                width: ScaleWidth(230),
                height: ScaleHeight(18),
                marginTop: ScaleWidth(5)

            }}
            />

            <FlatList
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={[{}, {}, {}, {}, {}, {}, {}]}
                renderItem={({ }) => (
                    <View style={{ flexDirection: 'row', }}>

                        <View >
                            <PlaceholderMedia style={{
                                height: ScaleHeight(20),
                                marginTop: ScaleWidth(25),
                                width: width - ScaleWidth(40)
                            }} />


                        </View>

                    </View>
                )}
                keyExtractor={(item, index) => JSON.stringify(index)}
            />
        </View>



    </Placeholder>
);


export default RestaurantMenuItemLazy;