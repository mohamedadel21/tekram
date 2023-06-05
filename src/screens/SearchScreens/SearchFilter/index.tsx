import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import RecentSearchItem from "../../../components/RecentSearchItem";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SearchInput from "../../../components/SearchInput";
import EmptyItem from "../../../components/EmptyItem";
import StoreItem from "../../../components/StoreItem";
import StoreMenuItem from "../../../components/StoreMenuItem";
import styles from "./styles";
import { Colors, Fonts, ScaleWidth, width, ScaleHeight, height } from "../../../common/foundation";
import StoreSearchFilterLazy from "../../../components/LazyLoaders/StoreSearchFilterLazy";
import { TabView, SceneMap } from "react-native-tab-view";
import { GetAllRestaurantsAction, GetFavouriteRestaurantsAction, AddFavouritesAction, DeleteFavouritesAction, GetAllItemsAction } from "../../../redux/actions/RestaurantsAction";
import { useSelector, useDispatch } from 'react-redux';
import IMAGES from "../../../common/images";
import { AddItemToCartAction, GetCartAction } from "../../../redux/actions/CartAction";
import AsyncStorage from '@react-native-community/async-storage';


const SearchFilter = (props: any) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("")
  const [index, setIndex] = React.useState(0);

  const [restaurantsList, setRestaurantsList] = useState([])
  const [itemssList, setItemsList] = useState([])
  const [count, setCount] = useState(null)
  const [itemsCount, setItemsCount] = useState(null)
  const timeout = useRef(null);
  const input = useRef(null);
  const dispatch = useDispatch();
  const { allRestaurantsLoading, favouriteRestaurantsData, allItemsLoading
  } = useSelector(
    state => state.RestauarnatsReducer,
  );
  const {
    profileData,

  } = useSelector(
    state => state.ProfileReducer,
  );

  const [refreshing, setRefreshing] = useState(false);

  const [loggedIn, setLoggedIn] = useState();


  const checkAuthStatus = async () => {
    const loggedInStatus = await AsyncStorage.getItem('loggedIn');
    setLoggedIn(loggedInStatus)
  }

  useEffect(() => {
    checkAuthStatus()
    onRefresh(0)
  }, [])

  useEffect(() => {
    onRefresh(2)
  }, [searchQuery])

  useEffect(() => {
    if (index == 1 && itemssList?.length == 0) {
      onRefresh(0)
    }
    if (index == 0 && restaurantsList?.length == 0) {
      onRefresh(0)
    }
  }, [index])


  const onRefreshFavourite = () => {
    dispatch(GetFavouriteRestaurantsAction(0, 100))

  }

  const onRefresh = (flag: number) => {

    if (flag == 0) {
      setRefreshing(true)
      if (index == 0) {
        dispatch(GetAllRestaurantsAction(0, count ? count : 5, searchQuery, (data) => {
          if (data) {
            setRestaurantsList(data?.List_Restaurant)
            setCount(data?.COUNT)
            setRefreshing(false)
          }
        }))
      }
      if (index == 1) {
        dispatch(GetAllItemsAction(0, itemsCount ? itemsCount : 5, searchQuery, (data) => {
          if (data) {
            setItemsList(data?.List_Item)
            setItemsCount(data?.COUNT)
            setRefreshing(false)
          }
        }))
      }
    } else if (flag == 1) {
      if (index == 0) {
        dispatch(GetAllRestaurantsAction(restaurantsList?.length, count ? count : 5, searchQuery, (data) => {
          if (data) {
            setRestaurantsList(restaurantsList.concat(data?.List_Restaurant))
            setCount(data?.COUNT)
          }
        }))
      }
      if (index == 1) {
        dispatch(GetAllItemsAction(itemssList?.length, itemsCount ? itemsCount : 5, searchQuery, (data) => {
          if (data) {
            setItemsList(itemssList.concat(data?.List_Item))
            setItemsCount(data?.COUNT)
          }
        }))
      }

    } else if (flag == 2) {
      setRefreshing(true)

      if (index == 0) {
        dispatch(GetAllRestaurantsAction(0, count ? count : 5, searchQuery, (data) => {
          if (data) {
            setRestaurantsList(data?.List_Restaurant)
            setCount(data?.COUNT)
            setRefreshing(false)
          }
        }))
      }
      if (index == 1) {
        dispatch(GetAllItemsAction(0, itemsCount ? itemsCount : 5, searchQuery, (data) => {
          if (data) {
            setItemsList(data?.List_Item)
            setItemsCount(data?.COUNT)
            setRefreshing(false)
          }
        }))
      }

    }

  };

  const onEndReachedStores = () => {
    if (!searchQuery) {

      if (index == 0 && restaurantsList.length < (count || 0)) {
        onRefresh(1)

      }
      if (index == 1 && itemssList.length < (itemsCount || 0)) {
        onRefresh(1)

      }
    }

  }

  const addToCartAction = (itemDetailsData: any) => {

    if (loggedIn) {

      let addons = []
      let offerGroupItems = []

      let item = {
        KEY: Math.random() * 100,
        QUANTITY: 1,
        ITEM_ID: parseInt(itemDetailsData.ITEM_ID),
        REQUESTS: "",
        price: itemDetailsData?.IS_DISCOUNTED && itemDetailsData?.DISCOUNT_PERCENTAGE > 0 ? itemDetailsData?.DISCOUNTED_PRICE : (itemDetailsData?.PRICE || 0),
        itemDetails: itemDetailsData,
        addonList: addons,
        offerGroupItems: offerGroupItems,
        restaurantDetails: itemDetailsData?.Restaurant,
      }
      dispatch(AddItemToCartAction(itemDetailsData.RESTAURANT_ID, item, (data) => {
        dispatch(GetCartAction(itemDetailsData.RESTAURANT_ID));
        //Alert.alert("","Added to Cart successfully!")
        props.navigation.navigate("RestaurantMenu", { restaurantItem: itemDetailsData?.Restaurant })
      }))
    } else {
      props.navigation.navigate('SignUp')

    }
  };


  const initialLayout = { width: width };
  const FirstRoute = () => (
    refreshing ? <StoreSearchFilterLazy /> :
      <FlatList
        style={styles.flatList}
        data={restaurantsList}
        renderItem={renderStoreItem}
        keyExtractor={(item, index) => JSON.stringify(index)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReached={onEndReachedStores}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(0)} />}
        ListFooterComponent={restaurantsList?.length > 0 ? null :
          <View style={{
            height: height / 2, width: width - ScaleWidth(50), justifyContent: 'center', alignItems: 'center'
          }}>
            <EmptyItem image={IMAGES.no_orders} title={t("empty.NO_STORES")} description={t("empty.NO_STORES_DESC")} />
          </View>
        }

      />
  )
  const SecondRoute = () => (
    refreshing ? <StoreSearchFilterLazy /> :
      <FlatList
        style={styles.flatList}
        data={itemssList}
        renderItem={renderStoreMenuItem}
        keyExtractor={(item, index) => JSON.stringify(index)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(0)} />}
        onEndReached={onEndReachedStores}
        ListFooterComponent={itemssList?.length > 0 ? null :
          <View style={{
            height: height / 2, width: width - ScaleWidth(50), justifyContent: 'center', alignItems: 'center'
          }}>
            <EmptyItem image={IMAGES.no_orders} title={t("empty.NO_ITEMS")} description={t("empty.NO_ITEMS_DESC")} />
          </View>
        }


      />
  )
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,

  });

  const [routes] = React.useState([
    { key: "first", title: t("search.stores") },
    { key: "second", title: t("search.items") },

  ]);


  const renderTabBar = (props: any) => {
    return (
      <View style={styles.tabContainer} >
        {props.navigationState.routes.map((route: any, i: any) => {
          const color = index === i ? Colors.darkBlue : Colors.gray;
          const borderColor = index === i ? Colors.darkBlue : Colors.gray;

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

  const renderRecentSearchItem = ({ item, index }) => {
    return (
      <RecentSearchItem
        key={JSON.stringify(index)}
        name={item.name}
        deleteIcon
      />
    );
  };
  const onChangeTextSearch = (value: any) => {
    setSearchQuery(value)

  }
  const onSubmitEditingSearch = () => {
    onRefresh(2)

  }

  const renderStoreMenuItem = ({ item, index }) => {
    const customerCurrency = profileData?.Currency?.RATE_FROM_USD || 1
    const restCurrency = item?.Currency?.RATE_FROM_USD || 1
    let currencyRate = customerCurrency == restCurrency ? 1 : (customerCurrency > restCurrency ? customerCurrency : (1 / restCurrency))

    return (
      <StoreMenuItem
        imageUrl={item?.File_Url}
        description={item?.DESCRIPTION}
        name={item?.NAME}
        currency={profileData?.Currency?.SYMBOL || item?.Currency?.SYMBOL}
        price={`${item?.IS_DISCOUNTED && item?.DISCOUNT_PERCENTAGE > 0 ? parseFloat((item?.DISCOUNTED_PRICE * (currencyRate || 1)).toFixed(2)).toLocaleString() : parseFloat((item?.PRICE * (currencyRate || 1)).toFixed(2)).toLocaleString()}`}
        style={styles.SearchRestuarantItem}
        onPress={() => props.navigation.navigate('MenuItem', { item: item })}
        addOnPress={() => { addToCartAction(item) }}

      />
    );
  };

  const renderStoreItem = ({ item, index }) => {
    return (
      <StoreItem
        imageUrl={
          item?.List_Uploaded_file?.length > 0 ? item?.List_Uploaded_file[0]?.File_Url : null
        }
        description={item?.DESCRIPTION}
        name={item?.RESTAURANT_NAME}
        rating={item?.STAR_RATING}
        time={`${item?.MIN_DELIVERY_TIME} - ${item?.MAX_DELIVERY_TIME} ${t("common.minutes")}`}
        isFavorite={favouriteRestaurantsData.filter(e => {
          e?.RESTAURANT_ID === item?.RESTAURANT_ID ? item.FAVORITES_ID = e?.FAVORITES_ID : null
          return e?.RESTAURANT_ID === item?.RESTAURANT_ID
        }
        ).length >
          0
          ? true
          : false}
        onPressFavourite={() => onPressFavourite(item)}
        style={styles.SearchRestuarantItem}
        onPress={() => props.navigation.navigate("RestaurantMenu", { restaurantItem: item })}
        navigation={props.navigation}

      />
    );
  };

  const onPressFavourite = (item: any) => {
    favouriteRestaurantsData.filter(e => e?.RESTAURANT_ID === item?.RESTAURANT_ID).length >
      0
      ? dispatch(DeleteFavouritesAction(item?.FAVORITES_ID, (data) => {
        if (data) {
          onRefreshFavourite()
        }
      }))
      : dispatch(AddFavouritesAction(item?.RESTAURANT_ID, (data) => {
        if (data) {
          onRefreshFavourite()
        }
      }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>


        <SearchInput
        value={searchQuery}
          ref={input}
          inputStyle={styles.input}
          placeholder={t("search.searchYourFavorites")}
          onChangeText={onChangeTextSearch}
          returnKeyType='done'
          onSubmitEditing={onSubmitEditingSearch}
          editable={true}
          clearButtonMode='always'
          close={searchQuery ? true : false}
          closeOnPress={() => {
            setSearchQuery("")
          }}
        />
      </View>

      { /*<View style={styles.tabview}>
        <TouchableOpacity
          style={styles.buttonFilter}
          onPress={() => props.navigation.navigate('Filter')}
        >
          <FontAwesome
            name={"sliders"}
            size={ScaleWidth(15)}
            color={Colors.darkBlue}
          />
        </TouchableOpacity>
        <FlatList
          style={styles.row}
          horizontal
          data={[{
            name: 'Fast Food'
          }, {
            name: 'Popular'
          }, {
            name: 'High End'
          }]}
          renderItem={renderRecentSearchItem}
          keyExtractor={(item, index) => JSON.stringify(index)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        </View>*/}
      <TabView
        key={"xccc"}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tabStyle}
        sceneContainerStyle={{ backgroundColor: Colors.white }}
      />

    </SafeAreaView>
  );
};

export default SearchFilter;
