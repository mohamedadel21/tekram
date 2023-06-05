import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Image,
  FlatList,
  Platform
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SearchInput from "../../../components/SearchInput";
import HomeAddressHeader from "../../../components/Headers/HomeAddressHeader";
import CategoryItem from "../../../components/CategoryItem";
import RestuarantItem from "../../../components/RestuarantItem";
import AppButton from "../../../components/AppButton";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import IMAGES from "../../../common/images";
import AsyncStorage from '@react-native-community/async-storage';
import styles from "./styles";
import { Colors, height, ScaleHeight, ScaleWidth, width } from "../../../common/foundation";
import HomeAddressAndCategoriesLazyLoader from "../../../components/LazyLoaders/HomeAddressAndCategoriesLazyLoader";
import { GetHomeAction } from "../../../redux/actions/HomeAction";
import { useSelector, useDispatch } from 'react-redux';
import { GetFavouriteRestaurantsAction, AddFavouritesAction, DeleteFavouritesAction, } from "../../../redux/actions/RestaurantsAction";
import { GetProfileAction, updateCustomerProfile ,UpdategGuestCurrencyAction} from "../../../redux/actions/ProfileAction";
import { Notifications } from 'react-native-notifications';
import messaging from "@react-native-firebase/messaging";
import RBSheet from "react-native-raw-bottom-sheet";
import { AddAddress, GetAddressesAction } from "../../../redux/actions/AddressesAction";
import AddressItem from '../../../components/AddressItem';


const Home = (props: any) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const {
    favouriteRestaurantsData } = useSelector(
      state => state.RestauarnatsReducer,
    );
  const { profileData,getCurrencyListData
  } = useSelector(
    state => state.ProfileReducer,
  );
  const dispatch = useDispatch();
  const { homeData,
    homeLoading } = useSelector(
      state => state.HomeReducer,
    );
  const RBSheetRef = useRef();
  const [loggedIn, setLoggedIn] = useState();

  const { addAddressData,
    addAddressLoading,
    regionsData,
    regionsLoading,
    addressesData
  } = useSelector(
    state => state.AddressesReducer,
  );

  const checkAuthStatus = async () => {
    const loggedInStatus = await AsyncStorage.getItem('loggedIn');
    setLoggedIn(loggedInStatus)
  }

  const getGuestCurrency=async()=>{
    const currency_id= await AsyncStorage.getItem("currency_id");
  let currency=null
    getCurrencyListData?.filter((item: any) => {
      if (item?.CURRENCY_ID == currency_id) {
        currency = item
      }
    })
    if(currency){
     dispatch(UpdategGuestCurrencyAction(currency))
    }
  
  }
  
  var currency = null
  getCurrencyListData?.filter((item: any) => {
    if (item?.CURRENCY_ID == profileData?.CURRENCY_ID) {
      currency = item
    }
  })

  useEffect(() => {
    onRefresh()
    checkAuthStatus()
    dispatch(GetProfileAction())
    onRefreshFavourite()

    if (profileData) {
      saveDeviceToken()

    }

  }, [])

  const saveDeviceToken = () => {
    Notifications.registerRemoteNotifications();
    Notifications.events().registerRemoteNotificationsRegistered(async (event) => {
      const fcmtoken = await messaging().getToken();
      console.log("deviceTokennnn", fcmtoken);
      let form = {
        fullName: profileData?.NAME,
        phone: profileData?.User.MOBILE_NUMBER,
        callingCode: profileData?.User?.MOBILE_NUMBER_EXTENSION,
        CURRENCY_ID: profileData?.CURRENCY_ID,
        NOTIFICATION_TOKEN: fcmtoken,
        email: profileData?.User?.EMAIL
      }
      dispatch(updateCustomerProfile(form, (data) => {
        if (data.Customer) {
          dispatch(GetProfileAction())
        }
      }))


    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed((event) => {
      console.error("Device Token error", event);
    });
  }



  useEffect(() => {
    dispatch(GetProfileAction())
  }, [homeData])


  const onRefreshFavourite = () => {
    dispatch(GetFavouriteRestaurantsAction(0, 100))

  }

  const onRefresh = () => {
    setRefreshing(true)

    dispatch(GetHomeAction((data) => {
      if (data) {
        getGuestCurrency()
        setRefreshing(false)
      }
    }))
    onRefreshFavourite()
    dispatch(GetAddressesAction((data) => { }))

  };

  const popularRestuarantsAction = () => {
    props.navigation.navigate("Restuarants", { data: { title: t("home.popularRestaurants"), id: 1 } });
  };

  const discountedRestuarantsAction = () => {
    props.navigation.navigate("Restuarants", { data: { title: t("home.upto50%OFF"), id: 2 } });
  };
  const allRestuarantsAction = () => {
    props.navigation.navigate("Restuarants", { data: { title: t("home.allRestaurants"), id: 0 } });
  };
  const renderCategoryItem = ({ item, index }) => {

    return (
      <CategoryItem
        imageUrl={item?.File_Url}
        name={item?.NAME}
        onPress={() => props.navigation.navigate("RestuarantsByCategory", { item: item })}
      />
    );
  };

  const renderAddressItem = ({ item }) => {
    return (
      <AddressItem
        name={item?.NICKNAME}
        phone={item?.BUILDING_NAME}
        addressInfo={item?.MAP_LOCATION_ADDRESS}
        showEditButton={true}
        isSelected={item?.CUSTOMER_ADDRESS_ID == homeData?.Customer_address?.CUSTOMER_ADDRESS_ID}
        disabled={item?.CUSTOMER_ADDRESS_ID == homeData?.Customer_address?.CUSTOMER_ADDRESS_ID}
        choose
        onPress={() => setDefaultAddress(item)}
      />
    );
  }

  const setDefaultAddress = (item:any) => {
    const form = {
      nickName: item?.NICKNAME,
      street: item?.STREET,
      building: item?.BUILDING_NAME,
      region: {
        REGION_ID: item?.REGION_ID
      },
      area: {
        AREA_ID: item?.AREA_ID
      },
      unit: item?.UNIT,
      floor: item?.FLOOR,
      addressDetails: item?.ADDRESS_DETAILS,
      location: {
        latitude: item?.LATITUDE,
        longitude: item?.LONGITUDE,
        address: item?.MAP_LOCATION_ADDRESS
      },
      CUSTOMER_ADDRESS_ID: item?.CUSTOMER_ADDRESS_ID,
      IS_CURRENT: true,
      IS_DEFAULT: false,
    }
    RBSheetRef.current.close()

    dispatch(AddAddress(form, async (data) => {
      if (data.Customer_address) {
        await AsyncStorage.setItem("LATITUDE", item?.LATITUDE + "")
        await AsyncStorage.setItem("LONGITUDE", item?.LONGITUDE + "")
        onRefresh()
      }
    }))
  }

  const renderRestuarantItem = ({ item, index }) => {

    const customerCurrency=profileData?.Currency?.RATE_FROM_USD||1
    const restCurrency=item?.Currency?.RATE_FROM_USD||1
    let currencyRate=customerCurrency== restCurrency ?1:(customerCurrency>restCurrency?customerCurrency:(1/restCurrency))
  
    if (item?.IS_DELETED == false) {
      return (
        <RestuarantItem
          imageUrl={
            item?.List_Uploaded_file[1]?.File_Url || null
          }
          name={item?.RESTAURANT_NAME}
          categories={item?.DESCRIPTION}
          rating={item?.STAR_RATING || 0}
          ratingCount={item?.List_Order_review?.length || 0}
          isDiscount={item?.IS_DISCOUNTED}
          discount={parseInt(item?.DISCOUNT_PERCENTAGE) + "%"}
          deliveryTime={`${item?.MIN_DELIVERY_TIME} - ${item?.MAX_DELIVERY_TIME} ${t("common.minutes")}`}
          deliveryFee={item?.IS_FREE_DELIVERY ? t("common.freeDelivery") : `${profileData?.Currency?.SYMBOL || item?.Currency?.SYMBOL} ${parseFloat(parseFloat(item?.DELIVERY_CHARGE).toFixed(2)*parseFloat(currencyRate)).toLocaleString()}`}
          isFavorite={favouriteRestaurantsData.filter(e => {
            e?.RESTAURANT_ID === item?.RESTAURANT_ID ? item.FAVORITES_ID = e?.FAVORITES_ID : null
            return e?.RESTAURANT_ID === item?.RESTAURANT_ID
          }
          ).length >
            0
            ? true
            : false}

          onpressFavourite={() => onpressFavourite(item)}
          onPress={() => props.navigation.navigate("RestaurantMenu", { restaurantItem: item })}
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



  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={homeLoading} onRefresh={onRefresh} />
        }
      >
        {homeLoading ?
          <HomeAddressAndCategoriesLazyLoader />
          :
          <View>
            {loggedIn ?
              <HomeAddressHeader
                navigation={props.navigation}
                address={homeData?.Customer_address?.NICKNAME}
                imageUrl={
                  homeData?.CUSTOMER_FILE_URL
                }
                name={profileData?.NAME ? t("home.welcome", { name: profileData?.NAME }) : null}
                onPress={() => [
                  props.navigation.navigate("Account")
                ]}
                addressDisabled={!homeData?.Customer_address?.NICKNAME}
                onPressAddress={() => {
                  RBSheetRef.current.open()
                }}
                onPressAddAddress={() => {
                  props.navigation.navigate("AddressMap", { type: "add", comeFrom: "home" })
                }}
              /> : <View style={{ height:Platform.OS=='ios'? ScaleHeight(30):ScaleHeight(10) }} />}

            <SearchInput
              mainStyle={styles.input}
              placeholder={t("search.searchYourFavorites")}
              returnKeyType='done'
              editable={false}
              sliders
              onPress={() => props.navigation.navigate("SearchFilter")}
              filterOnPress={allRestuarantsAction}
            />
            <View style={styles.bannerView}>
              <View>
                <Text style={styles.findYourFavoriteFoods}>
                  {t("home.findYourFavoriteFoods")}
                </Text>
                <Text style={styles.upTo50OFFOnSelectedStores}>
                  {t("home.upTo50%OFFOnSelectedStores")}
                </Text>
              </View>
              <Image
                source={IMAGES.burger}
                resizeMode="contain"
                style={styles.burgerImage}
              />
            </View>
            <Text style={styles.categories}>{t("home.categories")}</Text>

            <FlatList
              style={styles.flatList}
              horizontal
              data={homeData?.List_Category}
              renderItem={renderCategoryItem}
              keyExtractor={(item, index) => JSON.stringify(index)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />

            <View style={styles.listHeader}>
              <Text numberOfLines={1} style={[styles.BrowseByCategory]}>
                {t("home.popularRestaurants")}
              </Text>
              <TouchableOpacity
                onPress={popularRestuarantsAction}
                style={styles.listHeaderRightContent}
              >
                <Text numberOfLines={1} style={[styles.ViewAll]}>
                  {t("home.viewAll")}
                </Text>
                <EvilIcons
                  name={"chevron-right"}
                  size={ScaleWidth(23)}
                  color={Colors.darkBlue}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              style={styles.flatList}
              contentContainerStyle={{ alignItems: 'center' }}
              horizontal
              data={homeData?.RESTAURANT_WITH_COUNT?.List_Restaurant}
              renderItem={renderRestuarantItem}
              keyExtractor={(item, index) => JSON.stringify(index)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={
                homeData?.RESTAURANT_WITH_COUNT?.List_Restaurant?.length > 0 ? <TouchableOpacity style={styles.flatListFooter} onPress={popularRestuarantsAction}>
                  <Text style={[styles.ViewAll]}> {t("home.viewAll")}</Text>
                  <AntDesign name='rightcircleo' size={ScaleWidth(20)} color={Colors.darkBlue} style={{ marginLeft: ScaleWidth(5) }} />
                </TouchableOpacity> : null}

            />
            <View style={styles.listHeader}>
              <Text numberOfLines={1} style={[styles.BrowseByCategory]}>
                {t("home.upto50%OFF")}
              </Text>
              <TouchableOpacity
                onPress={discountedRestuarantsAction}
                style={styles.listHeaderRightContent}
              >
                <Text numberOfLines={1} style={[styles.ViewAll]}>
                  {t("home.viewAll")}
                </Text>
                <EvilIcons
                  name={"chevron-right"}
                  size={ScaleWidth(23)}
                  color={Colors.darkBlue}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.flatList}
              contentContainerStyle={{ alignItems: 'center' }}
              horizontal
              data={homeData?.DISCOUNTED_RESTAURANT_WITH_COUNT?.List_Restaurant}
              renderItem={renderRestuarantItem}
              keyExtractor={(item, index) => JSON.stringify(index)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={
                homeData?.DISCOUNTED_RESTAURANT_WITH_COUNT?.List_Restaurant?.length > 0 ? <TouchableOpacity style={styles.flatListFooter} onPress={discountedRestuarantsAction}>
                  <Text style={[styles.ViewAll]}> {t("home.viewAll")}</Text>
                  <AntDesign name='rightcircleo' size={ScaleWidth(20)} color={Colors.darkBlue} style={{ marginLeft: ScaleWidth(5) }} />
                </TouchableOpacity> : null}
            />
            <View style={{ height: ScaleHeight(25) }} />
          </View>
        }



      </KeyboardAwareScrollView>

      <RBSheet
        ref={RBSheetRef}
        height={height / 1.3}
        openDuration={250}
        customStyles={{
          container: styles.sheet,
        }}
      >
        <Text style={styles.chooseDeliveryLocation}>{t("address.chooseDeliveryLocation")}</Text>
        <FlatList
          style={styles.addressFlatList}
          data={addressesData}
          renderItem={renderAddressItem}
          keyExtractor={(item, index) => JSON.stringify(index)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            <AppButton
              title={t("profile.addNew")}
              style={styles.signupButton}
              textStyle={styles.signupText}
              onPress={() => {
                RBSheetRef.current.close();
                props.navigation.navigate("AddressMap", { type: "add", comeFrom: 'home' });
              }}

            />
          }
        />

      </RBSheet>


    </View>
  );
};

export default Home;
