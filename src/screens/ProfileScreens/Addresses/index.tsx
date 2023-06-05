import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  I18nManager,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl
} from "react-native";
import HomeHeader from "../../../components/Headers/HomeHeader";
import AppButton from "../../../components/AppButton";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import IMAGES from "../../../common/images";
import styles from "./styles";
import { Colors, ScaleWidth } from "../../../common/foundation";
import AddressItem from "../../../components/AddressItem";
import { useSelector, useDispatch } from 'react-redux';
import { GetAddressesAction, DeleteAddressAction } from "../../../redux/actions/AddressesAction";
import EmptyItem from "../../../components/EmptyItem";
import { Button, Dialog, Portal, Provider } from 'react-native-paper';



const Addresses = (props: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const comeFrom = props?.route?.params?.comeFrom;
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [visible, setVisible] = useState(false);
  const [dialogType, setdialogType] = useState();


  const { addressesData,
    addressesLoading
  } = useSelector(
    state => state.AddressesReducer,
  );

  useEffect(() => {
    onRefresh()
  }, [])

  const onRefresh = () => {
    dispatch(GetAddressesAction((data) => { }))
  }

  const renderAddressItem = ({ item, index }) => {
    return (
      <AddressItem
        name={item?.NICKNAME}
        phone={item?.BUILDING_NAME}
        addressInfo={item?.MAP_LOCATION_ADDRESS}
        showEditButton={true}
        disabled={false}
        onPress={() =>
          //props.navigation.navigate("AddressMap", { type: "edit", item: item })
          props.navigation.navigate('AddressForm', {
            comeFrom: comeFrom ? comeFrom : 'default',
            locationUser: {
              latitude: item?.LATITUDE,
              longitude: item?.LONGITUDE,
              address: item?.MAP_LOCATION_ADDRESS,
            },
            type: 'edit',
            item: item,
          })
        }
        onEdit={() => {
          setSelectedAddress(item)
          showDialog()
        }}

      />
    );
  };

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);


  const dialogAction = () => {
    dispatch(DeleteAddressAction(selectedAddress?.CUSTOMER_ADDRESS_ID, (data) => {
      if (data) {
        hideDialog()
        onRefresh()
      }
    }))
  }


  return (
    <Provider>

      <View style={styles.container}>

        {comeFrom == "login" || comeFrom == "signup" ?
          <SafeAreaView>
            <Text style={styles.title}>
              {t("profile.addresses")}
            </Text>
          </SafeAreaView>
          :
          <HomeHeader
            navigation={props.navigation}
            title={t("profile.addresses")}
          />}

        {(!addressesLoading && addressesData?.length > 0) ?
          <FlatList
            style={styles.flatList}
            data={addressesData}
            renderItem={renderAddressItem}
            keyExtractor={(item, index) => JSON.stringify(index)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={addressesLoading} onRefresh={() => onRefresh()} />}
          /> :
          <EmptyItem image={IMAGES.no_addresses} title={t("empty.NO_ADDRESSES")} description={t("empty.NO_ADDRESSES_DESC")} />}

        <AppButton
          style={styles.signupButton}
          textStyle={styles.signupText}
          title={t("profile.addNew")}
          onPress={() => props.navigation.navigate("AddressMap", { type: "add", comeFrom: comeFrom ? comeFrom : 'home' })}
        />

        <Portal>
          <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
            <Dialog.Title><Text style={styles.confirmation}>{addressesData?.length > 1 ? t("profile.confirmation") : t("address.information")}</Text></Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogDesc} >{addressesData?.length > 1 ? t("address.deleteAddressDesc", { name: selectedAddress?.NICKNAME }) : t("address.leastOneRegisteredAddress")}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}><Text style={styles.dialogButtonText}>{addressesData?.length > 1 ? t("profile.cancel") : t("common.ok")}</Text></Button>
              {addressesData?.length > 1 ? <Button onPress={dialogAction}><Text style={styles.dialogButtonText}>{dialogType == 1 ? t("profile.signout") : t("profile.confirm")}</Text></Button>
                : null}
            </Dialog.Actions>
          </Dialog>
        </Portal>

      </View>
    </Provider>

  );
};

export default Addresses;
