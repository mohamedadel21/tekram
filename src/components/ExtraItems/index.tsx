import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { Colors, ScaleWidth } from '../../common/foundation';
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from 'react-redux';


const ExtraItems = ({
  price,
  minus,
  disabled,
  outputCount,
  plus,
  title,
  close,
  currency,
  addons,
  offerGroupItems,
  isLastItem,
  currencyRate
}) => {
  const { 
    profileData,
    
  } = useSelector(
    state => state.ProfileReducer,
  );
  
  return (
    <View style={[styles.container, isLastItem ? { borderBottomWidth: 0 } : null]}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={close}>
          <Feather
            name='x'
            color={Colors.darkBlue}
            size={ScaleWidth(16)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.priceView}>
        <Text style={styles.dollarSign}>{currency}{" "}
          <Text style={styles.price}>{price}</Text>
        </Text>

        <View style={styles.countView}>
          <TouchableOpacity
            style={[styles.minusButton, {
              borderColor: disabled == false ? Colors.darkBlue : Colors.gray
            }]}
            disabled={disabled}
            onPress={minus}
          >

            <EvilIcons name='minus' color={disabled == false ? Colors.darkBlue : Colors.gray} size={ScaleWidth(40)} />
          </TouchableOpacity>

          <Text style={styles.outputCount}>{outputCount}</Text>

          <TouchableOpacity
            style={styles.plusButton}
            onPress={plus}
          >
            <AntDesign name='pluscircle' color={Colors.darkBlue} size={ScaleWidth(27)} />

          </TouchableOpacity>

        </View>
      </View>

      {addons?.map((item: any, index: any) => {
        return (
          <View key={JSON.stringify(item)} style={styles.addonsView}>
            <Text style={styles.addonText}>
              -{item?.NAME}

            </Text>
            <Text style={styles.addonPrice}>
              {currency} {parseFloat(parseFloat(item?.PRICE*(currencyRate||1)).toFixed(2)).toLocaleString()}
            </Text>
          </View>

        )
      })}
      {offerGroupItems?.map((item: any, index: any) => {
        return (
          <View key={JSON.stringify(item)} style={styles.addonsView}>
            <Text style={styles.addonText}>
              -{item?.NAME}

            </Text>
            <Text style={styles.addonPrice}>
              {currency} {parseFloat(parseFloat(item?.PRICE*(currencyRate||1)).toFixed(2)).toLocaleString()}
            </Text>
          </View>

        )
      })}

    </View>
  );
}
export default ExtraItems;