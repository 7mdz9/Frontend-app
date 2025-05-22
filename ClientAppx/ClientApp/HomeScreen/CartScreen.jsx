import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../CartContext';
import { COLORS, SIZES } from '../shared/theme';
import PropTypes from 'prop-types';

const CartScreen = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, updateQuantity, updateSpecialRequests, totalPrice, totalItems } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart is empty", "Please add items before checkout.");
      return;
    }
    navigation.navigate('Checkout', { cartItems });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer} accessible accessibilityLabel={`Cart item ${item.name}`}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} accessible accessibilityLabel={`Remove ${item.name} from cart`}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Text style={styles.itemPrice}>${item.price} x {item.quantity}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.quantity - 1)} accessible accessibilityLabel={`Decrease quantity of ${item.name}`}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.quantity + 1)} accessible accessibilityLabel={`Increase quantity of ${item.name}`}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.specialRequestInput}
        placeholder="Special requests..."
        value={item.specialRequests}
        onChangeText={(text) => updateSpecialRequests(item.id, text)}
        accessible
        accessibilityLabel="Special requests input"
      />
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer} accessible accessibilityLabel="Your cart is empty">
        <Ionicons name="cart-outline" size={100} color={COLORS.border} style={{ marginBottom: 20 }} />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySubText}>Looks like you haven't added any items yet.</Text>
        <TouchableOpacity style={styles.shopButton} onPress={() => navigation.goBack()} accessible accessibilityLabel="Start shopping">
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container} accessible accessibilityLabel="Cart Screen">
      <FlatList 
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.footer} accessible accessibilityLabel={`Cart summary: ${totalItems} items, total $${totalPrice.toFixed(2)}`}>
        <Text style={styles.footerText}>{totalItems} items | Total: ${totalPrice.toFixed(2)}</Text>
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.addItemsButton} onPress={() => navigation.goBack()} accessible accessibilityLabel="Add more items">
            <Text style={styles.addItemsButtonText}>Add More</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout} accessible accessibilityLabel="Proceed to checkout">
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

CartScreen.propTypes = {};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  listContainer: { padding: 15 },
  itemContainer: { backgroundColor: COLORS.card, padding: 15, borderRadius: SIZES.radius, marginBottom: 15 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 18, fontWeight: '500', color: '#333' },
  itemPrice: { fontSize: 16, color: COLORS.primary, marginVertical: 5 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  quantityButton: { backgroundColor: COLORS.primary, padding: 5, borderRadius: 5 },
  quantityButtonText: { color: '#fff', fontSize: 18 },
  quantityText: { marginHorizontal: 10, fontSize: 16 },
  specialRequestInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 5, padding: 8, marginTop: 10 },
  footer: { padding: 15, borderTopWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.card },
  footerText: { fontSize: 18, fontWeight: '600', marginBottom: 10, textAlign: 'center' },
  footerButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  addItemsButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 5, flex: 0.45, alignItems: 'center' },
  addItemsButtonText: { color: '#fff', fontSize: 16 },
  checkoutButton: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 5, flex: 0.45, alignItems: 'center' },
  checkoutButtonText: { color: '#fff', fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  emptySubText: { fontSize: 16, color: '#777', textAlign: 'center', marginBottom: 20 },
  shopButton: { backgroundColor: COLORS.primary, paddingVertical: 15, paddingHorizontal: 30, borderRadius: 30 },
  shopButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default CartScreen;
