import { Image, Alert, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './styles';
import RatingHeader from '../../../components/Headers/RatingHeader';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Colors, ScaleWidth } from '../../../common/foundation';
import AppButton from '../../../components/AppButton';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from 'react-redux';
import { GetOrderDetailsAction, AddOrderReviewAction } from "../../../redux/actions/OrdersAction";
import { GetRestaurantByIdAction } from "../../../redux/actions/RestaurantsAction";
import IMAGES from '../../../common/images';
import { GetPastOrdersAction } from "../../../redux/actions/OrdersAction";



const RatingScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const order = route.params.order
  const review = route.params.item
  const comeFrom = route.params.comeFrom
  
  const screenFrom = route.params.screenFrom
  const { orderDetailsData,
    orderDetailsLoading,
    addOrderReviewData,
    addOrderReviewLoading
  } = useSelector(
    state => state.OrdersReducer,
  );
  const {
    restaurantDetailsData,
  } = useSelector(
    state => state.RestauarnatsReducer,
  );
  const { homeData,
    homeLoading } = useSelector(
      state => state.HomeReducer,
    );
  const [rating, setRating] = useState(review ? review?.STAR_RATING : 0)
  const [description, setDescription] = useState(review ? review?.DESCRIPTION : "")

  useEffect(() => {
    dispatch(GetOrderDetailsAction(order?.ORDER_ID))
  }, [])

  useEffect(() => {
    dispatch(GetRestaurantByIdAction(orderDetailsData?.RESTAURANT_ID))
  }, [orderDetailsData])


  const onSubmitAction = () => {
    dispatch(AddOrderReviewAction(screenFrom == "edit" ? review?.ORDER_REVIEW_ID : -1, order?.ORDER_ID, rating, description, orderDetailsData?.Restaurant?.RESTAURANT_ID, (data) => {
      if (data.Order_review) {
        if (screenFrom == "edit") {
          if(comeFrom=="orders"){
            dispatch(GetPastOrdersAction())
          }
          navigation.goBack()
        } else {
          Alert.alert("", "Rating added successfully!");
          navigation.goBack();
        }

      }
    }))

  }

  return (
    <View style={styles.container}>
      <RatingHeader
        imageUrl={
          restaurantDetailsData?.List_Uploaded_file?.length > 0 ? restaurantDetailsData?.List_Uploaded_file[1]?.File_Url : null
        }
        navigation={navigation}
      />

      <Image
        source={restaurantDetailsData?.List_Uploaded_file?.length > 0 ? {
          uri:
            restaurantDetailsData?.List_Uploaded_file[0]?.File_Url

        } : IMAGES.default}
        resizeMode="cover"
        style={styles.profilePic}
        defaultSource={IMAGES.default}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dataView}>
        <Text style={styles.name}>{orderDetailsData?.Restaurant?.RESTAURANT_NAME}</Text>
        <View style={styles.row}>
          <Text style={[styles.dotSign, { color: Colors.success }]}>.
            <Text style={[styles.orderStatus, { color: Colors.success }]}>{t("profile.orderDelivered")}</Text>
          </Text>
        </View>


        <AirbnbRating
          // starContainerStyle={styles.starContainerStyle}
          ratingContainerStyle={styles.starContainerStyle}
          selectedColor={Colors.primary}
          reviewColor={Colors.darkBlue}
          reviewSize={ScaleWidth(20)}
          size={ScaleWidth(31)}
          starContainerStyle={{ marginLeft: ScaleWidth(10) }}
          defaultRating={rating}
          onFinishRating={(value) => {
            setRating(value)
          }}
        />

        <TextInput
          value={description}
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder={t('profile.writereview')}
          placeholderTextColor={Colors.placeHolder}
          numberOfLines={10}
          multiline={true}
          onChangeText={(value) => {
            setDescription(value)
          }}
        />


        <AppButton
          style={styles.signupButton}
          textStyle={styles.signupText}
          title={t("profile.submi")}
          onPress={onSubmitAction}
          loading={addOrderReviewLoading}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

export default RatingScreen;