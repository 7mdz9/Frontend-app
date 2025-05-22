import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../shared/theme';
import PropTypes from 'prop-types';

const StripePaymentScreen = () => {
  const { confirmPayment } = useConfirmPayment();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState(null);

  const handlePayPress = async () => {
    if (!email || !cardDetails?.complete) {
      Alert.alert('Please fill out all fields');
      return;
    }
    const billingDetails = { email };
    const clientSecret = await fetchPaymentIntentClientSecret();
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      type: 'Card',
      billingDetails,
    });
    if (error) {
      Alert.alert(`Payment confirmation error: ${error.message}`);
    } else if (paymentIntent) {
      Alert.alert('Payment successful');
      navigation.goBack();
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    return 'dummy_secret_from_server';
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: COLORS.background }]}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} accessible accessibilityLabel="Go back">
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Payment</Text>
          <View style={{ width: 24 }} />
        </View>
        <Text style={styles.header}>Payment Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          accessible
          accessibilityLabel="Enter your email"
        />
        <Text style={styles.label}>Card Information</Text>
        <CardField
          postalCodeEnabled={true}
          placeholders={{ number: '1234 1234 1234 1234', expiration: 'MM/YY', cvc: 'CVC', postalCode: 'ZIP' }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => setCardDetails(cardDetails)}
          accessibilityLabel="Enter your card details"
        />
        <TouchableOpacity style={styles.button} onPress={handlePayPress} accessible accessibilityLabel="Pay now">
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

StripePaymentScreen.propTypes = {};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 15 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textDark, flex: 1, textAlign: 'center' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: COLORS.textDark },
  input: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: SIZES.radius, padding: 10, marginBottom: 15, fontSize: 16, color: COLORS.textDark },
  label: { fontSize: 18, marginBottom: 10, color: COLORS.textDark },
  card: { backgroundColor: COLORS.card, textColor: '#000', borderRadius: SIZES.radius },
  cardContainer: { height: 50, marginVertical: 10 },
  button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: SIZES.radius, alignItems: 'center', marginVertical: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default StripePaymentScreen;
