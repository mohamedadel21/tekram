import React, { useRef, useState, useEffect } from 'react'
import { FlatList, View, ActivityIndicator, RefreshControl } from 'react-native'

import styles from './styles';
import HomeHeader from '../../../components/Headers/HomeHeader';
import { useTranslation } from 'react-i18next';
import MyReviewsItems from '../../../components/ReviewsItems';
import SearchInput from '../../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import { GetRestaurantReviewAction } from "../../../redux/actions/RestaurantsAction";
import EmptyItem from '../../../components/EmptyItem';
import IMAGES from '../../../common/images';
import { ScaleHeight } from "../../../common/foundation";


const MyReviews = (props: any) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("")
  const restaurantDetailsData = props.route.params.restaurantDetailsData
  const [reviewList, setReviewList] = useState([])
  const timeout = useRef(null);
  const dispatch = useDispatch();
  const [count, setCount] = useState(null)

  const { restaurantReviewsData,
    restaurantReviewsLoading,
  } = useSelector(
    state => state.RestauarnatsReducer,
  );

  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    onRefresh(0)
  }, [])

  useEffect(() => {
    onRefresh(2)
  }, [searchQuery])


  const onRefresh = (flag: number) => {

    if (flag == 0) {
      setRefreshing(true)
      dispatch(GetRestaurantReviewAction(restaurantDetailsData?.RESTAURANT_ID, 0, 10, (data) => {
        if (data) {
          setReviewList(data)
          setCount(data?.COUNT)
          setRefreshing(false)
        }
      }))

    } else if (flag == 1) {
      dispatch(GetRestaurantReviewAction(restaurantDetailsData?.RESTAURANT_ID, reviewList?.length, 10, (data) => {
        if (data) {
          setReviewList(reviewList.concat(data))
          setCount(data?.COUNT)
        }
      }))

    } else if (flag == 2) {
      setRefreshing(true)

      dispatch(GetRestaurantReviewAction(restaurantDetailsData?.RESTAURANT_ID, 0, count ? count : 10, (data) => {
        if (data) {
          setReviewList(data)
          setCount(data?.COUNT)
          setRefreshing(false)
        }
      }))
    }

  };


  const renderReviewsItems = ({ item, index }) => {
    return (
      <MyReviewsItems
        imageUrl={item?.Customer?.File_Url|| null}
        rate={item?.STAR_RATING}
        name={item?.Customer?.NAME}
        date={new Date(item?.ENTRY_DATE).toISOString().substring(0, 10) }
        reviews={item?.DESCRIPTION}

      />
    );
  };


  return (
    <View style={styles.container}>
      <HomeHeader
        navigation={props.navigation}
        title={t("profile.reviews")}
      />
      {(!restaurantReviewsLoading && reviewList?.length > 0) ?
        <FlatList
          style={styles.flatList}
          data={reviewList}
          renderItem={renderReviewsItems}
          keyExtractor={(item, index) => JSON.stringify(index)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(0)} />}
          ListFooterComponent={restaurantReviewsLoading ? <ActivityIndicator size='large' /> : null}

        />
        :
        <View style={{ flex: 1, marginTop: ScaleHeight(10) }}>
          <EmptyItem image={IMAGES.no_reviews} title={t("empty.NO_REVIEWS_YET")} description={t("empty.NO_REVIEWS_YET_DESC")} />
        </View>}

    </View>
  )
}

export default MyReviews;