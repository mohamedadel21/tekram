import {
  GET_HOME_FAIL,
  GET_HOME_REQUEST,
  GET_HOME_SUCCESS
} from '../types/HomeTypes';

const initialState = {
  homeData: null,
  homeLoading: false,
};

export const HomeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_HOME_REQUEST:
      return {
        ...state,
        homeLoading: true,
        homeData: null,
      };
    case GET_HOME_SUCCESS:
      return {
        ...state,
        homeLoading: false,
        homeData: action.payload,
      };
    case GET_HOME_FAIL:
      return { ...state, homeLoading: false, homeData: null };

    default:
      return state;
  }
};
