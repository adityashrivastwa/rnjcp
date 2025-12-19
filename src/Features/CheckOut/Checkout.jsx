import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';

import styles from './Checkout.styles'
import Header from '../../SharedComponents/Header/Header';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRODUCTS = [
  { id: '1', uri: 'https://jcpenney.scene7.com/is/image/JCPenney/DP0530202511072670M', qty: 1 },
  { id: '2', uri: 'https://jcpenney.scene7.com/is/image/JCPenney/DP0424202507264579M', qty: 1 },
  { id: '3', uri: 'https://jcpenney.scene7.com/is/image/JCPenney/DP0424202507263018M', qty: 1 },
];

const US_STATES = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District Of Columbia',
  'Federated States Of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Islands',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

const DELIVERY_OPTIONS = [
  {
    id: 'standard',
    title: 'Standard Delivery: $8.95',
    subtitle: 'Est. Delivery: Thursday, Dec 11th',
  },
  {
    id: '3day',
    title: 'Delivered In 3 Business Days: $14.95',
    subtitle: 'Est. Delivery: Thursday, Dec 11th',
  },
  {
    id: '2day',
    title: 'Delivered In 2 Business Days: $19.95',
    subtitle: 'Est. Delivery: Wednesday, Dec 10th',
  },
  {
    id: '1day',
    title: 'Delivered In 1 Business Day: $29.95',
    subtitle: 'Est. Delivery: Tuesday, Dec 9th',
  },
];

const CheckoutScreen = () => {
  const navigation = useNavigation()
  const [shippingOption, setShippingOption] = useState('home');

  const [currentStep, setCurrentStep] = useState('shipping');

  const [shippingMode, setShippingMode] = useState('form');

  const [deliveryMethod, setDeliveryMethod] = useState('1day');

  const [country] = useState('United States');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [aptSuite, setAptSuite] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardError, setCardError] = useState('');
  const [markPreferred, setMarkPreferred] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [billingSame, setBillingSame] = useState(true);
  const [textUpdates, setTextUpdates] = useState(false);
  const [fastCheckout, setFastCheckout] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [isStateModalVisible, setIsStateModalVisible] = useState(false);
  const [isTextUpdatesModalVisible, setIsTextUpdatesModalVisible] =
    useState(false);
  const [textDetailsExpanded, setTextDetailsExpanded] = useState(false);
  const [smsPhone, setSmsPhone] = useState('');
  const [smsPhoneError, setSmsPhoneError] = useState('');
  const [showGiftCardForm, setShowGiftCardForm] = useState(false);
  const [giftCardNumber, setGiftCardNumber] = useState('');
  const [giftCardPin, setGiftCardPin] = useState('');

  const mandatoryFields = {
    firstName: 'First Name',
    lastName: 'Last Name',
    streetAddress: 'Street Address',
    zipCode: 'Zip Code',
    stateVal: 'State',
    city: 'City',
    phone: 'Phone Number',
  };

  const validatePhone = value =>
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      (value || '').trim(),
    );

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'firstName':
      case 'lastName':
      case 'city':
        return value.trim().length > 0;
      case 'streetAddress':
        return value.trim().length > 5;
      case 'zipCode':
        return /^\d{5}(-\d{4})?$/.test(value.trim());
      case 'stateVal':
        return value.trim().length > 0 && value !== 'Select...';
      case 'phone':
        return validatePhone(value);
      default:
        return true;
    }
  };

  const getFieldValue = fieldName => {
    switch (fieldName) {
      case 'firstName':
        return firstName;
      case 'lastName':
        return lastName;
      case 'streetAddress':
        return streetAddress;
      case 'zipCode':
        return zipCode;
      case 'stateVal':
        return stateVal;
      case 'city':
        return city;
      case 'phone':
        return phone;
      default:
        return '';
    }
  };

  const shouldShowError = fieldName => {
    const value = getFieldValue(fieldName);
    const isMandatory = Object.prototype.hasOwnProperty.call(
      mandatoryFields,
      fieldName,
    );
    if (!isMandatory) return false;
    if (showAllErrors) return !validateField(fieldName, value);
    if (touchedFields[fieldName]) return !validateField(fieldName, value);
    return false;
  };

  const handleBlur = fieldName => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const handleContinue = () => {
    if (shippingMode === 'summary') {
      setCurrentStep('payment');
      return;
    }

    const allFieldsTouched = {};
    Object.keys(mandatoryFields).forEach(fieldName => {
      allFieldsTouched[fieldName] = true;
    });
    setTouchedFields(allFieldsTouched);

    const allFieldsValid = Object.keys(mandatoryFields).every(fieldName =>
      validateField(fieldName, getFieldValue(fieldName)),
    );

    if (!allFieldsValid) {
      setShowAllErrors(true);
    } else {
      setShowAllErrors(false);
      setCurrentStep('payment');
      setShippingMode('summary');
    }
  };

  const validateCardNumber = num => {
    const cleaned = (num || '').replace(/\s+/g, '');
    return /^\d{12,19}$/.test(cleaned);
  };

  const handleReviewOrder = () => {
    if (!validateCardNumber(cardNumber)) {
      setCardError('Enter a credit card number');
      return;
    }
    setCardError('');
    setCurrentStep('review');
  };

  const getCardLast4 = () => {
    const digits = (cardNumber || '').replace(/\D/g, '');
    if (!digits) return '8888';
    return digits.slice(-4);
  };

  const renderRadio = selected => (
    <View style={styles.radioOuter}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  const openStateModal = () => {
    handleBlur('stateVal');
    setIsStateModalVisible(true);
  };

  const closeStateModal = () => setIsStateModalVisible(false);

  const handleSelectState = stateName => {
    setStateVal(stateName);
    setTouchedFields(prev => ({ ...prev, stateVal: true }));
    setIsStateModalVisible(false);
  };
  const handleStatusUpdatesPress = () => {
    const newVal = !textUpdates;
    setTextUpdates(newVal);
    if (newVal) {
      setIsTextUpdatesModalVisible(true);
    }
  };

  const handleSmsBlur = () => {
    if (!validatePhone(smsPhone)) {
      setSmsPhoneError('Enter a valid phone number');
    } else {
      setSmsPhoneError('');
    }
  };

  const closeTextUpdatesModal = () => {
    if (textUpdates && !validatePhone(smsPhone)) {
      setSmsPhoneError('Enter a valid phone number');
      return;
    }
    setSmsPhoneError('');
    setIsTextUpdatesModalVisible(false);
  };
  const openGiftCardForm = () => {
    setShowGiftCardForm(true);
  };

  const handleGiftCardCancel = () => {
    setGiftCardNumber('');
    setGiftCardPin('');
    setShowGiftCardForm(false);
  };

  const handleGiftCardApply = () => {
    console.log('Apply gift card:', giftCardNumber, giftCardPin);
  };

  const fullName =
    firstName || lastName ? `${firstName} ${lastName}`.trim() : 'Full Name';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Header title='' isSearchIcon={false} isNotificationIcon={false} navigation={navigation} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {currentStep === 'shipping' && (
            <>
              <View style={styles.stepHeader}>
                <Text style={styles.stepHeaderText}>1. Shipping</Text>
              </View>
              <View style={styles.productsRow}>
                {PRODUCTS.map(item => (
                  <View key={item.id}>
                    <Image
                      source={{ uri: item.uri }}
                      style={styles.productImage}
                    />
                    <Text style={styles.productQty}>Qty {item.qty}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity>
                <Text style={[styles.detailsLink, { marginTop: 24 }]}>
                  Show Item Details
                </Text>
              </TouchableOpacity>
              <View style={styles.shippingCard}>
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => setShippingOption('home')}
                  activeOpacity={0.8}
                >
                  {renderRadio(shippingOption === 'home')}
                  <Text style={styles.optionText}>Ship to Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => setShippingOption('store')}
                  activeOpacity={0.8}
                >
                  {renderRadio(shippingOption === 'store')}
                  <Text style={styles.optionText}>Ship to Store</Text>
                </TouchableOpacity>
              </View>
              {shippingMode === 'summary' && (
                <>
                  <View style={styles.shippingSummaryCard}>
                    <View style={styles.shippingSummaryHeader}>
                      <Text style={styles.shippingSummaryName}>{fullName}</Text>
                      <View style={styles.defaultPill}>
                        <Text style={styles.defaultPillText}>Default</Text>
                      </View>
                    </View>

                    <Text style={styles.shippingSummaryLine}>
                      {streetAddress || '6502 Legacy Dr'}
                    </Text>
                    <Text style={styles.shippingSummaryLine}>
                      {city || 'Plano'},{' '}
                      {stateVal || 'TX'} {zipCode || '75024'}
                    </Text>
                    <Text style={styles.shippingSummaryLine}>
                      {phone || '(469) 793-4640'}
                    </Text>

                    <TouchableOpacity
                      onPress={() => setShippingMode('form')}
                      style={{ marginTop: 8 }}
                    >
                      <Text style={styles.shippingEditInline}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={{ marginTop: 16 }}
                    onPress={() => setShippingMode('form')}
                  >
                    <Text style={styles.addNewAddressText}>
                      + Add New Address
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.deliveryMethodTitle}>Delivery Method</Text>
                  {DELIVERY_OPTIONS.map(option => {
                    const selected = deliveryMethod === option.id;
                    return (
                      <TouchableOpacity
                        key={option.id}
                        style={styles.deliveryRow}
                        onPress={() => setDeliveryMethod(option.id)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.deliveryRadioOuter}>
                          {selected && <View style={styles.deliveryRadioInner} />}
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.deliveryTitleText}>
                            {option.title}
                          </Text>
                          <Text style={styles.deliverySubtitleText}>
                            {option.subtitle}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </>
              )}
              {shippingMode === 'form' && (
                <View style={[styles.addressSection, { marginTop: 16 }]}>
                  <Text style={styles.fieldLabel}>
                    United States or APO/FPO/DPO
                  </Text>
                  <TouchableOpacity style={styles.fieldBox} activeOpacity={0.7}>
                    <Text style={styles.fieldValue}>{country}</Text>
                    <Text style={styles.dropdownArrow}>▾</Text>
                  </TouchableOpacity>

                  <Text style={styles.fieldLabel}>First Name</Text>
                  <View
                    style={[
                      styles.fieldBox,
                      shouldShowError('firstName') && styles.fieldBoxError,
                    ]}
                  >
                    <TextInput
                      value={firstName}
                      onChangeText={setFirstName}
                      onBlur={() => handleBlur('firstName')}
                      style={styles.textInput}
                      placeholder="Enter a first name"
                      placeholderTextColor="#9a9a9a"
                    />
                  </View>
                  {shouldShowError('firstName') && (
                    <Text style={styles.errorText}>Enter a first name</Text>
                  )}
                  <Text style={styles.fieldLabel}>Last Name</Text>
                  <View
                    style={[
                      styles.fieldBox,
                      shouldShowError('lastName') && styles.fieldBoxError,
                    ]}
                  >
                    <TextInput
                      value={lastName}
                      onChangeText={setLastName}
                      onBlur={() => handleBlur('lastName')}
                      style={styles.textInput}
                      placeholder="Enter a last name"
                      placeholderTextColor="#9a9a9a"
                    />
                  </View>
                  {shouldShowError('lastName') && (
                    <Text style={styles.errorText}>Enter a last name</Text>
                  )}
                  <View style={{ marginTop: 18 }}>
                    <View style={styles.fieldBox}>
                      <TextInput
                        value={company}
                        onChangeText={setCompany}
                        style={[styles.textInput, styles.optionalInput]}
                        placeholder="Company (Optional)"
                        placeholderTextColor="#9a9a9a"
                      />
                    </View>
                  </View>
                  <Text style={styles.fieldLabel}>Street Address</Text>
                  <View
                    style={[
                      styles.fieldBox,
                      shouldShowError('streetAddress') &&
                        styles.fieldBoxError,
                    ]}
                  >
                    <TextInput
                      value={streetAddress}
                      onChangeText={setStreetAddress}
                      onBlur={() => handleBlur('streetAddress')}
                      style={styles.textInput}
                      placeholder="Enter a valid street address"
                      placeholderTextColor="#9a9a9a"
                    />
                  </View>
                  {shouldShowError('streetAddress') && (
                    <Text style={styles.errorText}>
                      Enter a valid street address
                    </Text>
                  )}
                  <Text style={styles.fieldLabelNoTop}> </Text>
                  <View style={styles.fieldBox}>
                    <TextInput
                      value={aptSuite}
                      onChangeText={setAptSuite}
                      style={[styles.textInput, styles.optionalInput]}
                      placeholder="Apt, Suite, Floor (Optional)"
                      placeholderTextColor="#9a9a9a"
                    />
                  </View>
                  <View style={styles.zipStateRow}>
                    <View
                      style={[
                        styles.fieldBox,
                        styles.zipBox,
                        shouldShowError('zipCode') && styles.fieldBoxError,
                      ]}
                    >
                      <TextInput
                        value={zipCode}
                        onChangeText={setZipCode}
                        onBlur={() => handleBlur('zipCode')}
                        style={styles.textInput}
                        placeholder="98456"
                        placeholderTextColor="#9a9a9a"
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={styles.zipStateRight}>
                      <Text style={styles.inlineLabel}>State</Text>
                      <TouchableOpacity
                        style={[
                          styles.fieldBox,
                          styles.stateBox,
                          shouldShowError('stateVal') && styles.fieldBoxError,
                        ]}
                        activeOpacity={0.7}
                        onPress={openStateModal}
                      >
                        <Text
                          style={[
                            styles.fieldValue,
                            stateVal === '' && styles.placeholderText,
                          ]}
                        >
                          {stateVal || 'Select...'}
                        </Text>
                        <Text style={styles.dropdownArrow}>▾</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.zipStateErrorRow}>
                    {shouldShowError('zipCode') && (
                      <Text style={[styles.errorText, styles.zipError]}>
                        Enter a valid ZIP code
                      </Text>
                    )}
                    {shouldShowError('stateVal') && (
                      <Text style={[styles.errorText, styles.stateError]}>
                        Select a state
                      </Text>
                    )}
                  </View>

                  <Text style={styles.fieldLabel}>City</Text>
                  <View
                    style={[
                      styles.fieldBox,
                      shouldShowError('city') && styles.fieldBoxError,
                    ]}
                  >
                    <TextInput
                      value={city}
                      onChangeText={setCity}
                      onBlur={() => handleBlur('city')}
                      style={styles.textInput}
                      placeholder="Enter a city"
                      placeholderTextColor="#9a9a9a"
                    />
                  </View>
                  {shouldShowError('city') && (
                    <Text style={styles.errorText}>Enter a city</Text>
                  )}

                  <Text style={styles.fieldLabel}>Phone Number</Text>
                  <View
                    style={[
                      styles.fieldBox,
                      styles.phoneBox,
                      shouldShowError('phone') && styles.fieldBoxError,
                    ]}
                  >
                    <TextInput
                      value={phone}
                      onChangeText={setPhone}
                      onBlur={() => handleBlur('phone')}
                      style={styles.textInput}
                      placeholder="(469) 793-4640"
                      placeholderTextColor="#9a9a9a"
                      keyboardType="phone-pad"
                    />
                    <View style={styles.helpIcon}>
                      <Text style={styles.helpIconText}>?</Text>
                    </View>
                  </View>
                  {shouldShowError('phone') && (
                    <Text style={styles.errorText}>
                      Enter a valid phone number
                    </Text>
                  )}

                  <TouchableOpacity
                    style={styles.checkboxRow}
                    onPress={() => setIsDefaultAddress(prev => !prev)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.checkboxBox,
                        isDefaultAddress && styles.checkboxBoxChecked,
                      ]}
                    >
                      {isDefaultAddress && <View style={styles.checkboxInner} />}
                    </View>
                    <Text style={styles.checkboxLabel}>
                      Set as default address
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={[styles.continueButton, { marginTop: 24 }]}
                activeOpacity={0.9}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>

              <View style={styles.stepDisabled}>
                <Text style={styles.stepDisabledText}>2. Payment</Text>
              </View>
              <View style={styles.stepDisabled}>
                <Text style={styles.stepDisabledText}>3. Review</Text>
              </View>
            </>
          )}

          {currentStep === 'payment' && (
            <>
              <View style={styles.summaryRow}>
                <View style={styles.summaryBox}>
                  <Text style={styles.summaryText}>1. Shipping</Text>
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setShippingMode('summary');
                    setCurrentStep('shipping');
                  }}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.stepHeader, { marginTop: 12 }]}>
                <Text style={styles.stepHeaderText}>2. Payment</Text>
              </View>

              <View style={styles.paymentSection}>
                <View style={styles.giftRow}>
                  <View style={styles.giftIcon} />
                  <Text style={styles.giftText}>Gift Cards</Text>
                  <TouchableOpacity
                    style={{ marginLeft: 'auto' }}
                    onPress={openGiftCardForm}
                  >
                    <Text style={styles.addGiftText}>Add a Gift Card</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {showGiftCardForm && (
                  <View style={styles.giftFormContainer}>
                    <Text style={styles.giftFormTitle}>Add a New Gift Card</Text>

                    <Text style={styles.giftFieldLabel}>Gift Card Number</Text>
                    <View style={styles.giftInputBox}>
                      <TextInput
                        value={giftCardNumber}
                        onChangeText={setGiftCardNumber}
                        style={styles.textInput}
                        placeholder=""
                        placeholderTextColor="#9a9a9a"
                        keyboardType="numeric"
                      />
                    </View>

                    <View style={[styles.giftInputBox, { marginTop: 12 }]}>
                      <TextInput
                        value={giftCardPin}
                        onChangeText={setGiftCardPin}
                        style={styles.giftPinInput}
                        placeholder="PIN"
                        placeholderTextColor="#9a9a9a"
                        secureTextEntry
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.giftCancelBtn}
                      onPress={handleGiftCardCancel}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.giftCancelText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.giftApplyBtn}
                      onPress={handleGiftCardApply}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.giftApplyText}>Apply</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />
                  </View>
                )}

                <Text style={styles.paymentInfoTitle}>Payment Information</Text>

                <View style={styles.paypalCard}>
                  <Text style={styles.paypalTitle}>PayPal</Text>
                  <Text style={styles.paypalText}>
                    Have confidence in your checkout. Join PayPal for fast,
                    flexible, and secure payments—just a few clicks away.
                  </Text>
                  <Text style={styles.paypalFooter}>
                    Powered by Rokt · Privacy Policy
                  </Text>
                </View>

                <View style={styles.paymentMethodCard}>
                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => setPaymentMethod('card')}
                    activeOpacity={0.8}
                  >
                    {renderRadio(paymentMethod === 'card')}
                    <Text style={styles.optionText}>Credit Card</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => setPaymentMethod('paypal')}
                    activeOpacity={0.8}
                  >
                    {renderRadio(paymentMethod === 'paypal')}
                    <Text style={styles.optionText}>PayPal</Text>
                  </TouchableOpacity>
                </View>

                {paymentMethod === 'card' ? (
                  <>
                    <View style={styles.cardLogosRow}>
                      <View
                        style={[styles.cardLogo, { backgroundColor: '#000' }]}
                      />
                      <View
                        style={[
                          styles.cardLogo,
                          { backgroundColor: '#c4001d' },
                        ]}
                      />
                      <View
                        style={[
                          styles.cardLogo,
                          { backgroundColor: '#1a1f71' },
                        ]}
                      />
                      <View
                        style={[
                          styles.cardLogo,
                          { backgroundColor: '#ff5f00' },
                        ]}
                      />
                      <View
                        style={[
                          styles.cardLogo,
                          { backgroundColor: '#f58220' },
                        ]}
                      />
                    </View>

                    <Text style={styles.fieldLabel}>
                      Debit/Credit Card Number
                    </Text>
                    <View
                      style={[
                        styles.fieldBox,
                        cardError && styles.fieldBoxError,
                      ]}
                    >
                      <TextInput
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        style={styles.textInput}
                        placeholder="Debit/Credit Card Number"
                        placeholderTextColor="#9a9a9a"
                        keyboardType="numeric"
                      />
                    </View>
                    {cardError ? (
                      <Text style={styles.errorText}>{cardError}</Text>
                    ) : null}

                    <View style={styles.paymentCheckboxGroup}>
                      <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={() => setMarkPreferred(p => !p)}
                      >
                        <View
                          style={[
                            styles.checkboxBox,
                            markPreferred && styles.checkboxBoxChecked,
                          ]}
                        >
                          {markPreferred && <View style={styles.checkboxInner} />}
                        </View>
                        <Text style={styles.checkboxLabel}>
                          Mark this card my preferred payment
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={() => setSaveCard(p => !p)}
                      >
                        <View
                          style={[
                            styles.checkboxBox,
                            saveCard && styles.checkboxBoxChecked,
                          ]}
                        >
                          {saveCard && <View style={styles.checkboxInner} />}
                        </View>
                        <Text style={styles.checkboxLabel}>
                          Save this card to my account
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={() => setBillingSame(p => !p)}
                      >
                        <View
                          style={[
                            styles.checkboxBox,
                            billingSame && styles.checkboxBoxChecked,
                          ]}
                        >
                          {billingSame && <View style={styles.checkboxInner} />}
                        </View>
                        <Text style={styles.checkboxLabel}>
                          My shipping and billing address is the same
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.addressSummary}>
                      <Text style={styles.addressSummaryName}>{fullName}</Text>
                      <Text style={styles.addressSummaryText}>
                        {streetAddress || 'Street address'}
                      </Text>
                      <Text style={styles.addressSummaryText}>
                        {city || 'City'}
                        {city ? ', ' : ' '}
                        {stateVal || 'State'} {zipCode || 'ZIP'}
                      </Text>
                      <Text style={styles.addressSummaryText}>
                        {phone || '(Phone number)'}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.reviewButton}
                      activeOpacity={0.9}
                      onPress={handleReviewOrder}
                    >
                      <Text style={styles.reviewButtonText}>Review Order</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.paypalMainButton}
                      activeOpacity={0.9}
                    >
                      <Text style={styles.paypalMainButtonText}>PayPal</Text>
                    </TouchableOpacity>
                    <Text style={styles.paypalMainText}>
                      Pay with PayPal. You'll return back to JCPenney to review
                      your order before purchase.
                    </Text>
                  </>
                )}
              </View>

              <View style={styles.stepDisabled}>
                <Text style={styles.stepDisabledText}>3. Review</Text>
              </View>
            </>
          )}
          {currentStep === 'review' && (
            <>
              <Text style={styles.reviewTitle}>Review Order</Text>

              <View style={styles.reviewBar}>
                <Text style={styles.reviewBarText}>Shipping</Text>
                <TouchableOpacity
                  style={styles.reviewBarEdit}
                  onPress={() => {
                    setShippingMode('summary');
                    setCurrentStep('shipping');
                  }}
                >
                  <Text style={styles.reviewBarEditText}>Edit</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity>
                <Text style={styles.detailsLink}>Show Item Details</Text>
              </TouchableOpacity>

              <View style={styles.reviewShippingBlock}>
                <Text style={styles.shippingName}>{fullName}</Text>
                <Text style={styles.shippingAddressLine}>
                  {streetAddress || '6502 Legacy Dr'}
                </Text>
                <Text style={styles.shippingAddressLine}>
                  {city || 'Plano'},{' '}
                  {stateVal || 'TX'} {zipCode || '75024'}
                </Text>
                <Text style={styles.shippingAddressLine}>
                  {phone || '(469) 793-4640'}
                </Text>

                <Text style={styles.deliveryTitle}>
                  Delivered In 1 Business Day: $29.95
                </Text>
                <Text style={styles.deliveryDate}>Tuesday, Dec 9th</Text>

                <View style={styles.reviewProductRow}>
                  <Image
                    source={{ uri: PRODUCTS[0].uri }}
                    style={styles.reviewProductImage}
                  />
                  <Text style={styles.reviewQtyText}>Qty 1</Text>
                </View>
              </View>

              <View style={[styles.reviewBar, { marginTop: 24 }]}>
                <Text style={styles.reviewBarText}>Payment</Text>
                <TouchableOpacity
                  style={styles.reviewBarEdit}
                  onPress={() => setCurrentStep('payment')}
                >
                  <Text style={styles.reviewBarEditText}>Edit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.reviewPaymentBlock}>
                <Text style={styles.paymentMethodTitle}>Payment Method</Text>
                <View style={styles.paymentMethodRow}>
                  <View style={styles.paymentCardIcon} />
                  <Text style={styles.paymentMethodText}>
                    JCP Credit Card  {getCardLast4()}
                  </Text>
                  <Text style={styles.paymentMethodAmount}>$75.00</Text>
                </View>

                <Text style={styles.billingTitle}>Billing Address</Text>
                <Text style={styles.billingLine}>{fullName}</Text>
                <Text style={styles.billingLine}>
                  {streetAddress || '6502 Legacy Dr'}
                </Text>
                <Text style={styles.billingLine}>
                  {city || 'Plano'},{' '}
                  {stateVal || 'TX'} {zipCode || '75024'}
                </Text>
                <Text style={styles.billingLine}>
                  {phone || '(469) 793-4640'}
                </Text>

                <Text style={styles.billingTitle}>Contact Information</Text>
                <Text style={styles.billingLine}>ashish.c4u@gmail.com</Text>
                <Text style={styles.billingLine}>
                  {phone || '(469) 793-4640'}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.statusUpdatesRow}
                onPress={handleStatusUpdatesPress}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    textUpdates && styles.checkboxBoxChecked,
                  ]}
                >
                  {textUpdates && <View style={styles.checkboxInner} />}
                </View>
                <Text style={styles.statusUpdatesText}>
                  Text me order status updates
                </Text>
              </TouchableOpacity>

              <View style={[styles.paymentSection, { marginTop: 16 }]}>
                <View style={styles.giftRow}>
                  <View style={styles.giftIcon} />
                  <Text style={styles.giftText}>Gift Cards</Text>
                  <TouchableOpacity
                    style={{ marginLeft: 'auto' }}
                    onPress={() => {
                      setCurrentStep('payment');
                      openGiftCardForm();
                    }}
                  >
                    <Text style={styles.addGiftText}>Add a Gift Card</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.orderSummaryCard}>
                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Subtotal:</Text>
                  <Text style={styles.orderValue}>$55.50</Text>
                </View>

                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>MYPEOPLE:</Text>
                  <Text style={styles.orderLink}>Remove</Text>
                  <Text style={styles.orderNegative}>- $16.65</Text>
                </View>

                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Rewards:</Text>
                  <Text style={styles.orderLink}>Apply</Text>
                </View>

                <View style={[styles.orderRow, { marginTop: 8 }]}>
                  <Text style={[styles.orderLabel, styles.orderLabelStrong]}>
                    Subtotal After Discounts:
                  </Text>
                  <Text style={styles.orderValue}>$38.85</Text>
                </View>

                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>1-Day Delivery:</Text>
                  <Text style={styles.orderValue}>$29.95</Text>
                </View>

                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Tax:</Text>
                  <Text style={styles.orderValue}>$5.68</Text>
                </View>

                <View style={styles.orderRow}>
                  <Text style={styles.orderLabel}>Round Up For Charity:</Text>
                  <Text style={styles.orderValue}>$0.52</Text>
                </View>

                <View style={[styles.orderRow, styles.orderTotalRow]}>
                  <Text style={[styles.orderLabel, styles.orderTotalLabel]}>
                    Total:
                  </Text>
                  <Text style={styles.orderTotalValue}>$75.00</Text>
                </View>

                <View style={styles.orderSummaryDivider} />

                <Text style={styles.totalSavingsText}>
                  Total Savings:{' '}
                  <Text style={styles.totalSavingsAmount}>$35.15</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={styles.fastCheckoutCard}
                onPress={() => setFastCheckout(v => !v)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.checkboxBox,
                    fastCheckout && styles.checkboxBoxChecked,
                  ]}
                >
                  {fastCheckout && <View style={styles.checkboxInner} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.fastCheckoutTitle}>
                    NEW! Checkout Faster Next Time
                  </Text>
                  <Text style={styles.fastCheckoutText}>
                    Default to these shipping & payment options on your next
                    order
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.placeOrderButton}
                activeOpacity={0.9}
                onPress={() => {
                  console.log('Place Order clicked');
                }}
              >
                <Text style={styles.placeOrderText}>Place Order</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>

        <Modal
          visible={isStateModalVisible}
          transparent
          animationType="fade"
          onRequestClose={closeStateModal}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalHeaderText}>Select...</Text>
                <View style={styles.modalHeaderRadioOuter} />
              </View>

              <FlatList
                data={US_STATES}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const selected = stateVal === item;
                  return (
                    <TouchableOpacity
                      style={styles.modalRow}
                      onPress={() => handleSelectState(item)}
                    >
                      <Text style={styles.modalRowText}>{item}</Text>
                      <View style={styles.modalRadioOuter}>
                        {selected && <View style={styles.modalRadioInner} />}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </Modal>

        <Modal
          visible={isTextUpdatesModalVisible}
          transparent
          animationType="fade"
          onRequestClose={closeTextUpdatesModal}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.textUpdatesCard}>
              <View style={styles.textUpdatesHeader}>
                <View
                  style={[
                    styles.checkboxBox,
                    textUpdates && styles.checkboxBoxChecked,
                  ]}
                >
                  {textUpdates && <View style={styles.checkboxInner} />}
                </View>
                <Text style={styles.textUpdatesTitle}>
                  Text me order status updates
                </Text>
              </View>

              <Text style={styles.textUpdatesBody}>
                Receive text notifications every time your order status updates.
                Standard rates may apply.
              </Text>

              <TouchableOpacity
                style={styles.textDetailsRow}
                onPress={() => setTextDetailsExpanded(v => !v)}
              >
                <Text style={styles.textDetailsLink}>Show Details</Text>
                <Text style={styles.textDetailsArrow}>
                  {textDetailsExpanded ? '▴' : '▾'}
                </Text>
              </TouchableOpacity>

              {textDetailsExpanded && (
                <Text style={styles.textDetailsText}>
                  By providing my mobile number, I agree to receive autodialed
                  order status text alerts from JCPenney (37428) at that number
                  about this order, including order and shipment confirmations,
                  order cancellations, and ready for in-store pick up alerts.
                  Message and data rates may apply. View terms and conditions
                  and privacy notice. For help, reply HELP to 37428. To cancel,
                  reply STOP to 37428. Email order status updates will also be
                  sent.
                </Text>
              )}

              <View style={{ marginTop: 14 }}>
                <Text style={styles.textModalPhoneLabel}>Mobile Phone</Text>
                <View
                  style={[
                    styles.smsFieldBox,
                    smsPhoneError && styles.smsFieldBoxError,
                  ]}
                >
                  <TextInput
                    value={smsPhone}
                    onChangeText={setSmsPhone}
                    onBlur={handleSmsBlur}
                    style={styles.smsPhoneInput}
                    placeholder="Mobile Phone"
                    placeholderTextColor="#9a9a9a"
                    keyboardType="phone-pad"
                  />
                </View>
                {smsPhoneError ? (
                  <Text style={styles.smsErrorText}>{smsPhoneError}</Text>
                ) : null}
              </View>

              <View style={styles.textModalFooter}>
                <TouchableOpacity onPress={closeTextUpdatesModal}>
                  <Text style={styles.textModalDoneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;



