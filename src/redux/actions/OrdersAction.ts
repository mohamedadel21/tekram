import {
  GET_UPCOMING_ORDERS_REQUEST,
  GET_UPCOMING_ORDERS_SUCCESS,
  GET_UPCOMING_ORDERS_FAIL,

  GET_PAST_ORDERS_REQUEST,
  GET_PAST_ORDERS_SUCCESS,
  GET_PAST_ORDERS_FAIL,

  GET_ORDER_BY_ORDER_ID_REQUEST,
  GET_ORDER_BY_ORDER_ID_SUCCESS,
  GET_ORDER_BY_ORDER_ID_FAIL,

  ADD_ORDER_REVIEW_REQUEST,
  ADD_ORDER_REVIEW_SUCCESS,
  ADD_ORDER_REVIEW_FAIL,

  DELETE_ORDER_REVIEW_REQUEST,
  DELETE_ORDER_REVIEW_SUCCESS,
  DELETE_ORDER_REVIEW_FAIL,

  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL

} from '../types/OrdersTypes';
import AsyncStorage from '@react-native-community/async-storage';
import { ServiceURL } from '../../utils/APIs';
import Axios from '../../utils/axios';



export const CancelOrder = (ORDER_ID: any, CANCELLATION_NOTES: any, callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: CANCEL_ORDER_REQUEST });

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket":ticket
    };
    var data = JSON.stringify({
      ORDER_ID: ORDER_ID,
      CANCELLATION_NOTES: CANCELLATION_NOTES
    });
    console.log("data",data);
    
    Axios("POST",
      ServiceURL.Cancel_Order,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: CANCEL_ORDER_FAIL });
        }
        console.log('cancel order ======== ', res.data);
        if (res.data) {
          callBack(res.data)
          return dispatch({ type: CANCEL_ORDER_SUCCESS, payload: res.data });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: CANCEL_ORDER_FAIL });
      });
  } catch (error) {
    return dispatch({ type: CANCEL_ORDER_FAIL });
  }
};


export const DeleteOrderReviewAction = (ORDER_REVIEW_ID: any, callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: DELETE_ORDER_REVIEW_REQUEST });

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket":ticket
    };
    var data = JSON.stringify({
      "ORDER_REVIEW_ID": ORDER_REVIEW_ID,

    });
    Axios("POST",
      ServiceURL.Delete_Order_Review,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: DELETE_ORDER_REVIEW_FAIL });
        }
        console.log('DELETE order review ======== ', res.data);
        if (res.data) {
          callBack(res.data)
          return dispatch({ type: DELETE_ORDER_REVIEW_SUCCESS, payload: res.data });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: DELETE_ORDER_REVIEW_FAIL });
      });
  } catch (error) {
    return dispatch({ type: DELETE_ORDER_REVIEW_FAIL });
  }
};

export const AddOrderReviewAction = (ORDER_REVIEW_ID: any, ORDER_ID: any, RATING: any, DESCRIPTION: any, RESTAURANT_ID: any, callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADD_ORDER_REVIEW_REQUEST });
    const customer_id = await AsyncStorage.getItem('customer_id');
    const user_id = await AsyncStorage.getItem('user_id');
    const owner_id = await AsyncStorage.getItem('owner_id');

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket":ticket
    };
    var data = JSON.stringify({
      "ORDER_REVIEW_ID": ORDER_REVIEW_ID,
      "ORDER_ID": ORDER_ID,
      "CUSTOMER_ID": parseInt(customer_id),
      "DESCRIPTION": DESCRIPTION,
      "ENTRY_USER_ID": parseInt(user_id),
      "ENTRY_DATE": new Date().toISOString(),
      "IS_DELETED": false,
      "OWNER_ID": parseInt(owner_id),
      "RESTAURANT_ID": RESTAURANT_ID,
      "STAR_RATING": parseFloat(RATING)
    });

    Axios("POST",
      ServiceURL.Edit_Order_review,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: ADD_ORDER_REVIEW_FAIL });
        }
        console.log('add order review ======== ', res.data);
        if (res.data) {
          callBack(res.data)
          return dispatch({ type: ADD_ORDER_REVIEW_SUCCESS, payload: res.data });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: ADD_ORDER_REVIEW_FAIL });
      });
  } catch (error) {
    return dispatch({ type: ADD_ORDER_REVIEW_FAIL });
  }
};




export const GetOrderDetailsAction = (ORDER_ID: any) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_ORDER_BY_ORDER_ID_REQUEST });
    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket":ticket
    };

    Axios("GET",
      ServiceURL.Get_Order_By_ORDER_ID_Adv + "?ORDER_ID=" + ORDER_ID,
      undefined,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_ORDER_BY_ORDER_ID_FAIL });
        }
        console.log('order details ======== ', res.data);
        if (res.data.i_Result) {
          return dispatch({ type: GET_ORDER_BY_ORDER_ID_SUCCESS, payload: res.data.i_Result });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_ORDER_BY_ORDER_ID_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_ORDER_BY_ORDER_ID_FAIL });
  }
};


export const GetPastOrdersAction = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_PAST_ORDERS_REQUEST });

    const customer_id = await AsyncStorage.getItem('customer_id');
    const ticket = await AsyncStorage.getItem('ticket');

    var data = JSON.stringify({
      "customeR_ID": customer_id,
    });

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket

    };

    Axios("POST",
      ServiceURL.Get_Past_Orders,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_PAST_ORDERS_FAIL });
        }
        console.log('Get_Past_Orders ======== ', res.data);
        if (res.data.i_Result) {
          return dispatch({ type: GET_PAST_ORDERS_SUCCESS, payload: res.data.i_Result });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_PAST_ORDERS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_PAST_ORDERS_FAIL });
  }
};



export const GetUpComingOrdersAction = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_UPCOMING_ORDERS_REQUEST });

    const customer_id = await AsyncStorage.getItem('customer_id');

    var data = JSON.stringify({
      "customeR_ID": customer_id
    });

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket":ticket
    };

    Axios("POST",
      ServiceURL.Get_Upcoming_Orders,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_UPCOMING_ORDERS_FAIL });
        }
        console.log('Get_Upcoming_Orders ======== ', res.data);
        if (res.data.i_Result) {
          return dispatch({ type: GET_UPCOMING_ORDERS_SUCCESS, payload: res.data.i_Result });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_UPCOMING_ORDERS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_UPCOMING_ORDERS_FAIL });
  }
};
