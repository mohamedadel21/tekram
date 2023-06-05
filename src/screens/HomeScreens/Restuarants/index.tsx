import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native";
import HomeHeader from "../../../components/Headers/HomeHeader";
import RestuarantItem from "../../../components/RestuarantItem";
import EmptyItem from "../../../components/EmptyItem";
import RecentSearchItem from "../../../components/RecentSearchItem";
import SearchInput from "../../../components/SearchInput";
import styles from "./styles";
import {
  Colors,
  ScaleHeight,
  ScaleWidth,
  width,
  height
} from "../../../common/foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { GetPopularRestaurantsAction, GetDiscountedRestaurantsAction, GetAllRestaurantsAction, GetFavouriteRestaurantsAction, AddFavouritesAction, DeleteFavouritesAction } from "../../../redux/actions/RestaurantsAction";
import { useSelector, useDispatch } from 'react-redux';
import RestaurantsLazyLoader from "../../../components/LazyLoaders/RestaurantsLazyLoader";
import IMAGES from "../../../common/images";

const PopularRestuarants = (props: any) => {
  const { t } = useTranslation();
  const params = props.route.params.data;
  const [searchQuery, setSearchQuery] = useState("")
  const [restaurantsList, setRestaurantsList] = useState([])
  const [count, setCount] = useState(null)
  const timeout = useRef(null);
  const dispatch = useDispatch();
  const { popularRestaurantsData, discountedRestaurantsLoading, allRestaurantsLoading, favouriteRestaurantsData,
    popularRestaurantsLoading } = useSelector(
      state => state.RestauarnatsReducer,
    );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onRefresh(0)
  }, [])

  useEffect(() => {
    onRefresh(2)
  }, [searchQuery])

  const onRefreshFavourite = () => {
    dispatch(GetFavouriteRestaurantsAction(0, 100))

  }

  const onRefresh = (flag: number) => {

    if (flag == 0) {
      setRefreshing(true)
      if (params?.id == 0) {
        dispatch(GetAllRestaurantsAction(0, 10, searchQuery, (data) => {
          if (data) {
            setRestaurantsList(data?.List_Restaurant)
            setCount(data?.count)
            setRefreshing(false)
          }
        }))
      }
      if (params?.id == 1) {
        dispatch(GetPopularRestaurantsAction(0, 10, searchQuery, (data) => {
          if (data) {
            setRestaurantsList(data?.List_Restaurant)
            setCount(data?.count)
            setRefreshing(false)
          }
        }))
      }
      if (params?.id == 2) {
        dispatch(GetDiscountedRestaurantsAction(0, 10, searchQuery, (data) => {
          if (data) {
            setRestaurantsList(data?.List_Restaurant)
            setCount(data?.count)
            setRefreshing(false)
          }
        }))
      }

    } else if (flag == 1) {
      if (params?.id == 0) {
        dispatch(GetAllRestaurantsAction(restaurantsList?.length, 10, searchQuery, (data) => {
          if (data) {
            setRestaurantsList(restaurantsList.concat(data?.List_Restaurant))
            setCount(data?.count)
          }
        }))
      }
      if (params?.id == 1) {
        dispatch(GetPopularRestaurantsAction(restaurantsList?.length, 10, searchQuery, (data) => {
          if (data) {
            setRestaurantsList(restaurantsList.concat(data?.List_Restaurant))
            setCount(data?.count)
          }
        }))
      }
      if (params?.id == 2) {
        dispatch(GetDiscountedRestaurantsAction(restaurantsList?.length, 10, searchQuery, (data) => {
          if (data) {
            setRestaurantsList(restaurantsList.concat(data?.List_Restaurant))
            setCount(data?.count)
          }
        }))
      }


    } else if (flag == 2) {
      if (params?.id == 0) {
        setRefreshing(true)
        dispatch(GetAllRestaurantsAction(0, count ? count : 10, searchQuery, (data) => {
          if (data) {
            console.log("search", data.List_Restaurant);

            setRestaurantsList(data?.List_Restaurant)
            setCount(data?.count)
            setRefreshing(false)
          }
        }))
      }

      if (params?.id == 1) {
        setRefreshing(true)
        dispatch(GetPopularRestaurantsAction(0, count ? count : 10, searchQuery, (data) => {
          if (data) {
            console.log("search", data.List_Restaurant);

            setRestaurantsList(data?.List_Restaurant)
            setCount(data?.count)
            setRefreshing(false)
          }
        }))
      }

      if (params?.id == 2) {
        setRefreshing(true)
        dispatch(GetDiscountedRestaurantsAction(0, count ? count : 10, searchQuery, (data) => {
          if (data) {
            console.log("search", data.List_Restaurant);

            setRestaurantsList(data?.List_Restaurant)
            setCount(data?.count)
            setRefreshing(false)
          }
        }))
      }

    }

  };

  const onEndReached = () => {
    onRefresh(1)
  }

  const renderRestuarantItem = ({ item, index }) => {
    if (item?.IS_DELETED == false) {
      return (
        <RestuarantItem
          imageUrl={
            item?.List_Uploaded_file[1]?.File_Url
          }
          name={item?.RESTAURANT_NAME}
          categories={item?.DESCRIPTION}
          rating={item?.STAR_RATING || 0}
          ratingCount={item?.List_Order_review?.length || 0}
          isDiscount={item?.IS_DISCOUNTED}
          discount={parseInt(item?.DISCOUNT_PERCENTAGE) + "%"}
          deliveryTime={`${item?.MIN_DELIVERY_TIME} - ${item?.MAX_DELIVERY_TIME} ${t("common.minutes")}`}
          deliveryFee={item?.IS_FREE_DELIVERY ? t("common.freeDelivery") : `${item?.Currency?.SYMBOL}${parseFloat(item?.DELIVERY_CHARGE).toFixed(2)}`}
          style={{ width: width - ScaleWidth(40), marginBottom: ScaleHeight(20) }}
          imageStyle={{ width: width - ScaleWidth(40) }}
          isFavorite={favouriteRestaurantsData.filter(e => {
            e?.RESTAURANT_ID === item?.RESTAURANT_ID ? item.FAVORITES_ID = e?.FAVORITES_ID : null
            return e?.RESTAURANT_ID === item?.RESTAURANT_ID
          }
          ).length >
            0
            ? true
            : false}
          onpressFavourite={() => onpressFavourite(item)}
          onPress={() => props.navigation.navigate("RestaurantMenu",{restaurantItem:item})}
          navigation={props.navigation}

        />
      );
    } else return;
  };

  const onpressFavourite = (item: any) => {
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

  const renderRecentSearchItem = ({ item, index }) => {
    return (
      <RecentSearchItem
        key={JSON.stringify(index)}
        name={item.name}

      />
    );
  };
  const onChangeTextSearch = (value: any) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setSearchQuery(value)
    }, 1000);
  }
  const onSubmitEditingSearch = () => {
    onRefresh()
  }

  return (
    <View style={styles.container}>
      <HomeHeader
        navigation={props.navigation}
        title={params?.title}
      />

      <SearchInput
        inputStyle={styles.input}
        placeholder={t("search.searchYourFavorites")}
        onChangeText={onChangeTextSearch}
        returnKeyType='done'
        onSubmitEditing={onSubmitEditingSearch}
        editable={true}
      />


      {/*<View style={styles.tabview}>
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

      {refreshing?<RestaurantsLazyLoader/>:<FlatList
        style={styles.flatList}
        data={restaurantsList}
        renderItem={renderRestuarantItem}
        keyExtractor={(item, index) => JSON.stringify(index)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReached={onEndReached}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(0)} />}
        ListFooterComponent={restaurantsList?.length > 0 ? null :
          <View style={{
            height: height / 2, width: width - ScaleWidth(50), justifyContent: 'center', alignItems: 'center'
          }}>
            <EmptyItem image={IMAGES.no_orders} title={t("empty.NO_STORES")} description={t("empty.NO_STORES_DESC")} />
          </View>
        }
      />}
    </View>
  );
};

export default PopularRestuarants;
