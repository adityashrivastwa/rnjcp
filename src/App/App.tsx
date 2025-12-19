import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import HomeScreen from '../Features/Home/HomeScreen';
import HomeStack from '../Navigation/HomeStack'
import {AppNavigator} from '../Navigation/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, }}>
        <AppNavigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({})