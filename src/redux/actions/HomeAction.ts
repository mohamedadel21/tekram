import AsyncStorage from '@react-native-community/async-storage';
import {
  GET_HOME_REQUEST,
  GET_HOME_SUCCESS,
  GET_HOME_FAIL
} from '../types/HomeTypes';

import { ServiceURL } from '../../utils/APIs';
import Axios from '../../utils/axios';

export const GetHomeAction = (callBack: Function) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_HOME_REQUEST });

    const customer_id = await AsyncStorage.getItem('customer_id');
    const LATITUDE = await AsyncStorage.getItem("LATITUDE")
    const LONGITUDE = await AsyncStorage.getItem("LONGITUDE")


    var data = JSON.stringify({
      "customeR_ID": customer_id,
      "offseT_POPULAR_RESTAURANTS": 0,
      "fetcH_NEXT_POPULAR_RESTAURANTS": 5,
      "offseT_DISCOUNTED_RESTAURANTS": 0,
      "fetcH_NEXT_DISCOUNTED_RESTAURANTS": 5,
      "Customer_Coordinates": {
        "LATITUDE": parseFloat(LATITUDE),
        "LONGITUDE": parseFloat(LONGITUDE)

       // LATITUDE: 33.854721,
        //LONGITUDE: 35.862285
      },
    });

    

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("POST",
      ServiceURL.Get_Home_Screen,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_HOME_FAIL });
        }
        console.log('home ======== ', res.data);
        callBack(res.data.i_Result)
        return dispatch({ type: GET_HOME_SUCCESS, payload: res.data.i_Result });
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_HOME_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_HOME_FAIL });
  }
};
