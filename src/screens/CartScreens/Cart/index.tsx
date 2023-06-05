import { Alert, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTranslation } from 'react-i18next';
import RBSheet from "react-native-raw-bottom-sheet";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Colors, ScaleHeight, ScaleWidth, height } from '../../../common/foundation';
import Input from '../../../components/Input';
import AppButton from '../../../components/AppButton';
import HomeHeader from '../../../components/Headers/HomeHeader';
import ExtraItems from '../../../components/ExtraItems';
import AddressItem from '../../../components/AddressItem';
import PaymentItems from '../../../components/PaymentItems';
import styles from './styles';
import IMAGES from '../../../common/images';
import { useSelector, useDispatch } from 'react-redux';
import { GetCartAction, VerifyPromoCode, FinalizeOrder, GetGeneralSettings } from "../../../redux/actions/CartAction";
import { GetAddressesAction } from "../../../redux/actions/AddressesAction";
import AsyncStorage from '@react-native-community/async-storage';
import EmptyItem from '../../../components/EmptyItem';
import Ionicons from 'react-native-vector-icons/Ionicons';



const Cart = (props: any) => {
  const refRBSheet = useRef();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const restaurantDetails = props.route.params.restaurantDetails;
  const [promoCode, setPromoCode] = useState("")
  const [date, setDate] = useState(null)
  const [address, setAddress] = useState([{}, {}])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [cartTotalPrice, setCartTotalPrice] = useState(0.0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isCheckedPromo, setIsCheckedPromo] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const {
    profileData,

  } = useSelector(
    state => state.ProfileReducer,
  );

  const { addressesData,
  } = useSelector(
    state => state.AddressesReducer,
  );
  const { homeData } = useSelector(
    state => state.HomeReducer,
  );

  const customerCurrency=profileData?.Currency?.RATE_FROM_USD||1
  const restCurrency=restaurantDetails?.Currency?.RATE_FROM_USD||1
  let currencyRate=customerCurrency== restCurrency ?1:(customerCurrency>restCurrency?customerCurrency:(1/restCurrency))


  const {
    cartData,
    cartLoading,
    verifyPromoCodeData,
    verifyPromoCodeLoading,
    finalizeOrderData,
    finalizeOrderLoading,

    generalSettingsData,
    generalSettingsLoading
  } = useSelector(
    state => state.CartReducer,
  );

  useEffect(() => {
    setDisabled(!selectedAddress)

  }, [selectedAddress])

  useEffect(() => {
    dispatch(GetAddressesAction((data) => { }))
    dispatch(GetGeneralSettings())
    setIsCheckedPromo(false)
  }, [])


  useEffect(() => {
    let selectedAddress = null
    if (addressesData) {
      addressesData.filter(address => {
        if (address.IS_CURRENT == true) {
          selectedAddress = address
        }
      })
      setSelectedAddress(selectedAddress)
    }

  }, [addressesData])


  useEffect(() => {
    if (cartData) {
      setCartItems(cartData)
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
      setCartTotalPrice(cartTotalPrice * (currencyRate || 1))
    }
  }, [cartData])

  useEffect(() => {
    dispatch(VerifyPromoCode(""))

  }, [])

  const promoCodeAction = () => {
    setIsCheckedPromo(true)
    dispatch(VerifyPromoCode(String(promoCode).trim()))
  };


  const deleteItemById = async (item: any) => {
    const filteredData = cartData?.filter(res => res?.KEY !== item?.KEY);

    await AsyncStorage.setItem(restaurantDetails?.RESTAURANT_ID + "", JSON.stringify(filteredData));

    dispatch(GetCartAction(restaurantDetails?.RESTAURANT_ID))
  }


  const plusAction = async (item: any, index: any) => {

    let cartDataNew = cartData;
    cartDataNew[index] = { ...item, QUANTITY: item?.QUANTITY + 1 }

    await AsyncStorage.setItem(restaurantDetails?.RESTAURANT_ID + "", JSON.stringify(cartDataNew));

    dispatch(GetCartAction(restaurantDetails?.RESTAURANT_ID))
  }

  const minusAction = async (item: any, index: any) => {

    let cartDataNew = cartData;
    cartDataNew[index] = { ...item, QUANTITY: item?.QUANTITY - 1 }

    await AsyncStorage.setItem(restaurantDetails?.RESTAURANT_ID + "", JSON.stringify(cartDataNew));

    dispatch(GetCartAction(restaurantDetails?.RESTAURANT_ID))
  }


  const emptyCart = async () => {

    let cartDataNew = [];

    await AsyncStorage.setItem(restaurantDetails?.RESTAURANT_ID + "", JSON.stringify(cartDataNew));

    dispatch(GetCartAction(restaurantDetails?.RESTAURANT_ID))
  }


  const renderExtraItems = ({ item, index }) => {
    return (
      <ExtraItems
        title={item?.itemDetails?.NAME}
        price={`${parseFloat((parseFloat(item?.price) * parseFloat(currencyRate) * parseInt(item?.QUANTITY))).toLocaleString()}`}
        currency={profileData?.Currency?.SYMBOL}
        addons={item?.addonList}
        offerGroupItems={item?.offerGroupItems}
        minus={() => minusAction(item, index)}
        plus={() => plusAction(item, index)}
        outputCount={item?.QUANTITY}
        disabled={item?.QUANTITY == 1}
        close={() => deleteItemById(item)}
        isLastItem={index == cartData?.length - 1}
        currencyRate={currencyRate}
      />
    )
  }

  const renderAddressItem = ({ item, index }) => {
    if (showAllAddresses == false) {

      if (item?.IS_DEFAULT == true) {
        return addressCart(item)
      }
    } else {
      return addressCart(item)
    }
  };

  const addressCart = (item: any) => {
    return (
      <AddressItem
        name={item?.NICKNAME}
        phone={item?.BUILDING_NAME}
        addressInfo={item?.MAP_LOCATION_ADDRESS}
        showEditButton={true}
        isSelected={item?.CUSTOMER_ADDRESS_ID == selectedAddress?.CUSTOMER_ADDRESS_ID}
        choose
        onPress={() => setSelectedAddress(item)}
      />
    );
  }

  const renderPaymentItem = ({ item, index }) => {
    return (
      <PaymentItems
        name={`item ${index}`}
        phone={`Visa Card`}
        addressInfo={`Expires on 16/24`}
        showEditButton={true}
        isSelected={item?.isSelected}
        choose
        onPress={() => menuPaymentHandler(item, index)}
      />
    );
  };

  const renderDateItems = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => setDate(index)}
        style={[styles.scheduleView, {
          backgroundColor: date == index ? Colors.inputBackground : Colors.white
        }]}>
        <Text style={styles.day}>{`item ${index}`}</Text>
        <View style={styles.timeView}>
          <Text style={styles.time}>{'12:15 PM'} - </Text>
          <Text style={styles.time}>{'12:30 PM'}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const checkoutAction = async () => {
    const customer_id = await AsyncStorage.getItem('customer_id');

    var d1 = new Date(),
      timeFrom = new Date(d1), timeTo = new Date(d1);
    timeFrom.setMinutes(d1.getMinutes() + restaurantDetails?.MIN_DELIVERY_TIME);
    timeTo.setMinutes(d1.getMinutes() + restaurantDetails?.MAX_DELIVERY_TIME);

    let lisT_PROMOTION_ID = [], list_Item_Cart = []
    cartItems?.map((item => {
      let addons = []
      let offerGroupItems = []
      item?.addonList?.map((addon: any) => {
        addons.push({
          "ordeR_ITEM_ADDON_ID": -1,
          "ordeR_ITEM_ID": item?.ITEM_ID,
          "addoN_ID": addon?.ADDON_ID,
          "name": addon?.NAME,
          "price": addon?.PRICE,
          "entrY_USER_ID": addon?.ENTRY_USER_ID,
          "entrY_DATE": addon?.ENTRY_DATE,
          "lasT_UPDATE": addon?.LAST_UPDATE,
          "iS_DELETED": addon?.IS_DELETED,
          "owneR_ID": addon?.OWNER_ID
        })
      })

      item?.offerGroupItems?.map((offerGroupItem: any) => {
        offerGroupItems.push({
          "ORDER_ITEM_OFFER_GROUP_ITEM_ID": -1,
          "OFFER_GROUP_ITEM_ID": offerGroupItem?.OFFER_GROUP_ITEM_ID,
          "ordeR_ITEM_ID": item?.ITEM_ID,
          "name": offerGroupItem?.NAME,
          "price": offerGroupItem?.PRICE,
          "entrY_USER_ID": offerGroupItem?.ENTRY_USER_ID,
          "entrY_DATE": offerGroupItem?.ENTRY_DATE,
          "lasT_UPDATE": offerGroupItem?.LAST_UPDATE,
          "iS_DELETED": offerGroupItem?.IS_DELETED,
          "owneR_ID": offerGroupItem?.OWNER_ID
        })
      })

      item.addons = addons;
      item.offerGroupItems = offerGroupItems;
      list_Item_Cart.push({
        "quantity": item?.QUANTITY,
        "iteM_ID": item?.ITEM_ID,
        "requests": item?.REQUESTS,
        "list_Order_item_addon": item?.addons,
        "List_Order_item_offer_group_item": item?.offerGroupItems,

      })
    }))
    if (verifyPromoCodeData?.i_Result?.IS_ACTIVE) {
      lisT_PROMOTION_ID.push(verifyPromoCodeData?.i_Result.PROMOTION_ID)
    }

    dispatch(FinalizeOrder(
      {
        "unit": selectedAddress?.UNIT,
        "areA_ID": selectedAddress?.AREA_ID,
        "floor": selectedAddress?.FLOOR,
        "street": selectedAddress?.STREET,
        "regioN_ID": selectedAddress?.REGION_ID,
        "nickname": selectedAddress?.NICKNAME,
        "currencY_ID": profileData?.Currency?.CURRENCY_ID,
        "customeR_ID": parseInt(customer_id),
        "latitude": selectedAddress?.LATITUDE,
        "longitude": selectedAddress?.LONGITUDE,
        "restauranT_ID": parseInt(restaurantDetails?.RESTAURANT_ID),
        "buildinG_NAME": selectedAddress?.BUILDING_NAME,
        //   "scheduleD_TIME":timeFrom.getHours()+":"+timeFrom.getMinutes()+" - "+timeTo.getHours()+":"+timeTo.getMinutes() ,
        "addresS_DETAILS": selectedAddress?.ADDRESS_DETAILS,
        "maP_LOCATION_ADDRESS": selectedAddress?.MAP_LOCATION_ADDRESS,
        "lisT_PROMOTION_ID":
          lisT_PROMOTION_ID
        ,
        "paymenT_METHOD_SETUP_ID": 23,
        "list_Item_Cart": list_Item_Cart
      }, (data) => {

        if (data?.i_Result) {
          props.navigation.navigate("Track", { orderId: data?.i_Result?.ORDER_ID })
          emptyCart()
        } else {
          Alert.alert("", data?.Exception_Message);

        }
      }

    ))

    /*props.navigation.navigate("Track")*/
  }
  const setDeliveryAction = () => { }


  const menuPaymentHandler = (item, index) => {
    let sortItemsNew = address;
    sortItemsNew[index] = { ...item, isSelected: !item?.isSelected }
    setAddress(sortItemsNew)
  }
  const subTotal = verifyPromoCodeData?.i_Result?.IS_ACTIVE ? cartTotalPrice - ((cartTotalPrice * verifyPromoCodeData?.i_Result?.DISCOUNT_PERCENTAGE) / 100).toFixed(2) : cartTotalPrice
  let TaxAndFeesPrice = null

  if (generalSettingsData?.length > 0) {
    TaxAndFeesPrice = ((((profileData?.Currency?.CURRENCY_ID == 1 ? subTotal*generalSettingsData[0]?.TAX_RATE : subTotal))  * (parseFloat(generalSettingsData[0]?.TAX_PERCENTAGE)) / 100)).toFixed(2)
  }
  const DeliveryPrice = restaurantDetails?.IS_FREE_DELIVERY || verifyPromoCodeData?.i_Result?.IS_FREE_DELIVERY == true ? 0 : parseFloat(parseFloat(restaurantDetails?.DELIVERY_CHARGE).toFixed(2)*parseFloat(currencyRate)).toLocaleString()
  const finalPrice = (parseFloat(subTotal) + parseFloat(DeliveryPrice)).toFixed(2)

  

  return (
    <View style={styles.container}>
      <HomeHeader
        title={t('cart.cart')}
        navigation={props.navigation}
      />

      {(cartData?.length > 0) ?
        <ScrollView contentContainerStyle={styles.ScrollView}>

          <View style={styles.view}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={cartData}
              renderItem={renderExtraItems}
              keyExtractor={(item, index) => JSON.stringify(index)}
            />
            <View style={styles.promoCode}>
              <Input
                inputStyle={styles.input}
                placeholder={t('cart.code')}
                onChangeText={(value: any) => setPromoCode(value)}
                value={promoCode}
              />
              <AppButton
                style={styles.signupButton}
                textStyle={styles.signupText}
                title={t("search.apply")}
                onPress={promoCodeAction}
                loading={verifyPromoCodeLoading}
                disabled={!promoCode}
              />
            </View>
            {verifyPromoCodeData?.i_Result ? <Text style={styles.verifyPromoCodeData}><AntDesign name='checkcircle' color={Colors.green} size={ScaleWidth(13)} />{verifyPromoCodeData?.i_Result?.DISCOUNT_PERCENTAGE > 0 ? " Your " + verifyPromoCodeData?.i_Result?.DISCOUNT_PERCENTAGE + "% OFF code has been applied!" : null}
              {verifyPromoCodeData?.i_Result?.IS_FREE_DELIVERY == true ? "\n     Free delivery has been applied!" : null}
            </Text> :
              (isCheckedPromo && !verifyPromoCodeLoading ? <Text style={styles.verifyPromoCodeDataError}><AntDesign name='closecircle' color={Colors.denger} size={ScaleWidth(13)} /> {t("cart.invalidPromoCode")}</Text> : null)
            }

            <View style={styles.extras} >
              <Text style={styles.subTxt}>{t("cart.Subtotal")}</Text>
              <View style={styles.priceView}>
                {verifyPromoCodeData?.i_Result?.IS_ACTIVE && verifyPromoCodeData?.i_Result?.DISCOUNT_PERCENTAGE > 0 ? <Text style={[styles.subPrice, { textDecorationLine: "line-through" }]}>{restaurantDetails?.Currency?.SYMBOL}{parseFloat(cartTotalPrice).toFixed(2)}</Text> : null}
                <Text style={styles.subPrice}>{profileData?.Currency?.SYMBOL} {parseFloat(parseFloat(subTotal).toFixed(2)).toLocaleString()}</Text>
              </View>
            </View>

            <View style={styles.extras} >
              <Text style={styles.subTxt}>{t("cart.TaxAndFees")}</Text>
              <View style={styles.priceView}>
                <Text style={styles.subPrice}>{"LBP"} {parseFloat(parseFloat(TaxAndFeesPrice).toFixed(2)).toLocaleString()}</Text>

              </View>
            </View>
            <View style={styles.extras} >
              <Text style={styles.subTxt}>{t("cart.Delivery")}</Text>
              <View style={styles.priceView}>
                <Text style={styles.subPrice}>{restaurantDetails?.IS_FREE_DELIVERY || verifyPromoCodeData?.i_Result?.IS_FREE_DELIVERY == true ? t("common.freeDelivery") : (profileData?.Currency?.SYMBOL+" " +parseFloat( parseFloat(restaurantDetails?.DELIVERY_CHARGE).toFixed(2)*parseFloat(currencyRate).toFixed(2)).toLocaleString())}</Text>

              </View>
            </View>

            <View style={styles.addressView}>
              <Text style={styles.items}>{`( ${cartItemCount} ${cartItemCount < 2 ? t('cart.item') : t('cart.items')})`}</Text>

              <View style={styles.addressView}>
                <Text style={styles.total}>{`${profileData?.Currency?.SYMBOL} ${parseFloat(finalPrice).toLocaleString()}`}</Text>
                <Text style={styles.items}>{''}</Text>
              </View>
            </View>

          {/*  <View style={styles.addressView}>
              <Text style={styles.txt}>{t('home.deliverTo')}</Text>
              <TouchableOpacity onPress={() => {
                props.navigation.navigate('AddressMap', {
                  comeFrom: 'cart',
                  type: 'add',
                  item: null,
                  restaurantDetails: restaurantDetails
                });
              }}>
                <Text style={styles.addNew}>{t('cart.addNew')}</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={addressesData}
              renderItem={renderAddressItem}
              keyExtractor={(item, index) => JSON.stringify(index)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
            {showAllAddresses == false && addressesData?.length > 1 ? <TouchableOpacity
              onPress={() => setShowAllAddresses(true)}
              style={styles.moreAddressesButton}>
              <Text style={styles.showMoreAddresses}>{t("cart.showMoreAddresses")}</Text>
            </TouchableOpacity> : null}

      */}

            {/* <View style={styles.addressView}>
              <View>
                <Text style={styles.txt}>{t('cart.deliveryTime')}</Text>
                <Text style={styles.date}>{`${restaurantDetails?.MIN_DELIVERY_TIME} - ${restaurantDetails?.MAX_DELIVERY_TIME} ${t("common.minutes")}`}</Text>
              </View>
              <TouchableOpacity disabled={true} onPress={() => refRBSheet.current.open()}>
                <AntDesign
                  name='edit'
                  color={Colors.darkBlue}
                  size={ScaleWidth(18)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.addressView}>
              <Text style={styles.txt}>{t('profile.payment')}</Text>

            </View>
            <View style={styles.cashOnDelivery} >
              <Text style={styles.subTxt}>{t("cart.CashOnDelivery")}</Text>
              <View style={styles.priceView}>
                <Ionicons name={'radio-button-on'} size={ScaleWidth(24)} color={Colors.darkBlue} />

              </View>
            </View>*/}
            {  /* <View style={styles.addressView}>
              <Text style={styles.txt}>{t('profile.payment')}</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('Payments')}>
                <Text style={styles.addNew}>{t('cart.addNew')}</Text>
              </TouchableOpacity>
            </View>
  
            <FlatList
              data={payment}
              renderItem={renderPaymentItem}
              keyExtractor={(item, index) => JSON.stringify(index)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
    />*/}

          </View>
          <View style={{ height: ScaleHeight(70) }} />

        </ScrollView> :
        <EmptyItem image={IMAGES.no_orders} title={t("empty.YOUR_CART_IS_EMPTY")} description={t("empty.YOUR_CART_IS_EMPTY_DESC")} />}

      {cartData?.length > 0 ? <AppButton
        style={styles.checkoutButton}
        textStyle={styles.setDeliveryText}
        title={t("cart.checkout")}
        onPress={checkoutAction}
        loading={finalizeOrderLoading}
        disabled={disabled}
      /> : null}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: Colors.transparent,
          },
          container: {
            borderTopLeftRadius: ScaleWidth(15),
            borderTopRightRadius: ScaleWidth(15),
            height: ScaleHeight(300)
          }
        }}
      >

        <View style={styles.container}>
          <Text style={styles.txtSheet}>{t('cart.deliveryTime')}</Text>
          <View style={styles.row}>
            <Image source={IMAGES.alarm} style={styles.alarm} resizeMode="contain" />
            <Text style={styles.deliveryText}>{'now'}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons
              style={styles.dateSheet}
              name="date-range"
              color={Colors.darkBlue}
              size={ScaleWidth(17)}
            />
            <Text style={styles.deliveryText}>{t('cart.schedule')}</Text>
          </View>
          <FlatList
            data={[{}, {},]}
            renderItem={renderDateItems}
            keyExtractor={(item, index) => JSON.stringify(index)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
          <AppButton
            style={styles.setDeliveryButton}
            textStyle={styles.setDeliveryText}
            title={t("cart.setDelivery")}
            onPress={setDeliveryAction}
          />
        </View>
      </RBSheet>

    </View>
  )
}

export default Cart;