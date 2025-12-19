import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../Icon/Icon';
import FloatingCartButton from '../FloatingCartButton/FloatingCartButton';

const ProductListHome = ({ data, title, isShopAll = true, titleStyle, navigation}) => {
  return (
    <>
      <View style={{ marginTop: 50 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            ...titleStyle,
          }}
        >
          {title}
        </Text>
        {isShopAll && (
          <TouchableOpacity
            style={{ alignItems: 'flex-end', marginTop: 20, marginRight: 20 }}
            onPress={() => navigation.navigate('ProductList')}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Shop All</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginLeft: 20, marginTop: 25 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ width: 170, marginLeft: 10 }} onPress={() => navigation.navigate('ProductList')}>
              <Image
                source={{ uri: item.image }}
                style={{ height: 170, width: 170, marginRight: 15 }}
              />
              <FloatingCartButton buttonStyles={{ top:  120, right: 10}} />

              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ flexShrink: 1 }}
              >
                {item.imageDescription}
              </Text>
              {item?.isDemanding && (
                <Text style={{ color: 'red', fontWeight: 'condensedBold' }}>
                  Gotta Have it Price!
                </Text>
              )}
              <View>
                <Text
                  style={{ color: 'red', fontWeight: 'bold', fontSize: 17 }}
                >
                  {item.price}
                </Text>
                <Text style={{ color: 'red', fontSize: 14 }}>With Code</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default ProductListHome;





