import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../SharedComponents/Header/Header';
import { useNavigation } from '@react-navigation/native';

const Wallet = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        isHomePage={true}
        title="JCPenney"
        navigation={navigation}
        isBackIcon={false}
      />
      <Text>Wallet</Text>
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
