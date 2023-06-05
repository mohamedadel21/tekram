import React from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import styles from "./styles";
// import {useTranslation} from 'react-i18next';
import IMAGES from "../../common/images";
import { Colors, ScaleWidth } from "../../common/foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const Input = ({
  placeholder,
  value,
  onChangeText,
  returnKeyType,
  onSubmitEditing,
  title,
  error,
  mainStyle,
  inputStyle,
  secureTextEntry,
  isPassword,
  isPasswordOnPress,
  keyboardType,
  maxLength,
  editable,
  autoCapitalize
}) => {
  return (
    <View style={[styles.mainContainer, mainStyle]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View
        style={[
          styles.subContainer,
          inputStyle,
          value ? { borderColor: Colors.primary } : null,
          error ? { borderColor: Colors.denger } : null
        ]}
      >

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeHolder}
          value={value}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          editable={editable}
          autoCapitalize={autoCapitalize}

        />

        {isPassword && (
          <TouchableOpacity onPress={isPasswordOnPress}
            style={styles.eyeIcon}>
            <Ionicons
              name={secureTextEntry ? "eye" : "eye-off"}
              size={ScaleWidth(14)}
              color={Colors.gray}
            />
          </TouchableOpacity>
        )}
        {error ? (
          <AntDesign
            name={"warning"}
            size={ScaleWidth(12)}
            color={Colors.denger}
          />
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default Input;
