import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,

  GET_USER_REVIEWS_REQUEST,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_REVIEWS_FAIL,

  UPDATE_CUSTOMER_PIC_REQUEST,
  UPDATE_CUSTOMER_PIC_SUCCESS,
  UPDATE_CUSTOMER_PIC_FAIL,

  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,

  DELETE_USER_ACCOUNT_REQUEST,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_FAIL,

  SAVE_DEVICE_TOKEN_REQUEST,
  SAVE_DEVICE_TOKEN_SUCCESS,
  SAVE_DEVICE_TOKEN_FAILED,

  GET_CURRENCY_LIST_REQUEST,
  GET_CURRENCY_LIST_SUCCESS,
  GET_CURRENCY_LIST_FAILED

} from '../types/ProfileTypes';
import { Notifications } from 'react-native-notifications';
import messaging from "@react-native-firebase/messaging";

import { ServiceURL } from '../../utils/APIs';
import Axios from '../../utils/axios';





export const GetCurrencyList =
  () => async (dispatch: any) => {
    try {
      dispatch({ type: GET_CURRENCY_LIST_REQUEST });

      const headers = {
        'Content-Type': 'application/json',
      };


      Axios("GET",
        ServiceURL.Get_Currency_By_OWNER_ID + "?OWNER_ID=" + 1,
        undefined,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: GET_CURRENCY_LIST_FAILED });
          }
          console.log('GetCurrencyList ======== ', res.data);

          return dispatch({ type: GET_CURRENCY_LIST_SUCCESS, payload: res.data?.i_Result });
        })
        .catch(err => {
          return dispatch({ type: GET_CURRENCY_LIST_FAILED });
        });
    } catch (error) {
      return dispatch({ type: GET_CURRENCY_LIST_FAILED });
    }
  };

export const saveDeviceToken =
  () => async (dispatch: any) => {

    try {
      dispatch({ type: SAVE_DEVICE_TOKEN_REQUEST });

      Notifications.registerRemoteNotifications();
      Notifications.events().registerRemoteNotificationsRegistered(async (event) => {
        const fcmtoken = await messaging().getToken();
        console.log("deviceTokennnn", fcmtoken);

      });
      Notifications.events().registerRemoteNotificationsRegistrationFailed((event) => {
        console.error("Device Token error", event);
      });

    } catch (error) {
      console.log("errorerrorerrorerror", error);
    }


  }



export const DeleteUserAccount =
  (password:any,callBack: any) => async (dispatch: any) => {
    try {
      dispatch({ type: DELETE_USER_ACCOUNT_REQUEST });

      const user_id = await AsyncStorage.getItem('user_id');
      const ticket = await AsyncStorage.getItem('ticket');

      var data = JSON.stringify({
        "useR_ID": user_id,
        PASSWORD:password
      }
      );

      const headers = {
        'Content-Type': 'application/json',
        "ticket": ticket
      };



      Axios("POST",
        ServiceURL.Delete_Account,
        data,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: DELETE_USER_ACCOUNT_FAIL });
          }
          console.log('DELETE_USER_ACCOUNT ======== ', res.data);

          callBack(res.data);
          return dispatch({ type: DELETE_USER_ACCOUNT_SUCCESS, payload: res.data });
        })
        .catch(err => {
          return dispatch({ type: DELETE_USER_ACCOUNT_FAIL });
        });
    } catch (error) {
      return dispatch({ type: DELETE_USER_ACCOUNT_FAIL });
    }
  };



export const updateCustomerProfile =
  (form: any, callBack: any) => async (dispatch: any) => {
    try {
      dispatch({ type: UPDATE_CUSTOMER_REQUEST });

      const customer_id = await AsyncStorage.getItem('customer_id');
      const user_id = await AsyncStorage.getItem('user_id');


      var data = JSON.stringify({

        "MOBILE_NUMBER": form?.phone,
        "MOBILE_NUMBER_EXTENSION": form?.callingCode,
        "EMAIL": form?.email == "" ? null : form?.email,
        "CUSTOMER": {
          "CUSTOMER_ID": customer_id,
          "USER_ID": user_id,
          "NAME": form?.fullName,
          "CURRENCY_ID": form?.CURRENCY_ID,
          "AREA_ID": form?.area?.AREA_ID,
          "NOTIFICATION_TOKEN": form?.NOTIFICATION_TOKEN,
          "ENTRY_DATE": new Date().toISOString(),
        }
      }
      );

      const ticket = await AsyncStorage.getItem('ticket');

      const headers = {
        'Content-Type': 'application/json',
        "ticket": ticket
      };


      Axios("POST",
        ServiceURL.Edit_Customer,
        data,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: UPDATE_CUSTOMER_FAIL });
          }
          console.log('UPDATE_CUSTOMER ======== ', res.data);

          callBack(res.data);
          return dispatch({ type: UPDATE_CUSTOMER_SUCCESS, payload: res.data });
        })
        .catch(err => {
          return dispatch({ type: UPDATE_CUSTOMER_FAIL });
        });
    } catch (error) {
      return dispatch({ type: UPDATE_CUSTOMER_FAIL });
    }
  };

export const GetDeleteCustomerPicAction = (callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_CUSTOMER_PIC_REQUEST });

    const customer_id = await AsyncStorage.getItem('customer_id');
    const ticket = await AsyncStorage.getItem('ticket');

 
    var data = JSON.stringify({

      'REL_ENTITY': '[TBL_CUSTOMER]',
      'REL_FIELD': 'CUSTOMER_FILE',
      'REL_KEY': String(customer_id),
    }
    );
    const headers = {
      'Ticket': ticket,
      'Content-Type': 'application/json',

    };

    Axios("post",
      ServiceURL.Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: UPDATE_CUSTOMER_PIC_FAIL });
        }
        console.log('Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD ======== ', res.data);
        if (res.data) {
          callBack(res.data)
          return dispatch({ type: UPDATE_CUSTOMER_PIC_SUCCESS, payload: res.data });
        } else {
          return dispatch({ type: UPDATE_CUSTOMER_PIC_FAIL });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: UPDATE_CUSTOMER_PIC_FAIL });
      });
  } catch (error) {
    return dispatch({ type: UPDATE_CUSTOMER_PIC_FAIL });
  }
};


export const GetUpdateCustomerPicAction = (files: any, callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: UPDATE_CUSTOMER_PIC_REQUEST });

    const customer_id = await AsyncStorage.getItem('customer_id');
    const ticket = await AsyncStorage.getItem('ticket');

    const data = new FormData();

    if (files.length > 0) {
      files.forEach((file: any) => {
        data.append('image', {
          name: file.fileName,
          type: file.type,
          uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
        });
      });
    }
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Ticket': ticket,
      'relEntity': '[TBL_CUSTOMER]',
      'relField': 'CUSTOMER_FILE',
      'relKey': String(customer_id),
    };

    Axios("post",
      ServiceURL.Upload_Picture,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: UPDATE_CUSTOMER_PIC_FAIL });
        }
        console.log('Upload_Picture ======== ', res.data);
        if (res.data.i_Result) {
          callBack(res.data.i_Result)
          return dispatch({ type: UPDATE_CUSTOMER_PIC_SUCCESS, payload: res.data.i_Result });
        } else {
          return dispatch({ type: UPDATE_CUSTOMER_PIC_FAIL });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: UPDATE_CUSTOMER_PIC_FAIL });
      });
  } catch (error) {
    return dispatch({ type: UPDATE_CUSTOMER_PIC_FAIL });
  }
};



export const GetUserReviewAction = (RESTAURANT_NAME: any, offset: any, fetcH_NEXT: any, callBack: Function) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_USER_REVIEWS_REQUEST });

    const customer_id = await AsyncStorage.getItem('customer_id');

    var data = JSON.stringify({
      "offset": offset,
      "fetcH_NEXT": fetcH_NEXT,
      "customeR_ID": customer_id,
      "RESTAURANT_NAME": RESTAURANT_NAME
    });

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.Custom_Get_Order_Review_By_Where,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_USER_REVIEWS_FAIL });
        }
        console.log('user reviews  ======== ', res.data);
        if (res.data.i_Result) {
          callBack(res.data.i_Result)
          return dispatch({ type: GET_USER_REVIEWS_SUCCESS, payload: res.data.i_Result?.List_Item });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_USER_REVIEWS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_USER_REVIEWS_FAIL });
  }
};

export const UpdategGuestCurrencyAction = (currency:any) => async (dispatch: any) => {
  return dispatch({ type: GET_PROFILE_SUCCESS, payload: {
    Currency:currency,
    CURRENCY_ID:currency.CURRENCY_ID,
  
  } });

};


export const GetProfileAction = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    const customer_id = await AsyncStorage.getItem('customer_id');

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("get",
      ServiceURL.Get_Customer_By_CUSTOMER_ID_Adv + '?CUSTOMER_ID=' + customer_id,
      undefined,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_PROFILE_FAIL });
        }
        console.log('profile ======== ', res.data, headers);
        if (res.data.i_Result) {
          return dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data.i_Result });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_PROFILE_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_PROFILE_FAIL });
  }
};
