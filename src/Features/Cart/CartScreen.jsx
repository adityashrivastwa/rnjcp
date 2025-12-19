import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Dimensions,
  Pressable,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../SharedComponents/Header/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const WEBVIEW_URL = 'https://www.jcpenney.com/m/jcpenney-coupons';

const initialCartItems = [
  {
    id: '1',
    title:
      'St. Johns Bay Waffle Mens Crew Neck Long Sleeve Classic Fit Thermal Top',
    size: 'Large',
    fit: 'Misses',
    color: 'Burgundy',
    price: '$55.50',
    savingsText: 'Savings $18.50',
    hasSavings: true,
    bestValue: false,
    originalPrice: '$74.00',
    couponSavings: 16.65,
    image:
      'https://jcpenney.scene7.com/is/image/JCPenney/DP0707202509085793M?hei=550&wid=550&op_usm=.4%2C.8%2C0%2C0&resmode=sharp2&op_sharpen=1',
  },
  {
    id: '2',
    title: 'St. Johns Bay Mens Long Sleeve Classic Fit Flannel Shirt',
    size: 'Large',
    fit: 'Misses',
    color: 'Charcoal',
    price: '$34.99',
    savingsText: '',
    hasSavings: false,
    bestValue: true,
    image:
      'https://jcpenney.scene7.com/is/image/JCPenney/DP0805202513024352M?hei=550&wid=550&op_usm=.4%2C.8%2C0%2C0&resmode=sharp2&op_sharpen=1',
  },
  {
    id: '3',
    title:
      'North Pole Trading Co. Polar Bear Mens Crew Neck Long Sleeve 2-pc. Matching Family Pajama Sets',
    size: 'Medium',
    fit: 'Mens',
    color: 'Navy',
    price: '$29.99',
    savingsText: 'Savings $10.00',
    hasSavings: true,
    bestValue: false,
    originalPrice: '$39.99',
    couponSavings: 10.0,
    image:
      'https://jcpenney.scene7.com/is/image/JCPenney/DP1006202515011011M?hei=550&wid=550&op_usm=.4%2C.8%2C0%2C0&resmode=sharp2&op_sharpen=1',
  },
  {
    id: '4',
    title: 'Stafford Mens Fedora',
    size: 'Small',
    fit: 'Child',
    color: 'Pink',
    price: '$14.99',
    savingsText: '',
    hasSavings: false,
    bestValue: false,
    image:
      'https://jcpenney.scene7.com/is/image/JCPenney/DP0514202509040690M?resmode=sharp2&op_sharpen=1&wid=550&hei=550',
  },
  {
    id: '5',
    title: 'Nike Club Mens Long Sleeve Fleece Active Big and Tall Hoodie',
    size: '34x32',
    fit: 'Mens',
    color: 'Black',
    price: '$42.00',
    savingsText: 'Savings $8.00',
    hasSavings: true,
    bestValue: false,
    originalPrice: '$49.70',
    couponSavings: 7.7,
    image:
      'https://jcpenney.scene7.com/is/image/JCPenney/DP0723202513024751M?hei=550&wid=550&op_usm=.4%2C.8%2C0%2C0&resmode=sharp2&op_sharpen=1',
  },
];

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [savedItems, setSavedItems] = useState([]);

  const handleRemoveItem = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveForLater = item => {
    setCartItems(prev => prev.filter(i => i.id !== item.id));
    setSavedItems(prev => [...prev, item]);
  };

  const handleMoveToCart = item => {
    setSavedItems(prev => prev.filter(i => i.id !== item.id));
    setCartItems(prev => [...prev, item]);
  };

  const [couponApplied, setCouponApplied] = useState(false);
  const COUPON_CODE = 'MYPEOPLE';
  const COUPON_AMOUNT = 34.35;

  const [expandedSavings, setExpandedSavings] = useState({});
  const toggleSavings = id => {
    setExpandedSavings(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [shippingMethod, setShippingMethod] = useState(() =>
    initialCartItems.reduce((acc, item) => {
      acc[item.id] = 'ship';
      return acc;
    }, {}),
  );
  const setMethodForItem = (id, method) => {
    setShippingMethod(prev => ({ ...prev, [id]: method }));
  };

  const [quantities, setQuantities] = useState(() =>
    initialCartItems.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {}),
  );

  const [qtyModalVisible, setQtyModalVisible] = useState(false);
  const [qtyModalItemId, setQtyModalItemId] = useState(null);

  const openQtyModal = id => {
    setQtyModalItemId(id);
    setQtyModalVisible(true);
  };

  const handleSelectQty = qty => {
    if (qtyModalItemId) {
      setQuantities(prev => ({
        ...prev,
        [qtyModalItemId]: qty,
      }));
    }
    setQtyModalVisible(false);
  };

  const [roundUp, setRoundUp] = useState(false);

  const rawSubtotal = cartItems.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace('$', '')) || 0;
    const qty = quantities[item.id] || 1;
    return sum + priceNum * qty;
  }, 0);
  const subtotal = rawSubtotal.toFixed(2);

  const rawSavings = cartItems.reduce((sum, item) => {
    if (item.hasSavings && item.savingsText) {
      const match = item.savingsText.match(/([\d.]+)/);
      if (match) {
        const qty = quantities[item.id] || 1;
        return sum + parseFloat(match[1]) * qty;
      }
    }
    return sum;
  }, 0);
  const totalSavings = rawSavings.toFixed(2);

  const totalAfterDiscount = couponApplied
    ? (rawSubtotal - COUPON_AMOUNT).toFixed(2)
    : subtotal;

  const totalSavingsWithCoupon = couponApplied
    ? (rawSavings + COUPON_AMOUNT).toFixed(2)
    : totalSavings;

  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  const webviewRef = useRef(null);
  const [webviewLoading, setWebviewLoading] = useState(false);
  const [webviewError, setWebviewError] = useState(null);

  const openCouponModal = () => {
    setCouponModalVisible(true);
    translateX.setValue(SCREEN_WIDTH);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeCouponModal = () => {
    Animated.timing(translateX, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setCouponModalVisible(false);
      setWebviewError(null);
      setWebviewLoading(false);
    });
  };

  const INJECTED_JAVASCRIPT = `(function() {
    try {
      window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'webview_loaded' }));
    } catch(e) {}
})();`;

  const handleNavigation = request => {
    if (request.url && request.url.startsWith(WEBVIEW_URL)) {
      return true;
    }

    console.log('Blocked navigation to:', request.url);
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title="Cart"
        isSearchIcon={false}
        isNotificationIcon={false}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {!couponApplied ? (
          <View style={styles.couponCard}>
            <View style={styles.couponMainRow}>
              <View style={styles.couponIconBox}>
                <Text style={styles.couponPercent}>%</Text>
              </View>

              <View style={styles.couponTextColumn}>
                <TouchableOpacity onPress={openCouponModal}>
                  <Text style={styles.couponLabel}>Best Coupon</Text>
                </TouchableOpacity>
                <Text style={styles.couponSave}>Save $39.75</Text>
                <Text style={styles.couponCode}>
                  with code{' '}
                  <Text style={styles.couponCodeBold}>{COUPON_CODE}</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setCouponApplied(true)}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.couponCard}>
            <Text style={styles.appliedCouponText}>
              You saved ${COUPON_AMOUNT.toFixed(2)} with {COUPON_CODE}
            </Text>

            <TouchableOpacity onPress={openCouponModal}>
              <Text style={styles.viewCoupons}>View All Coupons</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.cartTitleRow}>
          <Text style={styles.cartTitle}>
            Cart{' '}
            <Text style={styles.cartCount}>({cartItems.length} items)</Text>
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.pointsCard}>
          <Text style={styles.pointsMain}>
            Earn <Text style={styles.earnBold}>167 points</Text> on this order.
          </Text>
          <Text style={styles.pointsSecondary}>
            or earn <Text style={styles.pointsBold}>251 points</Text> when you
            use a JCPenney Credit Card.{' '}
            <Text style={styles.linkText}>Learn More</Text>
          </Text>
        </View>

        {cartItems.map(item => {
          const isExpanded = !!expandedSavings[item.id];
          const method = shippingMethod[item.id] || 'ship';
          const qty = quantities[item.id] || 1;

          return (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemTopRow}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />

                <View style={styles.priceBlock}>
                  {item.bestValue && (
                    <Text style={styles.bestValueLabel}>BEST VALUE!</Text>
                  )}

                  <Text style={styles.itemPrice}>{item.price}</Text>

                  {item.hasSavings && !!item.savingsText && (
                    <>
                      <TouchableOpacity
                        style={styles.itemSavingsRow}
                        onPress={() => toggleSavings(item.id)}
                      >
                        <Text style={styles.dropdownArrow}>
                          {isExpanded ? '⌃' : '⌄'}
                        </Text>
                        <Text style={styles.itemSavingsLink}>
                          {item.savingsText}
                        </Text>
                      </TouchableOpacity>

                      {isExpanded && (
                        <View style={styles.savingsDetails}>
                          {item.originalPrice && (
                            <Text style={styles.savingsLine}>
                              <Text style={styles.savingsLabel}>was </Text>
                              <Text style={styles.savingsStriked}>
                                {item.originalPrice}
                              </Text>
                            </Text>
                          )}

                          <Text style={styles.savingsLine}>
                            <Text style={styles.savingsLabel}>sale </Text>
                            <Text style={styles.savingsStriked}>
                              {item.price}
                            </Text>
                          </Text>

                          {couponApplied && item.couponSavings && (
                            <Text style={styles.savingsCouponLine}>
                              {COUPON_CODE}{' '}
                              <Text style={styles.savingsCouponAmount}>
                                -${item.couponSavings.toFixed(2)}
                              </Text>
                            </Text>
                          )}
                        </View>
                      )}
                    </>
                  )}
                </View>
              </View>

              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>

              <Text style={styles.itemVariant}>
                {item.size} | {item.fit} | {item.color}
              </Text>

              <View style={styles.shippingSection}>
                <TouchableOpacity
                  style={styles.shippingOptionRow}
                  onPress={() => setMethodForItem(item.id, 'pickup')}
                  activeOpacity={0.8}
                >
                  {method === 'pickup' ? (
                    <View style={styles.radioOuterSelected}>
                      <View style={styles.radioInnerSelected} />
                    </View>
                  ) : (
                    <View style={styles.radioOuter} />
                  )}

                  <View style={styles.shippingTexts}>
                    <Text
                      style={[
                        styles.shippingTitle,
                        method === 'pickup' && styles.shippingTitleSelected,
                      ]}
                    >
                      FREE Same Day Pickup
                    </Text>
                    <Text style={styles.shippingLink}>Select a Store</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.shippingOptionRow}
                  onPress={() => setMethodForItem(item.id, 'ship')}
                  activeOpacity={0.8}
                >
                  {method === 'ship' ? (
                    <View style={styles.radioOuterSelected}>
                      <View style={styles.radioInnerSelected} />
                    </View>
                  ) : (
                    <View style={styles.radioOuter} />
                  )}

                  <View style={styles.shippingTexts}>
                    <Text
                      style={[
                        styles.shippingTitle,
                        method === 'ship' && styles.shippingTitleSelected,
                      ]}
                    >
                      Ship to Home Only
                    </Text>
                    <Text style={styles.shippingSubtitle}>
                      Get it Wednesday, Dec 10th
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.itemActionsRow}>
                <TouchableOpacity
                  style={styles.qtyBox}
                  onPress={() => openQtyModal(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.qtyText}>{qty}</Text>
                  <Text style={styles.qtyArrow}>⌄</Text>
                </TouchableOpacity>

                <View style={styles.itemActionLinks}>
                  <TouchableOpacity>
                    <Text style={styles.actionLink}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleSaveForLater(item)}>
                    <Text style={styles.actionLink}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                    <Text style={[styles.actionLink]}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.itemDivider} />
            </View>
          );
        })}

        <View style={styles.moreSavingsSection}>
          <View style={styles.moreSavingsHeaderRow}>
            <Text style={styles.moreSavingsTitle}>More Savings</Text>

            <View style={styles.moreSavingsRight}>
              <Text style={styles.rewardsIcon}>💲</Text>
              <Text style={styles.moreSavingsLink}>Get Your Rewards</Text>
            </View>
          </View>

          <View style={styles.moreSavingsCouponRow}>
            <View style={styles.moreSavingsInput}>
              <Text style={styles.moreSavingsPlaceholder}>
                Coupon or Reward Code
              </Text>
            </View>

            <TouchableOpacity style={styles.moreSavingsApplyBtn}>
              <Text style={styles.moreSavingsApplyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.orderSummaryCard}>
          <Text style={styles.orderSummaryTitle}>Order Summary</Text>

          <View style={styles.orderMessageRow}>
            <Text style={styles.orderTruckIcon}>🚚</Text>
            <Text style={styles.orderMessageText}>
              Great! You've earned{' '}
              <Text style={styles.orderMessageBold}>FREE Ship to Home!</Text>
            </Text>
          </View>

          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Subtotal:</Text>
            <Text style={styles.orderValue}>${subtotal}</Text>
          </View>

          {couponApplied && (
            <View style={styles.orderRow}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.orderLabel}>{COUPON_CODE}: </Text>
                <TouchableOpacity onPress={() => setCouponApplied(false)}>
                  <Text style={styles.orderCouponRemove}>Remove</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.orderCouponValue}>
                -${COUPON_AMOUNT.toFixed(2)}
              </Text>
            </View>
          )}

          {couponApplied && (
            <View style={styles.orderRow}>
              <Text style={styles.orderTotalLabel}>
                Subtotal After Discounts:
              </Text>
              <Text
                style={styles.orderTotalValue}
              >{`$${totalAfterDiscount}`}</Text>
            </View>
          )}

          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Est. Standard Delivery:</Text>
            <Text style={styles.orderValueFree}>FREE</Text>
          </View>

          <View style={styles.orderInnerDivider} />

          <View style={styles.orderRow}>
            <Text style={styles.orderTotalLabel}>Total Before Tax:</Text>
            <Text
              style={styles.orderTotalValue}
            >{`$${totalAfterDiscount}`}</Text>
          </View>

          <View style={styles.orderInnerDivider} />

          <View style={styles.orderTotalSavingsRow}>
            <Text style={styles.orderTotalSavingsText}>
              Total Savings:{' '}
              <Text style={styles.orderTotalSavingsAmount}>
                ${totalSavingsWithCoupon}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.roundUpSection}>
          <View style={styles.roundUpRow}>
            <TouchableOpacity
              style={styles.roundUpCheckbox}
              onPress={() => setRoundUp(prev => !prev)}
              activeOpacity={0.8}
            >
              {roundUp && <View style={styles.roundUpCheckboxInner} />}
            </TouchableOpacity>

            <View style={styles.roundUpTexts}>
              <Text style={styles.roundUpTitle}>Round up for good!</Text>
              <Text style={styles.roundUpDescription}>
                Yes, I want to donate to the JCPenney Communities Foundation to
                help those in need with skill-building and resources.
              </Text>
              <Text style={styles.roundUpLink}>Learn More</Text>
            </View>
          </View>
        </View>

        <View style={styles.checkoutSection}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text style={styles.checkoutLockIcon}>🔒</Text>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paypalButton}>
            <Text style={styles.paypalLogo}>P</Text>
            <Text style={styles.paypalText}>PayPal</Text>
          </TouchableOpacity>

          <Text style={styles.cartIdText}>
            Your Cart ID is Uu5MAITAuWqPvKXVHwVV
          </Text>
        </View>
        <View style={styles.savedSection}>
          <Text style={styles.savedHeader}>
            Saved for Later
            <Text style={styles.savedHeaderCount}>
              {' '}
              ({savedItems.length} items)
            </Text>
          </Text>
          <View style={styles.savedDivider} />

          {savedItems.map(item => (
            <View key={item.id} style={styles.savedItemCard}>
              <View style={styles.savedTopRow}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.savedImage}
                  resizeMode="cover"
                />

                <View style={styles.savedPriceBlock}>
                  {item.bestValue && (
                    <Text style={styles.savedBestValue}>BEST VALUE!</Text>
                  )}
                  <Text style={styles.savedPrice}>{item.price}</Text>
                </View>
              </View>

              <Text style={styles.savedTitle}>{item.title}</Text>
              <Text style={styles.savedVariant}>
                {item.size} | {item.color}
              </Text>

              <View style={styles.savedActionsRow}>
                <TouchableOpacity
                  onPress={() =>
                    setSavedItems(prev => prev.filter(i => i.id !== item.id))
                  }
                >
                  <Text style={styles.savedActionLink}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMoveToCart(item)}>
                  <Text style={styles.savedActionLink}>Move to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={qtyModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setQtyModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.qtyModalCard}>
            {Array.from({ length: 8 }, (_, i) => i + 1).map(num => {
              const selected =
                qtyModalItemId && quantities[qtyModalItemId] === num;

              return (
                <TouchableOpacity
                  key={num}
                  style={styles.qtyModalRow}
                  onPress={() => handleSelectQty(num)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.qtyModalNumber}>{num}</Text>

                  <View
                    style={
                      selected
                        ? styles.qtyRadioOuterSelected
                        : styles.qtyRadioOuter
                    }
                  >
                    {selected && <View style={styles.qtyRadioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>

      <Modal
        visible={couponModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeCouponModal}
      >
        <Pressable style={styles.fullBackdrop} onPress={closeCouponModal} />

        <Animated.View
          style={[styles.modalPanel, { transform: [{ translateX }] }]}
          pointerEvents={couponModalVisible ? 'auto' : 'none'}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Best Coupon</Text>
            <TouchableOpacity onPress={closeCouponModal}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.webviewContainer}>
            <WebView
              ref={webviewRef}
              originWhitelist={['*']}
              source={{ uri: WEBVIEW_URL }}
              startInLoadingState
              javaScriptEnabled
              domStorageEnabled
              injectedJavaScript={INJECTED_JAVASCRIPT}
              onMessage={event => {
                try {
                  const parsed = JSON.parse(event.nativeEvent.data);
                  console.log('WebView -> onMessage:', parsed);
                } catch (e) {
                  console.log(
                    'WebView onMessage (non-JSON):',
                    event.nativeEvent.data,
                  );
                }
              }}
              onLoadStart={() => {
                console.log('WebView load started:', WEBVIEW_URL);
                setWebviewLoading(true);
                setWebviewError(null);
              }}
              onLoadEnd={() => {
                console.log('WebView load ended');
                setWebviewLoading(false);
              }}
              onError={syntheticEvent => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
                setWebviewError(nativeEvent);
                setWebviewLoading(false);
              }}
              onHttpError={syntheticEvent => {
                const { nativeEvent } = syntheticEvent;
                console.warn(
                  'WebView HTTP error: ',
                  nativeEvent.statusCode,
                  nativeEvent.description,
                );
                setWebviewError(nativeEvent);
                setWebviewLoading(false);
              }}
              onShouldStartLoadWithRequest={handleNavigation}
              style={styles.webview}
            />

            {webviewLoading && (
              <View style={styles.webviewOverlay}>
                <ActivityIndicator size="large" />
              </View>
            )}

            {webviewError && (
              <View style={styles.webviewError}>
                <Text style={{ fontWeight: '700', marginBottom: 8 }}>
                  Failed to load
                </Text>
                <Text style={{ marginBottom: 12 }}>
                  {(webviewError &&
                    (webviewError.description || webviewError.reason)) ||
                    'Unknown error'}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setWebviewError(null);
                    setWebviewLoading(true);
                    webviewRef.current && webviewRef.current.reload();
                  }}
                >
                  <Text style={{ textDecorationLine: 'underline' }}>Retry</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e2e2',
  },
  headerLeft: {
    paddingRight: 12,
    paddingVertical: 6,
  },
  backArrow: {
    fontSize: 26,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  cartIconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cartIcon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 2,
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },

  scroll: {
    flex: 1,
  },

  couponCard: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  couponLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  couponIconBox: {
    width: 36,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d32f2f',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  couponPercent: {
    fontWeight: '700',
    fontSize: 16,
  },
  couponText: {
    flex: 1,
  },
  couponLabel: {
    fontSize: 17,
    marginBottom: 2,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },

  couponSave: {
    fontSize: 19,
    fontWeight: '700',
    color: '#d32f2f',
  },

  couponAmount: {
    color: '#d32f2f',
  },
  couponCode: {
    fontSize: 14,
    marginTop: 2,
    color: '#d32f2f',
  },
  couponCodeBold: {
    color: '#d32f2f',
    fontWeight: '700',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  applyButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    backgroundColor: '#ffffff',
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

  couponBody: {
    flex: 1,
  },

  couponTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  couponMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  couponTextColumn: {
    flex: 1,
    marginLeft: 10,
  },

  appliedCouponText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 4,
  },

  viewCoupons: {
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#333',
  },

  webviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },

  webviewOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  webviewError: {
    position: 'absolute',
    top: 90,
    left: 18,
    right: 18,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 6,
  },

  cartTitleRow: {
    marginTop: 18,
    paddingHorizontal: 16,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  cartCount: {
    fontSize: 18,
    fontWeight: '400',
  },
  divider: {
    marginTop: 8,
    marginHorizontal: 16,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
  },

  pointsCard: {
    marginHorizontal: 16,
    marginTop: 14,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  pointsMain: {
    fontSize: 14,
    marginBottom: 4,
  },
  pointsSecondary: {
    fontSize: 13,
    color: '#444444',
    lineHeight: 18,
    textAlign: 'center',
  },
  pointsBold: {
    fontWeight: '700',
    color: '#d32f2f',
  },
  earnBold: {
    fontWeight: '700',
  },

  itemCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  itemImage: {
    width: 110,
    height: 140,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },

  priceBlock: {
    flex: 1,
    alignItems: 'flex-end',
  },

  bestValueLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#d32f2f',
    textTransform: 'uppercase',
    marginBottom: 4,
  },

  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
  },

  itemSavingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  dropdownArrow: {
    fontSize: 14,
    marginRight: 4,
  },

  itemSavingsLink: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },

  savingsDetails: {
    marginTop: 4,
    alignItems: 'flex-end',
  },

  savingsLine: {
    fontSize: 12,
    color: '#999999',
  },

  savingsLabel: {
    fontSize: 12,
    color: '#999999',
  },

  savingsStriked: {
    fontSize: 12,
    color: '#999999',
    textDecorationLine: 'line-through',
  },

  savingsCouponLine: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#d32f2f',
  },

  savingsCouponAmount: {
    color: '#d32f2f',
  },

  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },

  itemVariant: {
    fontSize: 13,
    color: '#555555',
  },

  shippingSection: {
    marginTop: 12,
  },

  shippingOptionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#777777',
    marginRight: 8,
    marginTop: 2,
  },

  radioOuterSelected: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 2,
  },

  radioInnerSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },

  shippingTexts: {
    flex: 1,
  },

  shippingTitle: {
    fontSize: 13,
  },

  shippingTitleSelected: {
    fontWeight: '700',
  },

  shippingLink: {
    fontSize: 13,
    textDecorationLine: 'underline',
    marginTop: 2,
  },

  shippingSubtitle: {
    fontSize: 12,
    color: '#777777',
    marginTop: 2,
  },

  itemActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  qtyBox: {
    width: 56,
    height: 34,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginRight: 16,
  },

  qtyText: {
    fontSize: 14,
  },

  qtyArrow: {
    fontSize: 14,
  },

  itemActionLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },

  actionLink: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginRight: 16,
  },

  itemDivider: {
    marginTop: 16,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
  },

  moreSavingsSection: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#f5f5f5',
  },

  moreSavingsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  moreSavingsTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  moreSavingsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rewardsIcon: {
    fontSize: 18,
    marginRight: 4,
  },

  moreSavingsLink: {
    fontSize: 13,
    textDecorationLine: 'underline',
  },

  moreSavingsCouponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  moreSavingsInput: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },

  moreSavingsPlaceholder: {
    fontSize: 13,
    color: '#999999',
  },

  moreSavingsApplyBtn: {
    marginLeft: 8,
    paddingHorizontal: 18,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e53935',
  },

  moreSavingsApplyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  orderSummaryCard: {
    marginTop: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f5f5f5',
  },

  orderSummaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  orderMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  orderTruckIcon: {
    fontSize: 18,
    marginRight: 8,
    marginTop: 2,
  },

  orderMessageText: {
    fontSize: 13,
    color: '#333333',
    flex: 1,
  },

  orderMessageBold: {
    fontWeight: '700',
  },

  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  orderLabel: {
    fontSize: 14,
  },

  orderValue: {
    fontSize: 14,
  },

  orderValueFree: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '700',
  },

  orderInnerDivider: {
    marginVertical: 10,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
  },

  orderTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
  },

  orderTotalValue: {
    fontSize: 15,
    fontWeight: '700',
  },

  orderTotalSavingsRow: {
    marginTop: 4,
    alignItems: 'center',
  },

  orderTotalSavingsText: {
    fontSize: 14,
    textAlign: 'center',
  },

  orderTotalSavingsAmount: {
    color: '#d32f2f',
    fontWeight: '700',
  },

  orderCouponRemove: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  orderCouponValue: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '700',
  },

  roundUpSection: {
    marginTop: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },

  roundUpRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  roundUpCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#777777',
    marginRight: 10,
    marginTop: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  roundUpCheckboxInner: {
    width: 12,
    height: 12,
    borderRadius: 1,
    backgroundColor: '#000000',
  },

  roundUpTexts: {
    flex: 1,
  },

  roundUpTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },

  roundUpDescription: {
    fontSize: 13,
    color: '#444444',
    lineHeight: 18,
  },

  roundUpLink: {
    fontSize: 13,
    textDecorationLine: 'underline',
    marginTop: 4,
  },

  checkoutSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: '#f5f5f5',
  },

  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 6,
    backgroundColor: '#e53935',
    marginBottom: 12,
  },

  checkoutLockIcon: {
    color: '#ffffff',
    fontSize: 16,
    marginRight: 6,
  },

  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  paypalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    backgroundColor: '#ffffff',
    marginBottom: 12,
  },

  paypalLogo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003087',
    marginRight: 6,
  },

  paypalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003087',
  },

  cartIdText: {
    fontSize: 11,
    color: '#999999',
    textAlign: 'center',
    marginTop: 2,
  },

  savedSection: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },

  savedHeader: {
    fontSize: 20,
    fontWeight: '700',
  },

  savedHeaderCount: {
    fontSize: 18,
    fontWeight: '400',
  },

  savedDivider: {
    marginTop: 8,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e0e0e0',
  },

  savedItemCard: {
    paddingTop: 16,
  },

  savedTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  savedImage: {
    width: 110,
    height: 140,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },

  savedPriceBlock: {
    flex: 1,
    alignItems: 'flex-end',
  },

  savedBestValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#d32f2f',
    textTransform: 'uppercase',
    marginBottom: 4,
  },

  savedPrice: {
    fontSize: 18,
    fontWeight: '700',
  },

  savedTitle: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },

  savedVariant: {
    marginTop: 4,
    fontSize: 13,
    color: '#555555',
  },

  savedActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  savedActionLink: {
    fontSize: 13,
    textDecorationLine: 'underline',
  },

  linkText: {
    textDecorationLine: 'underline',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyModalCard: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
  },

  qtyModalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },

  qtyModalNumber: {
    fontSize: 16,
  },

  qtyRadioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#777777',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyRadioOuterSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007aff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007aff',
  },

  fullBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modalPanel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: Math.min(420, SCREEN_WIDTH),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: 24,
  },

  modalHeader: {
    paddingTop: 48,
    paddingHorizontal: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  modalClose: {
    color: '#007AFF',
    fontWeight: '600',
  },

  modalContent: {
    padding: 18,
  },

  modalApplyButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },

  modalApplyButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
