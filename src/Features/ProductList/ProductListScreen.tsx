import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
  Modal,
} from 'react-native';
import FilterModal from '../../SharedComponents/FilterModal/FilterModal';
import { useNavigation } from '@react-navigation/native';
import Header from '../../SharedComponents/Header/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ProductList.styles';
import FloatingCartButton from '../../SharedComponents/FloatingCartButton/FloatingCartButton';
import { PRODUCTS } from '../../Assets/dummyData';
import { fetchProduct } from '../../Apis/product.api';

const { width: screenWidth } = Dimensions.get('window');
const CARD_MARGIN_HORIZONTAL = 8;
const CARD_WIDTH = (screenWidth - 2 * CARD_MARGIN_HORIZONTAL - 4) / 2;

const getJCPImageUrl = fileName => {
  if (!fileName) return null;

  const cleanName = fileName.replace('.tif', '');

  return `https://jcpenney.scene7.com/is/image/JCPenney/${cleanName}`;
};

const SORT_OPTIONS = [
  {
    key: 'featured',
    label: 'featured',
    buttonLabel: 'Featured',
  },
  {
    key: 'newArrivals',
    label: 'new arrivals',
    buttonLabel: 'New Arrivals',
  },
  {
    key: 'bestSellers',
    label: 'best sellers',
    buttonLabel: 'Best Sellers',
  },
  {
    key: 'ratingHighLow',
    label: 'ratings high - low',
    buttonLabel: 'Ratings High - Low',
  },
  {
    key: 'priceLowHigh',
    label: 'price low - high',
    buttonLabel: 'Price Low - High',
  },
  {
    key: 'priceHighLow',
    label: 'price high - low',
    buttonLabel: 'Price High - Low',
  },
] as const;

type SortKey = (typeof SORT_OPTIONS)[number]['key'];

const ProductListScreen = () => {
  const navigation = useNavigation();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sameDayPickup, setSameDayPickup] = useState(false);

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [favoriteMessageProductId, setFavoriteMessageProductId] = useState<
    string | null
  >(null);

  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const [colorIndexes, setColorIndexes] = useState<Record<string, number>>({});

  const [isSortVisible, setIsSortVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortKey | null>(null);

  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [productData, setProductData] = useState([]);

  const [imageData, setImageData] = useState([]);
  const [isSwatchClicked, setIsSwatchClicked] = useState({});

  const scrollRefs = useRef<Record<string, ScrollView | null>>({});

  const getProducts = async () => {
    const val = await fetchProduct();
    setProductData(val);
    setImageData(val?.organicZoneInfo?.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log({ productData });

  const showFavoriteMessage = (productId: string) => {
    setFavoriteMessageProductId(productId);
    setTimeout(() => {
      setFavoriteMessageProductId(prev => (prev === productId ? null : prev));
    }, 5000);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const wasFavorite = !!prev[productId];
      const nextState = { ...prev, [productId]: !wasFavorite };

      if (!wasFavorite) {
        showFavoriteMessage(productId);
      } else {
        setFavoriteMessageProductId(prevId =>
          prevId === productId ? null : prevId,
        );
      }

      return nextState;
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= Math.floor(rating);
      const half = !filled && rating + 1 > i && rating % 1 >= 0.5;
      stars.push(
        <Text key={i} style={styles.star}>
          {filled ? '★' : half ? '⯪' : '☆'}
        </Text>,
      );
    }
    return stars;
  };

  const processedProducts = useMemo(() => {
    let base: typeof PRODUCTS = PRODUCTS;
    if (selectedFilters.length > 0) {
      base = PRODUCTS.filter(product =>
        selectedFilters.some(filter => {
          if (filter === 'Sweater') return product.category === 'Sweater';
          if (filter === 'T-Shirt') return product.category === 'T-Shirt';
          if (filter === 'Top') return product.category === 'Top';
          if (filter === 'a.n.a') return product.brand === 'a.n.a';
          if (filter === "St. John's Bay")
            return product.brand === "St. John's Bay";
          if (filter === 'Premium') return product.brand === 'Premium';
          if (filter === 'S') return product.size === 'S';
          if (filter === 'M') return product.size === 'M';
          if (filter === 'L') return product.size === 'L';
          if (filter === 'XL') return product.size === 'XL';
          return false;
        }),
      );
    }

    const arr = [...base];

    if (!selectedSort || selectedSort === 'featured') {
      return arr;
    }

    switch (selectedSort) {
      case 'newArrivals':
        return arr.sort((a, b) => Number(b.id) - Number(a.id));
      case 'bestSellers':
        return arr.sort((a, b) => b.reviewsCount - a.reviewsCount);
      case 'ratingHighLow':
        return arr.sort((a, b) => b.rating - a.rating);
      case 'priceLowHigh':
        return arr.sort((a, b) => a.price - b.price);
      case 'priceHighLow':
        return arr.sort((a, b) => b.price - a.price);
      default:
        return arr;
    }
  }, [selectedFilters, selectedSort]);

  const handleImageScrollEnd = (
    productId: string,
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const index = Math.round(contentOffset.x / layoutMeasurement.width);
    setImageIndexes(prev => ({ ...prev, [productId]: index }));
  };

  const renderItem = ({ item }: any) => {
    const isFavorite = !!favorites[item.id];
    const showOverlay = favoriteMessageProductId === item.id;
    const activeImageIndex = imageIndexes[item.id] ?? 0;
    const selectedColorIndex = colorIndexes[item.id] ?? 0;

    const handleColorPress = (colorIndex: number) => {
      setColorIndexes(prev => ({
        ...prev,
        [item.id]: colorIndex,
      }));

      const imageIndex = Math.min(
        colorIndex,
        Math.max(0, item.images.length - 1),
      );

      setImageIndexes(prev => ({
        ...prev,
        [item.id]: imageIndex,
      }));

      const ref = scrollRefs.current[item.id];
      if (ref) {
        ref.scrollTo({
          x: CARD_WIDTH * imageIndex,
          animated: true,
        });
      }
    };
    const url = isSwatchClicked[item?.ppId]
      ? imageData?.imgId
      : item?.imagesInfo?.altThumbnailImageId;
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ProductDetails', {id: item?.ppId})}
      >
        <View style={styles.imageWrapper}>
          <ScrollView
            ref={ref => {
              scrollRefs.current[item.id] = ref;
            }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={e => handleImageScrollEnd(item?.id, e)}
            style={styles.imageSlider}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: getJCPImageUrl(url) }}
                style={styles.image}
              />
              <FloatingCartButton buttonStyles={{ bottom: 10, right: 20 }} />
            </View>
            {/* {item?.images?.map((img: string, idx: number) => (
              
            ))} */}
          </ScrollView>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleFavorite(item?.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.heart, isFavorite && styles.heartFilled]}>
              {isFavorite ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dotsContainer}>
            {item?.images?.map((_: string, idx: number) => (
              <View
                key={idx.toString()}
                style={[
                  styles.dot,
                  activeImageIndex === idx && styles.dotActive,
                ]}
              />
            ))}
          </View>

          {showOverlay && (
            <View style={styles.favoriteOverlay}>
              <View style={styles.favoriteOverlayCard}>
                <Text style={styles.favoriteOverlayTitle}>
                  Added to Favorites
                </Text>
                <TouchableOpacity>
                  <Text style={styles.favoriteOverlayLink}>View Favorites</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={styles.colorsRow}>
          {item?.skuSwatch?.map((img, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                style={{ marginRight: 10 }}
                // onPress={() => handleColorPress(index)}
                onPress={() => {
                  setIsSwatchClicked({ [item?.ppId]: true });
                  setImageData(img?.skuAltImages[0]);
                }}
                activeOpacity={0.7}
              >
                {/* <View
                  style={[
                    styles.colorDot,
                    { backgroundColor: c },
                    isSelected && styles.colorDotSelected,
                  ]}
                /> */}
                <Image
                  style={{ height: 15, width: 15, borderRadius: 7 }}
                  source={{ uri: getJCPImageUrl(img?.swatchImageId) }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item?.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${item?.fpacPriceMax?.toFixed(2)}</Text>
          {item?.currentMax && (
            <Text style={styles.offer}> {item?.currentMax}</Text>
          )}
        </View>
        {item?.originalMax && (
          <Text style={styles.originalPrice}>${item?.originalMax}</Text>
        )}

        <View style={styles.ratingRow}>
          <View style={styles.starsRow}>
            {renderStars(item?.averageRating)}
          </View>
          <Text style={styles.reviewCount}>{item?.reviewsCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const currentSortButtonLabel = selectedSort
    ? SORT_OPTIONS.find(o => o.key === selectedSort)?.buttonLabel || 'Sort'
    : 'Sort';

  const openLocationModal = () => {
    setIsLocationModalVisible(true);
  };

  const handleToggleSameDayPickup = () => {
    if (!sameDayPickup) {
      openLocationModal();
    } else {
      setSameDayPickup(false);
    }
  };

  const handleLocationCancel = () => {
    setIsLocationModalVisible(false);
    setSameDayPickup(false);
  };

  const handleLocationSettings = () => {
    setIsLocationModalVisible(false);
    setSameDayPickup(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Shop" navigation={navigation} />

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={styles.filterChip}
          onPress={() => setIsFilterVisible(true)}
        >
          <Text style={styles.chipText}>
            Filter{' '}
            {selectedFilters.length > 0 ? `(${selectedFilters.length})` : ''}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterChip}
          onPress={() => setIsSortVisible(true)}
        >
          <Text style={styles.chipText}>{currentSortButtonLabel}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pickupRow}>
        <TouchableOpacity
          style={[styles.switchOuter, sameDayPickup && styles.switchOuterOn]}
          onPress={handleToggleSameDayPickup}
          activeOpacity={0.8}
        >
          <View
            style={[styles.switchInner, sameDayPickup && styles.switchInnerOn]}
          />
        </TouchableOpacity>

        <View style={styles.pickupTextContainer}>
          <Text style={styles.pickupText}>Same Day Pickup</Text>
          <TouchableOpacity onPress={openLocationModal}>
            <Text style={styles.pickupLink}>Select Store</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.resultsText}>
        {productData?.organicZoneInfo?.products?.length} Results
        {/* {selectedFilters.length > 0 && ' (filtered)'} */}
      </Text>

      <FlatList
        data={productData?.organicZoneInfo?.products}
        renderItem={renderItem}
        keyExtractor={item => item?.ppId}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <FilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        resultCount={processedProducts.length}
      />

      <Modal
        visible={isSortVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSortVisible(false)}
      >
        <View style={styles.sortOverlay}>
          <View style={styles.sortContainer}>
            {SORT_OPTIONS.map(option => {
              const isSelected = option.key === selectedSort;
              return (
                <TouchableOpacity
                  key={option.key}
                  style={styles.sortRow}
                  onPress={() => {
                    setSelectedSort(option.key);
                    setIsSortVisible(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.sortText}>{option.label}</Text>
                  <View style={styles.radioOuter}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>

      <Modal
        visible={isLocationModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleLocationCancel}
      >
        <View style={styles.locationOverlay}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              JCPenney needs to have access to your device&apos;s foreground
              location in order to provide an approximate delivery window.
            </Text>
            <Text style={[styles.locationText, { marginTop: 10 }]}>
              Additionally, you may provide background location permission to
              use store specific features like &quot;Ask an associate&quot; and
              to receive store-only deals, when the app is not in use.
            </Text>

            <View style={styles.locationButtonsRow}>
              <TouchableOpacity
                onPress={handleLocationCancel}
                style={styles.locationButton}
              >
                <Text style={styles.locationButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLocationSettings}
                style={styles.locationButton}
              >
                <Text style={styles.locationButtonText}>SETTINGS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProductListScreen;
