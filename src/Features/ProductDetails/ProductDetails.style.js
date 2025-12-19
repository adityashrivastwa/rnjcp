import { StyleSheet, Dimensions } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH;
const IMAGE_HEIGHT = Math.round((IMAGE_WIDTH * 16) / 16);
const H_PADDING = 16;
const CONTENT_WIDTH = SCREEN_WIDTH - H_PADDING * 2;


const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    // paddingBottom: 40,
    marginTop: 20,
  },

  colorSection: { marginTop: 12, paddingHorizontal: H_PADDING },
  colorLabel: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  colorValue: { fontWeight: '400', color: '#333' },

  swatchRow: { flexDirection: 'row', alignItems: 'center' },
  swatchOuter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatchImage: { width: 40, height: 40, borderRadius: 17 },

  section: { marginTop: 16, paddingHorizontal: H_PADDING },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },

  rangeRow: { flexDirection: 'row' },
  rangeButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#bbb',
    backgroundColor: 'transparent',
    marginRight: 12,
  },
  rangeButtonActive: { borderColor: '#000', backgroundColor: '#fff' },
  rangeButtonText: { fontSize: 15, color: '#444' },
  rangeButtonTextActive: { fontWeight: '700', color: '#000' },

  sizeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sizeChartText: { textDecorationLine: 'underline', color: '#333' },

  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: H_PADDING,
    marginTop: 12,
  },
  sizeButton: {
    minWidth: 100,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#bdbdbd',
    marginRight: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sizeButtonSelected: { borderColor: '#111', borderWidth: 2.5 },
  sizeButtonText: { fontSize: 14, color: '#444' },
  sizeButtonTextSelected: { fontWeight: '700', color: '#111' },

  fitSection: { marginTop: 16, paddingHorizontal: H_PADDING },
  fitLabelRow: { marginBottom: 8 },
  fitLabel: { fontSize: 16, fontWeight: '600' },
  fitValue: { fontWeight: '400', color: '#333' },

  fitSliderRow: { height: 28, justifyContent: 'center', position: 'relative' },
  fitTrack: {
    height: 6,
    backgroundColor: '#e2e2e2',
    borderRadius: 4,
    width: 150,
    alignSelf: 'flex-start',
  },
  fitThumb: {
    position: 'absolute',
    left: '25%',
    transform: [{ translateX: -7 }],
    top: 6,
    width: 11,
    height: 18,
    borderRadius: 2,
    backgroundColor: '#555',
  },

  modelText: {
    marginTop: 12,
    paddingHorizontal: H_PADDING,
    fontSize: 15,
    color: '#222',
  },

  titleSection: { marginTop: 16, paddingHorizontal: H_PADDING },
  productTitle: {
    marginTop: 10,
    paddingHorizontal: 0,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 26,
    color: '#111',
  },
  shopAllText: {
    marginTop: 8,
    paddingHorizontal: 0,
    fontSize: 15,
    color: '#333',
  },
  brandLink: { textDecorationLine: 'underline' },

  priceSection: { marginTop: 10, paddingHorizontal: H_PADDING },
  dealLabel: {
    color: '#c00',
    fontWeight: '700',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  salePrice: { fontSize: 32, fontWeight: '800', color: '#111' },
  saleTag: { fontSize: 16, color: '#c00', marginLeft: 6, fontStyle: 'italic' },
  percentOff: {
    fontSize: 16,
    color: '#777',
    marginLeft: 10,
    fontStyle: 'italic',
  },
  originalPrice: {
    fontSize: 16,
    color: '#777',
    marginLeft: 10,
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
  },

  cartRow: {
    marginTop: 18,
    paddingHorizontal: H_PADDING,
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBox: {
    width: 72,
    height: 48,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#bdbdbd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  qtyBoxActive: { borderColor: '#111' },
  qtyText: { fontSize: 16, color: '#222' },
  addButton: {
    flex: 1,
    marginLeft: 12,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#cf2f2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  divider: { height: 1, backgroundColor: '#eee', marginTop: 20 },

  infoList: { marginTop: 8, paddingHorizontal: H_PADDING },
  infoRow: {
    height: 68,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  infoText: { fontSize: 20, fontWeight: '600', color: '#111' },
  chev: { fontSize: 28, color: '#777' },

  guideWrapper: { paddingHorizontal: H_PADDING, paddingVertical: 18 },
  guideButton: {
    borderWidth: 1.5,
    borderColor: '#bdbdbd',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  guideText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111',
  },

  reviewsTitle: { fontSize: 20, fontWeight: '700' },
  ratingSnapshotTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  ratingSnapshotSubtitle: { fontSize: 14, color: '#666', marginBottom: 12 },

  ratingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  ratingStarLabel: { width: 72, fontSize: 15, color: '#222' },
  ratingBarWrap: { flex: 1, paddingHorizontal: 8 },
  ratingBarTrack: {
    height: 14,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  ratingBarFill: { height: 14, backgroundColor: '#444' },
  ratingCount: { width: 28, textAlign: 'center', color: '#222' },

  overallRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  overallScore: {
    fontSize: 40,
    fontWeight: '700',
    marginRight: 12,
    color: '#111',
  },
  overallStars: { flexDirection: 'row', alignItems: 'center' },
  starChar: { fontSize: 20, color: '#444', marginHorizontal: 2 },

  reviewsLink: {
    textDecorationLine: 'underline',
    color: '#111',
    marginTop: 8,
    fontSize: 15,
  },

  showReviewsWrapper: { marginTop: 16, paddingHorizontal: H_PADDING },
  showReviewsButton: {
    borderWidth: 1.5,
    borderColor: '#bdbdbd',
    borderRadius: 12,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  showReviewsText: { fontSize: 18, fontWeight: '700', color: '#111' },

  avgRatingSection: {
    marginTop: 16,
    paddingHorizontal: H_PADDING,
    marginLeft: 20,
  },

  avgTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    marginLeft: -20,
  },

  verticalMetricRow: {
    marginVertical: 12,
  },

  metricTextRow: {
    marginBottom: 8,
  },

  metricBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  metricLabel: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },

  metricScore: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
    marginLeft: 12,
    width: 40,
  },

  metricBarWrap: {
    flex: 1,
  },

  metricBarTrack: {
    height: 16,
    backgroundColor: '#e6e6e6',
    borderRadius: 6,
    overflow: 'hidden',
  },

  metricBarFill: {
    height: 16,
    backgroundColor: '#444',
  },

  fitScaleWrap: {
    marginTop: 8,
  },

  fitScaleTrack: {
    height: 20,
    backgroundColor: '#e6e6e6',
    borderRadius: 6,
    position: 'relative',
  },

  fitScaleThumb: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#444',
    top: 1,
  },

  fitScaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  smallLabel: {
    fontSize: 14,
    color: '#222',
  },

  qnaRow: {
    height: 72,
    paddingHorizontal: H_PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qnaTitle: { fontSize: 22, fontWeight: '700', color: '#111' },
  qnaPlus: { fontSize: 28, color: '#111', lineHeight: 28 },

  imageContainer: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
  },
  image: { width: IMAGE_WIDTH, height: IMAGE_WIDTH },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 12,
    zIndex: 10,
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heartIcon: { fontSize: 18, color: '#fff', lineHeight: 18 },

  dotsWrap: { flexDirection: 'row', alignSelf: 'center', marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 8, marginHorizontal: 4 },
  dotActive: { backgroundColor: '#222' },
  dotInactive: { backgroundColor: '#cfcfcf' },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredContainer: {
    width: '100%',
    maxWidth: 400,
    marginHorizontal: 20,
  },

  sheet: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 700,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  close: {
    fontSize: 20,
    color: '#666',
    padding: 4,
  },

  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  favoriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#007AFF',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  heart: {
    fontSize: 18,
    marginRight: 12,
  },
  favoriteText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },

  createRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  plus: {
    fontSize: 18,
    color: '#1f75e8',
    marginRight: 12,
    fontWeight: 'bold',
  },
  createText: {
    fontSize: 16,
    color: '#1f75e8',
    fontWeight: '500',
  },
  recommendedWrapper: { marginLeft: 20 },
  recommendedTitle: { textAlign: 'start', marginLeft: 30 },
});

export default styles;