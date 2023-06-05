import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import SplashScreen from "../screens/SplashScreen";
import OnBoarding1 from "../screens/OnBoarding/StepOne";
import SignUp from "../screens/Auth/SignUp";
import Login from "../screens/Auth/Login";
import VerificationCode from "../screens/Auth/VerificationCode";
import ResetPassword from "../screens/Auth/ResetPassword";
import CreateNewPassword from "../screens/Auth/CreateNewPassword";
import BottomTabsNavigation from "./BottomTabsNavigation";
import Restuarants from "../screens/HomeScreens/Restuarants";
import RestaurantMenu from "../screens/HomeScreens/RestaurantMenu";
import MenuItem from "../screens/HomeScreens/MenuItems";
import RestuarantsByCategory from "../screens/HomeScreens/RestuarantsByCategory";
import SearchFilter from "../screens/SearchScreens/SearchFilter";
import Profile from "../screens/ProfileScreens/Profile";
import Addresses from "../screens/ProfileScreens/Addresses";
import AddressForm from "../screens/ProfileScreens/AddressForm";
import Orders from "../screens/ProfileScreens/Orders";
import RatingScreen from "../screens/ProfileScreens/Rating";
import Payments from "../screens/ProfileScreens/Payments";
import PaymentForm from "../screens/ProfileScreens/PaymentForm";
import Notifications from "../screens/ProfileScreens/Notifications";
import Reviews from "../screens/ProfileScreens/Reviews";
import MyReviews from "../screens/ProfileScreens/MyReviews";
import AddressMap from "../screens/ProfileScreens/AddressMap";
import Filter from "../screens/SearchScreens/Filter";
import Track from "../screens/CartScreens/Track";
import Cart from "../screens/CartScreens/Cart";
import Favourites from "../screens/ProfileScreens/Favourites";
import TermsAndPolicy from "../screens/Auth/TermsAndPolicy";
import ChangePassword from "../screens/Auth/ChangePassword";
import NoInternetConnection from "../screens/NoInternetConnection";
import About from "../screens/ProfileScreens/About";
import { Colors, Fonts } from "../common/foundation";

const StackNavigator = () => {
 
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoarding1" component={OnBoarding1} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="NewPassword" component={CreateNewPassword} />
      <Stack.Screen name="Restuarants" component={Restuarants} />
      <Stack.Screen name="BottomTabsNavigation" component={BottomTabsNavigation} />
      <Stack.Screen name="RestaurantMenu" component={RestaurantMenu} options={{ headerShown: false, headerBackTitle: "", headerTitleStyle: { fontFamily: Fonts.medium, color: Colors.darkBlue }, autoHideHomeIndicator: true, headerTitleAlign: 'left' }} />
      <Stack.Screen name="MenuItem" component={MenuItem} />
      <Stack.Screen name="RestuarantsByCategory" component={RestuarantsByCategory} />
      <Stack.Screen name="SearchFilter" component={SearchFilter} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Addresses" component={Addresses} />
      <Stack.Screen name="AddressForm" component={AddressForm} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Rating" component={RatingScreen} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="PaymentForm" component={PaymentForm} />
      <Stack.Screen name="AddressMap" component={AddressMap} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="MyReviews" component={MyReviews} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Track" component={Track} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="TermsAndPolicy" component={TermsAndPolicy} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="NoInternetConnection" component={NoInternetConnection} />
      <Stack.Screen name="About" component={About} />

      
    </Stack.Navigator>
  );
};

export default StackNavigator;
