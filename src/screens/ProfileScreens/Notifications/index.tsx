import React, { useRef, useState } from 'react'
import { Animated, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { TabView, SceneMap } from "react-native-tab-view";
import { Colors, width, ScaleWidth } from '../../../common/foundation';
import { useTranslation } from 'react-i18next';
import { Modal, Snackbar } from 'react-native-paper'
import SwipeableFlatList from 'react-native-swipeable-list';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import EmptyItem from "../../../components/EmptyItem";
import HomeHeader from '../../../components/Headers/HomeHeader';
import NotificationsItem from '../../../components/NotificationsItem'
import AppButton from '../../../components/AppButton';
import IMAGES from '../../../common/images';


const Notifications = (props: any) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [modalIsActive, setModalIsActive] = useState(false)

  const initialLayout = { width: width };

  const handleNewContact = () => {
    //setModalIsActive(true)
  }


  const QuickActions = () => {
    return (
      <View style={styles.qaContainer}>
        <View style={styles.button}>
          <TouchableOpacity onPress={deleteAction} style={styles.trashView}>
            <EvilIcons
              name="trash"
              size={ScaleWidth(25)}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const FirstRoute = () => (
    false ?
      <SwipeableFlatList
        keyExtractor={(item, i) => JSON.stringify(i)}
        data={[{}, {}, {}, {}, {}]}
        renderItem={renderNotificationsItem}
        maxSwipeDistance={ScaleWidth(50)}
        renderQuickActions={({ index, item }) => QuickActions(index, item)}
        contentContainerStyle={styles.contentContainerStyle}
        shouldBounceOnMount={false}
      /> :
      <EmptyItem image={IMAGES.no_notification} title={t("empty.NO_NOTIFICATIONS_RIGHT_NOW")} description={t("empty.NO_NOTIFICATIONS_RIGHT_NOW_DESC")} />
  )
  const SecondRoute = () => (

    false ?
      <SwipeableFlatList
        keyExtractor={(item, i) => JSON.stringify(i)}
        data={[{}, {}, {}, {}, {}]}
        renderItem={renderNotificationsItem}
        maxSwipeDistance={ScaleWidth(50)}
        renderQuickActions={({ index, item }) => QuickActions(index, item)}
        contentContainerStyle={styles.contentContainerStyle}
        shouldBounceOnMount={false}
      /> :
      <EmptyItem image={IMAGES.no_notification} title={t("empty.NO_NOTIFICATIONS_RIGHT_NOW")} description={t("empty.NO_NOTIFICATIONS_RIGHT_NOW_DESC")} />



  )
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,

  });

  const [routes] = useState([
    { key: "first", title: t("profile.tracking") },
    { key: "second", title: t("profile.offers") },

  ]);


  const renderTabBar = (props: any) => {
    return (
      <View style={styles.tabContainer} >
        {props.navigationState.routes.map((route: any, i: any) => {
          const color = index === i ? Colors.darkBlue : Colors.gray;
          const borderColor = index === i ? Colors.darkBlue : Colors.inputBackground;

          return (
            <TouchableOpacity
              style={[styles.tabsStyle, {
                borderColor: borderColor,
              }]}
              onPress={() => {
                setIndex(i);
              }}
            >
              <View>
                <Animated.Text
                  style={[styles.tabText, {
                    color,

                  }]}
                >
                  {route.title}
                </Animated.Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };



  const hideModal = () => {
    setModalIsActive(false)
  }

  const deleteAction = () => {
    setModalIsActive(true)

  }
  const cancelAction = () => {
    setModalIsActive(false)
  }


  const renderNotificationsItem = ({ item, index }) => {
    return (
      <NotificationsItem
        imageUrl={
          "https://www.stjegypt.com/uploads/503099209134.jpg"
        }
        onPress={handleNewContact}
        name={`Your order is on the way!`}
        date={'JAN 09, 2023 - 01:28 PM '}
        track={t('profile.track')}
        orderCode={'#45412'}
      />
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader
        navigation={props.navigation}
        title={t("profile.notifications")}
        txtStyle={styles.txtStyle}
      />
      <TabView
        key={"xccc"}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tabStyle}
        sceneContainerStyle={{ backgroundColor: Colors.white }}
        swipeEnabled={false}
      />
      <Modal
        visible={modalIsActive}
        onDismiss={hideModal} >
        <View style={styles.modal} >
          <Text style={styles.titleModal}>{t('profile.wantDelete')}</Text>
          <Text style={styles.subTitleModal}>{t('profile.sureDelete')}</Text>
          <View style={styles.buttonView}>
            <AppButton
              title={t('profile.delete')}
              style={styles.buttonStyleDelete}
              textStyle={styles.textStyle}
              onPress={deleteAction}
            />
            <AppButton
              title={t('profile.cancel')}
              style={styles.buttonStyleCancel}
              textStyle={styles.textStyle}
              onPress={cancelAction}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Notifications
