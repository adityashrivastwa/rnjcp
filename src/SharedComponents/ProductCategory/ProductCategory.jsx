import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { IMAGE_DATA_GRID } from '../../Assets/dummyData'
export default function ProductCategory({ navigation, data }) {
  return (
    <View>
      <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          navigation={navigation}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductList')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 100,
                  width: 100,
                  marginLeft: 10,
                  borderRadius: 50,
                  marginBottom: 10,
                }}
              />
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
    </View>
  )
}