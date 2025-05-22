import React, { useState, useEffect, memo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchCompanies } from '../Data/api';
import { COLORS, SIZES } from '../shared/theme';
import strings from '../strings';
import Card from '../shared/Components/Card';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const RenderCompanyItem = memo(({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.7} accessible accessibilityLabel={`View details for ${item.name}`}>
    <Card style={styles.cardItem}>
      <View style={styles.companyItemContainer}>
        {item.logo ? (
          <Image source={{ uri: item.logo }} style={styles.companyLogo} accessible accessibilityLabel={`${item.name} logo`} />
        ) : (
          <View style={styles.logoPlaceholder}>
            <Ionicons name="business-outline" size={24} color={COLORS.border} />
          </View>
        )}
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{item.name}</Text>
          <Text style={styles.companyCategory}>{item.categoryId}</Text>
        </View>
      </View>
    </Card>
  </TouchableOpacity>
));

RenderCompanyItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

const CompaniesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryName } = route.params || {};
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompanies() {
      try {
        const data = await fetchCompanies();
        let filtered = data;
        if (categoryName && categoryName.trim().length > 0) {
          let normalizedCategory = categoryName.toLowerCase().replace(/&/g, '').replace(/\s+/g, '_');
          filtered = data.filter(company => company.categoryId === normalizedCategory);
        }
        setCompanies(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadCompanies();
  }, [categoryName]);

  const handleCompanyPress = (company) => {
    navigation.navigate('UnifiedTemplateScreen', { company });
  };

  const renderCompany = ({ item }) => <RenderCompanyItem item={item} onPress={handleCompanyPress} />;

  if (loading) {
    return (
      <View style={styles.loadingContainer} accessible accessibilityLabel="Loading companies">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.textDark }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessible accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{strings.companiesTitle}</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={companies}
        renderItem={renderCompany}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: COLORS.background },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: COLORS.textDark },
  cardItem: { marginBottom: 10, padding: 10 },
  companyItemContainer: { flexDirection: 'row', alignItems: 'center' },
  companyLogo: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  logoPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.card, justifyContent: 'center', alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: COLORS.border },
  companyInfo: { flex: 1 },
  companyName: { fontSize: 16, fontWeight: '500', color: COLORS.textDark },
  companyCategory: { fontSize: 14, color: '#777', marginTop: 2 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CompaniesScreen;
