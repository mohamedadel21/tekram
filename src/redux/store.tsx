import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { AuthReducer } from './reducers/AuthReducer'
import { HomeReducer } from './reducers/HomeReducer'
import { ProfileReducer } from './reducers/ProfileReducer'
import { RestauarnatsReducer } from './reducers/RestauarnatsReducer'
import { AddressesReducer } from './reducers/AddressesReducer'
import { OrdersReducer } from './reducers/OrdersReducer'
import { CartReducer } from './reducers/CartReducer'
const reducers = combineReducers({
    AuthReducer,
    HomeReducer,
    ProfileReducer,
    RestauarnatsReducer,
    AddressesReducer,
    OrdersReducer,
    CartReducer
});


const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
});
export default store;