import React, { useState } from "react";
import { Text, TouchableOpacity, View, I18nManager } from "react-native";
import { Colors, ScaleWidth } from "../../common/foundation";
import styles from "./styles";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from "react-i18next";


const AddressItem = ({
  onPress,
  name,
  phone,
  addressInfo,
  showRadio,
  showEditButton,
  onEdit,
  choose,
  isSelected,
  disabled,
}) => {
  const { t } = useTranslation();
  const [isSelectedValue, setIsSelectedValue] = useState(isSelected);

  const onPressHandler = () => {
    onPress()
    setIsSelectedValue(!isSelectedValue)
  }


  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.container}>
      <View style={{ flex: 1, marginRight: ScaleWidth(10) }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
        <Text style={styles.addressInfo}>{addressInfo}</Text>

      </View>

      {showRadio ?
        <Ionicons name={isSelected ? 'radio-button-on' : 'radio-button-off-sharp'} size={ScaleWidth(24)} color={Colors.darkBlue} />
        : null}

      {showEditButton ? <TouchableOpacity onPress={onEdit}>
        {choose ? (
          <TouchableOpacity style={styles.icon} onPress={onPressHandler}>
            <Ionicons name={isSelected ? 'radio-button-on' : 'radio-button-off-sharp'} size={ScaleWidth(27)} color={Colors.darkBlue} />
          </TouchableOpacity>
        ) : (
          <Ionicons name={'trash'} size={ScaleWidth(18)} color={Colors.darkBlue} />
        )}
      </TouchableOpacity> : null}


    </TouchableOpacity>

  );
};

export default AddressItem;
