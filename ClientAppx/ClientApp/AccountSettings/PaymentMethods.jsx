// PaymentMethods.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentMethods = () => {
  return (
    <View style={styles.container}>
      <Icon name="card-outline" size={80} color="#4CAF50" style={styles.icon} />
      <Text style={styles.header}>Payment Methods</Text>
      <Text style={styles.text}>Manage your payment methods here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  icon: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default PaymentMethods;
