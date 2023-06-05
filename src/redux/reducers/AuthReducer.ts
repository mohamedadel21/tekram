import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,


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
  FORGOT_PASSWORD_FAIL
} from '../types/AuthTypes';

const initialState = {
  loginData: {},
  loginLoading: false,

  OPTVerificationData: {},
  OPTVerificationLoading: false,

  signupData: {},
  signupLoading: false,

  changePasswordData: {},
  changePasswordLoading: false,

  verifyOtpCodeData: {},
  verifyOtpCodeLoading: false,

  createNewPasswordData: {},
  createNewPasswordLoading: false,
};

export const AuthReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        createNewPasswordLoading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        createNewPasswordLoading: false,
        createNewPasswordData: action.payload,
      };
    case FORGOT_PASSWORD_FAIL:
      return { ...state, createNewPasswordLoading: false, };


    case VERIFY_OTP_CODE_REQUEST:
      return {
        ...state,
        verifyOtpCodeLoading: true,
      };
    case VERIFY_OTP_CODE_SUCCESS:
      return {
        ...state,
        verifyOtpCodeLoading: false,
        verifyOtpCodeData: action.payload,
      };
    case VERIFY_OTP_CODE_FAIL:
      return { ...state, verifyOtpCodeLoading: false, };


    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordLoading: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordData: action.payload,
      };
    case CHANGE_PASSWORD_FAIL:
      return { ...state, changePasswordLoading: false, };


    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginData: {},
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginData: action.payload,
      };
    case LOGIN_FAIL:
      return { ...state, loginLoading: false, loginData: {} };

    case SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupData: {},
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        loginData: action.payload,
      };
    case SIGNUP_FAIL:
      return { ...state, signupLoading: false, signupData: {} };


    case OTP_VERIFICATION_EMAIL_REQUEST:
      return {
        ...state,
        OPTVerificationLoading: true,
        OPTVerificationData: {},
      };
    case OTP_VERIFICATION_EMAIL_SUCCESS:
      return {
        ...state,
        OPTVerificationLoading: false,
        OPTVerificationData: action.payload,
      };
    case OTP_VERIFICATION_EMAIL_FAIL:
      return { ...state, OPTVerificationLoading: false, OPTVerificationData: {} };

    default:
      return state;
  }
};
