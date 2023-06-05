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

const initialState = {
    addItemToCartData: null,
    addItemToCartLoading: false,

    cartData: null,
    cartLoading: false,

    verifyPromoCodeData: null,
    verifyPromoCodeLoading: false,

    finalizeOrderData: null,
    finalizeOrderLoading: false,

    generalSettingsData: null,
    generalSettingsLoading: false,
};

export const CartReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case GET_GENERAL_SETTINGS_REQUEST:
            return {
                ...state,
                generalSettingsLoading: true,
            };
        case GET_GENERAL_SETTINGS_SUCCESS:
            return {
                ...state,
                generalSettingsLoading: false,
                generalSettingsData: action.payload,
            };
        case GET_GENERAL_SETTINGS_FAIL:
            return { ...state, generalSettingsLoading: false };


        case FINALIZE_ORDER_REQUEST:
            return {
                ...state,
                finalizeOrderLoading: true,
            };
        case FINALIZE_ORDER_SUCCESS:
            return {
                ...state,
                finalizeOrderLoading: false,
                finalizeOrderData: action.payload,
            };
        case FINALIZE_ORDER_FAIL:
            return { ...state, finalizeOrderLoading: false };


        case VERIFY_PROMO_CODE_REQUEST:
            return {
                ...state,
                verifyPromoCodeLoading: true,
            };
        case VERIFY_PROMO_CODE_SUCCESS:
            return {
                ...state,
                verifyPromoCodeLoading: false,
                verifyPromoCodeData: action.payload,
            };
        case VERIFY_PROMO_CODE_FAIL:
            return { ...state, verifyPromoCodeLoading: false };


        case GET_CART_REQUEST:
            return {
                ...state,
                cartLoading: true,
            };
        case GET_CART_SUCCESS:
            return {
                ...state,
                cartLoading: false,
                cartData: action.payload,
            };
        case GET_CART_FAIL:
            return { ...state, cartLoading: false };

        case ADD_ITEM_TO_CART_REQUEST:
            return {
                ...state,
                addItemToCartData: null,
                addItemToCartLoading: true,
            };
        case ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                addItemToCartLoading: false,
                addItemToCartData: action.payload,
            };
        case ADD_ITEM_TO_CART_FAIL:
            return { ...state, addItemToCartLoading: false, addItemToCartData: null };

        default:
            return state;
    }
};
