

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

    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAIL

} from '../types/OrdersTypes';

const initialState = {
    upcommingOrdersData: null,
    upcommingOrdersLoading: false,

    pastOrdersData: null,
    pastOrdersLoading: false,


    orderDetailsData: null,
    orderDetailsLoading: false,

    addOrderReviewData: null,
    addOrderReviewLoading: false,

    cancelOrderData: null,
    cancelOrderLoading: false,
};

export const OrdersReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case CANCEL_ORDER_REQUEST:
            return {
                ...state,
                cancelOrderLoading: true,
            };
        case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                cancelOrderLoading: false,
                cancelOrderData: action.payload,
            };
        case CANCEL_ORDER_FAIL:
            return { ...state, cancelOrderLoading: false };

        case ADD_ORDER_REVIEW_REQUEST:
            return {
                ...state,
                addOrderReviewLoading: true,
            };
        case ADD_ORDER_REVIEW_SUCCESS:
            return {
                ...state,
                addOrderReviewLoading: false,
                addOrderReviewData: action.payload,
            };
        case ADD_ORDER_REVIEW_FAIL:
            return { ...state, addOrderReviewLoading: false, };


        case GET_ORDER_BY_ORDER_ID_REQUEST:
            return {
                ...state,
                orderDetailsData: null,
                orderDetailsLoading: true,
            };
        case GET_ORDER_BY_ORDER_ID_SUCCESS:
            return {
                ...state,
                orderDetailsLoading: false,
                orderDetailsData: action.payload,
            };
        case GET_ORDER_BY_ORDER_ID_FAIL:
            return { ...state, orderDetailsLoading: false, orderDetailsData: null };


        case GET_PAST_ORDERS_REQUEST:
            return {
                ...state,
                pastOrdersLoading: true,
                pastOrdersData: null,
            };
        case GET_PAST_ORDERS_SUCCESS:
            return {
                ...state,
                pastOrdersLoading: false,
                pastOrdersData: action.payload,
            };
        case GET_PAST_ORDERS_FAIL:
            return { ...state, pastOrdersLoading: false, pastOrdersData: null };


        case GET_UPCOMING_ORDERS_REQUEST:
            return {
                ...state,
                upcommingOrdersLoading: true,
                upcommingOrdersData: null,
            };
        case GET_UPCOMING_ORDERS_SUCCESS:
            return {
                ...state,
                upcommingOrdersLoading: false,
                upcommingOrdersData: action.payload,
            };
        case GET_UPCOMING_ORDERS_FAIL:
            return { ...state, upcommingOrdersLoading: false, upcommingOrdersData: null };

        default:
            return state;
    }
};
