import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get('window');
const CARD_MARGIN_HORIZONTAL = 8;
const CARD_WIDTH = (screenWidth - 2 * CARD_MARGIN_HORIZONTAL - 4) / 2;
const CARD_HEIGHT = (CARD_WIDTH * 4) / 3; 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  backArrow: {
    fontSize: 20,
    paddingRight: 10,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  topBarRight: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconText: {
    fontSize: 18,
    marginLeft: 10,
  },

  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: 'space-between',
    marginTop: 30
  },
  filterChip: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 10,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },

  pickupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  switchOuter: {
    width: 52,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#f2f2f2',
  },
  switchOuterOn: {
    backgroundColor: '#e60012',
    borderColor: '#e60012',
  },
  switchInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
  },
  switchInnerOn: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-end',
  },
  pickupTextContainer: {
    marginLeft: 12,
  },
  pickupText: {
    fontSize: 16,
    fontWeight: '600',
  },
  pickupLink: {
    marginTop: 4,
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  resultsText: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  listContent: {
    paddingHorizontal: 4,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    marginHorizontal: CARD_MARGIN_HORIZONTAL,
    marginBottom: 20,
  },
  imageWrapper: {
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    height: CARD_HEIGHT,
    backgroundColor: '#f3f3f3',
  },
  imageSlider: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  imageContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    zIndex: 10,
  },
  heart: {
    fontSize: 20,
    color: '#ffffff',
    textShadowColor: '#00000055',
    textShadowRadius: 2,
  },
  heartFilled: {
    color: '#e60012',
    textShadowRadius: 0,
  },
  addToCart: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#ffffffee',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 10,
  },
  addToCartText: {
    fontSize: 16,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    zIndex: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#d0d0d0',
  },
  dotActive: {
    backgroundColor: '#808080',
  },
  favoriteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffffee',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  favoriteOverlayCard: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  favoriteOverlayTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  favoriteOverlayLink: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  colorsRow: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingBottom: 2,
  },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  colorDotSelected: {
    borderColor: '#000',
    borderWidth: 2,
  },
  title: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  offer: {
    fontSize: 12,
    color: '#c82333',
    marginLeft: 4,
    marginBottom: 1,
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#777',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starsRow: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 12,
    marginRight: 2,
  },
  reviewCount: {
    marginLeft: 6,
    fontSize: 12,
    textDecorationLine: 'underline',
  },

  // sort modal styles
  sortOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  sortText: {
    fontSize: 16,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007aff',
  },

  locationOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  locationText: {
    fontSize: 15,
    lineHeight: 20,
  },
  locationButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
  },
  locationButton: {
    marginLeft: 24,
  },
  locationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e60012',
  },
});

export default styles;