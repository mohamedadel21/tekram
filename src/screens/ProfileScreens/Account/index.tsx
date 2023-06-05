import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  SafeAreaView,
  Linking,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HomeHeader from "../../../components/Headers/HomeHeader";
import AccountItem from "../../../components/AccountItem";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import IMAGES from "../../../common/images";
import styles from "./styles";
import { Colors, ScaleHeight, ScaleWidth, height, Fonts } from "../../../common/foundation";
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { GetProfileAction, GetCurrencyList, DeleteUserAccount, updateCustomerProfile, UpdategGuestCurrencyAction } from "../../../redux/actions/ProfileAction";
import { RemoveFavouritesAction } from "../../../redux/actions/RestaurantsAction";
import BottomSheet from "react-native-raw-bottom-sheet";
import AppButton from "../../../components/AppButton";
import { Button, Dialog, Portal, Provider } from 'react-native-paper';
import Input from "../../../components/Input";

const Account = (props: any) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { profileData,
    deleteUserAccountData,
    deleteUserAccountLoading,
    getCurrencyListData,
    getCurrencyListLoading,
    updateCustomerData,
    updateCustomerLoading
  } = useSelector(
    state => state.ProfileReducer,
  );
  const [email, setEmail] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState()
  const sheetRef = useRef(null)
  const aboutRef = useRef(null)
  const [loggedIn, setLoggedIn] = useState();
  const [password, setPassword] = useState("");
  const [ispPssword, setIsPassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialogType, setdialogType] = useState();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const checkAuthStatus = async () => {
    const loggedInStatus = await AsyncStorage.getItem('loggedIn');
    setLoggedIn(loggedInStatus)
  }
  const getGuestCurrency = async () => {
    const currency_id = await AsyncStorage.getItem("currency_id");

    getCurrencyListData?.filter((item: any) => {
      if (item?.CURRENCY_ID == currency_id) {
        currency = item
      }
    })
    if (currency) {
      dispatch(UpdategGuestCurrencyAction(currency))
    }

  }

  var currency = null
  getCurrencyListData?.filter((item: any) => {
    if (item?.CURRENCY_ID == profileData?.CURRENCY_ID) {
      currency = item
    }
  })




  useEffect(() => {

    if (getCurrencyListData) {
      let currency = null
      getCurrencyListData?.filter((item: any) => {
        if (item?.CURRENCY_ID == profileData?.CURRENCY_ID) {
          currency = item
        }
      })
      setSelectedCurrency(currency)
    }
  }, [profileData, getCurrencyListData]);

  useEffect(() => {
    getGuestCurrency()

    dispatch(GetProfileAction())
    dispatch(GetCurrencyList())
    getEmail()
    checkAuthStatus()
  }, []);

  const getEmail = async () => {

    const email = await AsyncStorage.getItem('email');
    setEmail(email)

  }

  const ordersScreen = () => {
    props.navigation.navigate('Orders')
  }
  const notificationsScreen = () => {
    props.navigation.navigate('Notifications')
  }

  const logout = async () => {
    dispatch(RemoveFavouritesAction())
    await AsyncStorage.setItem('loggedIn', "");
    await AsyncStorage.setItem('customer_id', "");
    await AsyncStorage.setItem('user_id', "");
    await AsyncStorage.setItem('owner_id', "");
    await AsyncStorage.setItem('area_id', "");
    await AsyncStorage.setItem('email', "");
    await AsyncStorage.setItem('ticket', "");
    await AsyncStorage.setItem('password', "");
    props.navigation.push("SplashScreen")

  }
  const logoutAction = () => {
    setdialogType(1)
    showDialog()
    /*Alert.alert(t("profile.confirmation"), t("profile.logoutDesc"),
      [

        {
          text: t("profile.cancel"),
          style: 'destructive'
        },
        {
          text: t("profile.signout"),
          onPress: () => logout(),
        },
      ]
    )*/

  }

  const loginAction = () => {
    props.navigation.navigate("SignUp")
  }

  const deleteAccount = () => {
    dispatch(DeleteUserAccount(password,(data) => {
      if (data?.Exception_Message == "") {
        logout()
      } else if (data?.Exception_Message) {
        Alert.alert("", data?.Exception_Message)
      }
    }))
  }

  const deleteAccountAction = () => {

    setdialogType(2)
    showDialog()
    /* Alert.alert(t("profile.confirmation"), t("profile.deleteAccountDesc"),
       [
 
         {
           text: t("profile.cancel"),
         },
         {
           text: t("profile.confirm"),
           onPress: () => deleteAccount()
           ,
         },
       ]
     )*/
  }

  const changePasswordAction = () => {
    props.navigation.navigate("ChangePassword")
  }

  const aboutAction = () => {
    props.navigation.navigate("About")
  }

  const changeCurrencyAction = async () => {

    if (loggedIn) {
      let form = {
        fullName: profileData?.NAME,
        phone: profileData?.User.MOBILE_NUMBER,
        callingCode: profileData?.User?.MOBILE_NUMBER_EXTENSION,
        CURRENCY_ID: selectedCurrency?.CURRENCY_ID,
        NOTIFICATION_TOKEN: profileData?.NOTIFICATION_TOKEN,
        email: profileData?.User?.EMAIL
      }
      dispatch(updateCustomerProfile(form, (data) => {
        if (data.i_Result.CUSTOMER_ID) {
          dispatch(GetProfileAction())
          sheetRef.current.close()
        } else {
          Alert.alert("", data?.Exception_Message)
        }
      }))
    } else {
      dispatch(UpdategGuestCurrencyAction(selectedCurrency))
      await AsyncStorage.setItem("currency_id", selectedCurrency.CURRENCY_ID + "");
      sheetRef.current.close()

    }

  }

  const onChangeTextPassword = (value: any) => {
    setPassword(value)
  }

  const dialogAction = () => {
    if (dialogType == 1) {
      logout()
    }
    if (dialogType == 2) {
      deleteAccount()
    }
  }

  return (
    <Provider>

      <SafeAreaView style={styles.container}>

        {loggedIn ? <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.bannerView}>
            <View>
              <Text style={styles.name}>
                {profileData?.NAME}
              </Text>
              <Text style={styles.email}>
                {profileData?.User?.EMAIL}
              </Text>
            </View>
            <Image
              source={profileData?.File_Url ? { uri: profileData?.File_Url } : IMAGES.default}
              resizeMode="cover"
              style={styles.profilePic}
              defaultSource={IMAGES.default}
            />
          </View>

          { /*<View style={styles.row}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Profile")} style={styles.column}>
            <Image source={IMAGES.user} style={styles.icon} resizeMode='contain' />
            <Text style={styles.text}>
              {t("profile.profile")}
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => props.navigation.navigate("Payments")}
            style={styles.column}>
            <Image source={IMAGES.purse} style={styles.icon} resizeMode='contain' />
            <Text style={styles.text}>
              {t("profile.payment")}
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />

          <TouchableOpacity onPress={notificationsScreen} style={styles.column}>
            <Image source={IMAGES.bell} style={styles.icon} resizeMode='contain' />
            <Text style={styles.text}>
              {t("profile.notifications")}


            </Text>
          </TouchableOpacity>
        </View>*/}
          <Text style={styles.foodOrders}>{t("profile.personalDetails")}</Text>
          <AccountItem
            image={IMAGES.user}
            title={t("profile.profile")}
            onPress={() => props.navigation.navigate("Profile")}
          />

          <AccountItem
            image={IMAGES.bill}
            title={t("profile.orders")}
            onPress={ordersScreen}
          />
          <AccountItem
            image={IMAGES.location}
            title={t("profile.addresses")}
            onPress={() => props.navigation.navigate("Addresses")}
          />
          <AccountItem
            image={IMAGES.currency}
            title={t("profile.changeCurrency")}
            isCurrencyChange={true}
            currenncy={currency?.SYMBOL}
            onPress={() => sheetRef.current.open()}
          />
          <Text style={styles.more}>{t("profile.more")}</Text>

          <AccountItem
            image={IMAGES.info}
            title={t("profile.about")}
            onPress={aboutAction}
          />
          <AccountItem
            image={IMAGES.favorite}
            title={t("profile.reviews")}
            onPress={() => props.navigation.navigate("MyReviews")}
          />
          <AccountItem
            image={IMAGES.heart}
            title={t("profile.favorites")}
            onPress={() => props.navigation.navigate("Favourites")}
          />

          <AccountItem
            image={IMAGES.mark}
            title={t("profile.help")}
            onPress={() => {
              aboutRef.current.open()
              // Linking.openURL('mailto:tekram.development@gmail.com')

            }}
          />
          <AccountItem
            isIcon={true}
            iconName='lock'
            title={t("profile.changePassword")}
            onPress={changePasswordAction}
          />
          <AccountItem
            isIcon={true}
            iconName='deleteuser'
            title={t("profile.deleteAccount")}
            onPress={deleteAccountAction}
          />
          <AccountItem
            image={IMAGES.logout}
            title={t("profile.logout")}
            onPress={logoutAction}
          />


          <View style={{ height: ScaleHeight(30) }} />

        </KeyboardAwareScrollView> :
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={[styles.bannerView, { marginBottom: ScaleHeight(20) }]}>
              <View>
                <Text style={styles.name}>
                  {t("common.guest")}
                </Text>

              </View>
              <Image
                source={IMAGES.logo}
                resizeMode="contain"
                style={styles.profilePic}
                defaultSource={IMAGES.default}
              />
            </View>

            <AccountItem
              image={IMAGES.currency}
              title={t("profile.changeCurrency")}
              isCurrencyChange={true}
              currenncy={currency?.SYMBOL}
              onPress={() => sheetRef.current.open()}
            />
            <AccountItem
              image={IMAGES.info}
              title={t("profile.about")}
              onPress={aboutAction}
            />
            <AccountItem
              image={IMAGES.mark}
              title={t("profile.help")}
              onPress={() => {
                aboutRef.current.open()


              }}

            />
            <AccountItem
              image={IMAGES.logout}
              title={t("profile.signUp")}
              onPress={loginAction}
            />
          </KeyboardAwareScrollView>
        }

        <BottomSheet
          ref={aboutRef}
          height={ScaleHeight(200)}
          openDuration={250}
          customStyles={{
            container: styles.sheetContainer,
          }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, }}>

            <Text style={[styles.changeCurrency]}>{t("profile.contactWithUs")}</Text>

            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('mailto:tekram.development@gmail.com')
                }}
                style={styles.buttonAbout}>
                <Image style={styles.imageHelp} source={IMAGES.mail} resizeMode='cover' />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('whatsapp://send?text=hello&phone=+961000000')
                }}
                style={styles.buttonAbout}>
                <Image style={styles.imageHelp} source={IMAGES.whatsapp} resizeMode='cover' />

              </TouchableOpacity>

            </View>
          </ScrollView>
        </BottomSheet>

        <BottomSheet
          ref={sheetRef}
          height={height / 2.2}
          openDuration={250}
          customStyles={{
            container: styles.sheetContainer,
          }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, }}>

            <Text style={[styles.changeCurrency]}>{t("profile.changeCurrency")}</Text>

            <View style={styles.changeCurrencyView}>

              {getCurrencyListData?.map((currency: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedCurrency(currency)}
                    style={[styles.changeCurrencyItem, currency?.CURRENCY_ID == selectedCurrency?.CURRENCY_ID ? { backgroundColor: Colors.inputBackground } : null]}>
                    <Text style={[styles.changeCurrencyText]}>{currency?.CURRENCY_NAME}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <AppButton
              title={t("profile.save")}
              onPress={() => changeCurrencyAction()}
              style={styles.changeCurrencyButton}
              textStyle={styles.changeCurrencyButtonText}
              disabled={updateCustomerLoading || profileData?.CURRENCY_ID == selectedCurrency?.CURRENCY_ID}
              loading={updateCustomerLoading}
            />

          </ScrollView>
        </BottomSheet>
<KeyboardAwareScrollView>

        <Portal>
          <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
            <Dialog.Title><Text style={styles.confirmation}>{t("profile.confirmation")}</Text></Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogDesc} >{dialogType == 1 ? t("profile.logoutDesc") : t("profile.deleteAccountDesc")}</Text>
             {dialogType == 1 ?null:<Input
                value={password}
                isPassword={true}
                isPasswordOnPress={() => setIsPassword(!ispPssword)}
                inputStyle={styles.password}
                placeholder={t("auth.enter")+t("auth.password")}
                secureTextEntry={ispPssword}
                error={!password?" ":""}
                autoCapitalize='none'
                onChangeText={onChangeTextPassword}
              />
             }
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}><Text style={styles.dialogButtonText}>{t("profile.cancel")}</Text></Button>
              <Button disabled={dialogType!=1&&!password} onPress={dialogAction}><Text style={[styles.dialogButtonText,dialogType!=1&&!password?{color:Colors.gray}:{}]}>{dialogType == 1 ? t("profile.signout") : t("profile.confirm")}</Text></Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        </KeyboardAwareScrollView>


      </SafeAreaView>
    </Provider>
  );
};

export default Account;
