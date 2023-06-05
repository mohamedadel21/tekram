import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'

const RefreshScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        }, []);
    return (
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    )
}

export default RefreshScreen;

