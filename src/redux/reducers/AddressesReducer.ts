import {
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESSES_FAIL,


  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAIL,

  GET_REGIONS_REQUEST,
  GET_REGIONS_SUCCESS,
  GET_REGIONS_FAIL
} from '../types/AddressesTypes';

const initialState = {
  addressesData: null,
  addressesLoading: false,

  addAddressData: null,
  addAddressLoading: false,

  regionsData: null,
  regionsLoading: false,
};

export const AddressesReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case GET_REGIONS_REQUEST:
      return {
        ...state,
        regionsLoading: true,
      };
    case GET_REGIONS_SUCCESS:
      return {
        ...state,
        regionsLoading: false,
        regionsData: action.payload,
      };
    case GET_REGIONS_FAIL:
      return { ...state, regionsLoading: false,  };


    case ADD_ADDRESS_REQUEST:
      return {
        ...state,
        addAddressLoading: true,
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addAddressLoading: false,
        addAddressData: action.payload,
      };
    case ADD_ADDRESS_FAIL:
      return { ...state, addAddressLoading: false,  };


    case GET_ADDRESSES_REQUEST:
      return {
        ...state,
        addressesLoading: true,
        addressesData: null,
      };
    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        addressesLoading: false,
        addressesData: action.payload,
      };
    case GET_ADDRESSES_FAIL:
      return { ...state, addressesLoading: false, addressesData: null };

    default:
      return state;
  }
};
