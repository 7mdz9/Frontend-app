import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Platform, LayoutAnimation, UIManager } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, SIZES } from '../shared/theme';
import PropTypes from 'prop-types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CheckoutPage = ({ route }) => {
  const { service, cartItems } = route.params || {};
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    buildingType: 'Apartment',
    buildingName: '',
    houseNumber: '',
    floor: '',
    street: '',
    additionalDirections: '',
    phone: '',
    name: '',
    addressLabel: '',
    latitude: 25.276987,
    longitude: 55.296249,
  });

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setFormData(prev => ({
        ...prev,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    };
    getCurrentLocation();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setFormData({ ...formData, latitude, longitude });
  };

  const handleCheckout = () => {
    const requiredFields = ['buildingName', 'houseNumber', 'floor', 'street', 'phone', 'name'];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        Alert.alert('Error', 'Please fill out all required fields.');
        return;
      }
    }
    navigation.navigate('Payment', { service, cartItems, formData });
  };

  const renderBuildingTypeButton = (type, icon) => (
    <TouchableOpacity
      style={[styles.buildingTypeButton, formData.buildingType === type && styles.buildingTypeButtonSelected]}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        handleInputChange('buildingType', type);
      }}
      accessible
      accessibilityLabel={`Select building type ${type}`}
    >
      <Ionicons name={icon} size={18} color={formData.buildingType === type ? '#fff' : '#333'} style={{ marginRight: 5 }} />
      <Text style={[styles.buildingTypeButtonText, formData.buildingType === type && styles.buildingTypeButtonTextSelected]}>
        {type}
      </Text>
    </TouchableOpacity>
  );

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem} accessible accessibilityLabel={`Cart item ${item.name}`}>
      <Text style={styles.cartItemText}>{item.name} x {item.quantity}</Text>
      <Text style={styles.cartItemText}>${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  const totalPrice = cartItems ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) : service ? service.price : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <KeyboardAwareScrollView
        style={{ backgroundColor: COLORS.background }}
        contentContainerStyle={styles.scrollContainer}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} accessible accessibilityLabel="Go back">
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Checkout</Text>
          <View style={{ width: 24 }} />
        </View>
        {cartItems ? (
          <View style={styles.cartSummary} accessible accessibilityLabel="Order summary">
            <Text style={styles.sectionHeader}>Order Summary</Text>
            {cartItems.map(renderCartItem)}
            <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
          </View>
        ) : service && (
          <View style={styles.serviceContainer} accessible accessibilityLabel="Service details">
            <Text style={styles.serviceTitle}>{service.name}</Text>
            <Text style={styles.servicePrice}>${service.price}</Text>
            {service.description ? <Text style={styles.serviceDescription}>{service.description}</Text> : null}
          </View>
        )}
        <Text style={styles.sectionHeader}>Edit Address</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: formData.latitude,
            longitude: formData.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
          accessible
          accessibilityLabel="Map view, tap to select location"
        >
          <Marker coordinate={{ latitude: formData.latitude, longitude: formData.longitude }} title="Selected Location" />
        </MapView>
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinates}>Lat: {formData.latitude.toFixed(5)}</Text>
          <Text style={styles.coordinates}>Lng: {formData.longitude.toFixed(5)}</Text>
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.buildingTypeContainer}>
            {renderBuildingTypeButton('Apartment', 'home-outline')}
            {renderBuildingTypeButton('House', 'business-outline')}
            {renderBuildingTypeButton('Office', 'briefcase-outline')}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Building Name"
            value={formData.buildingName}
            onChangeText={(value) => handleInputChange('buildingName', value)}
            returnKeyType="next"
            accessible
            accessibilityLabel="Building Name input"
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Apt. no."
              value={formData.houseNumber}
              onChangeText={(value) => handleInputChange('houseNumber', value)}
              returnKeyType="next"
              accessible
              accessibilityLabel="Apartment number input"
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Floor"
              value={formData.floor}
              onChangeText={(value) => handleInputChange('floor', value)}
              returnKeyType="next"
              accessible
              accessibilityLabel="Floor input"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Street"
            value={formData.street}
            onChangeText={(value) => handleInputChange('street', value)}
            returnKeyType="next"
            accessible
            accessibilityLabel="Street input"
          />
          <TextInput
            style={styles.input}
            placeholder="Additional directions (optional)"
            value={formData.additionalDirections}
            onChangeText={(value) => handleInputChange('additionalDirections', value)}
            returnKeyType="next"
            accessible
            accessibilityLabel="Additional directions input"
          />
          <View style={styles.inputIconContainer}>
            <Ionicons name="call-outline" size={20} color="#333" style={{ marginRight: 5 }} />
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0, marginLeft: 0, borderWidth: 0 }]}
              placeholder="Phone"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              returnKeyType="next"
              accessible
              accessibilityLabel="Phone input"
            />
          </View>
          <View style={styles.inputIconContainer}>
            <Ionicons name="person-outline" size={20} color="#333" style={{ marginRight: 5 }} />
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0, marginLeft: 0, borderWidth: 0 }]}
              placeholder="Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              returnKeyType="next"
              accessible
              accessibilityLabel="Name input"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Address label (optional)"
            value={formData.addressLabel}
            onChangeText={(value) => handleInputChange('addressLabel', value)}
            returnKeyType="done"
            accessible
            accessibilityLabel="Address label input"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCheckout} accessible accessibilityLabel="Save address and continue">
          <Ionicons name="save-outline" size={20} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.buttonText}>Save Address & Continue</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

CheckoutPage.propTypes = {
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  scrollContainer: { padding: 15, paddingBottom: 30, backgroundColor: COLORS.background },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark, flex: 1, textAlign: 'center' },
  sectionHeader: { fontSize: 20, fontWeight: '600', marginVertical: 10, color: COLORS.textDark },
  totalText: { fontSize: 18, fontWeight: '600', textAlign: 'right', marginTop: 10 },
  cartSummary: { backgroundColor: COLORS.card, padding: 15, borderRadius: SIZES.radius, marginBottom: 15 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  cartItemText: { fontSize: 16, color: '#333' },
  serviceContainer: { marginBottom: 20, alignItems: 'center', backgroundColor: COLORS.card, padding: 15, borderRadius: SIZES.radius, elevation: 2 },
  serviceTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark },
  servicePrice: { fontSize: 20, color: COLORS.primary, marginVertical: 5 },
  serviceDescription: { fontSize: 16, color: '#555', textAlign: 'center' },
  map: { width: '100%', height: 200, borderRadius: SIZES.radius, marginBottom: 10 },
  coordinatesContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  coordinates: { fontSize: 14, color: COLORS.textDark },
  inputGroup: { marginVertical: 10 },
  buildingTypeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  buildingTypeButton: { flexDirection: 'row', alignItems: 'center', padding: 8, borderRadius: 5, backgroundColor: '#f0f0f0', flex: 1, marginHorizontal: 5 },
  buildingTypeButtonSelected: { backgroundColor: COLORS.primary },
  buildingTypeButtonText: { fontSize: 16, color: '#333' },
  buildingTypeButtonTextSelected: { color: '#fff' },
  input: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 5, padding: 10, marginBottom: 10, fontSize: 16, color: COLORS.textDark },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  inputIconContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: COLORS.card },
  button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default CheckoutPage;
  