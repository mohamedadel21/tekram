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
import { ScaleHeight, ScaleWidth, width } from "../../../common/foundation";

const RestaurantsLazyLoader = () => (

    <Placeholder style={styles.container} Animation={ShineOverlay}>

        <FlatList
            style={styles.flatList}
            showsHorizontalScrollIndicator={false}
            data={[{}, {}, {}, {}, {}, {}]}
            renderItem={({ }) => (
                <PlaceholderMedia style={{
                    padding: ScaleWidth(2),
                    width:width- ScaleWidth(40),
                    height: ScaleWidth(150),
                    marginTop: ScaleWidth(10),
                    borderRadius: ScaleWidth(15),
                    marginHorizontal: ScaleWidth(10),
                    alignSelf:'center'
                }}/>
            )}
            keyExtractor={(item, index) => JSON.stringify(index)}
            showsVerticalScrollIndicator={false}
        />

    </Placeholder>
);


export default RestaurantsLazyLoader;