import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import ProductDetails from '../Features/ProductDetails/ProductDetails';

const Stack = createNativeStackNavigator();
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tab" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


/// gitlab -- ci/cd

