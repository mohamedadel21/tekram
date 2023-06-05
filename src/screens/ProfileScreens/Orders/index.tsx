import React, { useEffect, useRef, useState } from 'react'
import { Animated, FlatList, SafeAreaView, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { TabView, SceneMap } from "react-native-tab-view";
import { Colors, width } from '../../../common/foundation';
import { useTranslation } from 'react-i18next';

import UpcomingItem from '../../../components/UpcomingItem';
import PastOrdersItem from '../../../components/PastOrdersItem';
import HomeHeader from '../../../components/Headers/HomeHeader';
import { useSelector, useDispatch } from 'react-redux';
import { GetPastOrdersAction, GetUpComingOrdersAction } from "../../../redux/actions/OrdersAction";
import EmptyItem from "../../../components/EmptyItem";
import IMAGES from '../../../common/images';

const Orders = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState("")
  const [index, setIndex] = useState(0);
  const timeout = useRef(null);
  const initialLayout = { width: width };
  const {
    upcommingOrdersData,
    upcommingOrdersLoading,

    pastOrdersData,
    pastOrdersLoading
  } = useSelector(
    (state: any) => state.OrdersReducer,
  );

  useEffect(() => {
    onRefreshUpcomingOrders()
    onRefreshPastOrders()
  }, [])

  const onRefreshUpcomingOrders = () => {
    dispatch(GetUpComingOrdersAction())

  }
  const onRefreshPastOrders = () => {
    dispatch(GetPastOrdersAction())

  }

  const FirstRoute = () => (

    (!upcommingOrdersLoading && upcommingOrdersData?.length > 0) ? <FlatList
      style={styles.flatList}
      data={upcommingOrdersData}
      renderItem={renderUpcomingItem}
      keyExtractor={(item, index) => JSON.stringify(item)}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={upcommingOrdersLoading} onRefresh={onRefreshUpcomingOrders} />}

    /> :
      <EmptyItem image={IMAGES.no_orders} title={t("empty.THERE_IS_NOUPCOMING_ORDER")} description={t("empty.THERE_IS_NOUPCOMING_ORDER_DESC")} />

  )


  const SecondRoute = () => (

    (!pastOrdersLoading && pastOrdersData?.length > 0) ?
      <FlatList
        style={styles.flatList}
        data={pastOrdersData}
        renderItem={renderPastOrdersItem}
        keyExtractor={(item, index) => JSON.stringify(item)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={pastOrdersLoading} onRefresh={onRefreshPastOrders} />}

      /> :
      <EmptyItem image={IMAGES.no_orders} title={t("empty.THERE_IS_NO_PAST_ORDERS")} description={t("empty.THERE_IS_NO_PAST_ORDERS_DESC")} />
  )
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,

  });

  const [routes] = useState([
    { key: "first", title: t("profile.upcoming") },
    { key: "second", title: t("profile.pastOrders") },

  ]);


  const renderTabBar = (props: any) => {
    return (
      <View style={styles.tabContainer} >
        {props.navigationState.routes.map((route: any, i: any) => {
          const color = index === i ? Colors.darkBlue : Colors.gray;
          const borderColor = index === i ? Colors.darkBlue : Colors.inputBackground;

          return (
            <TouchableOpacity
              style={[styles.tabsStyle, {
                borderColor: borderColor,
              }]}
              onPress={() => {
                setIndex(i);
              }}
            >
              <View>
                <Animated.Text
                  style={[styles.tabText, {
                    color,

                  }]}
                >
                  {route.title}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };



  const renderPastOrdersItem = ({ item, index }) => {

    return (
      <PastOrdersItem

        rate={item?.Order_review ?t('profile.rated'):t('profile.rate')}
        imageUrl={item?.RESTAURANT_FILE_URL}
        items={`${item?.ITEM_COUNT} ${item?.ITEM_COUNT > 1 ? t("orders.Items") : t("orders.Item")}`}
        name={item?.TITLE}
        status={item?.ORDER_STATUS_SETUP_ID}
        orderCode={`#${item?.ORDER_ID}`}
        rateAction={() =>{
          if(item?.Order_review){
            props.navigation.navigate('Rating', { order: item, screenFrom: "edit", item: item?.Order_review ,comeFrom:"orders"})
          }else{
            props.navigation.navigate('Rating', { order: item })
          }
        }}
        onPress={() => props.navigation.navigate("Track", { orderId: item?.ORDER_ID })}



      />
    );
  };


  const renderUpcomingItem = ({ item, index }) => {
    return (
      <UpcomingItem
        imageUrl={
          item?.RESTAURANT_FILE_URL
        }
        items={`${item?.ITEM_COUNT} ${item?.ITEM_COUNT > 1 ? t("orders.Items") : t("orders.Item")}`}
        name={item?.TITLE}
        status={item?.ORDER_STATUS_SETUP_ID}
        track={t('profile.track')}
        orderCode={`#${item?.ORDER_ID}`}
        onPress={() => props.navigation.navigate("Track", { orderId: item?.ORDER_ID })}
      />
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        navigation={props.navigation}
        title={t("profile.orders")}
        txtStyle={styles.txtStyle}
      />
      <TabView
        key={"key3"}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tabStyle}
        sceneContainerStyle={{ backgroundColor: Colors.white }}
      />

    </SafeAreaView>
  )
}

export default Orders
