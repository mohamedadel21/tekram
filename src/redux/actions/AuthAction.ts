import AsyncStorage from '@react-native-community/async-storage';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,

  OTP_VERIFICATION_EMAIL_REQUEST,
  OTP_VERIFICATION_EMAIL_SUCCESS,
  OTP_VERIFICATION_EMAIL_FAIL,

  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,

  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,

  VERIFY_OTP_CODE_REQUEST,
  VERIFY_OTP_CODE_SUCCESS,
  VERIFY_OTP_CODE_FAIL,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,

} from '../types/AuthTypes';

import { ServiceURL } from '../../utils/APIs';
import Axios from '../../utils/axios';




export const CreateNewPassword =
  (NEW_PASSWORD: string, MOBILE_NUMBER: string, MOBILE_NUMBER_EXTENSION: string, OTP_VERIFICATION_ID: any, callBack: any) => async (dispatch: any) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });

      var data = JSON.stringify({
        "MOBILE_NUMBER": MOBILE_NUMBER,
        "MOBILE_NUMBER_EXTENSION": MOBILE_NUMBER_EXTENSION,
        "NEW_PASSWORD": NEW_PASSWORD,
        "OTP_VERIFICATION_ID": OTP_VERIFICATION_ID
      });

      const headers = {
        'Content-Type': 'application/json'
      };
      Axios("POST",
        ServiceURL.Forgot_Password,
        data,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: FORGOT_PASSWORD_FAIL });
          }
          console.log('FORGOT_PASSWORD ======== ', res.data);

          callBack(res.data);


          return dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: res.data });
        })
        .catch(err => {
          console.log(err.response.data);
          return dispatch({ type: FORGOT_PASSWORD_FAIL });
        });
    } catch (error) {
      return dispatch({ type: FORGOT_PASSWORD_FAIL });
    }
  };

export const VerifyOTPCode =
  (OTP: string, USER_CONTACT: string, callBack: any) => async (dispatch: any) => {
    try {
      dispatch({ type: VERIFY_OTP_CODE_REQUEST });
      var data = JSON.stringify({
        "OTP": OTP,
        "USER_CONTACT": USER_CONTACT
      });

      const headers = {
        'Content-Type': 'application/json'
      };

      Axios("POST",
        ServiceURL.Verify_OTP_Code,
        data,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: VERIFY_OTP_CODE_FAIL });
          }
          console.log('Verify_OTP_Code ======== ', res.data);

          callBack(res.data);


          return dispatch({ type: VERIFY_OTP_CODE_SUCCESS, payload: res.data });
        })
        .catch(err => {
          console.log(err.response.data);
          return dispatch({ type: VERIFY_OTP_CODE_FAIL });
        });
    } catch (error) {
      return dispatch({ type: VERIFY_OTP_CODE_FAIL });
    }
  };

export const ChangePassword =
  (OLD_PASSSWORD: string, NEW_PASSSWORD: any, callBack: any) => async (dispatch: any) => {
    try {

      dispatch({ type: CHANGE_PASSWORD_REQUEST });
      const user_id = await AsyncStorage.getItem('user_id');
      const ticket = await AsyncStorage.getItem('ticket');

      var data = JSON.stringify({
        "USER_ID": user_id,
        "NEW_PASSWORD": NEW_PASSSWORD,
        "OLD_PASSWORD": OLD_PASSSWORD
      });

      console.log(data);

      const headers = {
        'Content-Type': 'application/json',
        "ticket": ticket
      };

      Axios("POST",
        ServiceURL.Change_Password,
        data,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: LOGIN_FAIL });
          }
          console.log('change Password ======== ', res.data);
          if (res?.data) {
            callBack(res.data);
            return dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: res.data.i_Result });
          }

        })
        .catch(err => {
          return dispatch({ type: CHANGE_PASSWORD_FAIL });
        });
    } catch (error) {
      return dispatch({ type: CHANGE_PASSWORD_FAIL });
    }
  };


export const Signup =
  (name: string, email: any, password: string, mobilE_NUMBER: any, MOBILE_NUMBER_EXTENSION: any, otP_VERIFICATION_CODE: any, callBack: any) => async (dispatch: any) => {
    try {

      dispatch({ type: SIGNUP_REQUEST });
      var data = JSON.stringify({
        "NAME": name,
        "EMAIL": email == "" ? null : email,
        "PASSWORD": password,
        "MOBILE_NUMBER": mobilE_NUMBER,
        "MOBILE_NUMBER_EXTENSION": MOBILE_NUMBER_EXTENSION,
        "OTP_VERIFICATION_CODE": otP_VERIFICATION_CODE
      });


      const headers = {
        'Content-Type': 'application/json'
      };

      Axios("POST",
        ServiceURL.Create_Customer,
        data,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: LOGIN_FAIL });
          }
          console.log('signup ======== ', res.data);
          callBack(res.data);
          if (res?.data?.i_Result) {

            await AsyncStorage.setItem('loggedIn', "true");
            await AsyncStorage.setItem('customer_id', res?.data?.i_Result?.Customer?.CUSTOMER_ID + "");
            await AsyncStorage.setItem('user_id', res?.data?.i_Result?.USER_ID + "");
            await AsyncStorage.setItem('owner_id', res?.data?.i_Result?.OWNER_ID + "");
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('ticket', res?.data?.i_Result?.TICKET);
            await AsyncStorage.setItem('password', password);

          }

          return dispatch({ type: SIGNUP_SUCCESS, payload: res.data.i_Result });
        })
        .catch(err => {
          return dispatch({ type: SIGNUP_FAIL });
        });
    } catch (error) {
      return dispatch({ type: SIGNUP_FAIL });
    }
  };

export const OTPVerificationNumber =
  (MOBILE_NUMBER: string, MOBILE_NUMBER_EXTENSION: String, fulL_NAME: string, iS_FORGOT_PASSWORD: any, callBack: any) => async (dispatch: any) => {
    try {
      dispatch({ type: OTP_VERIFICATION_EMAIL_REQUEST });
      var data = JSON.stringify({
        "MOBILE_NUMBER": MOBILE_NUMBER,
        "MOBILE_NUMBER_EXTENSION": MOBILE_NUMBER_EXTENSION,
        "fulL_NAME": fulL_NAME,
        "iS_FORGOT_PASSWORD": iS_FORGOT_PASSWORD
      });

      const headers = {
        'Content-Type': 'application/json'
      };

      Axios("POST",
        ServiceURL.OTP_Verification_Number,
        data,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: OTP_VERIFICATION_EMAIL_FAIL });
          }


          console.log('OTPVerificationNumber ======== ', res.data);

          callBack(res?.data);
          if (res?.data?.i_Result == false) {
            return dispatch({ type: OTP_VERIFICATION_EMAIL_FAIL });
          } else {
            return dispatch({ type: OTP_VERIFICATION_EMAIL_SUCCESS, payload: res?.data });
          }

        })
        .catch(err => {
          console.log(err.response.data);
          return dispatch({ type: OTP_VERIFICATION_EMAIL_FAIL });
        });
    } catch (error) {
      return dispatch({ type: OTP_VERIFICATION_EMAIL_FAIL });
    }
  };


export const OTPVerificationEmail =
  (email: string, fulL_NAME: string, iS_FORGOT_PASSWORD: any, callBack: any) => async (dispatch: any) => {
    try {
      dispatch({ type: OTP_VERIFICATION_EMAIL_REQUEST });
      var data = JSON.stringify({
        "email": email,
        "fulL_NAME": fulL_NAME,
        "iS_FORGOT_PASSWORD": iS_FORGOT_PASSWORD
      });

      const headers = {
        'Content-Type': 'application/json'
      };

      Axios("POST",
        ServiceURL.OTP_Verification_Email,
        data,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: OTP_VERIFICATION_EMAIL_FAIL });
          }


          console.log('OTPVerificationEmail ======== ', res.data);

          callBack(res?.data);
          if (res?.data?.i_Result == false) {
            return dispatch({ type: OTP_VERIFICATION_EMAIL_FAIL });
          } else {
            return dispatch({ type: OTP_VERIFICATION_EMAIL_SUCCESS, payload: res?.data });
          }

        })
        .catch(err => {
          console.log(err.response.data);
          return dispatch({ type: OTP_VERIFICATION_EMAIL_FAIL });
        });
    } catch (error) {
      return dispatch({ type: OTP_VERIFICATION_EMAIL_FAIL });
    }
  };


export const Login =
  (MOBILE_NUMBER: string, MOBILE_NUMBER_EXTENSION: string, password: string, callBack: any, callBackError: any) => async (dispatch: any) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      var data = JSON.stringify({
        "MOBILE_NUMBER": MOBILE_NUMBER,
        "MOBILE_NUMBER_EXTENSION": MOBILE_NUMBER_EXTENSION,
        "password": password
      });

      const headers = {
        'Content-Type': 'application/json'
      };

      Axios("POST",
        ServiceURL.Login,
        data,
        {},
        headers,
      )
        .then(async res => {
          if (res.status < 1 || res.status >= 400) {
            return dispatch({ type: LOGIN_FAIL });
          }
          if (res.data.i_Result) {
            await AsyncStorage.setItem('loggedIn', "true");
            await AsyncStorage.setItem('customer_id', res?.data?.i_Result?.Customer?.CUSTOMER_ID + "");
            await AsyncStorage.setItem('user_id', res?.data?.i_Result?.USER_ID + "");
            await AsyncStorage.setItem('owner_id', res?.data?.i_Result?.OWNER_ID + "");
            await AsyncStorage.setItem('ticket', res?.data?.i_Result?.TICKET);
            await AsyncStorage.setItem('password', password);
          }
          console.log('login ======== ', res.data);
          callBack(res.data);
          return dispatch({ type: LOGIN_SUCCESS, payload: res.data.i_Result });


        })
        .catch(err => {
          console.log(err.response.data);
          callBackError(err.response.data)
          return dispatch({ type: LOGIN_FAIL });
        });
    } catch (error: any) {
      callBackError(error.response.data)
      return dispatch({ type: LOGIN_FAIL });
    }
  };