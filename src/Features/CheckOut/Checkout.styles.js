import { StyleSheet } from "react-native";
const GREY = '#4a4a4a';
const LIGHT_GREY = '#f3f3f3';
const BORDER_GREY = '#bdbdbd';
const RED = '#e30613';
const DISABLED_GREY = '#f1f1f1';
const DISABLED_TEXT = '#b5b5b5';
const ERROR_RED = '#e30613';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  container: { flex: 1, backgroundColor: '#ffffff' },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  backArrow: { fontSize: 24 },
  cartContainer: { position: 'relative' },
  cartIcon: { fontSize: 24 },
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#e53935',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: { color: '#ffffff', fontSize: 10, fontWeight: '600' },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 32 },

  stepHeader: {
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: GREY,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stepHeaderText: { color: '#ffffff', fontSize: 18, fontWeight: '600' },

  productsRow: {  flexDirection: 'row', justifyContent: 'center', marginTop: 20  },
  productImage: { width: 90, aspectRatio: 3 / 4, resizeMode: 'cover', marginLeft: 15 },
  productQty: { marginTop: 4, fontSize: 13, color: GREY, textAlign: 'center' },

  detailsLink: {
    marginTop: 16,
    fontSize: 15,
    textDecorationLine: 'underline',
    color: GREY,
  },

  shippingCard: {
    marginTop: 24,
    backgroundColor: LIGHT_GREY,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  radioOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: GREY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioInner: { width: 14, height: 14, borderRadius: 7, backgroundColor: GREY },
  optionText: { fontSize: 17, color: GREY },

  /* shipping summary card */
  shippingSummaryCard: {
    marginTop: 24,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  shippingSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingSummaryName: {
    fontSize: 20,
    fontWeight: '700',
    color: GREY,
  },
  shippingSummaryLine: {
    fontSize: 16,
    color: GREY,
    marginTop: 2,
  },
  defaultPill: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: DISABLED_GREY,
  },
  defaultPillText: {
    fontSize: 14,
    color: GREY,
  },
  shippingEditInline: {
    fontSize: 16,
    color: GREY,
    textDecorationLine: 'underline',
  },
  addNewAddressText: {
    fontSize: 16,
    color: GREY,
    textDecorationLine: 'underline',
  },

  deliveryMethodTitle: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '700',
    color: GREY,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  deliveryRadioOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: GREY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deliveryRadioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: GREY,
  },
  deliveryTitleText: {
    fontSize: 16,
    color: GREY,
  },
  deliverySubtitleText: {
    fontSize: 14,
    color: GREY,
  },

  /* address form */
  addressSection: { marginBottom: 24 },
  fieldLabel: { fontSize: 13, color: GREY, marginTop: 16, marginBottom: 4 },
  fieldLabelNoTop: {
    fontSize: 13,
    color: GREY,
    marginTop: 16,
    marginBottom: 4,
    opacity: 0,
  },
  fieldBox: {
    borderWidth: 1,
    borderColor: BORDER_GREY,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldBoxError: { borderColor: ERROR_RED },
  fieldValue: { flex: 1, fontSize: 16, color: GREY },
  placeholderText: { color: '#9a9a9a' },
  dropdownArrow: { fontSize: 16, color: GREY, marginLeft: 8 },
  textInput: { flex: 1, fontSize: 16, paddingVertical: 0, color: GREY },
  optionalInput: { fontStyle: 'italic' },

  errorText: { fontSize: 12, color: ERROR_RED, marginTop: 4, marginLeft: 4 },

  zipStateRow: { flexDirection: 'row', marginTop: 16 },
  zipStateErrorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  zipError: { flex: 1, marginRight: 8 },
  stateError: { flex: 1, marginLeft: 8 },

  zipBox: { flex: 1, marginRight: 8 },
  zipStateRight: { flex: 1, marginLeft: 8 },
  inlineLabel: { fontSize: 13, color: GREY, marginBottom: 4 },
  stateBox: { paddingHorizontal: 14 },

  phoneBox: { marginTop: 4 },
  helpIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: BORDER_GREY,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  helpIconText: { fontSize: 16, color: GREY },

  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginTop: 18 },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: GREY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxBoxChecked: {
    backgroundColor: GREY,
    borderColor: GREY,
  },
  checkboxInner: {
    width: 10,
    height: 5,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#ffffff',
    transform: [{ rotate: '-45deg' }],
    marginTop: 1,
  },
  checkboxLabel: { fontSize: 15, color: GREY },

  continueButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: RED,
  },
  continueButtonText: { color: '#ffffff', fontSize: 18, fontWeight: '600' },

  stepDisabled: {
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: DISABLED_GREY,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  stepDisabledText: { color: DISABLED_TEXT, fontSize: 18, fontWeight: '500' },

  /* Shipping summary */
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: DISABLED_GREY,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  summaryText: { fontSize: 18, color: GREY, fontWeight: '500' },
  editButton: {
    marginLeft: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: { fontSize: 16, color: GREY },

  /* Payment section */
  paymentSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  giftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  giftIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#d32f2f',
    marginRight: 8,
  },
  giftText: { fontSize: 16, color: GREY, fontWeight: '500' },
  addGiftText: {
    fontSize: 15,
    color: GREY,
    textDecorationLine: 'underline',
  },
  divider: {
    marginTop: 16,
    height: 1,
    backgroundColor: '#e3e3e3',
  },

  /* Gift card inline form */
  giftFormContainer: {
    marginTop: 16,
    marginBottom: 12,
  },
  giftFormTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: GREY,
    marginBottom: 8,
  },
  giftFieldLabel: {
    fontSize: 13,
    color: GREY,
    marginBottom: 4,
  },
  giftInputBox: {
    borderWidth: 1,
    borderColor: BORDER_GREY,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  giftPinInput: {
    fontSize: 16,
    color: GREY,
    fontStyle: 'italic',
    paddingVertical: 0,
  },
  giftCancelBtn: {
    marginTop: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_GREY,
    paddingVertical: 12,
    alignItems: 'center',
  },
  giftCancelText: {
    fontSize: 16,
    color: GREY,
  },
  giftApplyBtn: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: RED,
    paddingVertical: 12,
    alignItems: 'center',
  },
  giftApplyText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },

  paymentInfoTitle: {
    marginTop: 16,
    fontSize: 19,
    fontWeight: '600',
    color: GREY,
  },
  paypalCard: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: BORDER_GREY,
    borderRadius: 10,
    padding: 14,
  },
  paypalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paypalText: {
    fontSize: 14,
    color: GREY,
    lineHeight: 20,
  },
  paypalFooter: {
    marginTop: 8,
    fontSize: 12,
    color: GREY,
  },
  paymentMethodCard: {
    marginTop: 20,
    backgroundColor: LIGHT_GREY,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },

  cardLogosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
  },
  cardLogo: {
    width: 40,
    height: 26,
    borderRadius: 4,
    marginRight: 8,
  },

  paymentCheckboxGroup: {
    marginTop: 16,
  },
  addressSummary: {
    marginTop: 16,
  },
  addressSummaryName: {
    fontSize: 15,
    fontWeight: '600',
    color: GREY,
  },
  addressSummaryText: {
    fontSize: 14,
    color: GREY,
    marginTop: 2,
  },
  reviewButton: {
    marginTop: 18,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: RED,
  },
  reviewButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  paypalMainButton: {
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_GREY,
    paddingVertical: 14,
    alignItems: 'center',
  },
  paypalMainButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0070ba',
  },
  paypalMainText: {
    marginTop: 10,
    fontSize: 14,
    color: GREY,
    lineHeight: 20,
  },

  /* REVIEW STEP STYLES */
  reviewTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: GREY,
    marginTop: 8,
    marginBottom: 8,
  },
  reviewBar: {
    marginTop: 12,
    borderRadius: 10,
    backgroundColor: GREY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  reviewBarText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  reviewBarEdit: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  reviewBarEditText: {
    fontSize: 16,
    color: GREY,
    fontWeight: '500',
  },

  reviewShippingBlock: {
    marginTop: 16,
  },
  shippingName: {
    fontSize: 18,
    fontWeight: '700',
    color: GREY,
  },
  shippingAddressLine: {
    fontSize: 16,
    color: GREY,
    marginTop: 2,
  },
  deliveryTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    color: GREY,
  },
  deliveryDate: {
    marginTop: 6,
    fontSize: 16,
    color: GREY,
  },
  reviewProductRow: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  reviewProductImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  reviewQtyText: {
    marginTop: 8,
    fontSize: 16,
    color: GREY,
  },

  reviewPaymentBlock: {
    marginTop: 16,
  },
  paymentMethodTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    color: GREY,
  },
  paymentMethodRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentCardIcon: {
    width: 32,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#c4001d',
    marginRight: 10,
  },
  paymentMethodText: {
    fontSize: 16,
    color: GREY,
  },
  paymentMethodAmount: {
    marginLeft: 'auto',
    fontSize: 18,
    fontWeight: '700',
    color: GREY,
  },
  billingTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: GREY,
  },
  billingLine: {
    marginTop: 2,
    fontSize: 16,
    color: GREY,
  },

  /* Review: status updates row */
  statusUpdatesRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DISABLED_GREY,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  statusUpdatesText: {
    fontSize: 16,
    color: GREY,
  },

  /* Order summary card */
  orderSummaryCard: {
    marginTop: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_GREY,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  orderLabel: {
    fontSize: 15,
    color: GREY,
  },
  orderLabelStrong: {
    fontWeight: '600',
  },
  orderValue: {
    marginLeft: 'auto',
    fontSize: 15,
    color: GREY,
  },
  orderLink: {
    marginLeft: 8,
    fontSize: 15,
    color: GREY,
    textDecorationLine: 'underline',
  },
  orderNegative: {
    marginLeft: 'auto',
    fontSize: 15,
    color: '#e30613',
    fontWeight: '600',
  },
  orderTotalRow: {
    marginTop: 10,
  },
  orderTotalLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  orderTotalValue: {
    marginLeft: 'auto',
    fontSize: 18,
    fontWeight: '700',
    color: GREY,
  },
  orderSummaryDivider: {
    marginTop: 12,
    height: 1,
    backgroundColor: '#e3e3e3',
  },
  totalSavingsText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: GREY,
    textAlign: 'center',
  },
  totalSavingsAmount: {
    color: '#e30613',
  },

  /* Fast checkout card */
  fastCheckoutCard: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: DISABLED_GREY,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fastCheckoutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: GREY,
  },
  fastCheckoutText: {
    marginTop: 4,
    fontSize: 14,
    color: GREY,
  },

  /* Place order button */
  placeOrderButton: {
    marginTop: 24,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: RED,
  },
  placeOrderText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  /* Modal styles (state picker shared) */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 8,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  modalHeaderText: {
    flex: 1,
    fontSize: 16,
    color: '#9a9a9a',
  },
  modalHeaderRadioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#c4c4c4',
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  modalRowText: {
    flex: 1,
    fontSize: 16,
    color: '#111111',
  },
  modalRadioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#444444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#444444',
  },

  /* Text updates modal */
  textUpdatesCard: {
    width: '92%',
    backgroundColor: LIGHT_GREY,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textUpdatesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textUpdatesTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '700',
    color: GREY,
  },
  textUpdatesBody: {
    marginTop: 8,
    fontSize: 14,
    color: GREY,
    lineHeight: 20,
  },
  textDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  textDetailsLink: {
    fontSize: 15,
    color: GREY,
    textDecorationLine: 'underline',
  },
  textDetailsArrow: {
    marginLeft: 4,
    fontSize: 16,
    color: GREY,
  },
  textDetailsText: {
    marginTop: 8,
    fontSize: 13,
    color: GREY,
    lineHeight: 18,
  },
  textModalPhoneLabel: {
    fontSize: 13,
    color: GREY,
    marginBottom: 4,
  },
  smsFieldBox: {
    borderWidth: 1,
    borderColor: BORDER_GREY,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  smsFieldBoxError: {
    borderColor: ERROR_RED,
  },
  smsPhoneInput: {
    fontSize: 16,
    color: GREY,
  },
  smsErrorText: {
    marginTop: 4,
    fontSize: 12,
    color: ERROR_RED,
  },
  textModalFooter: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  textModalDoneText: {
    fontSize: 16,
    fontWeight: '500',
    color: GREY,
  },
});

export default styles;