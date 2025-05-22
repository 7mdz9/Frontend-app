import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const offers = [
  {
    id: '1',
    title: '50% Off on First Order',
    description: 'Enjoy a flat 50% discount on your first order!',
    expiry: 'Valid until 31st Dec 2024',
  },
  {
    id: '2',
    title: 'Free Delivery',
    description: 'Get free delivery on orders above $50.',
    expiry: 'Valid until 15th Jan 2025',
  },
  {
    id: '3',
    title: 'Holiday Special',
    description: 'Buy 1 Get 1 Free on select items.',
    expiry: 'Valid until 25th Dec 2024',
  },
];

const Offers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Offers</Text>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.offerCard}>
            <Text style={styles.offerTitle}>{item.title}</Text>
            <Text style={styles.offerDescription}>{item.description}</Text>
            <Text style={styles.offerExpiry}>{item.expiry}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F1E1', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#333333', marginBottom: 20 },
  offerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  offerTitle: { fontSize: 18, fontWeight: 'bold', color: '#A67552' },
  offerDescription: { fontSize: 14, color: '#333333', marginTop: 5 },
  offerExpiry: { fontSize: 12, color: '#666666', marginTop: 10 },
});

export default Offers;
