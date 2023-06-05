import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/HomeScreens/Home";
import { Image, Text, View } from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Colors, ScaleHeight, Typography, height, width } from "../common/foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import Account from "../screens/ProfileScreens/Account";
import SearchFilter from "../screens/SearchScreens/SearchFilter";
import Cart from "../screens/CartScreens/Cart";
const aspectRatio = height / width;

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={{
        tabBarStyle: styles.tapStyles,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          height: ScaleHeight(60)
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        //

        options={() => options(t("bottomTabs.home"), "home", t, null)}
      />
      <Tab.Screen
        name="SearchFilter"
        component={SearchFilter}
        //
        options={() => options(t("bottomTabs.search"), "search1", t, null)}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        //
        options={() => options(t("bottomTabs.account"), "user", t, null)}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;

const options = (name: string, icon: string, t: any, cart_items: any) => ({
  headerShown: false,

  tabBarLabel: ({
    focused,
    color,
    size
  }: {
    focused: any;
    color: any;
    size: any;
  }) => {
    return (
      <Text style={[focused ? Typography.active : Typography.inActive, { marginBottom: ScaleHeight(10) }]}>
        {aspectRatio > 1.6 ? null : <AntDesign
          name={icon}
          size={ScaleHeight(22)}
          color={focused ? Colors.primary : Colors.darkBlue}
        />}  {name}
      </Text>
    );
  },
  tabBarIcon: ({
    focused,
    color,
    size
  }: {
    focused: any;
    color: any;
    size: any;
  }) => {
    if (name == t("bottomTabs.cart")) {
      return (
        <View>
          <AntDesign
            name={icon}
            size={ScaleHeight(22)}
            color={focused ? Colors.primary : Colors.darkBlue}
          />

          {cart_items?.length > 0 && (
            <View style={styles.numOfCartItems}>
              <Text style={styles.numOfCartItemsText}>
                {cart_items?.length > 99 ? "+99" : cart_items?.length}
              </Text>
            </View>
          )}
        </View>
      );
    } else {
      if (aspectRatio > 1.6) {
        return (
          <AntDesign
            name={icon}
            size={ScaleHeight(22)}
            color={focused ? Colors.primary : Colors.darkBlue}
          />
        );
      }

    }
  }, tabBarStyle: {
    height: ScaleHeight(70),
    justifyContent: 'center',
    alignItems: 'center',
    display:
      name == t('bottomTabs.cart')
        ? 'none'
        : null,
  },
  // to hide tab bar in cart screen
});
