import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {

    // Simulating fetched data
    const ordersData = [
      {
        id: 1,
        services: ['Service 1', 'Service 2'],
        user: 123,
        crew: 456,
        date_of_creation: '2023-06-01T12:00:00Z',
        status: 'completed',
        total_check: 100,
        total_high: 150,
        total_low: 50,
        total_price: 120
      },
      {
        id: 2,
        services: ['Service 3'],
        user: 789,
        crew: 101,
        date_of_creation: '2023-06-05T14:00:00Z',
        status: 'completed',
        total_check: 200,
        total_high: 250,
        total_low: 150,
        total_price: 220
      },
    ];

    const completedOrders = ordersData.filter(order => order.status === 'completed');
    setOrders(completedOrders);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>Order ID: {item.id}</Text>
        <Text>Service IDs: {item.services.join(', ')}</Text>
        <Text>User ID: {item.user}</Text>
        <Text>Crew ID: {item.crew}</Text>
        <Text>Date of Creation: {new Date(item.date_of_creation).toLocaleString()}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Total Check: {item.total_check}</Text>
        <Text>Total High: {item.total_high}</Text>
        <Text>Total Low: {item.total_low}</Text>
        <Text>Total Price: {item.total_price}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="time-outline" size={80} color="#4CAF50" style={styles.icon} />
          <Text style={styles.header}>Order History</Text>
          <Text style={styles.text}>View your past orders here.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default OrderHistory;
