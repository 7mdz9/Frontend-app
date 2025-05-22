import React, { useEffect, useState, memo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, ScrollView, LayoutAnimation, UIManager, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchCompanyById } from '../Data/api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES } from '../shared/theme';
import { useCart } from '../CartContext';
import PropTypes from 'prop-types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UnifiedTemplateScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { company } = route.params || {};
  const companyId = company?.id;

  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSubCatIndex, setActiveSubCatIndex] = useState(0);
  const { cartItems, addToCart, updateQuantity, totalPrice, totalItems } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCompanyById(companyId);
        setCompanyData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (companyId) {
      fetchData();
    }
  }, [companyId]);

  const subCategories = companyData?.subCategories || [];
  const currentSubCategory = subCategories[activeSubCatIndex] || {};
  const services = currentSubCategory.services || [];

  const handleSubCatPress = useCallback((index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSubCatIndex(index);
  }, []);

  const renderHeader = () => (
    <View>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessible accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{companyData?.name}</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.bannerContainer}>
        {companyData?.logo ? (
          <Image source={{ uri: companyData.logo }} style={styles.bannerImage} accessible accessibilityLabel={`${companyData.name} banner`} />
        ) : (
          <View style={styles.bannerPlaceholder}>
            <Ionicons name="business-outline" size={48} color="#ccc" />
          </View>
        )}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{companyData?.name}</Text>
          <Text style={styles.companyDescription}>{companyData?.description}</Text>
        </View>
      </View>
      {subCategories.length > 0 && (
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {subCategories.map((subCat, index) => {
              const isActive = index === activeSubCatIndex;
              return (
                <TouchableOpacity
                  key={subCat.id}
                  style={[styles.tabItem, isActive && styles.activeTabItem]}
                  onPress={() => handleSubCatPress(index)}
                  accessible
                  accessibilityLabel={`Select ${subCat.name}`}
                >
                  <Text style={[styles.tabItemText, isActive && styles.activeTabItemText]}>
                    {subCat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );

  const renderServiceItem = useCallback(({ item }) => {
    const cartItem = cartItems.find(ci => ci.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    return (
      <View style={styles.serviceCard} accessible accessibilityLabel={`Service ${item.name}`}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceName}>{item.name}</Text>
          {item.price !== undefined && (
            <Text style={styles.servicePrice}>${item.price}</Text>
          )}
        </View>
        {item.description && (
          <Text style={styles.serviceDescription}>{item.description}</Text>
        )}
        {quantity === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)} accessible accessibilityLabel={`Add ${item.name} to cart`}>
            <Ionicons name="cart-outline" size={16} color="#fff" style={{ marginRight: 5 }} />
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
      </View>
    );
  }, [cartItems, addToCart, updateQuantity]);

  if (loading) {
    return (
      <View style={styles.center} accessible accessibilityLabel="Loading company details">
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading Company Details...</Text>
      </View>
    );
  }

  if (!companyData) {
    return (
      <View style={styles.center} accessible accessibilityLabel="Company details not found">
        <Text style={styles.errorText}>Company details not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderServiceItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
      />
      {cartItems.length > 0 && (
        <View style={styles.cartBar} accessible accessibilityLabel={`Cart with ${totalItems} items, total $${totalPrice.toFixed(2)}`}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartText}>{totalItems} Items</Text>
            <Text style={styles.cartText}>${totalPrice.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.cartAction} onPress={() => navigation.navigate('Cart')} activeOpacity={0.6} accessible accessibilityLabel="View Cart">
            <Text style={styles.cartActionText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

UnifiedTemplateScreen.propTypes = {};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  listContent: { padding: 15, paddingBottom: 100 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#333' },
  errorText: { fontSize: 16, color: 'red' },
  topHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 5, backgroundColor: COLORS.card, borderRadius: SIZES.radius, marginBottom: 10, elevation: 2 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  bannerContainer: { backgroundColor: COLORS.card, padding: 15, marginBottom: 10, borderRadius: SIZES.radius, elevation: 2 },
  bannerImage: { width: '100%', height: 150, borderRadius: SIZES.radius },
  bannerPlaceholder: { width: '100%', height: 150, borderRadius: SIZES.radius, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  companyInfo: { marginTop: 10, alignItems: 'center' },
  companyName: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  companyDescription: { fontSize: 16, color: '#555', textAlign: 'center', marginTop: 5 },
  tabsContainer: { backgroundColor: COLORS.card, paddingVertical: 10, marginBottom: 15, borderRadius: SIZES.radius, elevation: 2 },
  tabItem: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#f0f0f0', marginHorizontal: 5 },
  activeTabItem: { backgroundColor: COLORS.primary },
  tabItemText: { fontSize: 16, color: '#333' },
  activeTabItemText: { color: '#fff', fontWeight: 'bold' },
  serviceCard: { backgroundColor: COLORS.card, padding: 15, borderRadius: SIZES.radius, marginBottom: 15, elevation: 2 },
  serviceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceName: { fontSize: 18, fontWeight: '500', color: '#333' },
  servicePrice: { fontSize: 18, fontWeight: '600', color: COLORS.primary },
  serviceDescription: { fontSize: 14, color: '#555', marginVertical: 10 },
  addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, alignSelf: 'flex-start' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  quantityControl: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { backgroundColor: COLORS.primary, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
  quantityButtonText: { color: '#fff', fontSize: 16 },
  quantityDisplay: { marginHorizontal: 10, fontSize: 16 },
  separator: { height: 10 },
  cartBar: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: COLORS.primary, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 5 },
  cartInfo: { flexDirection: 'column' },
  cartText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cartAction: { backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  cartActionText: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
});

export default memo(UnifiedTemplateScreen);
