import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', onPress: () => console.log('User logged out') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.settingItem}>
        <Icon name="notifications-outline" size={24} color="#A67552" />
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#D9C9B2', true: '#A67552' }}
        />
      </View>

      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navigation.navigate('CountrySelection')}
      >
        <Icon name="flag-outline" size={24} color="#A67552" />
        <Text style={styles.settingText}>Country</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => console.log('Language selection to be implemented')}
      >
        <Icon name="globe-outline" size={24} color="#A67552" />
        <Text style={styles.settingText}>Language</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="#A67552" />
        <Text style={styles.settingText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F1E1', padding: 20, paddingTop: 60 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#333333', marginBottom: 20 },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  settingText: { marginLeft: 10, fontSize: 16, color: '#333333', flex: 1 },
});

export default Settings;
