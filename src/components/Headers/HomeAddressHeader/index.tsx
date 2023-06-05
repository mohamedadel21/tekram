import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  I18nManager,
  TouchableOpacity,
  Image
} from "react-native";
import { Colors, ScaleWidth } from "../../../common/foundation";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTranslation } from "react-i18next";
import IMAGES from "../../../common/images";

const HomeAddressHeader = ({ address, style, imageUrl, onPress,name, onPressAddress, onPressAddAddress }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={styles.row}>
        <AntDesign
          name="enviromento"
          size={ScaleWidth(22)}
          color={Colors.darkBlue}
        />
        {address ? <TouchableOpacity onPress={onPressAddress} style={{ flexGrow: 1 }}>
          <Text style={styles.deliverTo}>{t("home.deliverTo")}</Text>
          <View ><Text style={styles.address}>{address}</Text></View>
        </TouchableOpacity> :
          <View style={{ flexGrow: 1 }}>
            <TouchableOpacity onPress={onPressAddAddress}><Text style={styles.addLocation}>{t("home.addLocation")}</Text></TouchableOpacity>
          </View>}
      </View>
      <View style={styles.imageButton}>
      {name? <Text style={styles.name}>{name}</Text>:null}
      </View>
      {/*  <TouchableOpacity onPress={onPress} style={styles.imageButton}>
        <Image source={imageUrl ? { uri: imageUrl } : IMAGES.default} // no images from backend yet
          resizeMode="cover" style={styles.image} defaultSource={IMAGES.default} />
  </TouchableOpacity>*/}
    </SafeAreaView>
  );
};

export default HomeAddressHeader;
