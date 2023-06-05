import React, { useEffect, useState } from "react";
import { View, Alert, Text, Linking, Image, SafeAreaView } from "react-native";
import styles from "./style";
import IMAGES from "../../common/images";
import { CommonActions } from "@react-navigation/native";
import { Colors } from '../../common/foundation';
import AppButton from '../../components/AppButton';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { GetAddressesAction } from "../../redux/actions/AddressesAction";
import { useTranslation } from "react-i18next";
import NetInfo from '@react-native-community/netinfo';
import HomeHeader from '../../components/Headers/HomeHeader';

const NoInternetConnection = (props: any) => {

  const dispatch = useDispatch()
  const { t } = useTranslation();

  const [netInfo, setNetInfo] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
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
    await sleep(2000);
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

  const checkInternetConnection = () => {
    netInfo ? _bootstrapAsync() : null;
  };

  const tryAgainAction = () => {
    _bootstrapAsync()

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container2}>

        <Image
          source={IMAGES.no_conexion}
          resizeMode='contain'
          style={styles.image}
        />

        <Text style={styles.noInternet}>
          Oops!
        </Text>

        <Text style={styles.noInternetDesc}>
          {t("common.noInternetDesc")}
        </Text>
        <AppButton
          title={t("common.tryAgain")}
          onPress={tryAgainAction}
          style={styles.signupButton}
          textStyle={styles.signupText}
        />
      </View>

    </SafeAreaView>
  );
};

export default NoInternetConnection;
