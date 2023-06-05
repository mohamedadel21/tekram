import React, { useState, useEffect, useRef } from "react";
import { Text, Platform, Linking, ScrollView, View, Image, TouchableOpacity, FlatList, Alert, TextInput } from "react-native";
import { connect } from "react-redux";
import Button from "../../../components/AppButton";
import HomeHeader from "../../../components/Headers/HomeHeader";
import OrderDetailsItem from "../../../components/OrderDetailsItem";
import { useTranslation } from "react-i18next";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Colors, Fonts, ScaleHeight, ScaleWidth, width, height } from '../../../common/foundation';
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "../../../utils/axios";
import { useSelector, useDispatch } from 'react-redux';
import { GetOrderDetailsAction, CancelOrder } from "../../../redux/actions/OrdersAction";
import styles from "./style";
import IMAGES from "../../../common/images";
import OrderDetailsLazy from "../../../components/LazyLoaders/OrderDetailsLazy";
const ASPECT_RATIO = width / height;
const LAT_DELTA = ScaleWidth(0.8999) * ASPECT_RATIO;
const LON_DELTA = ScaleWidth(0.8999) * ASPECT_RATIO;
import BottomSheet from "react-native-raw-bottom-sheet";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Track = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const orderId = route.params.orderId
  const mapRef = useRef(null)
  const sheetRef = useRef(null)
  const sheetCancelRef = useRef(null)
  const [markersId, setMarkersId] = useState([{ _id: "id1" }, { _id: "id2" }])
  const [orderStatus, setOrderStatus] = useState(0)
  const [cancellationNote, setCancellationNote] = useState("")

  const { 
    profileData,
    
  } = useSelector(
    state => state.ProfileReducer,
  );
  const { orderDetailsData,
    orderDetailsLoading,
    cancelOrderData,
    cancelOrderLoading,
  } = useSelector(
    state => state.OrdersReducer,
  );

  useEffect(() => {
    dispatch(GetOrderDetailsAction(orderId))

  }, [])
  useEffect(() => {
    setMarkersId([
      { _id: Math.random() * 1000 + "" },
      { _id: Math.random() * 10000 + "" },
    ]);
  }, [orderDetailsData])

  useEffect(() => {
    if (orderDetailsData) {
      if (orderDetailsData?.ORDER_STATUS_SETUP_ID >= 14 && orderDetailsData?.ORDER_STATUS_SETUP_ID <= 15) {
        setOrderStatus(0)
      } else
        if (orderDetailsData?.ORDER_STATUS_SETUP_ID == 16) {
          setOrderStatus(1)
        } else
          if (orderDetailsData?.ORDER_STATUS_SETUP_ID >= 17 && orderDetailsData?.ORDER_STATUS_SETUP_ID <= 18) {
            setOrderStatus(2)
          }
          else if (orderDetailsData?.ORDER_STATUS_SETUP_ID >= 19 && orderDetailsData?.ORDER_STATUS_SETUP_ID <= 20) {
            setOrderStatus(3)
          }
          else if (orderDetailsData?.ORDER_STATUS_SETUP_ID == 21) {
            setOrderStatus(4)
          }
          else if (orderDetailsData?.ORDER_STATUS_SETUP_ID == 22) {
            setOrderStatus(5)
          }
    }
  }, [orderDetailsData])


  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(markersId.map(({ _id }) => _id));
    }
  }, [markersId]);

  const OrderDetailsItemRender = ({ item, index }) => {
    return (
      <OrderDetailsItem
        number={++index}
        title={item?.NAME}
        addons={item?.List_Order_item_addon}
        offerGroupItems={item?.List_Order_item_offer_group_item}
        isLastItem={index == orderDetailsData?.List_Order_item?.length - 1}
      />
    )
  }

  const cencelOrderAction = () => {
    dispatch(CancelOrder(orderId, cancellationNote, (data) => {
      if (data?.Exception_Message == "") {
        sheetCancelRef.current.close()
        dispatch(GetOrderDetailsAction(orderId))
        Alert.alert("", "Order is canceled Successfully!");

      } else if (data?.Exception_Message) {
        Alert.alert("", data?.Exception_Message)
      }
    }))
  }

  const renderSheet = () => {
    return (
      <View>


        <View style={{ flexDirection: "row", marginTop: ScaleHeight(25) }}>
          <View>
            <Ionicons style={styles.PickUpLocationPoint} name={'radio-button-on'} size={ScaleWidth(24)} color={orderStatus >= 0 ? Colors.darkBlue : Colors.gray} />
            <View style={[styles.divider, { backgroundColor: orderStatus >= 1 ? Colors.darkBlue : Colors.gray }]} />
          </View>
          <View>
            <Text style={[styles.key, { color: orderStatus >= 0 ? Colors.darkBlue : Colors.gray }]}>{t("cart.orderConfirmed")}</Text>
            <Text style={[styles.value, { color: orderStatus >= 0 ? Colors.darkBlue : Colors.gray }]}>
              {t("cart.yourOrderHasBeenReceived")}  </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Ionicons style={styles.PickUpLocationPoint} name={'radio-button-on'} size={ScaleWidth(24)} color={orderStatus >= 2 ? Colors.darkBlue : Colors.gray} />
            <View style={[styles.divider, { backgroundColor: orderStatus >= 3 ? Colors.darkBlue : Colors.gray }]} />
          </View>
          <View>
            <Text style={[styles.key, { color: orderStatus >= 2 ? Colors.darkBlue : Colors.gray }]}>{t("cart.preparingFood")}</Text>
            <Text style={[styles.value, { color: orderStatus >= 2 ? Colors.darkBlue : Colors.gray }]}>
              {t("cart.yourOrderIsInTheKitchen")}  </Text>

          </View>
        </View>

        {orderStatus < 5 ? <View style={{ flexDirection: "row" }}>
          <View>
            <Ionicons style={styles.PickUpLocationPoint} name={'radio-button-on'} size={ScaleWidth(24)} color={orderStatus == 4 ? Colors.darkBlue : Colors.gray} />
          </View>
          <View>
            <Text style={[styles.key, { color: orderStatus == 4 ? Colors.darkBlue : Colors.gray }]}>{t("cart.deliveredToYou")}</Text>
            <Text style={[styles.value, { color: orderStatus == 4 ? Colors.darkBlue : Colors.gray }]}>
              {t("cart.weWillNotifyOnceIsOut")}  </Text>

          </View>
        </View>
          :
          <View style={{ flexDirection: "row" }}>
            <View>
              <Ionicons style={styles.PickUpLocationPoint} name={'radio-button-on'} size={ScaleWidth(24)} color={orderStatus == 5 ? Colors.denger : Colors.gray} />
            </View>
            <View>
              <Text style={[styles.key, { color: orderStatus == 5 ? Colors.denger : Colors.gray }]}>{t("orders.Canceled")}</Text>

            </View>
          </View>
        }


      </View>
    )
  }



  return (
    <View style={styles.container}>
      {orderDetailsLoading ? <OrderDetailsLazy /> :
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            style={{ height: height / 1.5, width, alignSelf: "center" }}
            initialRegion={{

              latitude: orderDetailsData?.LATITUDE ? parseFloat(orderDetailsData?.LATITUDE) : 33.8735578,
              longitude: orderDetailsData?.LONGITUDE ? parseFloat(orderDetailsData?.LONGITUDE) : 35.84741,
              latitudeDelta: LAT_DELTA,
              longitudeDelta: LON_DELTA,
            }}

            onMapReady={() => {

              if (mapRef.current) {
                // list of _id's must same that has been provided to the identifier props of the Marker
                mapRef.current.fitToSuppliedMarkers(markersId.map(({ _id }) => _id));
              }

            }}
            onRegionChangeComplete={() => {

              if (Platform.OS == "android") {
                if (mapRef.current) {
                  mapRef.current.fitToSuppliedMarkers(
                    markersId.map(({ _id }) => _id)
                  );
                }
              }
            }}

          >
            <MapViewDirections
              mode="DRIVING"
              strokeColors={[Colors.darkBlue]}
              strokeWidth={3}
              origin={{
                latitude: orderDetailsData?.Restaurant?.LATITUDE ? parseFloat(orderDetailsData?.Restaurant?.LATITUDE) : 33.8735578,
                longitude: orderDetailsData?.Restaurant?.LONGITUDE ? parseFloat(orderDetailsData?.Restaurant?.LONGITUDE) : 35.84741
              }}
              destination={{
                latitude: orderDetailsData?.LATITUDE ? parseFloat(orderDetailsData?.Restaurant?.LATITUDE) : 33.8735578,
                longitude: orderDetailsData?.LONGITUDE ? parseFloat(orderDetailsData?.Restaurant?.LONGITUDE) : 35.84741

              }}
              apikey={GOOGLE_MAPS_APIKEY}
              //    waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : null}
              strokeWidth={3}
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`
                );
              }}
              onReady={(result) => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
                /*this.setState({
                                distance: Number((result.distance / 1.609344).toFixed(1)),
                                duration: Math.floor(result.duration / 60) + ' Hour' + ' & ' + Number((result.duration % 60).toFixed(1)),
    
                            })*/
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
            <Marker
              coordinate={{
                latitude: orderDetailsData?.LATITUDE ? parseFloat(orderDetailsData?.LATITUDE) : 33.946794481062966,
                longitude: orderDetailsData?.LONGITUDE ? parseFloat(orderDetailsData?.LONGITUDE) : 35.64150972291827

              }}
              key={markersId[0]._id}
              identifier={markersId[0]._id}
              title={t("common.me")}
              description={orderDetailsData?.MAP_LOCATION_ADDRESS}

            >
              <Image source={IMAGES.hand} resizeMode='contain' style={styles.marker} />

            </Marker>
            <Marker
              coordinate={{
                latitude: orderDetailsData?.Restaurant?.LATITUDE ? parseFloat(orderDetailsData?.Restaurant?.LATITUDE) : 33.946794481062966,
                longitude: orderDetailsData?.Restaurant?.LONGITUDE ? parseFloat(orderDetailsData?.Restaurant?.LONGITUDE) : 35.64150972291827
              }}
              key={markersId[1]._id}
              identifier={markersId[1]._id}
              title={orderDetailsData?.Restaurant?.RESTAURANT_NAME}
              description={orderDetailsData?.Restaurant?.MAP_LOCATION_ADDRESS}
            >
              <Image source={IMAGES.locationHand} resizeMode='contain' style={styles.marker} />
            </Marker>
          </MapView>

          <View style={styles.header}>
            <HomeHeader
              navigation={navigation}
              style={{ backgroundColor: Colors.none, }}
            />
          </View>

          <View style={[styles.content]}>
            <ScrollView contentContainerStyle={styles.Scroll}

            >

              {renderSheet()}
              <View style={styles.buttonGroup}>
                <Button
                  title={t("cart.viewOrder")}
                  onPress={() => sheetRef.current.open()}
                  style={styles.signupButton}
                  textStyle={styles.signupText}
                />


              </View>
            </ScrollView>
          </View>


          <BottomSheet
            ref={sheetRef}
            height={height / 1.25}
            openDuration={250}
            customStyles={{
              container: styles.depositContainer,
            }}
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              { /*<View style={{ marginTop: ScaleHeight(25) }}>
                <Text style={[styles.EstimatedDeliveryTime,]}>{t("cart.EstimatedDeliveryTime")}</Text>
                <Text style={[styles.SCHEDULED_TIME]}>
                  {orderDetailsData?.SCHEDULED_TIME || "-----------------"}  </Text>
              </View>*/}
              {renderSheet()}

              {orderDetailsData?.List_Delivery_allocation?.length>0?<View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: ScaleHeight(25), width: width - ScaleWidth(40), paddingBottom: ScaleHeight(10), paddingTop: ScaleHeight(20), borderColor: Colors.inputBackground, borderBottomWidth: ScaleWidth(1), borderTopWidth: ScaleWidth(1) }}>
                <View>

                  <Text style={[styles.cardTitle,]}>{t("cart.YourDriverIs")}</Text>
                  <Text style={[styles.cardDescription]}>
                   {orderDetailsData?.List_Delivery_allocation[0]?.Driver?.NAME}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => Linking.openURL(`tel:${orderDetailsData?.List_Delivery_allocation[0]?.Driver?.User?.MOBILE_NUMBER_EXTENSION+orderDetailsData?.List_Delivery_allocation[0]?.Driver?.User?.MOBILE_NUMBER}`)}>
                  <AntDesign name="phone" size={ScaleWidth(20)} color={Colors.darkBlue} />
                </TouchableOpacity>
              </View>:null}
              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: ScaleHeight(25), width: width - ScaleWidth(40), paddingBottom: ScaleHeight(10), borderBottomColor: Colors.inputBackground, borderBottomWidth: ScaleWidth(1) }}>
                <View>
                  <Text style={[styles.cardTitle,]}>{t("cart.ProvideInstructionsTo")}</Text>
                  <Text style={[styles.cardDescription]}>
                    {orderDetailsData?.Restaurant?.RESTAURANT_NAME}
                  </Text>
                </View>

                <TouchableOpacity onPress={() => Linking.openURL(`tel:${orderDetailsData?.Restaurant?.User?.MOBILE_NUMBER_EXTENSION+orderDetailsData?.Restaurant?.User?.MOBILE_NUMBER}`)
                }>
                  <AntDesign name="phone" size={ScaleWidth(20)} color={Colors.darkBlue} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: ScaleHeight(25), width: width - ScaleWidth(40), paddingBottom: ScaleHeight(10), borderBottomColor: Colors.inputBackground, borderBottomWidth: ScaleWidth(1) }}>
                <View>
                  <Text style={[styles.cardTitle,]}>{t("cart.DeliveringTo")}</Text>
                  <Text style={[styles.cardDescription]}>
                    {orderDetailsData?.NICKNAME}
                  </Text>
                  <Text style={[styles.cardDescription2]}>
                    {orderDetailsData?.MAP_LOCATION_ADDRESS}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: ScaleHeight(25), width: width - ScaleWidth(40), paddingBottom: ScaleHeight(10), borderBottomColor: Colors.inputBackground, borderBottomWidth: ScaleWidth(1) }}>
                <View>
                  <Text style={[styles.cardTitle,]}>{t("cart.YourOrderFrom")}</Text>
                  <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', width: width - ScaleWidth(40), }}>
                    <Text style={[styles.cardDescription]}>
                      {orderDetailsData?.Restaurant?.RESTAURANT_NAME}
                    </Text>
                    <Text style={[styles.cardDescription]}>
                      #{orderDetailsData?.ORDER_ID}
                    </Text>
                  </View>

                  <FlatList
                    data={orderDetailsData?.List_Order_item}
                    renderItem={OrderDetailsItemRender}
                    keyExtractor={(item) => JSON.stringify(item)}
                  />
                  

                </View>
              </View>



              <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: ScaleHeight(25), width: width - ScaleWidth(40), paddingBottom: ScaleHeight(10), borderBottomColor: Colors.inputBackground, borderBottomWidth: ScaleWidth(1) }}>
                <View>
                  <Text style={[styles.cardDescription,]}>{t("cart.PaymentDetails")}</Text>
                  <View style={{ marginTop: ScaleHeight(10), flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', width: width - ScaleWidth(40), }}>
                    <Text style={[styles.cardTitle]}>
                      {t("cart.total")}
                    </Text>
                    <Text style={[styles.cardTitle]}>
                      {orderDetailsData?.Currency?.SYMBOL} {parseFloat(parseFloat(orderDetailsData?.TOTAL).toFixed(2)).toLocaleString()}
                    </Text>
                  </View>

                </View>
              </View>

              <TouchableOpacity
                onPress={() => Linking.openURL('mailto:tekram.development@gmail.com')}
                style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: ScaleHeight(25), width: width - ScaleWidth(40), paddingBottom: ScaleHeight(10), borderBottomColor: Colors.inputBackground, borderBottomWidth: ScaleWidth(1) }}>
                <Text style={[styles.cardTitle,]}>{t("cart.HelpCenter")}</Text>

                <EvilIcons name="chevron-right" size={ScaleWidth(25)} color={Colors.darkBlue} />
              </TouchableOpacity>
                <TouchableOpacity
                disabled={!(orderDetailsData?.ORDER_STATUS_SETUP_ID == 14 ||orderDetailsData?.ORDER_STATUS_SETUP_ID == 15)}
                  onPress={() => {
                    sheetRef.current.close();

                    setTimeout(() => {
                      sheetCancelRef.current.open();
                    }, 500)
                  }}
                  style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginTop: ScaleHeight(25), width: width - ScaleWidth(40), paddingBottom: ScaleHeight(10), borderBottomColor: Colors.inputBackground, borderBottomWidth: ScaleWidth(1) }}>
                  <Text style={[styles.cardTitle,{color:(orderDetailsData?.ORDER_STATUS_SETUP_ID == 14||orderDetailsData?.ORDER_STATUS_SETUP_ID == 15)? Colors.darkBlue:Colors.gray}]}>{t("cart.Cancelorder")}</Text>

                  <View>
                    <EvilIcons name="chevron-right" size={ScaleWidth(25)} color={(orderDetailsData?.ORDER_STATUS_SETUP_ID == 14||orderDetailsData?.ORDER_STATUS_SETUP_ID == 15)? Colors.darkBlue:Colors.gray} />
                  </View>
                </TouchableOpacity> 
              <View style={{ height: ScaleHeight(50) }} />
            </ScrollView>
          </BottomSheet>

          <BottomSheet
            ref={sheetCancelRef}
            height={height / 2}
            openDuration={250}
            customStyles={{
              container: styles.depositContainer,
            }}
          >
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>

              <Text style={[styles.Cancelorder,]}>{t("cart.Cancelorder") + " #" + orderId}</Text>
              <Text style={[styles.confirmation,]}>{t("profile.confirmation")}</Text>

              <TextInput
                value={cancellationNote}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder={t('cart.cancellationNote')}
                placeholderTextColor={Colors.placeHolder}
                numberOfLines={10}
                multiline={true}
                onChangeText={(value) => {
                  setCancellationNote(value)
                }}
              />
              <Button
                title={t("cart.Cancelorder")}
                onPress={() => cencelOrderAction()}
                style={styles.cencelOrderButton}
                textStyle={styles.signupText}
                disabled={cancelOrderLoading || !cancellationNote}
                loading={cancelOrderLoading}
              />


            </KeyboardAwareScrollView>
          </BottomSheet>

        </View>
      }
    </View>
  );
};

const mapStateToProps = ({ }) => {
  return {};
};

export default connect(mapStateToProps, {})(Track);
