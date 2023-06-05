import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Colors } from "../../common/foundation";
import styles from "./styles";

const AppButton = ({ onPress, title, style, disabled, loading, textStyle,children }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        style,
        disabled ? { backgroundColor: Colors.placeHolder } : null
      ]}
    >
      {children}
      {loading ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <Text
          style={[
            styles.txt,
            textStyle,
            disabled ? { color: Colors.white } : null
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
