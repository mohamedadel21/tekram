import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, ScaleWidth, Spacings,width } from "../../../../common/foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "../../../../utils/axios";

const MapSearch = ({
  navigation,
  onclose,
  searchHandler
 
}) => {
  const { t,i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onclose}>
          <AntDesign
            name="close"
            size={ScaleWidth(22)}
            color={Colors.darkBlue}
          />
        </TouchableOpacity>
        <Text style={styles.depositAmountText}>
          {t("address.search")}
        </Text>
      </View>
        <GooglePlacesAutocomplete
        enableHighAccuracyLocation={true}
        autoFocus={true}
        styles={searchInputStyle}
        placeholder={t("address.search")}
        onPress={searchHandler}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: i18n.locale == "en" ? "en" : "ar",
        }}
      />        
    </View>
  );
};

const searchInputStyle= {
  container: {
    backgroundColor: Colors.white,
    width: "100%",
    marginTop: Spacings.hSpace4,
    marginBottom: 0,
    opacity: 0.9,
    borderRadius: Spacings.wSpace7,
  },
  description: {
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    opacity: 0.9,
  },
  predefinedPlacesDescription: {
    color: Colors.gray,
    fontFamily: Fonts.regular,
  },
  textInputContainer: {
    height: Spacings.hSpace3,
    width: width - Spacings.wSpace3,
  },
  textInput: {
    fontFamily: Fonts.regular,
    color: Colors.darkBlue,
    height: Spacings.hSpace3,
    fontSize: Spacings.wSpace4,
    backgroundColor: Colors.inputBackground,
    borderRadius: Spacings.wSpace7,
    
  },
}

export default MapSearch;
