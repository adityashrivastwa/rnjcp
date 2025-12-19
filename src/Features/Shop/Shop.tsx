import { StyleSheet, Text, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../SharedComponents/Header/Header'
import { useNavigation } from '@react-navigation/native'

const Shop = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <Header isHomePage={true} title='JCPenney' navigation={navigation} isBackIcon={false} />
          <Text>Shop</Text>
        </SafeAreaView>
  )
}

export default Shop

const styles = StyleSheet.create({})