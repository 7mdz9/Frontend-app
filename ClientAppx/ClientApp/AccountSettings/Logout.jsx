import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Navigate back to the login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Icon name="log-out-outline" size={80} color="#4CAF50" style={styles.icon} />
      <Text style={styles.header}>Logout</Text>
      <Text style={styles.text}></Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Logout;
