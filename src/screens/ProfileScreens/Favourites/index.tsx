import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import StoreItem from "../../../components/StoreItemFavourite";
import StoreMenuItem from "../../../components/StoreMenuItem";
import styles from "./styles";
import { Colors, Fonts, ScaleWidth, width, ScaleHeight } from "../../../common/foundation";
import HomeHeader from "../../../components/Headers/HomeHeader";
import EmptyItem from "../../../components/EmptyItem";
import { useSelector, useDispatch } from 'react-redux';
import { GetFavouriteRestaurantsAction, DeleteFavouritesAction } from "../../../redux/actions/RestaurantsAction";
import IMAGES from "../../../common/images";

const Favourites = (props: any) => {
  const { t } = useTranslation();
  const { favouriteRestaurantsData,
    favouriteRestaurantsLoading } = useSelector(
      state => state.RestauarnatsReducer,
    );
  const dispatch = useDispatch();


  const onRefresh = () => {
    dispatch(GetFavouriteRestaurantsAction(0, 100))
  };

  const onPressFavourite = (item: any) => {
    dispatch(DeleteFavouritesAction(item?.FAVORITES_ID, (data) => {
      if (data) {
        onRefresh()
      }
    }))

  }

  const renderStoreItem = ({ item, index }) => {
    return (
      <StoreItem
        imageUrl={
          item?.Restaurant?.List_Uploaded_file?.length > 0 ? item?.Restaurant?.List_Uploaded_file[0]?.File_Url : null
        }
        description={item?.Restaurant?.DESCRIPTION}
        name={item?.Restaurant?.RESTAURANT_NAME}
        rating={item?.Restaurant?.STAR_RATING}
        time={`${item?.Restaurant?.MIN_DELIVERY_TIME} - ${item?.Restaurant?.MAX_DELIVERY_TIME} ${t("common.minutes")}`}
        style={styles.SearchRestuarantItem}
        isFavorite={true}
        onPressFavourite={() => onPressFavourite(item)}
        onPress={() => props.navigation.navigate("RestaurantMenu", { restaurantItem: item })}

      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        navigation={props.navigation}
        title={t("profile.favorites")}
      />



      {(!favouriteRestaurantsLoading && favouriteRestaurantsData?.length > 0) ? <FlatList
        style={styles.flatList}
        data={favouriteRestaurantsData}
        renderItem={renderStoreItem}
        keyExtractor={(item, index) => JSON.stringify(index)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={favouriteRestaurantsLoading} onRefresh={() => onRefresh()} />}
        ListFooterComponent={favouriteRestaurantsLoading ? <ActivityIndicator size='large' /> : null}
      /> :
       <EmptyItem image={IMAGES.no_favourites} title={t("empty.NO_FAVORITES_YET")} description={t("empty.NO_FAVORITES_YET_DESC")} />}

    </SafeAreaView>
  );
};

export default Favourites;
