import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchServices } from '../Data/fetchServices';
import { COLORS } from '../shared/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../CartContext';
import PropTypes from 'prop-types';

const ServicesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { companyName, query } = route.params || {};
  const { cartItems, addToCart, updateQuantity } = useCart();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['services', { query, companyName }],
    queryFn: ({ pageParam = 1 }) => fetchServices(pageParam, 20, query || '', companyName || ''),
    getNextPageParam: (lastPage, allPages) => lastPage.length === 20 ? allPages.length + 1 : undefined
  });

  const services = data ? data.pages.flat() : [];

  const renderService = ({ item }) => {
    const cartItem = cartItems.find(ci => ci.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    return (
      <View style={styles.serviceItem} accessible accessibilityLabel={`Service ${item.name}`}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} accessible accessibilityLabel={`${item.name} image`} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.company}>{item.company}</Text>
          <View style={styles.actions}>
            {quantity === 0 ? (
              <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)} accessible accessibilityLabel={`Add ${item.name} to cart`}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, quantity - 1)} accessible accessibilityLabel={`Decrease quantity of ${item.name}`}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityDisplay}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => addToCart(item)} accessible accessibilityLabel={`Increase quantity of ${item.name}`}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.price}>{item.price ? `$${item.price}` : 'Not Set'}</Text>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center} accessible accessibilityLabel="Loading services">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: COLORS.textDark, marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center} accessible accessibilityLabel="Error loading services">
        <Text style={{ color: 'red' }}>{error?.message || 'Error loading services'}</Text>
      </View>
    );
  }

  if (services.length === 0) {
    return (
      <View style={styles.center} accessible accessibilityLabel="No services found">
        <Text>No services found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        onEndReached={() => { if (hasNextPage) fetchNextPage(); }}
        onEndReachedThreshold={0.5}
        getItemLayout={(data, index) => ({ length: 100, offset: 100 * index, index })}
        ListFooterComponent={isFetchingNextPage ? (
          <View style={{ padding: 10, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        ) : null}
      />
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')} accessible accessibilityLabel="View Cart">
        <Text style={styles.cartButtonText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

ServicesScreen.propTypes = {};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 20, padding: 10, backgroundColor: '#f9f9f9' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  serviceItem: { flexDirection: 'row', padding: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 3, marginBottom: 10 },
  image: { width: 50, height: 50, borderRadius: 25, resizeMode: 'cover' },
  imagePlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ddd' },
  details: { flex: 1, marginLeft: 15 },
  name: { fontSize: 18, fontWeight: '500', color: '#333' },
  company: { fontSize: 16, color: '#555', marginTop: 4 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  addButton: { backgroundColor: '#28a745', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10 },
  addButtonText: { color: '#fff', fontSize: 16 },
  quantityControl: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { backgroundColor: '#28a745', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 },
  quantityButtonText: { color: '#fff', fontSize: 16 },
  quantityDisplay: { marginHorizontal: 10, fontSize: 16 },
  price: { fontSize: 16, fontWeight: '500', color: '#333' },
  cartButton: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#007bff', padding: 15, borderRadius: 30, alignItems: 'center' },
  cartButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default ServicesScreen;
