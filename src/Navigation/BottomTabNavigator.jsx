import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home,} from 'lucide-react-native';
import HomeStack from './HomeStack';
import ProductDetails from '../Features/ProductDetails/ProductDetails';
import CartScreen from '../Features/Cart/CartScreen';
import Icon from '../SharedComponents/Icon/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Shop from '../Features/Shop/Shop';
import Stores from '../Features/Stores/Stores';
import Account from '../Features/Account/Account';
import Wallet from '../Features/Wallet/Wallet';
// import Icon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets()
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: '#C8102E',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom - 4 : 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          headerShown: false,
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => 
          <Icon 
            name="shopping-bag" 
            color={color} 
            size={size} 
            family='MaterialIcons'
          />,
        }}
      />

      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShown: false,
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color, size }) => 
            <Icon 
              name="wallet-outline" 
              color={color} 
              size={size}
              family='Ionicons' 
            />,
        }}
      />

      <Tab.Screen
        name="Stores"
        component={Stores}
        options={{
          headerShown: false,
          tabBarLabel: 'Stores',
          tabBarIcon: ({ color, size }) => 
          <Icon 
            name="store" 
            family='MaterialIcons'
            color={color} 
            size={size} 
          />,
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => <Icon name="user" family='FontAwesome' color={color} size={size} />,
        }}
      />

 
    </Tab.Navigator>
  );
};
