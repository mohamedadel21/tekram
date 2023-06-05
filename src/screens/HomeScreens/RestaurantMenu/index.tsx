import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  FlatList,
  SafeAreaView
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import RestaurantHeader from '../../../components/Headers/RestaurantHeader';
import AsyncStorage from '@react-native-community/async-storage';
import styles2 from './styles';
import RestuarantMenu from '../../../components/RestuarantMenu';
import { Colors, Fonts, ScaleHeight, ScaleWidth, width, height } from '../../../common/foundation';
import { useTranslation } from 'react-i18next';
import AntDesign from "react-native-vector-icons/AntDesign";
import HomeHeader from '../../../components/Headers/HomeHeader';
import EmptyItem from '../../../components/EmptyItem';
import { useSelector, useDispatch } from 'react-redux';
import { GetRestaurantByIdAction ,GetFavouriteRestaurantsAction,AddFavouritesAction,DeleteFavouritesAction} from "../../../redux/actions/RestaurantsAction";
import { GetCartAction } from "../../../redux/actions/CartAction";
import RestaurantMenuLazy from "../../../components/LazyLoaders/RestaurantMenuLazy";
import IMAGES from '../../../common/images';
const aspectRatio = height / width;

const windowHeight = Dimensions.get('window').height;
const TabBarHeight = ScaleHeight(ScaleHeight(45));
const SafeStatusBar = Platform.select({
  ios: ScaleHeight(44),
  android: StatusBar.currentHeight,
});

const PullToRefreshDist = ScaleWidth(ScaleWidth(150));

const App = (props) => {
  /**
   * stats
   */
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const restaurantItem = props.route.params.restaurantItem;
  const [tabIndex, setIndex] = useState(0);
  const [menu, setMenu] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [viewableItems, setViewableItems] = useState([]);
  const [routes, setRoutes] = useState([

  ]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0.0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState();

  const [canScroll, setCanScroll] = useState(true);
  const [HeaderHeight, setHeaderHeight] = useState(aspectRatio > 1.6 ? ScaleHeight(285) : ScaleHeight(200))

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScrollY = useRef(new Animated.Value(0)).current;

  const headerMoveScrollY = useRef(new Animated.Value(0)).current;
  const listRefArr = useRef(routes);
  const listOffset = useRef({});
  const isListGliding = useRef(false);
  const headerScrollStart = useRef(0);
  const _tabIndex = useRef(0);
  const refreshStatusRef = useRef(false);
  
  const {
    profileData,

  } = useSelector(
    state => state.ProfileReducer,
  );

  const {
    restaurantDetailsData,
    restaurantDetailsLoading,
    favouriteRestaurantsData
  } = useSelector(
    state => state.RestauarnatsReducer,
  );

  const {
    cartData,
    cartLoading
  } = useSelector(
    state => state.CartReducer,
  );
  const customerCurrency=profileData?.Currency?.RATE_FROM_USD||1
  const restCurrency=restaurantItem?.Currency?.RATE_FROM_USD||1
  let currencyRate=customerCurrency== restCurrency ?1:(customerCurrency>restCurrency?customerCurrency:(1/restCurrency))

  console.log("cartData", cartData);

  useEffect(() => {
    dispatch(GetRestaurantByIdAction(restaurantItem?.RESTAURANT_ID))
    dispatch(GetCartAction(restaurantItem?.RESTAURANT_ID))
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const loggedInStatus = await AsyncStorage.getItem('loggedIn');
    setLoggedIn(loggedInStatus)
  }
  useEffect(() => {
    if (cartData) {
      let cartTotalPrice = 0.0,
        cartItemCount = 0
      cartData.map((item: any) => {
        cartTotalPrice += parseFloat(item?.price) * parseInt(item?.QUANTITY);
        cartItemCount += parseInt(item?.QUANTITY);
        item?.addonList?.map((addon: any) => {
          cartTotalPrice += parseFloat(addon?.PRICE)*parseFloat(item?.QUANTITY)
        })

        item?.offerGroupItems?.map(offer => {
          if (offer?.isSelected == true) {
            cartTotalPrice += parseFloat(offer?.PRICE)*parseFloat(item?.QUANTITY)
          }
        })

      })
      setCartItemCount(cartItemCount)
      setCartTotalPrice(cartTotalPrice)
    }
  }, [cartData])



  useEffect(() => {
    let result: any = []
    let routes: any = []
    let itemList: any = []
    restaurantDetailsData?.List_Menu_classification?.map((menu: any) => {
      let items: any = []
      let index = 0
      restaurantDetailsData?.List_Item?.map((item: any) => {
        if (menu?.MENU_CLASSIFICATION_ID == item?.MENU_CLASSIFICATION_ID&&menu?.IS_ACTIVE==true) {
          item.index = index
          items?.push(item)
          itemList?.push(item)
          index++;

        }
      })
      menu.items = items
      if (
        items?.length > 0
      ) {
        if(menu?.IS_ACTIVE==true){
        routes.push({ key: menu?.MENU_CLASSIFICATION_ID + '', title: menu?.NAME, items: items })
        result.push(menu)
        }
      }

    })
    setRoutes(routes)
    setItemList(itemList)
    setMenu(result)
  }, [restaurantDetailsData])

  const goToCart = () => {
    if (loggedIn) {
      props.navigation.navigate('Cart', { restaurantDetails: restaurantItem })
    } else {
      props.navigation.navigate('SignUp')

    }
  }

  const renderRestuarantMenu = ({ item, index }) => {
    const customerCurrency=profileData?.Currency?.RATE_FROM_USD||1
    const restCurrency=item?.Currency?.RATE_FROM_USD||1
    let currencyRate=customerCurrency== restCurrency ?1:(customerCurrency>restCurrency?customerCurrency:(1/restCurrency))


    return (
      <View>
        {item?.index == 0 ? <Text style={[styles2.popular, { marginTop: index == 0 ? Platform.OS == 'ios' ? ScaleHeight(0) : ScaleHeight(20) : ScaleHeight(10) }]}>
          {item.Menu_classification?.NAME}
        </Text> : null}
        <RestuarantMenu
          onPress={() => props.navigation.navigate('MenuItem', { item: item, restaurantDetails: restaurantDetailsData })}
          imageUrl={
            item?.File_Url
          }
          description={item?.DESCRIPTION}
          name={item?.NAME}
          price={`${parseFloat(item?.PRICE * (currencyRate || 1)).toFixed(2)}`}
          discountedPrice={`${item?.IS_DISCOUNTED && item?.DISCOUNT_PERCENTAGE > 0 ? (item?.DISCOUNTED_PRICE * (currencyRate || 1)).toFixed(2) : (item?.PRICE * (currencyRate || 1)).toFixed(2)}`}
          currency={`${profileData?.Currency?.SYMBOL || item?.Currency?.SYMBOL}`}
          isDiscounted={item?.IS_DISCOUNTED && item?.DISCOUNT_PERCENTAGE > 0}
        />
      </View>

    );
  };
  const headerPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        syncScrollOffset();
        return false;
      },

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderEnd: (evt, gestureState) => {
        handlePanReleaseOrEnd(evt, gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        const curListRef = listRefArr.current.find(
          (ref) => ref?.key === routes[_tabIndex.current]?.key,
        );
        const headerScrollOffset = -gestureState.dy + headerScrollStart.current;

        if (curListRef?.value) {
          // scroll up
          if (headerScrollOffset > 0) {
            console.log("xxxxxx");

            curListRef?.value.scrollToOffset({
              offset: headerScrollOffset,
              animated: false,
            });
            // start pull down
          } else {
            console.log("yyyyyy");

            if (Platform.OS === 'ios') {
              curListRef?.value.scrollToOffset({
                offset: headerScrollOffset / 3,
                animated: false,
              });
            } else if (Platform.OS === 'android') {
              if (!refreshStatusRef.current) {
                headerMoveScrollY.setValue(headerScrollOffset / 1.5);
              }
            }
          }
        }
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollStart.current = scrollY._value;
      },
    }),
  ).current;

  /**
   * PanResponder for list in tab scene
   */
  const listPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        headerScrollY.stopAnimation();
        return false;
      },
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        headerScrollY.stopAnimation();
      },
    }),
  ).current;

  /**
   * effect
   */
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex]?.key;
      listOffset.current[curRoute] = value;
    });

    headerScrollY.addListener(({ value }) => {
      listRefArr.current.forEach((item) => {
        if (item?.key !== routes[tabIndex]?.key) {
          return;
        }
        if (value > HeaderHeight || value < 0) {
          headerScrollY.stopAnimation();
          syncScrollOffset();
        }
        if (item?.value && value <= HeaderHeight) {
          item?.value.scrollToOffset({
            offset: value,
            animated: false,
          });
        }
      });
    });
    return () => {
      scrollY.removeAllListeners();
      headerScrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  /**
   *  helper functions
   */
  const syncScrollOffset = () => {

    const curRouteKey = routes[_tabIndex.current]?.key;

    listRefArr?.current.forEach((item) => {
      if (item?.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item?.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item?.key] < HeaderHeight ||
            listOffset.current[item?.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item?.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const startRefreshAction = () => {
    if (Platform.OS === 'ios') {
      listRefArr.current.forEach((listRef) => {
        listRef.value.scrollToOffset({
          offset: ScaleHeight(-50),
          animated: true,
        });
      });
      refresh().finally(() => {
        syncScrollOffset();
        // do not bounce back if user scroll to another position
        if (scrollY._value < 0) {
          listRefArr.current.forEach((listRef) => {
            listRef.value.scrollToOffset({
              offset: 0,
              animated: true,
            });
          });
        }
      });
    } else if (Platform.OS === 'android') {
      Animated.timing(headerMoveScrollY, {
        toValue: ScaleHeight(-150),
        duration: 300,
        useNativeDriver: true,
      }).start();
      refresh().finally(() => {
        Animated.timing(headerMoveScrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handlePanReleaseOrEnd = (evt, gestureState) => {
    syncScrollOffset();
    headerScrollY.setValue(scrollY._value);
    if (Platform.OS === 'ios') {
      if (scrollY._value < 0) {
        if (scrollY._value < -PullToRefreshDist && !refreshStatusRef.current) {
          startRefreshAction();
        } else {
          // should bounce back
          listRefArr.current.forEach((listRef) => {
            listRef.value.scrollToOffset({
              offset: 0,
              animated: true,
            });
          });
        }
      } else {
        if (Math.abs(gestureState.vy) < 0.2) {
          return;
        }
        Animated.decay(headerScrollY, {
          velocity: -gestureState.vy,
          useNativeDriver: true,
        }).start(() => {
          syncScrollOffset();
        });
      }
    } else if (Platform.OS === 'android') {
      if (
        headerMoveScrollY._value < 0 &&
        headerMoveScrollY._value / 1.5 < -PullToRefreshDist
      ) {
        startRefreshAction();
      } else {
        Animated.timing(headerMoveScrollY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const onMomentumScrollBegin = (e) => {

    const offsetY = e.nativeEvent.contentOffset.y;

    if (offsetY < ScaleHeight(250)) {
      props.navigation.setOptions({ headerShown: false })

    } else if (offsetY >= ScaleHeight(250)) {
      props.navigation.setOptions({ headerShown: true, title: restaurantItem?.RESTAURANT_NAME })

    }
    isListGliding.current = true;

  };

  const onMomentumScrollEnd = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;

    if (offsetY < ScaleHeight(250)) {
      props.navigation.setOptions({ headerShown: false })

    } else if (offsetY >= ScaleHeight(250)) {
      props.navigation.setOptions({ headerShown: true, title: restaurantItem?.RESTAURANT_NAME })

    }
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = (e) => {
    syncScrollOffset();

    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY < ScaleHeight(250)) {
      props.navigation.setOptions({ headerShown: false })

    } else if (offsetY >= ScaleHeight(250)) {
      props.navigation.setOptions({ headerShown: true, title: restaurantItem?.RESTAURANT_NAME })

    }
    // iOS only
    if (Platform.OS === 'ios') {
      if (offsetY < -PullToRefreshDist && !refreshStatusRef.current) {
        startRefreshAction();
      }
    }

    // check pull to refresh
  };

  const refresh = async () => {
    console.log('-- start refresh');
    refreshStatusRef.current = true;
    dispatch(GetRestaurantByIdAction(restaurantItem?.RESTAURANT_ID))
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('done');
      }, 2000);
    }).then((value) => {
      console.log('-- refresh done!');
      refreshStatusRef.current = false;
    });
  };

  /**
   * render Helper
   */
  const onRefreshFavourite = () => {
    dispatch(GetFavouriteRestaurantsAction(0, 100))

  }

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

  const renderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: 'clamp',
      // extrapolate: 'clamp',
    });

  const isFavorite=  favouriteRestaurantsData.filter(e => {
      e?.RESTAURANT_ID === restaurantItem?.RESTAURANT_ID ? restaurantItem.FAVORITES_ID = e?.FAVORITES_ID : null
      return e?.RESTAURANT_ID === restaurantItem?.RESTAURANT_ID
    }
    ).length >
      0
      ? true
      : false
      
    return (
      <Animated.View
        {...headerPanResponder.panHandlers}
        style={[styles.header, { transform: [{ translateY: y }] }]}

        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;

          setHeaderHeight(height)

        }}
      >

        <RestaurantHeader
          isDiscount={true}
          height={ScaleHeight(250)}
          deliveryTime={`${restaurantDetailsData?.MIN_DELIVERY_TIME || ""}-${restaurantDetailsData?.MAX_DELIVERY_TIME || ""}`}
          deliveryTimeType={t("common.minutes")}
          style={[styles2.imageStyle,]}
          navigation={props.navigation}
          imageUrl={restaurantDetailsData?.List_Uploaded_file[1]?.File_Url}

        />
        <Text style={styles2.title}>
          {restaurantDetailsData?.RESTAURANT_NAME}
        </Text>
       
        <View style={styles2.ratingView}>
          <AntDesign
            name={"star"}
            size={ScaleWidth(17)}
            color={Colors.primary}
          />
          <Text style={styles2.rating}>{parseFloat(restaurantDetailsData?.STAR_RATING).toFixed(1)}</Text>
          <Text style={styles2.ratingCount}>{"(" + (restaurantDetailsData?.List_Order_review?.length || 0) + ")"}</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Reviews", { restaurantDetailsData: restaurantDetailsData })}>
            <Text style={styles2.seeReview}>{t('home.seeReview')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
        if (loggedIn) {
          onpressFavourite(restaurantItem)
        }else{
          props.navigation.navigate("SignUp")
        }
        }} style={styles2.favoriteButton}>
        <AntDesign
          name={isFavorite ? "heart" : "hearto"}
          size={ScaleWidth(17)}
          color={isFavorite ? Colors.darkBlue : Colors.text}
        />
      </TouchableOpacity>
        </View>

      </Animated.View>
    );
  };


  const y = scrollY.interpolate({
    inputRange: [0, HeaderHeight],
    outputRange: [HeaderHeight, 0],
    // extrapolate: 'clamp',
    extrapolateRight: 'clamp',
  });

  useEffect(() => {
    console.log("viewableItems", viewableItems);

    routes.map((route, index) => {
      if (
        viewableItems[1]?.item?.MENU_CLASSIFICATION_ID == route?.key
      ) {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          setIndex(index)
          flatListRouteRef?.current?.scrollToIndex({ animated: true, index: index >= 0 ? ((index > 1?index -1:index)) : 0 })

        }, 100);

        return
      }
    })




  }, [viewableItems])
  const onViewableItemsChanged = ({
    viewableItems,
  }) => {
    setViewableItems(viewableItems)

  };
  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged },
  ]);
  const flatListRef = useRef();
  const flatListRouteRef = useRef();
  const timeout = useRef();

  return (
    <View style={styles.container}>
      {restaurantDetailsLoading ? <RestaurantMenuLazy /> :

        <SafeAreaView style={styles.container}>

          <Animated.View
            style={{
              zIndex: 1,
              top: 0,
              position: 'absolute',
              transform: [{ translateY: y }],
              width: '100%',
              alignSelf: 'center',
              backgroundColor: Colors.white,
            }}>

            {(!restaurantDetailsLoading && itemList?.length > 0) ?
              <FlatList
                ref={flatListRouteRef}
                data={routes}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: ScaleHeight(20), borderBottomColor: Colors.inputBackground,
                  borderBottomWidth: ScaleWidth(2),
                }}
                contentContainerStyle={[routes?.length>1?{

                  alignItems: 'center',
                  justifyContent: 'center',

                }:null, routes.length <= 3 ? { width: width } : null]}
                horizontal
                keyExtractor={(_, index) => `list_item${index}`}
                renderItem={({ item, index }) => {

                  return (
                    <TouchableOpacity style={[{
                      height: ScaleHeight(45),
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: ScaleWidth(10),
                      backgroundColor: Colors.white,
                      borderBottomColor: index == tabIndex ? Colors.darkBlue : Colors.inputBackground,
                      borderBottomWidth: index == tabIndex ? ScaleWidth(2) : 0,
                    }, routes.length == 2 ? { width: width / 2 } : (routes.length == 3 ? { width: width / 3 } : null)]}

                      onPress={() => {
                        let toIndex = 0
                        routes.slice(0, index).map((route, indexItem) => {
                          route?.items.map(i => {
                            toIndex++;
                          })
                        })

                        if (toIndex < itemList.length) {
                          flatListRef?.current?.scrollToIndex({ animated: true, index: toIndex > 0 ? (toIndex > 1?toIndex -1:toIndex) : 0 })
                        }

                        setIndex(index)
                      }}>

                      <Text style={[styles.label, { color: index == tabIndex ? Colors.darkBlue : Colors.gray }]}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )
                }}
              /> :
              null}



          </Animated.View>

          {(!restaurantDetailsLoading && itemList?.length > 0) ?
            <Animated.FlatList
              ref={flatListRef}
              scrollToOverflowEnabled={true}
              scrollEnabled={canScroll}
              {...listPanResponder.panHandlers}
              scrollEventThrottle={16}
              onScroll={
                Animated.event(
                  [
                    {
                      nativeEvent: { contentOffset: { y: scrollY } },
                    },
                  ],
                  { useNativeDriver: true },
                )

              }
              onMomentumScrollBegin={onMomentumScrollBegin}
              onScrollEndDrag={onScrollEndDrag}
              onMomentumScrollEnd={onMomentumScrollEnd}
              ItemSeparatorComponent={() => <View style={{ height: ScaleHeight(10) }} />}
              ListHeaderComponent={() => <View style={{ height: ScaleHeight(10) }} />}
              contentContainerStyle={{
                paddingTop: HeaderHeight + TabBarHeight,
                paddingHorizontal: ScaleWidth(10),
                minHeight: windowHeight - SafeStatusBar + HeaderHeight,
              }}
              showsHorizontalScrollIndicator={false}
              data={itemList}
              renderItem={renderRestuarantMenu}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              viewabilityConfig={{
                itemVisiblePercentThreshold: 50
              }}
              viewabilityConfigCallbackPairs={
                viewabilityConfigCallbackPairs.current
              }
              ListFooterComponent={<View style={{height:ScaleHeight(200)}}/>}
            /> :
            <EmptyItem imageStyle={{ marginTop: ScaleHeight(150) }} image={IMAGES.no_orders} title={t("empty.NO_ITEMS")} description={t("empty.NO_ITEMS_DESC")} />
          }

          {renderHeader()}

          <TouchableOpacity
            style={styles2.addToCartButton}
            onPress={goToCart}
          >
            <View style={styles2.countCartView}>
              <Text style={styles2.countCart}>
                {cartItemCount}
              </Text>
            </View>
            <Text style={styles2.addToCart}>
              {t("home.viewCart")}
            </Text>
            <Text style={styles2.totalPrice}>
              {profileData?.Currency?.SYMBOL || restaurantItem?.Currency?.SYMBOL} {parseFloat(parseFloat(cartTotalPrice * (currencyRate || 1)).toFixed(2)).toLocaleString()}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    width: '100%',
    position: 'absolute',
    backgroundColor: Colors.white,
  },
  header2: {
    width: '100%',
    position: 'absolute',
    backgroundColor: Colors.white,
  },
  label: { fontSize: ScaleWidth(14), fontFamily: Fonts.medium, color: '#222' },
  tab: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: Colors.white,
    height: TabBarHeight,
  },
  indicator: { backgroundColor: Colors.darkBlue },
});

export default App;