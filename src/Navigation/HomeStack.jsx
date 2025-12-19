import React from 'react';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import HomeScreen from '../Features/Home/HomeScreen';
import ProductDetails from '../Features/ProductDetails/ProductDetails';
import CartScreen from '../Features/Cart/CartScreen'
import ProductListScreen from '../Features/ProductList/ProductListScreen';
import CheckoutScreen from '../Features/CheckOut/Checkout'
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} >
      <Stack.Screen name="Home" component={HomeScreen}  />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name='Checkout' component={CheckoutScreen} />
    </Stack.Navigator>
  );
}
