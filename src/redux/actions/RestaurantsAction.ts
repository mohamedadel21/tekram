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

  DELETE_FAVOURITES_REQUEST,
  DELETE_FAVOURITES_SUCCESS,
  DELETE_FAVOURITES_FAIL,

  ADD_FAVOURITES_REQUEST,
  ADD_FAVOURITES_SUCCESS,
  ADD_FAVOURITES_FAIL,

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
import AsyncStorage from '@react-native-community/async-storage';
import { ServiceURL } from '../../utils/APIs';
import Axios from '../../utils/axios';



export const FilterByCategoryIdAction = (CATEGORY_ID: any,) => async (dispatch: any) => {
  try {
    dispatch({ type: FILTER_BY_CATEGORY_REQUEST });

    const ticket = await AsyncStorage.getItem('ticket');
    const LATITUDE = await AsyncStorage.getItem("LATITUDE")
    const LONGITUDE = await AsyncStorage.getItem("LONGITUDE")

    var data = JSON.stringify({
      "CATEGORY_ID": CATEGORY_ID,
      "Customer_Coordinates": {
        "LATITUDE": parseFloat(LATITUDE),
        "LONGITUDE": parseFloat(LONGITUDE)
      },
    });


    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.filter_by_category,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: FILTER_BY_CATEGORY_FAIL });
        }
        console.log('FilterByCategoryId ======== ', res.data);
        return dispatch({ type: FILTER_BY_CATEGORY_SUCCESS, payload: res.data.i_Result });

      })
      .catch(err => {
        return dispatch({ type: FILTER_BY_CATEGORY_FAIL });
      });
  } catch (error) {
    return dispatch({ type: FILTER_BY_CATEGORY_FAIL });
  }
};


export const GetRestaurantReviewAction = (restauranT_ID: any, offset: any, fetcH_NEXT: any, callBack: Function) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_RESTAURANT_REVIEWS_REQUEST });

    var data = JSON.stringify({
      "offset": offset,
      "fetcH_NEXT": fetcH_NEXT,

      "restauranT_ID": restauranT_ID
    });

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.Custom_Get_Order_Review_By_RESTAURANT_ID,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_RESTAURANT_REVIEWS_FAIL });
        }
        console.log('RESTAURANT REVIEW  ======== ', res.data);
        if (res.data.i_Result) {
          callBack(res.data.i_Result)
          return dispatch({ type: GET_RESTAURANT_REVIEWS_SUCCESS, payload: res.data.i_Result });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_RESTAURANT_REVIEWS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_RESTAURANT_REVIEWS_FAIL });
  }
};

export const GetItemsByItemIdAction = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_ITEMS_BY_ID_REQUEST });
    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("GET",
      ServiceURL.Get_Item_By_ITEM_ID + "?ITEM_ID=" + id,
      undefined,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_ITEMS_BY_ID_FAIL });
        }
        console.log('GetItemsById  ======== ', res.data, id);
        return dispatch({ type: GET_ITEMS_BY_ID_SUCCESS, payload: res.data.i_Result });
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_ITEMS_BY_ID_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_ITEMS_BY_ID_FAIL });
  }
};

export const GetRestaurantByIdAction = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("GET",
      ServiceURL.Get_Restaurant_By_RESTAURANT_ID + "?RESTAURANT_ID=" + id,
      undefined,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_RESTAURANT_BY_ID_FAIL });
        }
        console.log('GetRestaurantById  ======== ', res.data.i_Result);
        return dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: res.data.i_Result });

      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_RESTAURANT_BY_ID_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_RESTAURANT_BY_ID_FAIL });
  }
};


export const RemoveFavouritesAction = () => async (dispatch: any) => {
    return dispatch({ type: GET_FAVOURITES_SUCCESS, payload: [] });  
};

export const AddFavouritesAction = (RESTAURANT_ID: any, callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADD_FAVOURITES_REQUEST });

    const customer_id = await AsyncStorage.getItem('customer_id');

    var data = JSON.stringify(
      {
        "RESTAURANT_ID": RESTAURANT_ID,
        "CUSTOMER_ID": customer_id,
        "FAVORITES_ID": -1
      }
    );

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.Edit_Favorites,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: ADD_FAVOURITES_FAIL });
        }
        console.log('added favourite ======== ', res.data, ticket);
        if (res.data.Favorites?.FAVORITES_ID) {
          callBack(true)
          return dispatch({ type: ADD_FAVOURITES_SUCCESS, payload: res.data });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: ADD_FAVOURITES_FAIL });
      });
  } catch (error) {
    return dispatch({ type: ADD_FAVOURITES_FAIL });
  }
};


export const DeleteFavouritesAction = (FAVORITES_ID: any, callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: DELETE_FAVOURITES_REQUEST });

    var data = JSON.stringify({
      "FAVORITES_ID": FAVORITES_ID
    });

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.Delete_Favorites,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: DELETE_FAVOURITES_FAIL });
        }
        console.log('deleted favourite ======== ', res.data);
        if (res.data.Exception_Message == "") {
          callBack(true)
          return dispatch({ type: DELETE_FAVOURITES_SUCCESS, payload: res.data });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: DELETE_FAVOURITES_FAIL });
      });
  } catch (error) {
    return dispatch({ type: DELETE_FAVOURITES_FAIL });
  }
};

export const GetFavouriteRestaurantsAction = (offset: any, fetcH_NEXT: any,) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_FAVOURITES_REQUEST });

    const customer_id = await AsyncStorage.getItem('customer_id');
    const ticket = await AsyncStorage.getItem('ticket');

    var data = JSON.stringify({
      "offset": offset,
      "fetcH_NEXT": fetcH_NEXT,
      "customeR_ID": customer_id

    });


    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.Custom_Get_Favorites_By_CUSTOMER_ID,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_FAVOURITES_FAIL });
        }
        console.log('favourite ======== ', res.data);
        if (res.data.i_Result) {
          return dispatch({ type: GET_FAVOURITES_SUCCESS, payload: res.data.i_Result });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_FAVOURITES_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_FAVOURITES_FAIL });
  }
};

export const GetPopularRestaurantsAction = (offset: any, fetcH_NEXT: any, searcH_TEXT: any, callBack: Function) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_POPULAR_RESTAUARANTS_REQUEST });
    const ticket = await AsyncStorage.getItem('ticket');
    const LATITUDE = await AsyncStorage.getItem("LATITUDE")
    const LONGITUDE = await AsyncStorage.getItem("LONGITUDE")

    var data = JSON.stringify({
      "offset": offset,
      "fetcH_NEXT": fetcH_NEXT,
      "searcH_TEXT": searcH_TEXT,
      "Customer_Coordinates": {
        "LATITUDE": parseFloat(LATITUDE),
        "LONGITUDE": parseFloat(LONGITUDE)
      },
    });


    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.Get_Popular_Restaurants,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_POPULAR_RESTAUARANTS_FAIL });
        }
        console.log('popular ======== ', res.data);
        if (res.data) {
          callBack(res.data?.i_Result)
          return dispatch({ type: GET_POPULAR_RESTAUARANTS_SUCCESS, payload: res.data.i_Result?.List_Restaurant });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_POPULAR_RESTAUARANTS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_POPULAR_RESTAUARANTS_FAIL });
  }
};


export const GetDiscountedRestaurantsAction = (offset: any, fetcH_NEXT: any, searcH_TEXT: any, callBack: Function) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_DISCOUNTED_RESTAUARANTS_REQUEST });
    const ticket = await AsyncStorage.getItem('ticket');
    const LATITUDE = await AsyncStorage.getItem("LATITUDE")
    const LONGITUDE = await AsyncStorage.getItem("LONGITUDE")

    var data = JSON.stringify({
      "offset": offset,
      "fetcH_NEXT": fetcH_NEXT,
      "searcH_TEXT": searcH_TEXT,
      "Customer_Coordinates": {
        "LATITUDE": parseFloat(LATITUDE),
        "LONGITUDE": parseFloat(LONGITUDE)
      },
    });


    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.Get_Discounted_Restaurants,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_DISCOUNTED_RESTAUARANTS_FAIL });
        }
        console.log('discounted ======== ', res.data);
        if (res.data) {
          callBack(res.data?.i_Result)
          return dispatch({ type: GET_DISCOUNTED_RESTAUARANTS_SUCCESS, payload: res.data.i_Result?.List_Restaurant });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_DISCOUNTED_RESTAUARANTS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_DISCOUNTED_RESTAUARANTS_FAIL });
  }
};


export const GetAllRestaurantsAction = (offset: any, fetcH_NEXT: any, searcH_TEXT: any, callBack: Function) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_ALL_RESTAUARANTS_REQUEST });
    const ticket = await AsyncStorage.getItem('ticket');
    const LATITUDE = await AsyncStorage.getItem("LATITUDE")
    const LONGITUDE = await AsyncStorage.getItem("LONGITUDE")

    var data = JSON.stringify({
      "offset": offset,
      "fetcH_NEXT": fetcH_NEXT,
      "searcH_TEXT": searcH_TEXT,
      "Customer_Coordinates": {
        "LATITUDE": parseFloat(LATITUDE),
        "LONGITUDE": parseFloat(LONGITUDE)
      },
    });


    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.Custom_Get_Restaurant_By_Where,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_ALL_RESTAUARANTS_FAIL });
        }
        console.log('all  ======== ', res.data);
        if (res.data.i_Result?.List_Restaurant) {
          callBack(res.data.i_Result)
          return dispatch({ type: GET_ALL_RESTAUARANTS_SUCCESS, payload: res.data.i_Result?.List_Restaurant });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_ALL_RESTAUARANTS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_ALL_RESTAUARANTS_FAIL });
  }
};



export const GetAllItemsAction = (offset: any, fetcH_NEXT: any, searcH_TEXT: any, callBack: Function) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_ALL_ITEMS_REQUEST });

    const ticket = await AsyncStorage.getItem('ticket');
    const LATITUDE = await AsyncStorage.getItem("LATITUDE")
    const LONGITUDE = await AsyncStorage.getItem("LONGITUDE")

    var data = JSON.stringify({
      "offset": offset,
      "fetcH_NEXT": fetcH_NEXT,
      "searcH_TEXT": searcH_TEXT,
      "Customer_Coordinates": {
        "LATITUDE": parseFloat(LATITUDE),
        "LONGITUDE": parseFloat(LONGITUDE)
      },
    });


    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.Custom_Get_Item_By_Where,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_ALL_ITEMS_FAIL });
        }
        console.log('all items  ======== ', res.data);
        if (res.data.i_Result) {
          callBack(res.data.i_Result)
          return dispatch({ type: GET_ALL_ITEMS_SUCCESS, payload: res.data.i_Result?.List_Item });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_ALL_ITEMS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_ALL_ITEMS_FAIL });
  }
};
