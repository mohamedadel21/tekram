import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { Colors, ScaleWidth } from '../../common/foundation';
import Feather from "react-native-vector-icons/Feather";


const OrderDetailsItem = ({
  title,
  addons,
  offerGroupItems,
  isLastItem,
  number
}) => (
  <View style={[styles.container,isLastItem?{borderBottomWidth:0}:null]}>
    <View style={styles.titleView}>
      <Text style={styles.title}> <Text style={styles.number}>{number}</Text>   {title}</Text>
     
    </View>

    {addons?.length>0?addons?.map((item: any,index:any) => {
      return (
        <View key={JSON.stringify(item)} style={styles.addonsView}>
          <Text style={styles.addonText}>
            -{item?.NAME}
          </Text>
          
        </View>

      )
    }):null}
    {offerGroupItems?.length>0?offerGroupItems?.map((item: any,index:any) => {
      return (
        <View key={JSON.stringify(item)} style={styles.addonsView}>
          <Text style={styles.addonText}>
            -{item?.NAME}
          </Text>
          
        </View>

      )
    }):null}

  </View>
);

export default OrderDetailsItem;