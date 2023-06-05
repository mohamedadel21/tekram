import * as React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import { ScaleHeight } from '../../common/foundation';

const Header_Max_Height = ScaleHeight(200);
const Header_Min_Height = 50;

export default function DynamicHeader({animHeaderValue,children,onLayout}) {


  const animateHeaderHeight =  animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height , Header_Min_Height],
    extrapolate: 'clamp'
  })
  return (
    <Animated.View 
        style={[
          styles.header,
          {
            height: animateHeaderHeight,
          }
        
        ]}
        onLayout={onLayout}
      >
        {children}     
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',      
    left: 0,
    right: 0,
    
  },
  
});
