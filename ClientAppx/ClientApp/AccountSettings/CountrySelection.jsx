import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const countries = [
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'USA', flag: '🇺🇸' },
  { name: 'UK', flag: '🇬🇧' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Australia', flag: '🇦🇺' },
];

const CountrySelection = ({ navigation, route }) => {
  const [selectedCountry, setSelectedCountry] = useState(route.params?.currentCountry || 'UAE');

  const handleSave = () => {
    navigation.navigate('AccountScreen', { selectedCountry });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Country</Text>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.countryItem,
              item.name === selectedCountry && styles.activeCountry,
            ]}
            onPress={() => setSelectedCountry(item.name)}
          >
            <Text style={styles.countryText}>
              {item.flag} {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F1E1', padding: 20, paddingTop: 80 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#333333', marginBottom: 20 },
  countryItem: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeCountry: { backgroundColor: '#D9C9B2' },
  countryText: { fontSize: 16, color: '#333333' },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#A67552',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' },
});

export default CountrySelection;
