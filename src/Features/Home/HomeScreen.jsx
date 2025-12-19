import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlusIcon, Wallet, Package } from 'lucide-react-native';

import {
  IMAGE_DATA_GRID,
  IMAGE_DATA_GRID_V2,
  RECOMMENDED_FOR_YOU,
  SHOP_IT_ALL,
  TOP_DEALS_IMAGE,
  TOP_GIFTS_IMAGE,
} from '../../Assets/dummyData';

import ProductListHome from '../../SharedComponents/ProductListHome/ProductListHome';
import SearchBar from '../../SharedComponents/SearchBar/SearchBar';
import Header from '../../SharedComponents/Header/Header';
import ProductCategory from '../../SharedComponents/ProductCategory/ProductCategory';
import styles from './HomeScreen.Styles'
import HeroBanner from '../../SharedComponents/HeroBanner/HeroBanner';

export default function Home() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        isHomePage={true}
        title="JCPenney"
        cartCount={'3'}
        navigation={navigation}
        onPress={() => setIsSearchBarVisible(!isSearchBarVisible)}
        isBackIcon={false}
      />

      {isSearchBarVisible && (
        <SearchBar value={searchText} onChange={setSearchText} />
      )}

      {/* Accordion */}
      <TouchableOpacity
        style={styles.accordionContainer}
        onPress={() => setIsAccordionOpen(!isAccordionOpen)}
      >
        <View style={styles.accordionHeaderRow}>
          <Text style={styles.accordionTextHeading}>Hi Aditya</Text>
          {isAccordionOpen ? <Text style={styles.closeIcon}>X</Text> : <PlusIcon />}
        </View>

        {isAccordionOpen && (
          <View style={styles.accordionContent}>
            {/* Wallet Section */}
            <View style={styles.accordionItemRow}>
              <Wallet size={30} />
              <View style={styles.accordionItemTextWrapper}>
                <Text style={styles.accordionSubText}>My Wallet</Text>
                <Text>13 Points to your next reward</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Recent Order */}
            <View style={styles.accordionItemRow}>
              <Package size={30} />
              <View style={styles.accordionItemTextWrapper}>
                <Text style={styles.accordionSubText}>Recent Order</Text>
                <Text>In Progress</Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>


      {/* MAIN SCROLL CONTENT */}
      <ScrollView style={styles.scrollView}>
       <HeroBanner />

        {/* FREE SHIPPING */}
        {/* <View style={styles.freeShippingContainer}>
          <Text>Free Shipping Over $75</Text>
          <Text style={styles.freeShippingDetails}>Details</Text>
        </View> */}

        {/* PRODUCT CATEGORIES */}
        <ProductCategory data={IMAGE_DATA_GRID} navigation={navigation} />
        <ProductCategory data={IMAGE_DATA_GRID_V2} navigation={navigation} />

       

        {/* NEW ARRIVAL / SALE / CLEARANCE */}
        <View style={styles.circleBannerRow}>
          <View style={styles.circleBannerLight}>
            <Text style={styles.circleBannerRedLarge}>NEW</Text>
            <Text style={styles.circleBannerRedMedium}>Arrivals</Text>
          </View>

          <View style={styles.circleBannerRed}>
            <Text style={styles.circleBannerWhite}>Sale</Text>
          </View>

          <View style={styles.circleBannerDark}>
            <Text style={styles.circleBannerYellow}>Clearance</Text>
          </View>
        </View>

        {/* TOP DEALS */}
        <ProductListHome navigation={navigation} data={TOP_DEALS_IMAGE} title={'Top Deals, Going Fast!'} />

        {/* TOP GIFTS */}
        <ProductListHome navigation={navigation} data={TOP_GIFTS_IMAGE} title={`Top Gifts, They'll Love`} />

        {/* SAVE ON IT ALL */}
        <View style={styles.saveAllWrapper}>
          <Text style={styles.saveAllRedMedium}>Save on it all!</Text>
          <Text style={styles.saveAllRedLarge}>Extra 30% Off</Text>

          <View style={styles.saveAllRow}>
            <Text>With Coupon | </Text>
            <Text style={styles.underline}>*Details</Text>
            <Text>| Exclusion Apply.</Text>
          </View>

          <View style={styles.saveAllDivider} />

          {/* SHOP IT ALL GRID */}
          <View style={styles.shopAllGridWrapper}>
            <FlatList
              data={SHOP_IT_ALL}
              numColumns={3}
              columnWrapperStyle={styles.shopAllColumnWrapper}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('ProductList')} style={styles.shopAllItem}>
                  <Image source={{ uri: item.image }} style={styles.shopAllImage} />
                  <Text style={styles.shopAllTitle}>{item?.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        {/* Recommended For You */}
        <View style={styles.recommendedWrapper}>
          <ProductListHome
            data={RECOMMENDED_FOR_YOU}
            title={'Recommended For You'}
            isShopAll={false}
            titleStyle={styles.recommendedTitle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


