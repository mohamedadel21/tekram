import React from "react";
import { View, TouchableOpacity, TextInput, Text, Image } from "react-native";
import styles from "./styles";
// import {useTranslation} from 'react-i18next';
import IMAGES from "../../common/images";
import { Colors, ScaleWidth } from "../../common/foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ReviewsInput = ({
  placeholder,
  value,
  onChangeText,
  returnKeyType,
  onSubmitEditing,
  mainStyle,
  inputStyle,
  keyboardType,
  onPress,
  editable,
  profilePic
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.mainContainer,
        inputStyle,
        value ? { borderColor: Colors.primary } : null,
      ]}
    >
      <Image
        source={profilePic}
        style={styles.profilePic}
      />
      {!editable ?
        <Text
          style={styles.placeholder}

        >{placeholder}</Text>
        : <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeHolder}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          editable={editable}
        />}


    </TouchableOpacity>
  );
};

export default ReviewsInput;
