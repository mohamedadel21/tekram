import React, { useRef, useState, useEffect } from 'react'
import { FlatList, View, ActivityIndicator, RefreshControl, Alert } from 'react-native'

import styles from './styles';
import HomeHeader from '../../../components/Headers/HomeHeader';
import { useTranslation } from 'react-i18next';
import MyReviewsItems from '../../../components/MyReviewsItems';
import SearchInput from '../../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import { GetUserReviewAction, } from "../../../redux/actions/ProfileAction";
import { DeleteOrderReviewAction } from "../../../redux/actions/OrdersAction";
import EmptyItem from '../../../components/EmptyItem';
import IMAGES from '../../../common/images';
import { ScaleHeight } from "../../../common/foundation";
import { MenuProvider } from 'react-native-popup-menu';


const MyReviews = (props: any) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("")
  const [reviewList, setReviewList] = useState([])
  const timeout = useRef(null);
  const dispatch = useDispatch();
  const [count, setCount] = useState(null)

  const { userReviewsData,
    userReviewsLoading
  } = useSelector(
    state => state.ProfileReducer,
  );

  const [refreshing, setRefreshing] = useState(false);



  useEffect(() => {
    onRefresh(2)
  }, [searchQuery])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', e => {
      // Do something manually
      onRefresh(0)

    });

    return () => unsubscribe();
  }, [props.navigation]);


  const onRefresh = (flag: number) => {

    if (flag == 0) {
      setRefreshing(true)
      dispatch(GetUserReviewAction(searchQuery, 0, 10, (data) => {
        if (data) {
          setReviewList(data)
          setCount(data?.COUNT)
          setRefreshing(false)
        }
      }))

    } else if (flag == 1) {
      dispatch(GetUserReviewAction(searchQuery, reviewList?.length, 10, (data) => {
        if (data) {
          setReviewList(reviewList.concat(data))
          setCount(data?.COUNT)
        }
      }))

    } else if (flag == 2) {
      setRefreshing(true)

      dispatch(GetUserReviewAction(searchQuery, 0, count ? count : 10, (data) => {
        if (data) {
          setReviewList(data)
          setCount(data?.COUNT)
          setRefreshing(false)
        }
      }))


    }

  };


  const onChangeTextSearch = (value: any) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setSearchQuery(value)
    }, 1000);
  }

  const onSubmitEditingSearch = () => {

  }

  const renderReviewsItems = ({ item, index }) => {
    return (
      <MyReviewsItems
        imageUrl={item?.Restaurant?.List_Uploaded_file?.length > 0 ? item?.Restaurant?.List_Uploaded_file[0]?.File_Url : null}
        rate={item?.STAR_RATING}
        name={item?.Restaurant?.RESTAURANT_NAME}
        date={new Date(item?.ENTRY_DATE).toISOString().substring(0, 10) }
        reviews={item?.DESCRIPTION}
        onDelete={() => {
          dispatch(DeleteOrderReviewAction(item?.ORDER_REVIEW_ID, (data) => {
            if (data?.Exception_Message=="") {
              onRefresh(0)
            }else {
              Alert.alert("",data?.Exception_Message)
            }
          }))
        }}
        onPress={() => props.navigation.navigate('Rating', { order: item, screenFrom: "edit", item: item })}

      />
    );
  };


  return (
    <MenuProvider>
      <View style={styles.container}>
        <HomeHeader
          navigation={props.navigation}
          title={t("profile.myReviews")}
        />
        {(!userReviewsLoading && reviewList?.length > 0) ?
          <View>
            <SearchInput
              placeholder={t("profile.searchReview")}
              onChangeText={onChangeTextSearch}
              returnKeyType='done'
              onSubmitEditing={onSubmitEditingSearch}
              editable={true}
            // onPress={()=>props.navigation.navigate("SearchFilter")}
            />


            <FlatList
              style={styles.flatList}
              data={reviewList}
              renderItem={renderReviewsItems}
              keyExtractor={(item, index) => JSON.stringify(index)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh(0)} />}
              ListFooterComponent={userReviewsLoading ? <ActivityIndicator size='large' /> : reviewList.length > 2 ? <View style={{ height: ScaleHeight(200) }} /> : null}

            />
          </View>
          :
          <View style={{ flex: 1, marginTop: ScaleHeight(10) }}>
            <EmptyItem image={IMAGES.no_reviews} title={t("empty.NO_REVIEWS_YET")} description={t("empty.NO_REVIEWS_YET_DESC")} />
          </View>}



      </View>
    </MenuProvider>

  )
}

export default MyReviews;