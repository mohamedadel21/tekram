import {
  GET_POPULAR_RESTAUARANTS_REQUEST,
  GET_POPULAR_RESTAUARANTS_SUCCESS,
  GET_POPULAR_RESTAUARANTS_FAIL,


  GET_DISCOUNTED_RESTAUARANTS_REQUEST,
  GET_DISCOUNTED_RESTAUARANTS_SUCCESS,
  GET_DISCOUNTED_RESTAUARANTS_FAIL,


  GET_ALL_RESTAUARANTS_REQUEST,
  GET_ALL_RESTAUARANTS_SUCCESS,
  GET_ALL_RESTAUARANTS_FAIL,



  GET_ALL_ITEMS_REQUEST,
  GET_ALL_ITEMS_SUCCESS,
  GET_ALL_ITEMS_FAIL,


  GET_FAVOURITES_REQUEST,
  GET_FAVOURITES_SUCCESS,
  GET_FAVOURITES_FAIL,

  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAIL,

  GET_ITEMS_BY_ID_REQUEST,
  GET_ITEMS_BY_ID_SUCCESS,
  GET_ITEMS_BY_ID_FAIL,

  GET_RESTAURANT_REVIEWS_REQUEST,
  GET_RESTAURANT_REVIEWS_SUCCESS,
  GET_RESTAURANT_REVIEWS_FAIL,

  FILTER_BY_CATEGORY_REQUEST,
  FILTER_BY_CATEGORY_SUCCESS,
  FILTER_BY_CATEGORY_FAIL

} from '../types/RestuarantsTypes';

const initialState = {
  popularRestaurantsData: [],
  popularRestaurantsLoading: false,

  discountedRestaurantsData: [],
  discountedRestaurantsLoading: false,

  allRestaurantsData: [],
  allRestaurantsLoading: false,

  allItemData: [],
  allItemsLoading: false,

  favouriteRestaurantsData: [],
  favouriteRestaurantsLoading: false,

  restaurantDetailsData: null,
  restaurantDetailsLoading: false,

  itemDetailsData: null,
  itemDetailsLoading: false,

  restaurantReviewsData: null,
  restaurantReviewsLoading: false,

  filterByCategoryData: null,
  filterByCategoryLoading: false,

};

export const RestauarnatsReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case FILTER_BY_CATEGORY_REQUEST:
      return {
        ...state,
        filterByCategoryLoading: true,
      };
    case FILTER_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        filterByCategoryLoading: false,
        filterByCategoryData: action.payload,
      };
    case FILTER_BY_CATEGORY_FAIL:
      return { ...state, filterByCategoryLoading: false,  };



    case GET_RESTAURANT_REVIEWS_REQUEST:
      return {
        ...state,
        restaurantReviewsLoading: true,
      };
    case GET_RESTAURANT_REVIEWS_SUCCESS:
      return {
        ...state,
        restaurantReviewsLoading: false,
        restaurantReviewsData: action.payload,
      };
    case GET_RESTAURANT_REVIEWS_FAIL:
      return { ...state, restaurantReviewsLoading: false,  };


    case GET_ITEMS_BY_ID_REQUEST:
      return {
        ...state,
        itemDetailsLoading: true,
        itemDetailsData: null,
      };
    case GET_ITEMS_BY_ID_SUCCESS:
      return {
        ...state,
        itemDetailsLoading: false,
        itemDetailsData: action.payload,
      };
    case GET_ITEMS_BY_ID_FAIL:
      return { ...state, itemDetailsLoading: false, itemDetailsData: null, };


    case GET_RESTAURANT_BY_ID_REQUEST:
      return {
        ...state,
        restaurantDetailsLoading: true,
        restaurantDetailsData: null,
      };
    case GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        restaurantDetailsLoading: false,
        restaurantDetailsData: action.payload,
      };
    case GET_RESTAURANT_BY_ID_FAIL:
      return { ...state, restaurantDetailsLoading: false, restaurantDetailsData: null, };

    case GET_POPULAR_RESTAUARANTS_REQUEST:
      return {
        ...state,
        popularRestaurantsLoading: true,
      };
    case GET_POPULAR_RESTAUARANTS_SUCCESS:
      return {
        ...state,
        popularRestaurantsLoading: false,
        popularRestaurantsData: action.payload,
      };
    case GET_POPULAR_RESTAUARANTS_FAIL:
      return { ...state, popularRestaurantsLoading: false, };

    case GET_DISCOUNTED_RESTAUARANTS_REQUEST:
      return {
        ...state,
        discountedRestaurantsLoading: true,
      };
    case GET_DISCOUNTED_RESTAUARANTS_SUCCESS:
      return {
        ...state,
        discountedRestaurantsLoading: false,
        discountedRestaurantsData: action.payload,
      };
    case GET_DISCOUNTED_RESTAUARANTS_FAIL:
      return { ...state, discountedRestaurantsLoading: false, };


    case GET_ALL_RESTAUARANTS_REQUEST:
      return {
        ...state,
        allRestaurantsLoading: true,
      };
    case GET_ALL_RESTAUARANTS_SUCCESS:
      return {
        ...state,
        allRestaurantsLoading: false,
        allRestaurantsData: action.payload,
      };
    case GET_ALL_RESTAUARANTS_FAIL:
      return { ...state, allRestaurantsLoading: false, };


    case GET_ALL_ITEMS_REQUEST:
      return {
        ...state,
        allItemsLoading: true,
      };
    case GET_ALL_ITEMS_SUCCESS:
      return {
        ...state,
        allItemsLoading: false,
        allItemData: action.payload,
      };
    case GET_ALL_ITEMS_FAIL:
      return { ...state, allItemsLoading: false, };

    case GET_FAVOURITES_REQUEST:
      return {
        ...state,
        favouriteRestaurantsLoading: true,
      };
    case GET_FAVOURITES_SUCCESS:
      return {
        ...state,
        favouriteRestaurantsLoading: false,
        favouriteRestaurantsData: action.payload,
      };
    case GET_FAVOURITES_FAIL:
      return { ...state, favouriteRestaurantsLoading: false, };


    default:
      return state;
  }
};
