import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'

import styles from './styles';
import HomeHeader from '../../../components/Headers/HomeHeader';
import { useTranslation } from 'react-i18next';
import EmptyItem from '../../../components/EmptyItem';
import IMAGES from '../../../common/images';
import { ScaleHeight } from "../../../common/foundation";


const About = (props: any) => {
  const { t } = useTranslation();


  return (
    <View style={styles.container}>
      <HomeHeader
        navigation={props.navigation}
        title={t("profile.about")}
      />

      <ScrollView>

        <Image
          source={IMAGES.logo}
          style={styles.logo}
        />

        <Text style={styles.title}>Welcome to our food delivery app! </Text>
        <Text style={styles.description}>Our mission is to provide a convenient and seamless experience for all your food delivery needs.</Text>
        <Text style={styles.description2}><Text style={styles.tekramWord}>"Tekram"</Text> is designed to make it easy for you to order food from your favorite local restaurants. You can browse menus, place orders, and track your delivery in real-time, all from the comfort of your own home.</Text>
        <Text style={styles.description2}>With <Text style={styles.tekramWord}>"Tekram"</Text>, you can choose from a wide variety of cuisines and restaurants, and customize your orders to your preferences. </Text>
        <Text style={styles.description2}>Thank you for choosing <Text style={styles.tekramWord}>"Tekram"</Text>, and we look forward to bringing delicious meals to your doorstep! </Text>
      </ScrollView>


    </View>
  )
}

export default About;