import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Linking,
  Platform,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TOP_BANNER_URL = 'https://jcpenney.scene7.com/is/image/jcpenneyimages/really-big-deals-aaec22f0-421a-45ca-a57c-e98f1d87cd3c?scl=1&qlt=75';
const MYSTERY_WRAPPER_URL = 'https://jcpenney.scene7.com/is/image/jcpenneyimages/mystery-sale-33212e15-2791-4a3b-a1e7-ccedba91d228?scl=1&qlt=75';

const PROMO_ITEMS = [
  {
    title: 'FREE SHIPPING!',
    description: 'On orders over $49 Details',
    link:
      'https://www.jcpenney.com/m/customer-service/shipping-information?cm_re=SP-_-HOME-_-TB-_-FREE-SHIPPING-_-FREE+SHIPPING',
  },
  {
    title: '$10 CashPass Reward',
    description: 'when you sign up for Rewards today! Sign Up Now',
    link:
      'https://www.jcpenney.com/rewards?cm_re=SP-_-HOME-_-TB-_-CASHPASS-REWARDS-_-CASHPASS+REWARDS',
  },
  {
    title: 'Holiday Jewelry Sale',
    description:
      'Up to 55% off + Extra 40% off with JCPenney Credit Card & Coupon Shop Now',
    link:
      'https://www.jcpenney.com/g/jewelry-and-watches?s1_deals_and_promotions=SALE&id=dept20000020&boostIds=ppr5008458469-ppr5008486959-ppr5008460168-ppr5008630694-ppr5008354762&cm_re=SP-_-HOME-_-TB-_-HOLIDAY-JEWELRY-SALE-_-HOLIDAY+JEWELRY+SALE',
  },
  {
    title: 'Holiday Home Sale',
    description: 'Up to 50% Off + Up to Extra 30% off with coupon Shop Now',
    link:
      'https://www.jcpenney.com/g/home-store?s1_deals_and_promotions=SALE&id=dept20000011&cm_re=SP-_-HOME-_-TB-_-HOLIDAY-HOME-SALE-_-HOLIDAY+HOME+SALE',
  },
  {
    title: 'Give More, Save the Most',
    description: 'Find unique gifts — give more & save the most',
    link:
      'https://www.jcpenney.com/g/unique-gifts/all-gifts?marketing_theme=holiday&id=cat11100003770&cm_re=SP-_-HOME-_-TB-_-GIVE-MORE-SAVE-THE-MOST-_-GIVE+MORE+SAVE+THE+MOST',
  },
  {
    title: 'Mystery Sale',
    description: 'Shop the Mystery Sale — deals you don’t want to miss',
    link:
      'https://www.jcpenney.com/g/shops/shop-all-products?s1_deals_and_promotions=SALE&id=cat1007450013&cm_re=SP-_-HOME-_-TB-_-MYSTERY-SALE-_-MYSTERY+SALE',
  },
];

const HORIZONTAL_PADDING = 16 * 2; 

const HeroBanner = ({ onPressNavigate, topBannerUrl = TOP_BANNER_URL, mysteryWrapperUrl = MYSTERY_WRAPPER_URL  }) => {
  const contentWidth = Math.round(SCREEN_WIDTH - HORIZONTAL_PADDING);
  const promoHeight = Math.round(contentWidth / 5.2); 
  const mysteryHeight = Math.round(contentWidth / 3.8);

  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % PROMO_ITEMS.length;
        return next;
      });
    }, 3000); 
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const openLinkForActive = async () => {
    const url = PROMO_ITEMS[activeIndex].link;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.warn("Can't open URL:", url);
      }
    } catch (e) {
      console.warn('Linking error', e);
    }
  };

  const handleSalePress = () => {
    if (typeof onPressNavigate === 'function') {
      onPressNavigate(); 
    } else {
      Linking.openURL(
        'https://www.jcpenney.com/g/shops/shop-all-products?s1_deals_and_promotions=SALE&id=cat1007450013&cm_re=SP-_-HOME-_-TB-_-MYSTERY-SALE-_-MYSTERY+SALE'
      ).catch(e => console.warn(e));
    }
  };

  return (
    <View style={styles.container}>
      

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={openLinkForActive}
        onPressIn={stopAutoSlide}
        onPressOut={startAutoSlide}
        style={[styles.promoCard, { width: '100%', height: 100 }]}
      >
        <View style={styles.promoInner}>
          <Text style={styles.promoTitle}>{PROMO_ITEMS[activeIndex].title}</Text>
          <Text style={styles.promoDesc}>
            {PROMO_ITEMS[activeIndex].description}
          </Text>
        </View>

        <View style={styles.dotsRow}>
          {PROMO_ITEMS.map((_, i) => (
            <View
              key={`dot-${i}`}
              style={[
                styles.dot,
                i === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </TouchableOpacity>

      <Image
        source={{
          uri: topBannerUrl,
        }}
        style={[styles.topBanner, { width: contentWidth, height: 36 }]}
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={handleSalePress}
        activeOpacity={0.85}
        style={styles.mysteryWrapper}
      >
        <Image
          source={{
            uri:mysteryWrapperUrl
          }}
          style={{
            width: contentWidth,
            height: mysteryHeight,
            marginTop: 10,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeroBanner;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 60 : 8,
    backgroundColor: '#ffffff',
  },

  topBanner: {
    alignSelf: 'center',
    marginTop: 8,
  },

  promoCard: {
    marginTop: 12,
    backgroundColor: '#e6e6e6', 
    paddingVertical: 20,
    justifyContent: 'center',
  },

  promoInner: {
    alignItems: 'center',
  },

  promoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
  },

  promoDesc: {
    marginTop: 6,
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    maxWidth: '95%',
    lineHeight: 18,
  },

  dotsRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 6,
    borderWidth: 0,
  },

  dotInactive: {
    backgroundColor: '#d1d1d1',
    opacity: 0.9,
  },

  dotActive: {
    backgroundColor: '#666666',
  },

  mysteryWrapper: {
    alignItems: 'center',
  },
});
