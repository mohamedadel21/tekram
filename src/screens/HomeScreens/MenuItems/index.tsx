import { Animated, FlatList, SafeAreaView, RefreshControl, Platform, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import styles from './styles';
import RestaurantItemHeader from '../../../components/Headers/RestaurantItemHeader';
import { Colors, ScaleWidth, ScaleHeight, width } from '../../../common/foundation';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTranslation } from 'react-i18next';
import Input from '../../../components/Input';
import RestaurantMenuItemLazy from '../../../components/LazyLoaders/RestaurantMenuItemLazy';
import RestuarantMenuItem from '../../../components/RestuarantMenuItem';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from 'react-redux';
import { GetItemsByItemIdAction } from "../../../redux/actions/RestaurantsAction";
import { AddItemToCartAction, GetCartAction } from "../../../redux/actions/CartAction";
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';


const MenuItems = (props: any) => {


  const { t } = useTranslation();
  const dispatch = useDispatch();
  const itemDetails = props.route.params.item;
  const restaurantDetails = props.route.params.restaurantDetails;
  const [heightOffset, setHeightOffset] = useState(ScaleHeight(200))
  let scrollOffsetY = useRef(new Animated.Value(0)).current;
  const timeout = useRef(null);
  const [count, setCount] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0.0)
  const [listAddons, setListAddons] = useState([])
  const [listOffer, setListOffer] = useState([])
  const [details, setDetails] = useState("")
  const {
    itemDetailsData,
    itemDetailsLoading
  } = useSelector(
    state => state.RestauarnatsReducer,
  );

  const [loggedIn, setLoggedIn] = useState();


  const checkAuthStatus = async () => {
    const loggedInStatus = await AsyncStorage.getItem('loggedIn');
    setLoggedIn(loggedInStatus)
  }

  const {
    profileData,

  } = useSelector(
    state => state.ProfileReducer,
  );

  const {
    addItemToCartData,
    addItemToCartLoading,
  } = useSelector(
    state => state.CartReducer,
  );


  useEffect(() => {
    checkAuthStatus()
    onRefresh()
  }, [])

  useEffect(() => {
    if (itemDetailsData?.List_Addon) {
      setListAddons(itemDetailsData?.List_Addon)
    }
    if (itemDetailsData?.List_Offer) {
      setListOffer(itemDetailsData?.List_Offer)
    }
  }, [itemDetailsData])


  useEffect(() => {
    getTotalPrice(listAddons,listOffer)
  }, [count,listOffer,listAddons])

  const onRefresh = () => {
    dispatch(GetItemsByItemIdAction(itemDetails?.ITEM_ID))
  }

  const addToCartAction = () => {

    if (loggedIn) {


      let addons = []
      let offerGroupItems = []
      listAddons.filter(item => {
        if (item?.isSelected == true) {
          addons.push(item)
        }
      })

      listOffer.filter(offer => {
        offer?.List_Offer_group?.filter(group => {
          group?.List_Offer_group_item?.filter(item => {
            if (item?.isSelected == true) {
              offerGroupItems.push(item)
            }
          })
        })
  
      })

      let item = {
        KEY: Math.random() * 100,
        QUANTITY: count,
        ITEM_ID: parseInt(itemDetailsData.ITEM_ID),
        REQUESTS: details,
        price: itemDetailsData?.IS_DISCOUNTED && itemDetailsData?.DISCOUNT_PERCENTAGE > 0 ? itemDetailsData?.DISCOUNTED_PRICE : (itemDetailsData?.PRICE || 0),
        itemDetails: itemDetails,
        addonList: addons,
        offerGroupItems:offerGroupItems,
        restaurantDetails: restaurantDetails,
      }
      dispatch(AddItemToCartAction(itemDetailsData.RESTAURANT_ID, item, (data) => {
        dispatch(GetCartAction(itemDetailsData.RESTAURANT_ID));
        //Alert.alert("","Added to Cart successfully!")
        props.navigation.goBack()

      }))
    } else {
      props.navigation.navigate('SignUp')

    }
  };


  const renderRestuarantMenuItem = ({ item, index }) => {
    const customerCurrency=profileData?.Currency?.RATE_FROM_USD||1
    const restCurrency=itemDetails?.Currency?.RATE_FROM_USD||1
    let currencyRate=customerCurrency== restCurrency ?1:(customerCurrency>restCurrency?customerCurrency:(1/restCurrency))
  
    return (
      <RestuarantMenuItem
        name={item?.NAME}
        isSelected={item?.isSelected}
        price={`+${profileData?.Currency.SYMBOL || item?.Currency.SYMBOL} ${parseFloat(parseFloat(item?.PRICE * (currencyRate || 1)).toFixed(2)).toLocaleString()}`}
        onPress={() => menuItemHandler(item, index)}
      />
    )
  }


  const getTotalPrice = (listOne, listTwo) => {


    let total = 0.0;

  
    listOne.map(item => {

    
      if (item?.isSelected == true) {
        total += parseFloat(item?.PRICE*count * (currencyRate || 1))
      }
    })

    listTwo.map(offer => {

      offer?.List_Offer_group?.map(group => {

        group?.List_Offer_group_item?.map(item => {
          if (item?.isSelected == true) {
            total += parseFloat(item?.PRICE*count * (currencyRate || 1))
          }else{
            total+=0.0000005435
          }
        })
      })


    })

    setTotalPrice(total)
  }

  const menuItemHandler = (item, index) => {
    let listAddonsNew = listAddons;
    listAddonsNew[index] = { ...item, isSelected: !item?.isSelected }

    setListAddons(listAddonsNew)

    getTotalPrice(listAddonsNew, listOffer)

  }

  const offerMenuItemHandler = (item, index, index1, index2) => {
    let listOfferNew = listOffer;
    listOfferNew[index].List_Offer_group[index1].List_Offer_group_item[index2] = { ...item, isSelected: !item?.isSelected }
    setListOffer(listOfferNew)

    console.log(listOfferNew);
    
    getTotalPrice(listAddons, listOfferNew)

  }


  const onChangeTextDetails = (value: any) => {
    setDetails(value)
  }

  const customerCurrency=profileData?.Currency?.RATE_FROM_USD||1
  const restCurrency=itemDetails?.Currency?.RATE_FROM_USD||1
  let currencyRate=customerCurrency== restCurrency ?1:(customerCurrency>restCurrency?customerCurrency:(1/restCurrency))


  return (
    <View style={styles.container}>

      {itemDetailsLoading ? <RestaurantMenuItemLazy /> :
        <SafeAreaView style={styles.container}>

          <RestaurantItemHeader
            isDiscount={false}
            height={ScaleHeight(200)}
            style={[styles.imageStyle]}
            title=""
            navigation={props.navigation}
            imageUrl={itemDetailsData?.File_Url}
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;
              clearTimeout(timeout.current);
              timeout.current = setTimeout(() => {
                setHeightOffset(height)
              }, 100);
            }}

            blurRadius={heightOffset < ScaleHeight(100) ? 20 : 0}
            animHeaderValue={scrollOffsetY}
          />

          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ScrollView}
            scrollEventThrottle={50}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
              { useNativeDriver: false }
            )}
          >
            <Text style={styles.title}>
              {itemDetails?.NAME}
            </Text>

            <View style={styles.view}>
              <View style={styles.priceView}>
                <Text style={styles.dollarSign}>{profileData?.Currency?.SYMBOL || itemDetails?.Currency?.SYMBOL}
                  <Text style={styles.price}>{itemDetailsData?.IS_DISCOUNTED && itemDetailsData?.DISCOUNT_PERCENTAGE > 0 ? parseFloat((itemDetailsData?.DISCOUNTED_PRICE * (currencyRate || 1)).toFixed(2)).toLocaleString() : parseFloat((itemDetailsData?.PRICE * (currencyRate || 1)).toFixed(2)).toLocaleString()}</Text>
                </Text>

                <View style={styles.countView}>
                  <TouchableOpacity disabled={count == 1} onPress={() => setCount(count == 1 ? 1 : count - 1)}>
                    <AntDesign name='minuscircleo' size={ScaleWidth(30)} color={count > 1 ? Colors.darkBlue : Colors.gray} />
                  </TouchableOpacity>
                  <Text style={styles.count}>{count}</Text>
                  <TouchableOpacity onPress={() => setCount(count + 1)}>
                    <AntDesign name='pluscircle' size={ScaleWidth(30)} color={Colors.darkBlue} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.description}>{itemDetails?.DESCRIPTION}</Text>

              {listOffer.map((offer, index) => {
                return (
                  <View key={JSON.stringify(offer)} >
                    <Text style={styles.txt}>{offer?.NAME}</Text>
                    {offer?.List_Offer_group.map((group, index1) => {

                      return (
                        <View key={JSON.stringify(group)}                        >
                        <View style={{width:width-ScaleWidth(50),flexDirection:'row'}}>
                        <Text style={styles.txt}>{group?.NAME}</Text>
                        <Text style={styles.quality}>{t("common.choose")+" "+group?.List_Offer_group_item?.filter((i) => i?.isSelected)?.length+"/"+group?.QUANTITY}</Text>
                          </View>
                          {group?.List_Offer_group_item?.map((item, index2) => {
                                
                                const customerCurrency=profileData?.Currency?.RATE_FROM_USD||1
                                const restCurrency=itemDetails?.Currency?.RATE_FROM_USD||1
                                let currencyRate=customerCurrency== restCurrency ?1:(customerCurrency>restCurrency?customerCurrency:(1/restCurrency))
                              
                            return (
                              <RestuarantMenuItem
                                key={JSON.stringify(item)}
                                name={item?.NAME}
                                isSelected={item?.isSelected}
                                disabled={group?.List_Offer_group_item?.filter((i) => i?.isSelected)?.length == group?.QUANTITY && !item?.isSelected}
                                price={`+${profileData?.Currency.SYMBOL || item?.Currency.SYMBOL} ${parseFloat(parseFloat(item?.PRICE * (currencyRate || 1)).toFixed(2)).toLocaleString()}`}
                                onPress={() => offerMenuItemHandler(item, index, index1, index2)}
                              />
                            )

                          })}
                        </View>
                      )
                    })}
                  </View>
                )

              })}

              {listAddons?.length > 0 ? <Text style={styles.txt}>{t("common.addons")}</Text> : null}

              <FlatList
                data={listAddons}
                renderItem={renderRestuarantMenuItem}
                keyExtractor={(item, index) => JSON.stringify(index)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                  <RefreshControl refreshing={itemDetailsLoading} onRefresh={onRefresh} />
                }
              />

              <View style={styles.special}>
                <Text style={styles.txt}>{'Any Special Instructions'}</Text>
                <Input
                  placeholder={'Tell us here...'}
                  mainStyle={styles.input}
                  onChangeText={onChangeTextDetails}
                />
              </View>
            </View>

          </KeyboardAwareScrollView>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={addToCartAction}

          >

            <Text style={styles.addToCart}>
              {t("home.addToCart")}
            </Text>
            <Text style={styles.totalPrice}>
              {profileData?.Currency?.SYMBOL || itemDetails?.Currency?.SYMBOL} {parseFloat(parseFloat(totalPrice + ((itemDetails?.IS_DISCOUNTED && itemDetails?.DISCOUNT_PERCENTAGE > 0 ? (itemDetails?.DISCOUNTED_PRICE * (currencyRate || 1)) : (itemDetails?.PRICE * (currencyRate || 1))) * count)).toFixed(2)).toLocaleString()}
            </Text>
            {addItemToCartLoading ? <ActivityIndicator style={{ marginRight: ScaleWidth(10) }} size='small' color={Colors.white} /> : null}
          </TouchableOpacity>

        </SafeAreaView>}
    </View>
  )
}

export default MenuItems;