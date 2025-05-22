// ServicesSearchScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '../Data/fetchServices';

const ServicesSearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { companyName, query } = route.params || {};

  // We'll do a single fetch instead of infinite scroll here for simplicity.
  const {
    data: services = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['services-search-single', { query, companyName }],
    queryFn: () => fetchServices(1, 100, query || '', companyName || ''), // fetch up to 100 results
    keepPreviousData: true,
  });

  const displayedServices = services; // Already filtered by fetchServices

  const handlePlaceOrderPress = (service) => {
    navigation.navigate('Checkout', { service });
  };

  const renderService = ({ item }) => (
    <View style={styles.serviceItem}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.placeOrderButton} onPress={() => handlePlaceOrderPress(item)}>
            <Text style={styles.placeOrderButtonText}>Place Order</Text>
          </TouchableOpacity>
          <Text style={styles.price}>{item.price ? `$${item.price}` : 'Not Set'}</Text>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading services...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{color:'red'}}>Error loading services</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {displayedServices.length > 0 ? (
        <FlatList
          data={displayedServices}
          renderItem={renderService}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => <Text style={styles.noResults}>No services found.</Text>}
        />
      ) : (
        <Text style={styles.noResults}>
          {query ? `No services found for "${query}".` : companyName ? `No services found for "${companyName}".` : 'No services to display.'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, marginTop:20, padding:10, backgroundColor:'#f9f9f9' },
  center:{flex:1,justifyContent:'center',alignItems:'center'},
  serviceItem: { flexDirection:'row', padding:20, backgroundColor:'#fff', borderRadius:10, elevation:3 },
  image: { width:50, height:50, borderRadius:25 },
  imagePlaceholder: { width:50, height:50, borderRadius:25, backgroundColor:'#ddd' },
  details:{ flex:1, marginLeft:15 },
  name:{ fontSize:18, fontWeight:'500' },
  company:{ fontSize:16, color:'#555' },
  actions:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10 },
  placeOrderButton:{ backgroundColor:'#28a745', borderRadius:20, paddingVertical:5, paddingHorizontal:10 },
  placeOrderButtonText:{ color:'#fff', fontSize:16 },
  price:{ fontSize:16, fontWeight:'500' },
  separator:{ height:10 },
  noResults:{ fontSize:16, color:'#999', textAlign:'center', marginTop:20 },
});

export default ServicesSearchScreen;
