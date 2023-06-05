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


const OrderDetailsLazy = () => (

    <Placeholder style={styles.container} Animation={ShineOverlay}>

        <PlaceholderLine
            style={[styles.line, { bottom: ScaleHeight(10), borderRadius: 0 }]}
            height={ScaleHeight(400)}
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
                width: ScaleWidth(150),
                height: ScaleHeight(30),
                marginTop: ScaleHeight(20)

            }}
            />
            <PlaceholderMedia style={{
                width: ScaleWidth(60),
                height: ScaleHeight(30),
                marginTop: ScaleWidth(5)

            }}
            />

            <PlaceholderMedia style={{
                width: ScaleWidth(150),
                height: ScaleHeight(30),
                marginTop: ScaleHeight(20)

            }}
            />
            <PlaceholderMedia style={{
                width: ScaleWidth(60),
                height: ScaleHeight(30),
                marginTop: ScaleWidth(5)

            }}
            />

            <PlaceholderMedia style={{
                width: width - ScaleWidth(20),
                height: ScaleHeight(50),
                marginTop: ScaleWidth(15)

            }}
            />
            <PlaceholderMedia style={{
                width: width - ScaleWidth(20),
                height: ScaleHeight(50),
                marginTop: ScaleWidth(15)

            }}
            />

            <PlaceholderMedia style={{
                width: width - ScaleWidth(20),
                height: ScaleHeight(50),
                marginTop: ScaleWidth(15)

            }}
            />


        </View>



    </Placeholder>
);


export default OrderDetailsLazy;