import {

  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAIL,

  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,

  VERIFY_PROMO_CODE_REQUEST,
  VERIFY_PROMO_CODE_SUCCESS,
  VERIFY_PROMO_CODE_FAIL,

  FINALIZE_ORDER_REQUEST,
  FINALIZE_ORDER_SUCCESS,
  FINALIZE_ORDER_FAIL,

  GET_GENERAL_SETTINGS_REQUEST,
  GET_GENERAL_SETTINGS_SUCCESS,
  GET_GENERAL_SETTINGS_FAIL
} from '../types/CartTypes';
import AsyncStorage from '@react-native-community/async-storage';
import { ServiceURL } from '../../utils/APIs';
import Axios from '../../utils/axios';


export const GetGeneralSettings = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_GENERAL_SETTINGS_REQUEST });

    const owner_id = await AsyncStorage.getItem('owner_id');

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket":ticket
    };

    Axios("GET",
      ServiceURL.Get_General_settings_By_OWNER_ID + "?OWNER_ID=" + owner_id,
      undefined,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_GENERAL_SETTINGS_FAIL });
        }
        console.log('GET_GENERAL_SETTINGS ======== ', res.data);
        if (res.data) {
          return dispatch({ type: GET_GENERAL_SETTINGS_SUCCESS, payload: res.data?.i_Result });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_GENERAL_SETTINGS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_GENERAL_SETTINGS_FAIL });
  }
};


export const FinalizeOrder = (params: any, callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FINALIZE_ORDER_REQUEST });

    var data = JSON.stringify(params);
    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket":ticket
    };

    Axios("POST",
      ServiceURL.Finalize_Order,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: FINALIZE_ORDER_FAIL });
        }
        console.log('Finalize_Order ======== ', res.data);
        if (res.data) {
          callBack(res.data)
          return dispatch({ type: FINALIZE_ORDER_SUCCESS, payload: res.data });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: FINALIZE_ORDER_FAIL });
      });
  } catch (error) {
    return dispatch({ type: FINALIZE_ORDER_FAIL });
  }
};

export const VerifyPromoCode = (PromoCode: any) => async (dispatch: any) => {
  try {
    dispatch({ type: VERIFY_PROMO_CODE_REQUEST });

    var data = JSON.stringify(
      {
        "promO_CODE": PromoCode

      }
    );
    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket":ticket
    };

    Axios("POST",
      ServiceURL.Verify_Promo_Code,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: VERIFY_PROMO_CODE_FAIL });
        }
        console.log('Verify_Promo_Code ======== ', res.data);
        if (res.data) {
          return dispatch({ type: VERIFY_PROMO_CODE_SUCCESS, payload: res.data });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: VERIFY_PROMO_CODE_FAIL });
      });
  } catch (error) {
    return dispatch({ type: VERIFY_PROMO_CODE_FAIL });
  }
};


export const AddItemToCartAction = (restaurant_id: any, item: any, callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
    let data = []
    let response = await AsyncStorage.getItem(restaurant_id + "");
    if (response) {
      data = JSON.parse(response)
    }
    let items = data;
    items?.push(item);
    await AsyncStorage.setItem(restaurant_id + "", JSON.stringify(items));
    callBack(items)

    return dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: true });

  } catch (error) {
    return dispatch({ type: ADD_ITEM_TO_CART_FAIL });
  }
};


export const GetCartAction = (restaurant_id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    //await AsyncStorage.setItem(restaurant_id + "", "");

    let data = []
    let response = await AsyncStorage.getItem(restaurant_id + "");
    if (response) {
      data = JSON.parse(response)
    }
    return dispatch({ type: GET_CART_SUCCESS, payload: data });

  } catch (error) {
    return dispatch({ type: GET_CART_FAIL });
  }
};
