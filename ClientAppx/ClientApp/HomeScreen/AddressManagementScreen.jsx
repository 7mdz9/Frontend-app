import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../shared/theme';
import PropTypes from 'prop-types';

function AddressManagementScreen() {
  const navigation = useNavigation();
  const [newAddress, setNewAddress] = useState('');

  const handleAddNewAddress = () => {
    if (!newAddress.trim()) {
      Alert.alert('Please enter an address');
      return;
    }
    Alert.alert('Address Added', `New address: ${newAddress}`);
    setNewAddress('');
  };

  return (
    <View style={styles.container} accessible accessibilityLabel="Address Management Screen">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessible accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.title}>Address Management</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.infoText}>Manage your saved addresses.</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new address"
          value={newAddress}
          onChangeText={setNewAddress}
          accessible
          accessibilityLabel="Enter new address"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddNewAddress} accessible accessibilityLabel="Add new address">
          <Text style={styles.buttonText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

AddressManagementScreen.propTypes = {};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SIZES.screenPadding },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { flex: 1, textAlign: 'center', fontSize: SIZES.fontTitle, fontWeight: 'bold', color: COLORS.textDark },
  content: { marginTop: 20 },
  infoText: { fontSize: SIZES.fontRegular, color: COLORS.textDark, marginBottom: 10 },
  input: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: SIZES.radius, padding: 10, marginBottom: 20, fontSize: 16, color: COLORS.textDark },
  button: { backgroundColor: COLORS.primary, padding: 15, borderRadius: SIZES.radius, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default AddressManagementScreen;
