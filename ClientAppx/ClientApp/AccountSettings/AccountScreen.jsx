import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState({ name: 'UAE', flag: '🇦🇪' });

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/Saleh.png')}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Saleh Jasim</Text>
        <Text style={styles.userCountry}>
          {selectedCountry.flag} {selectedCountry.name}
        </Text>
      </View>

      {/* List of Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('OrderHistory')}
        >
          <Icon name="time-outline" size={24} color="#A67552" />
          <Text style={styles.optionText}>Your Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Offers')}
        >
          <Icon name="gift-outline" size={24} color="#A67552" />
          <Text style={styles.optionText}>Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Icon name="notifications-outline" size={24} color="#A67552" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('GetHelp')}
        >
          <Icon name="help-circle-outline" size={24} color="#A67552" />
          <Text style={styles.optionText}>Get Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Icon name="information-circle-outline" size={24} color="#A67552" />
          <Text style={styles.optionText}>About App</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="settings-outline" size={24} color="#A67552" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F1E1', padding: 20, paddingTop: 120 },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#A67552',
  },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#333333' },
  userCountry: { fontSize: 16, color: '#666666' },
  optionsContainer: { marginTop: 20 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  optionText: { marginLeft: 10, fontSize: 16, color: '#333333' },
});

export default AccountScreen;
