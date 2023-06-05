import React, { useEffect, useState } from "react";
import { View, Alert, StatusBar, Linking, Platform, BackHandler } from "react-native";
import styles from "./style";
import IMAGES from "../../common/images";
import { CommonActions } from "@react-navigation/native";
import { Colors } from '../../common/foundation';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { GetAddressesAction } from "../../redux/actions/AddressesAction";
import Lottie from 'lottie-react-native';
import VersionCheck from 'react-native-version-check';
import NetInfo from '@react-native-community/netinfo';


const SplashScreen = (props: any) => {

  const dispatch = useDispatch()


  useEffect(() => {

    VersionCheck.needUpdate({
      currentVersion: VersionCheck.getCurrentVersion(),
      latestVersion: "1.0.0"
    })
      .then(async res => {
        console.log(res);    // true
        if (res.isNeeded) {
          Alert.alert(

            'Update Required',
            "Please update your app to continue",
            [
              {
                text: 'OK',
                style: 'cancel',
                onPress: () => {
                  Linking.openURL(Platform.OS == 'ios' ? "https://apps.apple.com/app/tekram-delivery/id6447301233" : "https://play.google.com/store/apps/details?id=com.tekram")
                  BackHandler.exitApp()
                }
              }
            ],
            { cancelable: false }
          );
        } else {
          _bootstrapAsync();
        }
      });

  }, []);

  const { addressesData,
  } = useSelector(
    state => state.AddressesReducer,
  );
  const _bootstrapAsync = async () => {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    const isNewAppDownloaded = await AsyncStorage.getItem('isNewAppDownloaded');
    const area_id = await AsyncStorage.getItem('area_id');

    const sleep = (m: any) => new Promise((r) => setTimeout(r, m));
    await sleep(2300);
    if (loggedIn == "true") {

      dispatch(GetAddressesAction(async (data) => {

        if (data?.length > 0) {
          data?.filter(async (item: any) => {
            if (item?.IS_CURRENT == true) {
              await AsyncStorage.setItem("LATITUDE", item?.LATITUDE + "")
              await AsyncStorage.setItem("LONGITUDE", item?.LONGITUDE + "")
            }
          })


          props.navigation.dispatch({
            ...CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTabsNavigation" }]
            })
          });
        } else {
          props.navigation.dispatch({
            ...CommonActions.reset({
              index: 0,
              routes: [{ name: "Addresses", params: { comeFrom: "login" } }]
            })
          });
        }
      }))


    } else {
      if (isNewAppDownloaded == "true") {
        if (area_id) {
          props.navigation.dispatch({
            ...CommonActions.reset({
              index: 0,
              routes: [{ name: "BottomTabsNavigation" }]
            })
          });
        } else {
          props.navigation.dispatch({
            ...CommonActions.reset({
              index: 0,
              routes: [{ name: "Login" }]
            })
          });
        }

      } else {


        props.navigation.dispatch({
          ...CommonActions.reset({
            index: 0,
            routes: [{ name: "OnBoarding1" }]
          })
        });
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.logoBackground} />
      <Lottie source={IMAGES.animated_app_splash_screen} autoPlay duration={3000} />
    </View>
  );
};

export default SplashScreen;
