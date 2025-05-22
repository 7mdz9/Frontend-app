// CompaniesSearchScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { companiesData } from '../Data/data';

const CompaniesSearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryName } = route.params;

  const filteredCompanies = companiesData.filter(company => company.category === categoryName);

  const handleCompanyPress = (companyName) => {
    // Navigate to ServicesSearchScreen with the companyName
    navigation.navigate('ServicesSearchScreen', { companyName });
  };

  const renderCompany = ({ item }) => (
    <TouchableOpacity style={styles.companyItem} onPress={() => handleCompanyPress(item.name)}>
      <Text style={styles.companyText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {filteredCompanies.length > 0 ? (
        <FlatList
          data={filteredCompanies}
          renderItem={renderCompany}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <Text style={styles.noResults}>No companies found for this category.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, marginTop:20, padding:10, backgroundColor:'#f9f9f9' },
  companyItem:{
    padding:20,
    backgroundColor:'#fff',
    borderRadius:10,
    elevation:3,
  },
  companyText:{ fontSize:18, fontWeight:'500' },
  separator:{ height:10 },
  noResults:{ textAlign:'center', fontSize:16, color:'#999', marginTop:20 },
});

export default CompaniesSearchScreen;
