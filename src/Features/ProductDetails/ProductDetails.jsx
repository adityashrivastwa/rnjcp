import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  Image,
  Animated,
  Modal,
  TouchableOpacity,
  Platform,
  FlatList,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ProductDetails.style';
import Header from '../../SharedComponents/Header/Header';
import { useNavigation } from '@react-navigation/native';
import ProductListHome from '../../SharedComponents/ProductListHome/ProductListHome';
import { RECOMMENDED_FOR_YOU, productResponse } from '../../Assets/dummyData';
import axios from 'axios';
import { fetchProductDetails } from '../../Apis/product.api';
import ReviewBar from '../../SharedComponents/ReviewBar/Reviewbar';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH;
const IMAGE_HEIGHT = Math.round((IMAGE_WIDTH * 16) / 16);
const H_PADDING = 16;
const CONTENT_WIDTH = SCREEN_WIDTH - H_PADDING * 2;


function ImageCarousel({
  images,
  initialIndex,
  scrollX,
  onViewableItemsChanged,
  viewabilityConfig,
  flatRef,
  showDots,
  currentIndex,
  isWishlistedAll,
  toggleWishlist,
  isSwatchClicked,
  colorData

}) {
  const [modalVisible, setModalVisible] = useState(false);

  console.log({ images });

  const handleHeartPress = () => {
    console.log('Heart pressed, opening modal');
    setModalVisible(true);
  };

  const handleAddToList = () => {
    console.log('Adding to list');
    if (toggleWishlist && !isWishlistedAll) {
      toggleWishlist();
    }
    setModalVisible(false);
  };

  const handleRemoveFromList = () => {
    console.log('Removing from list');
    if (toggleWishlist && isWishlistedAll) {
      toggleWishlist();
    }
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setModalVisible(false);
  };

  const handleSignIn = () => {
    console.log('Sign in pressed');
  };

  const renderItem = ({ item }) => {
    const url = isSwatchClicked ? item?.image?.url : item?.url;

    const isWishlisted = isWishlistedAll;
    console.log({ item, url, isSwatchClicked });
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.url }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* <Pressable
          onPress={handleHeartPress}
          style={({ pressed }) => [
            styles.heartButton,
            pressed && { opacity: 0.7 },
          ]}
          accessibilityRole="button"
          accessibilityLabel={
            isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'
          }
        >
          <Text style={styles.heartIcon}>{isWishlisted ? '❤️' : '🤍'}</Text>
        </Pressable> */}
      </View>
    );
  };

  const data = isSwatchClicked ? images[0]?.altImages : images;

  return (
    <>
      <Animated.FlatList
        ref={flatRef}
        data={data}
        keyExtractor={item => item.id?.toString() ?? String(item.url)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: IMAGE_WIDTH,
          offset: IMAGE_WIDTH * index,
          index,
        })}
        initialScrollIndex={initialIndex}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToAlignment="center"
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        windowSize={3}
        removeClippedSubviews
      />

      {showDots &&
        (isSwatchClicked
          ? images[0]?.altImages?.length > 1
          : images?.length > 1) && (
          <View style={styles.dotsWrap}>
            {data?.map((_, i) => {
              const isActive = i === currentIndex;
              console.log({ active: isActive }, i, currentIndex);
              return (
                <View
                  key={`dot-${i}`}
                  style={[
                    styles.dot,
                    isActive ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              );
            })}
          </View>
        )}

      <WishlistModal
        visible={modalVisible}
        onClose={handleCloseModal}
        isWishlisted={isWishlistedAll}
        onAddToList={handleAddToList}
        onRemoveFromList={handleRemoveFromList}
        onSignIn={handleSignIn}
        favoritesCount={0}
      />
    </>
  );
}

function WishlistModal({
  visible,
  onClose,
  isWishlisted = false,
  favoritesCount = 0,
  onAddToList,
  onRemoveFromList,
  onSignIn = () => {},
}) {
  const handleFavoritePress = () => {
    if (isWishlisted) {
      onRemoveFromList && onRemoveFromList();
    } else {
      onAddToList && onAddToList();
    }
    onClose();
  };

  return (
    <Modal animationType="fade" visible={visible} transparent>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.centeredContainer}>
          <View style={styles.sheet}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Select List to Add</Text>
              <TouchableOpacity onPress={onClose} accessibilityRole="button">
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Pressable
                style={styles.favoriteRow}
                onPress={handleFavoritePress}
                accessibilityRole="button"
                accessibilityLabel={
                  isWishlisted
                    ? 'Remove from My Favorites'
                    : 'Add to My Favorites'
                }
              >
                <View
                  style={[styles.radio, isWishlisted && styles.radioSelected]}
                >
                  {isWishlisted && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.heart}>{isWishlisted ? '❤️' : '🤍'}</Text>
                <Text style={styles.favoriteText}>
                  My Favorites ({favoritesCount})
                </Text>
              </Pressable>
            </View>

            <View style={styles.section}>
              <Pressable style={styles.createRow} onPress={onSignIn}>
                <Text style={styles.plus}>+</Text>
                <Text style={styles.createText}>
                  Sign in to Create New List
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
function AvgRatings({ avgRatings, METRIC_BAR_WIDTH }) {
  return (
    <View style={[styles.section, styles.avgRatingSection]}>
      <Text style={styles.avgTitle}>Average Customer Ratings</Text>

      <View style={styles.verticalMetricRow}>
        <View style={styles.metricTextRow}>
          <Text style={styles.metricLabel}>Value</Text>
        </View>
        <View style={styles.metricBarRow}>
          <View style={styles.metricBarWrap}>
            <View style={[styles.metricBarTrack, { width: METRIC_BAR_WIDTH }]}>
              <View
                style={[
                  styles.metricBarFill,
                  {
                    width: Math.round(
                      (avgRatings.value / 5) * METRIC_BAR_WIDTH,
                    ),
                  },
                ]}
              />
            </View>
          </View>
          <Text style={styles.metricScore}>{avgRatings.value.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.verticalMetricRow}>
        <View style={styles.metricTextRow}>
          <Text style={styles.metricLabel}>Quality</Text>
        </View>
        <View style={styles.metricBarRow}>
          <View style={styles.metricBarWrap}>
            <View style={[styles.metricBarTrack, { width: METRIC_BAR_WIDTH }]}>
              <View
                style={[
                  styles.metricBarFill,
                  {
                    width: Math.round(
                      (avgRatings.quality / 5) * METRIC_BAR_WIDTH,
                    ),
                  },
                ]}
              />
            </View>
          </View>
          <Text style={styles.metricScore}>
            {avgRatings.quality.toFixed(1)}
          </Text>
        </View>
      </View>

      {/* <View style={styles.verticalMetricRow}>
        <View style={styles.metricTextRow}>
          <Text style={styles.metricLabel}>Overall fit</Text>
        </View>
        <View style={styles.fitScaleWrap}>
          <View style={[styles.fitScaleTrack, { width: METRIC_BAR_WIDTH }]}>
            <View
              style={[
                styles.fitScaleThumb,
                {
                  left:
                    Math.round(avgRatings.overallFit * METRIC_BAR_WIDTH) - 10,
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.fitScaleLabels}>
          <Text style={styles.smallLabel}>runs small</Text>
          <Text style={styles.smallLabel}>runs large</Text>
        </View>
      </View> */}
    </View>
  );
}
function ReviewsSection({
  reviewCounts = 0,
  totalReviews,
  overallRating,
  BAR_MAX_WIDTH,
  onShowReviews,
  reviewTotal = 0,
  ratingCount = 0,
}) {
  // const maxCount = Math.max(Array.from(reviewTotal), 1);

  return (
    <View style={[styles.section, { paddingTop: 8 }]}>
      <Text style={styles.reviewsTitle}>Reviews ({reviewCounts})</Text>

      <View style={{ marginTop: 12 }}>
        <Text style={styles.ratingSnapshotTitle}>Rating Snapshot</Text>
        <Text style={styles.ratingSnapshotSubtitle}>
          Select a row below to filter reviews.
        </Text>

        {[5, 4, 3, 2, 1].map((star, idx) => {
          const count = reviewTotal[idx];
          const fillWidth =
            reviewTotal > 0 ? (count / reviewTotal) * BAR_MAX_WIDTH : 0;
          return (
            <View key={`rating-row-${star}`} style={styles.ratingRow}>
              <Text style={styles.ratingStarLabel}>{`${star} ${
                star === 1 ? 'star' : 'stars'
              }`}</Text>

              <View style={styles.ratingBarWrap}>
                <View style={[styles.ratingBarTrack, { width: BAR_MAX_WIDTH }]}>
                  <View style={[styles.ratingBarFill, { width: fillWidth }]} />
                </View>
              </View>

              <Text style={styles.ratingCount}>{count}</Text>
            </View>
          );
        })}
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.ratingSnapshotTitle}>Overall Rating</Text>

        <View style={styles.overallRow}>
          <Text style={styles.overallScore}>{ratingCount.toFixed(1)}</Text>

          <View style={styles.overallStars}>
            {[1, 2, 3, 4, 5].map(n => {
              const starFilled = ratingCount >= n - 0.25;
              const starHalf =
                ratingCount >= n - 0.75 && ratingCount < n - 0.25;
              return (
                <Text key={`star-${n}`} style={styles.starChar}>
                  {starFilled ? '★' : starHalf ? '★' : '☆'}
                </Text>
              );
            })}
          </View>
        </View>

        <Pressable
          style={{ marginTop: 6 }}
          accessibilityRole="button"
          onPress={() => {}}
        >
          <Text style={styles.reviewsLink}>{`${reviewCounts} Reviews`}</Text>
        </Pressable>

        <View style={styles.showReviewsWrapper}>
          <Pressable
            style={styles.showReviewsButton}
            onPress={onShowReviews}
            accessibilityRole="button"
          >
            <Text style={styles.showReviewsText}>Show Reviews</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function InfoList({
  onOpenProductDetails,
  onOpenSizeChart,
  onOpenShipping,
  onOpenSizeGuide,
  brandName,
}) {
  return (
    <>
      <View style={styles.infoList}>
        <Pressable
          style={styles.infoRow}
          onPress={onOpenProductDetails}
          accessibilityRole="button"
        >
          <Text style={styles.infoText}>Product Details</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>

        <Pressable
          style={styles.infoRow}
          onPress={onOpenSizeChart}
          accessibilityRole="button"
        >
          <Text style={styles.infoText}>Size Chart</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>

        <Pressable
          style={styles.infoRow}
          onPress={onOpenShipping}
          accessibilityRole="button"
        >
          <Text style={styles.infoText}>Shipping & Returns</Text>
          <Text style={styles.chev}>›</Text>
        </Pressable>
      </View>

      <View style={styles.guideWrapper}>
        <Pressable
          style={styles.guideButton}
          onPress={onOpenSizeGuide}
          accessibilityRole="button"
        >
          <Text style={styles.guideText}>
            {brandName} Misses & Petite Size Guide
          </Text>
        </Pressable>
      </View>
    </>
  );
}

function QnAHeader({ onOpenQuestions }) {
  return (
    <Pressable
      style={styles.qnaRow}
      onPress={onOpenQuestions}
      accessibilityRole="button"
    >
      <Text style={styles.qnaTitle}>Questions & Answers</Text>
      <Text style={styles.qnaPlus}>＋</Text>
    </Pressable>
  );
}

function SizeSelector({
  sizeRange,
  handleRangePress,
  selectedSize,
  handleSelectSize,
  onOpenSizeChart,
  imageData,
  isSwatchClicked,
  swatchClicked,
  sizeData = [],
  colorData = []
}) {
  const [colorText, setColorText] = useState(colorData[0]?.value);

  const missesSizes = sizeData?.options
    ?.map(o => o?.value)
    .filter(v => !v.includes('petite'));

  const petiteSizes = sizeData?.options
    ?.map(o => o?.value)
    .filter(v => v.includes('petite'));
  const displayedSizes = sizeRange === 'Petites' ? petiteSizes : missesSizes;
  return (
    <>
      <View style={styles.colorSection}>
        <Text style={styles.colorLabel}>
          Color - <Text style={styles.colorValue}>{colorText}</Text>
        </Text>
        {/* <View style={styles.swatchRow}>
          <View style={styles.swatchOuter}>
            <Image
              source={{
                uri: 'https://jcpenney.scene7.com/is/image/JCPenney/DP0529202509061195S?wid=35&hei=35&resmode=sharp2&quot',
              }}
              style={styles.swatchImage}
            />
          </View>
        </View> */}
        <FlatList
          horizontal
          // numColumns={6}
          showsHorizontalScrollIndicator={false}
          data={colorData}
          renderItem={({ item }) => {
            const url = isSwatchClicked ? item.image.url : item.url;
            return (
              <TouchableOpacity
                onPress={() => {
                  imageData([item]);
                  swatchClicked(true);
                  setColorText(item.value);
                }}
                style={{ marginRight: 10, marginBottom: 10 }}
              >
                <View style={styles.swatchRow}>
                  <View style={styles.swatchOuter}>
                    <Image
                      source={{
                        uri: item.image.url,
                      }}
                      style={styles.swatchImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size Range</Text>
        <View style={styles.rangeRow}>
          <Pressable
            onPress={() => handleRangePress('Misses')}
            style={[
              styles.rangeButton,
              sizeRange === 'Misses' && styles.rangeButtonActive,
            ]}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.rangeButtonText,
                sizeRange === 'Misses' && styles.rangeButtonTextActive,
              ]}
            >
              Misses
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleRangePress('Petites')}
            style={[
              styles.rangeButton,
              sizeRange === 'Petites' && styles.rangeButtonActive,
            ]}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.rangeButtonText,
                sizeRange === 'Petites' && styles.rangeButtonTextActive,
              ]}
            >
              Petites
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.section, styles.sizeHeaderRow]}>
        <Text style={styles.sectionTitle}>Size</Text>
        <Pressable
          onPress={() => onOpenSizeChart && onOpenSizeChart()}
          hitSlop={8}
        >
          <Text style={styles.sizeChartText}>Size Chart</Text>
        </Pressable>
      </View>

      <View style={styles.sizeGrid}>
        {displayedSizes?.map(label => {
          const isSelected = selectedSize === label;
          return (
            <Pressable
              key={label}
              onPress={() => handleSelectSize(label)}
              style={({ pressed }) => [
                styles.sizeButton,
                isSelected && styles.sizeButtonSelected,
                pressed && { opacity: 0.8 },
              ]}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  isSelected && styles.sizeButtonTextSelected,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}

export default function ProductDetails({
  onToggleWishlist = async () => {},
  initialIndex = 0,
  showDots = true,
  heartSize = 28,
  onOpenSizeChart,
  onSelectSize,
  onAddToCart,
  onPressQuantity,
  onOpenProductDetails,
  onOpenSizeGuide,
  onOpenShipping,
  onShowReviews,
  onOpenQuestions,
  route,
}) {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isWishlistedAll, setIsWishlistedAll] = useState();
  const [imageData, setImageData] = useState([]);
  const [isSwatchClicked, setIsSwatchClicked] = useState(false);
  const [sizeData, setSizeData] = useState([]);
  const [colorData, setColorData] = useState([])
  const [productDetailData, setProductDetailData] = useState();

  const {id} = route?.params;
  console.log({ imageData, productDetailData, id }, route);

  const imageAndDimensionData = async () => {
    try {
      const res = await axios.get(`https://browse-api.jcpenney.com/browse-aggregator/v2/product-summaries-aggregator?ppId=${id}`)
      if (res?.data) {
        setImageData(res?.data?.response[0]?.images.flat(2));
        setSizeData(res?.data?.response[0]?.dimensions[1]);
        setColorData(res?.data?.response[0]?.dimensions[2]?.options.flat(2))
        setProductDetailData(res?.data?.response[0]);
      }
    } catch (error) {
      console.log('error', error)
    }
    
  };

  useEffect(() => {
    if (id) {
      imageAndDimensionData();
    }
    console.log('calledd', 'heeyyy')
    imageAndDimensionData();
  }, []);

  const [sizeRange, setSizeRange] = useState('Misses');
  const baseSizes = [
    'X-Small',
    'Small',
    'Medium',
    'Large',
    'X-Large',
    'Xx-Large',
  ];
  const [selectedSize, setSelectedSize] = useState(null);

  const [qtyPressed, setQtyPressed] = useState(false);
  const [qty] = useState(1);

  const flatRef = useRef(null);
  const scrollX = useRef(
    new Animated.Value(initialIndex * IMAGE_WIDTH),
  ).current;

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const product = {
    fitText: 'True to Size',
    modelText: `Model is 5'9" and wearing US SMALL`,
    title: 'Liz Claiborne Coatigan Womens Long Sleeve Button Plaid Cardigan',
    brandLinkText: 'Liz Claiborne',
    salePrice: '$32',
    saleLabel: 'sale',
    percentOff: '60% off',
    originalPrice: '$80',
  };

  const toggleWishlist = useCallback(async () => {
    const prev = isWishlistedAll;
    const next = !prev;
    setIsWishlistedAll(next);
    try {
      await onToggleWishlist(next);
    } catch (err) {
      setIsWishlistedAll(prev);
      console.warn('Wishlist toggle failed', err);
    }
  }, [isWishlistedAll, onToggleWishlist]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      const idx = viewableItems[0].index ?? 0;
      setCurrentIndex(idx);
    }
  }).current;

  // const handleRangePress = range => {
  //   if (range === sizeRange) return;
  //   setSizeRange(range);
  //   setSelectedSize(null);
  //   if (onSelectSize) onSelectSize(null);
  // };

  const handleRangePress = range => {
    setSizeRange(range);
    setSelectedSize(null);
  };

  const handleSelectSize = sizeLabel => {
    setSelectedSize(sizeLabel);
    if (onSelectSize) onSelectSize(sizeLabel);
  };

  const displayedSizes = baseSizes.map(s =>
    sizeRange === 'Petites' ? `Petite ${s}` : s,
  );

  const handleQtyPress = () => {
    setQtyPressed(p => !p);
    if (onPressQuantity) onPressQuantity();
  };

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart({ qty, size: selectedSize });
  };

  const openProductDetails = () => {
    if (onOpenProductDetails) onOpenProductDetails();
  };
  const openSizeGuide = () => {
    if (onOpenSizeGuide) onOpenSizeGuide();
  };
  const openShipping = () => {
    if (onOpenShipping) onOpenShipping();
  };

  const handleShowReviews = () => {
    if (onShowReviews) onShowReviews();
  };

  const handleOpenQuestions = () => {
    if (onOpenQuestions) onOpenQuestions();
  };

  const openBrowser = async url => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url); // opens Safari / Chrome
      } else {
        Alert.alert('Cannot open this URL:', url);
      }
    } catch (err) {
      console.error('Failed to open URL:', err);
      Alert.alert('Something went wrong while opening the link.');
    }
  };

  const reviewCounts = [0, 0, 1, 1, 0];
  const totalReviews = reviewCounts.reduce((a, b) => a + b, 0) || 0;
  const overallRating = totalReviews === 0 ? 0 : 2.5;
  const maxCount = Math.max(...reviewCounts, 1);
  const BAR_MAX_WIDTH = Math.min(320, CONTENT_WIDTH * 0.65);
  const avgRatings = {
    value: 3.0,
    quality: 2.5,
    overallFit: 0.75,
  };
  const METRIC_BAR_WIDTH = Math.min(360, CONTENT_WIDTH * 0.8);
  const originalPrice = productDetailData?.pricing?.root?.amounts[0]?.max;
  const salePrice = productDetailData?.pricing?.root?.amounts[1]?.min;
  const percentOff =
    productDetailData?.pricing?.root?.amounts[1]?.maxPercentOff;
  const marketingLabel = productDetailData?.pricing?.root?.marketingLabel;
  const reviewCount = productDetailData?.valuation?.reviews?.count;
  const rating = productDetailData?.valuation?.rating;
  const brandName = productDetailData?.brand?.name;
  const brandUrl = productDetailData?.brand?.brandPageUrl;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header
        title=""
        isShareIcon={true}
        navigation={navigation}
        isSearchIcon={false}
        isNotificationIcon={false}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View>
          <ImageCarousel
            images={imageData}
            initialIndex={initialIndex}
            scrollX={scrollX}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            flatRef={flatRef}
            showDots={showDots}
            currentIndex={currentIndex}
            isWishlistedAll={isWishlistedAll}
            toggleWishlist={toggleWishlist}
            isSwatchClicked={isSwatchClicked}
            colorData={colorData}
            // swatchClicked={setIsSwatchClicked}
          />
        </View>

        <SizeSelector
          sizeRange={sizeRange}
          handleRangePress={handleRangePress}
          displayedSizes={displayedSizes}
          selectedSize={selectedSize}
          handleSelectSize={handleSelectSize}
          onOpenSizeChart={onOpenSizeChart}
          imageData={setImageData}
          isSwatchClicked={isSwatchClicked}
          swatchClicked={setIsSwatchClicked}
          sizeData={sizeData}
          colorData={colorData}

        />

        <View style={[styles.fitSection]}>
          <Text style={[styles.sectionTitle, styles.fitLabelRow]}>
            Fit - <Text style={styles.fitValue}>{product.fitText}</Text>
          </Text>

          <View style={styles.fitSliderRow}>
            <View style={styles.fitTrack} />
            <View style={styles.fitThumb} />
          </View>
        </View>

        <View style={[styles.section, { paddingBottom: 0 }]}>
          <Text style={styles.modelText}>{product.modelText}</Text>
        </View>

        <View style={[styles.section, styles.titleSection]}>
          <Text style={styles.productTitle}>
            {productDetailData?.meta?.title}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(brandUrl ?? 'https://google.com')}
          >
            <Text style={styles.shopAllText}>
              Shop all <Text style={styles.brandLink}>{brandName}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, styles.priceSection]}>
          <Text style={styles.dealLabel}>{marketingLabel}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.salePrice}>${salePrice}</Text>
            <Text style={styles.saleTag}> {product.saleLabel}</Text>
            <Text style={styles.percentOff}> {percentOff} %Off</Text>
            <Text style={styles.originalPrice}> ${originalPrice}</Text>
          </View>
        </View>

        <View style={[styles.section, styles.cartRow]}>
          <Pressable
            onPress={handleQtyPress}
            style={({ pressed }) => [
              styles.qtyBox,
              qtyPressed && styles.qtyBoxActive,
              pressed && { opacity: 0.7 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Select quantity"
          >
            <Text style={styles.qtyText}>{qty} ▼</Text>
          </Pressable>

          <Pressable
            onPress={handleAddToCart}
            style={({ pressed }) => [
              styles.addButton,
              pressed && { opacity: 0.85 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Add to cart"
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </Pressable>
        </View>

        <View style={styles.divider} />

        <InfoList
          onOpenProductDetails={openProductDetails}
          onOpenSizeChart={onOpenSizeChart}
          onOpenShipping={openShipping}
          onOpenSizeGuide={openSizeGuide}
          brandName={brandName}
        />

        <View style={styles.divider} />

        <ReviewBar />

        {/* <ReviewsSection
          reviewCounts={reviewCount}
          reviewTotal={reviewCount}
          totalReviews={totalReviews}
          overallRating={overallRating}
          BAR_MAX_WIDTH={BAR_MAX_WIDTH}
          ratingCount={rating}
          onShowReviews={handleShowReviews}
        /> */}

        <View style={styles.divider} />

        <AvgRatings
          avgRatings={avgRatings}
          METRIC_BAR_WIDTH={METRIC_BAR_WIDTH}
        />

        <View style={styles.divider} />

        <QnAHeader onOpenQuestions={handleOpenQuestions} />

        <View style={styles.divider} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}
        >
          <View style={{ marginVertical: 20 }} />
          <View style={styles.recommendedWrapper}>
            <ProductListHome
              data={RECOMMENDED_FOR_YOU}
              title={'Recommended For You'}
              isShopAll={false}
              titleStyle={styles.recommendedTitle}
              navigation={navigation}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
