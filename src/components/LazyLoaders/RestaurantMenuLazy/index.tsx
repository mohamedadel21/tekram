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


const HomePopularLazyLoader = () => (

    <Placeholder style={styles.container} Animation={ShineOverlay}>

        <PlaceholderLine
            style={[styles.line, { bottom: ScaleHeight(10), borderRadius: 0 }]}
            height={ScaleHeight(200)}
        />

        <View style={styles.categoriesLazy}>
            <PlaceholderMedia style={{
                width: ScaleWidth(130),
                height: ScaleHeight(30),

            }}
            />
            <PlaceholderMedia style={{
                width: ScaleWidth(80),
                height: ScaleHeight(20),
                marginTop: ScaleWidth(5)

            }}
            />

            <FlatList
                style={styles.flatList}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={[{}, {}, {}, {}, {}, {}]}
                renderItem={({ }) => (
                    <PlaceholderMedia style={{
                        padding: ScaleWidth(2),
                        width: ScaleWidth(80),
                        height: ScaleHeight(40),
                        marginRight: ScaleWidth(10)

                    }}
                    />
                )}
                keyExtractor={(item, index) => JSON.stringify(index)}
            />

            <FlatList
                style={styles.flatList}
                showsHorizontalScrollIndicator={false}
                data={[{}, {}, {}, {}, {}, {}]}
                renderItem={({ }) => (
                    <View style={{ flexDirection: 'row' }}>
                        <PlaceholderMedia style={{
                            padding: ScaleWidth(2),
                            width: ScaleWidth(90),
                            height: ScaleWidth(90),
                            marginTop: ScaleWidth(10),
                            borderRadius: ScaleWidth(5),
                            marginHorizontal: ScaleWidth(10)

                        }}
                        />
                        <View >
                            <PlaceholderMedia style={{
                                width: ScaleWidth(180),
                                height: ScaleHeight(20),
                                marginTop: ScaleWidth(15)

                            }} />
                            <PlaceholderMedia style={{
                                width: ScaleWidth(120),
                                height: ScaleHeight(10),
                                marginTop: ScaleWidth(5)

                            }} />
                            <PlaceholderMedia style={{
                                width: ScaleWidth(40),
                                height: ScaleHeight(10),
                                marginTop: ScaleWidth(10)

                            }} />
                        </View>

                    </View>
                )}
                keyExtractor={(item, index) => JSON.stringify(index)}
            />
        </View>



    </Placeholder>
);


export default HomePopularLazyLoader;