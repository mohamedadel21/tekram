import {
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,


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

  GET_CURRENCY_LIST_REQUEST,
  GET_CURRENCY_LIST_SUCCESS,
  GET_CURRENCY_LIST_FAILED
} from '../types/ProfileTypes';

const initialState = {
  profileData: null,
  profileLoading: false,

  userReviewsData: null,
  userReviewsLoading: false,

  updateCustomerPicData: null,
  updateCustomerPicLoading: false,

  updateCustomerData: null,
  updateCustomerLoading: false,


  deleteUserAccountData: null,
  deleteUserAccountLoading: false,

  getCurrencyListData: null,
  getCurrencyListLoading: false,
};

export const ProfileReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case GET_CURRENCY_LIST_REQUEST:
      return {
        ...state,
        getCurrencyListLoading: true,
      };
    case GET_CURRENCY_LIST_SUCCESS:
      return {
        ...state,
        getCurrencyListLoading: false,
        getCurrencyListData: action.payload,
      };
    case GET_CURRENCY_LIST_FAILED:
      return { ...state, getCurrencyListLoading: false, };


    case DELETE_USER_ACCOUNT_REQUEST:
      return {
        ...state,
        deleteUserAccountLoading: true,
      };
    case DELETE_USER_ACCOUNT_SUCCESS:
      return {
        ...state,
        deleteUserAccountLoading: false,
        deleteUserAccountData: action.payload,
      };
    case DELETE_USER_ACCOUNT_FAIL:
      return { ...state, deleteUserAccountLoading: false, };


    case UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        updateCustomerLoading: true,
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        updateCustomerLoading: false,
        updateCustomerData: action.payload,
      };
    case UPDATE_CUSTOMER_FAIL:
      return { ...state, updateCustomerLoading: false, };


    case UPDATE_CUSTOMER_PIC_REQUEST:
      return {
        ...state,
        updateCustomerPicLoading: true,
        updateCustomerPicData: null,
      };
    case UPDATE_CUSTOMER_PIC_SUCCESS:
      return {
        ...state,
        updateCustomerPicLoading: false,
        updateCustomerPicData: action.payload,
      };
    case UPDATE_CUSTOMER_PIC_FAIL:
      return { ...state, updateCustomerPicLoading: false, updateCustomerPicData: null };


    case GET_USER_REVIEWS_REQUEST:
      return {
        ...state,
        userReviewsLoading: true,
      };
    case GET_USER_REVIEWS_SUCCESS:
      return {
        ...state,
        userReviewsLoading: false,
        userReviewsData: action.payload,
      };
    case GET_USER_REVIEWS_FAIL:
      return { ...state, userReviewsLoading: false, };

    case GET_PROFILE_REQUEST:
      return {
        ...state,
        profileLoading: true,
        profileData: null,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        profileData: action.payload,
      };
    case GET_PROFILE_FAIL:
      return { ...state, profileLoading: false, profileData: null };

    default:
      return state;
  }
};
