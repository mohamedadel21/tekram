import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigation";
import {navigationRef} from './RootNavigator';

const RootNavigator = () => {
  const routeNameRef = useRef(null);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
    >
      <StackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
