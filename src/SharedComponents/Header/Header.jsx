import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../Icon/Icon';

export default function Header({
  cartCount = 2,
  navigation,
  onPress,
  title = '',
  isBackIcon = true,
  isSearchIcon = true,
  isNotificationIcon = true,
  isCartIcon = true,
  isShareIcon,
  isHomePage = false,
}) {
  return (
    <View style={styles.headerContainer}>
      

      {isHomePage && title && (
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isBackIcon && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" family="MaterialIcons" />
          </TouchableOpacity>
        )}
        {!isHomePage && title && <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 20 }}>
          {title}
        </Text>}
      </View>
      <View style={styles.headerRightWrapper}>
        {isSearchIcon && (
          <TouchableOpacity style={{ marginRight: 20 }} onPress={onPress}>
            <Icon name="search" />
          </TouchableOpacity>
        )}
        {isNotificationIcon && <Icon name="bell" />}
        {isShareIcon && <Icon name='share' family='Entypo' />}
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartIcon}
        >
          <Icon name="shopping-cart" size={24} />
          {cartCount > 0 && (
            <View style={styles.cartCountWrapper}>
              <Text style={styles.cartCountText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  headerTextWrapper: {
    backgroundColor: '#cc0300',
  },
  headerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    padding: 10,
    lineHeight: 18
  },
  headerRightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  cartIcon: { position: 'relative', marginLeft: 20 },
  cartCountWrapper: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
