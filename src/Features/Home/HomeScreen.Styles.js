import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  scrollView: { flex: 1 },

  accordionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    zIndex: 99,
  },
  accordionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accordionTextHeading: { fontWeight: 'bold', fontSize: 18 },
  closeIcon: { fontSize: 20 },

  accordionContent: {
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    borderColor: '#eee',
    borderWidth: 1,
    padding: 20,
  },
  accordionItemRow: { flexDirection: 'row', alignItems: 'center' },
  accordionItemTextWrapper: { marginLeft: 10 },
  accordionSubText: {
    color: '#ccc',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 20,
    width: '100%',
  },

  freeShippingContainer: {
    backgroundColor: '#ebe7e1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 30,
  },
  freeShippingDetails: {
    textDecorationLine: 'underline',
    fontSize: 12,
    marginTop: 5,
  },

  circleBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },

  circleBannerLight: {
    height: 100,
    width: 100,
    borderRadius: 60,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
  circleBannerRed: {
    height: 100,
    width: 100,
    borderRadius: 60,
    backgroundColor: 'red',
    justifyContent: 'center',
    marginLeft: 10,
  },
  circleBannerDark: {
    height: 100,
    width: 100,
    borderRadius: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    marginLeft: 10,
  },

  circleBannerRedLarge: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'red',
    fontWeight: 'bold',
  },
  circleBannerRedMedium: {
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  circleBannerWhite: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  circleBannerYellow: {
    alignSelf: 'center',
    color: '#ffff1c',
    fontWeight: 'bold',
    fontSize: 18,
  },

  saveAllWrapper: { marginLeft: 10, marginTop: 20 },
  saveAllRedMedium: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  saveAllRedLarge: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  saveAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  underline: { textDecorationLine: 'underline', marginRight: 10 },
  saveAllDivider: {
    marginTop: 5,
    height: 3,
    backgroundColor: 'red',
    marginHorizontal: 20,
  },

  shopAllGridWrapper: { marginLeft: 25, marginTop: 10 },
  shopAllColumnWrapper: { justifyContent: 'space-between' },
  shopAllItem: { width: '33%', marginBottom: 15 },
  shopAllImage: { height: 90, width: 90, borderRadius: 99 },
  shopAllTitle: { textAlign: 'center', marginRight: 30, marginTop: 5 },

  recommendedWrapper: { marginLeft: 20 },
  recommendedTitle: { textAlign: 'start', marginLeft: 30 },
});
export default styles;