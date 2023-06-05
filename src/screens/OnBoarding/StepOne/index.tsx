import React,{useEffect} from "react";
import { View, SafeAreaView, Image, ScrollView, Text } from "react-native";
import styles from "./style";
import IMAGES from "../../../common/images";
import AppButton from "../../../components/AppButton";
import { useTranslation } from "react-i18next";
import Swiper from 'react-native-swiper'
import { Colors } from "../../../common/foundation";
import AsyncStorage from '@react-native-community/async-storage';

const StepOneScreen = (props: any) => {
  const { t } = useTranslation();

  useEffect(async()=>{
    await AsyncStorage.setItem("isNewAppDownloaded","true");
  },[])
  const onPress =async () => {
    await AsyncStorage.setItem("currency_id","1");
    props.navigation.navigate("Login");
  };

  const Card=(image,title,description)=>{
    return(
      <View style={styles.scrollView}>
         <Image
          source={image}
          style={styles.onboardingImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          {t("onboarding.step1Description")}
        </Text>
       
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>

      <Swiper style={styles.wrapper} activeDotColor={Colors.darkBlue} showsButtons={false}>

      {Card(IMAGES.onboarding1,t("onboarding.step1Title"),t("onboarding.step1Description"))}
      {Card(IMAGES.onboarding2,t("onboarding.step2Title"),t("onboarding.step2Description"))}
      {Card(IMAGES.onboarding3,t("onboarding.step3Title"),t("onboarding.step3Description"))}
      
        </Swiper>

        <AppButton
          style={styles.getStarted}
          textStyle={styles.getStartedText}
          title={t("onboarding.getStarted")}
          onPress={onPress}
        />

       
    </SafeAreaView>
  );
};

export default StepOneScreen;
