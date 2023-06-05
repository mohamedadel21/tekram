import AsyncStorage from '@react-native-community/async-storage';
import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,

  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAIL,

  GET_REGIONS_REQUEST,
  GET_REGIONS_SUCCESS,
  GET_REGIONS_FAIL,

  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAIL

} from '../types/AddressesTypes';

import { ServiceURL } from '../../utils/APIs';
import Axios from '../../utils/axios';


export const DeleteAddressAction = (CUSTOMER_ADDRESS_ID:any,callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: DELETE_ADDRESS_REQUEST });

    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    var data = JSON.stringify({
      "CUSTOMER_ADDRESS_ID": CUSTOMER_ADDRESS_ID,
     
    });

    Axios("post",
      ServiceURL.Delete_customer_address ,
      data,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: DELETE_ADDRESS_FAIL });
        }
        console.log('DELETE_ADDRESS ======== ', CUSTOMER_ADDRESS_ID, res.data);
        if (res.data) {
          callBack(res.data)
          return dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: res.data.i_Result });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: DELETE_ADDRESS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: DELETE_ADDRESS_FAIL });
  }
};

export const GetRegionsAction = () => async (dispatch: any) => {
  try {
    dispatch({ type: GET_REGIONS_REQUEST });

    const owner_id = await AsyncStorage.getItem('owner_id');
    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
    };

    Axios("GET",
      ServiceURL.Get_Region_By_OWNER_ID_IS_DELETED + `?owner_id=${owner_id ? owner_id : 1}&IS_DELETED=false`,
      undefined,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_REGIONS_FAIL });
        }
        console.log('regions ======== ', res.data);
        if (res.data) {
          return dispatch({ type: GET_REGIONS_SUCCESS, payload: res.data.i_Result });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_REGIONS_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_REGIONS_FAIL });
  }
};


export const GetAddressesAction = (callBack: any) => async (dispatch: any) => {
  try {
    dispatch({ type: GET_ADDRESSES_REQUEST });

    const customer_id = await AsyncStorage.getItem('customer_id');
    const ticket = await AsyncStorage.getItem('ticket');

    const headers = {
      'Content-Type': 'application/json',
      "ticket": ticket
    };

    Axios("GET",
      ServiceURL.Get_Customer_Address_By_CUSTOMER_ID + `?CUSTOMER_ID=${customer_id}`,
      undefined,
      {},
      headers,
    )
      .then(async res => {
        if (res.status < 1 || res.status >= 400) {
          return dispatch({ type: GET_ADDRESSES_FAIL });
        }
        console.log('ADDRESSES ======== ', customer_id, res.data.i_Result);
        if (res.data) {
          callBack(res.data.i_Result)
          return dispatch({ type: GET_ADDRESSES_SUCCESS, payload: res.data.i_Result });
        }
      })
      .catch(err => {
        console.log(err.response.data);
        return dispatch({ type: GET_ADDRESSES_FAIL });
      });
  } catch (error) {
    return dispatch({ type: GET_ADDRESSES_FAIL });
  }
};


export const AddAddress =
  (form: any, callBack: any) => async (dispatch: any) => {
    try {
      dispatch({ type: ADD_ADDRESS_REQUEST });

      const user_id = await AsyncStorage.getItem('user_id');
      const customer_id = await AsyncStorage.getItem('customer_id');
      const owner_id = await AsyncStorage.getItem('owner_id');


      var data = JSON.stringify({
        "CUSTOMER_ID": customer_id,
        "CUSTOMER_ADDRESS_ID": form?.CUSTOMER_ADDRESS_ID,
        "REGION_ID": form?.region?.REGION_ID,
        "REGION": form?.region,
        "AREA_ID": form?.area?.AREA_ID,
        "AREA": form?.area,
        "IS_CURRENT": form.IS_CURRENT,
        "IS_DEFAULT": form?.IS_DEFAULT,
        "NICKNAME": form?.nickName,
        "ADDRESS_DETAILS": form?.addressDetails,
        "BUILDING_NAME": form?.building,
        "STREET": form?.street,
        "UNIT": form?.unit,
        "FLOOR": form?.floor,
        "MAP_LOCATION_ADDRESS": form?.location?.address,
        "LONGITUDE": parseFloat(form?.location?.longitude),
        "LATITUDE": parseFloat(form?.location?.latitude),
        "ENTRY_USER_ID": user_id,
        "IS_DELETED": false,
        "OWNER_ID": owner_id,
        "ENTRY_DATE": new Date().toISOString()
      }

      );

      const ticket = await AsyncStorage.getItem('ticket');

      const headers = {
        'Content-Type': 'application/json',
        "ticket": ticket
      };

      Axios("POST",
        ServiceURL.Edit_Customer_Address,
        data,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: ADD_ADDRESS_FAIL });
          }
          console.log('ADD_ADDRESS ======== ', user_id, res.data);

          callBack(res.data);
          return dispatch({ type: ADD_ADDRESS_SUCCESS, payload: res.data });
        })
        .catch(err => {
          return dispatch({ type: ADD_ADDRESS_FAIL });
        });
    } catch (error) {
      return dispatch({ type: ADD_ADDRESS_FAIL });
    }
  };