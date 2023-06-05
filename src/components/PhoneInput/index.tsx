import { View, Text, I18nManager } from 'react-native';
import React from 'react';
import styles from './styles';
import PhoneInput from 'react-native-phone-number-input';
import { useTranslation } from 'react-i18next';
import { Colors, Fonts, ScaleWidth } from '../../common/foundation';
import * as RNLocalize from "react-native-localize";
import AntDesign from 'react-native-vector-icons/AntDesign';

const phoneInput = props => {
  const { t } = useTranslation();

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <PhoneInput
        containerStyle={styles.phoneInputWrapper}
        defaultValue={props.value}
        value={props.value}
        defaultCode={props.defaultCode?props.defaultCode:"LB"}
        layout="second"
        placeholder=" "
        onChangeText={props.onChangeText}
        onChangeCountry={props.onChangeCode}
        
        filterProps={{
          placeholder: t('profile.enterCounteryName'),
        }}
        textInputStyle={[
          styles.textinputStyle,
          { textAlign: I18nManager.isRTL ? 'right' : 'left' },
        ]}
        
        countryPickerButtonStyle={styles.pickerStyle}
        codeTextStyle={{ color: Colors.darkBlue,fontSize:ScaleWidth(13),fontFamily:Fonts.regular }}
        renderDropdownImage={
          <AntDesign name="caretdown" color={Colors.darkBlue} size={ScaleWidth(15)} />
        }
        textContainerStyle={{
          backgroundColor: Colors.white,
          borderWidth: ScaleWidth(1),
          borderColor: Colors.inputBackground,
          borderTopRightRadius: ScaleWidth(10),
          borderBottomRightRadius: ScaleWidth(10),
        }}
        returnKeyType={props.returnKeyType}
        onSubmitEditing={props.onSubmitEditing}
        disabled={props.disabled}
      />
      
      {props.error ? <Text style={styles.error}>{props.error}</Text> : null}

    </View>
  );
};

export default phoneInput;
