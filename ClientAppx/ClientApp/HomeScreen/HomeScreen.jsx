import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';
import Card from '../shared/Components/Card';
import LoadingIndicator from '../shared/Components/LoadingIndicator';
import ErrorState from '../shared/Components/ErrorState';
import { fetchCompanies, fetchCategories } from '../Data/api';
import { COLORS, SIZES } from '../shared/theme';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import Animated, { FadeIn } from 'react-native-reanimated';
import * as Location from 'expo-location';

const windowWidth = Dimensions.get('window').width;

const HeaderSection = React.memo(({ 
  inputText, 
  onInputChange, 
  companySuggestions, 
  onSuggestionSelect, 
  userLocation, 
  onLocationPress 
}) => {
  return (
    <View style={styles.topContainer}>
      <TouchableOpacity
        style={styles.locationBar}
        onPress={onLocationPress}
        accessible
        accessibilityLabel="Location bar. Tap to manage addresses."
      >
        <Ionicons name="location-outline" size={16} color="#fff" style={{ marginRight: 5 }} />
        <Text style={styles.locationText}>{userLocation}</Text>
      </TouchableOpacity>
      <Text style={styles.greetingText}>Hi User,</Text>
      <Text style={styles.subGreetingText}>Need some help today?</Text>
      <SearchBar
        placeholder="Search for companies..."
        value={inputText}
        onChangeText={onInputChange}
        accessibilityLabel="Search companies"
      />
      {inputText.trim() !== '' && (
        <SuggestionsList suggestions={companySuggestions} onSelect={onSuggestionSelect} />
      )}
    </View>
  );
});

HeaderSection.propTypes = {
  inputText: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  companySuggestions: PropTypes.array.isRequired,
  onSuggestionSelect: PropTypes.func.isRequired,
  userLocation: PropTypes.string.isRequired,
  onLocationPress: PropTypes.func.isRequired,
};

const SuggestionsList = React.memo(({ suggestions, onSelect }) => {
  return (
    <View style={styles.suggestionsList}>
      {suggestions.length === 0 ? (
        <Text style={styles.noResults}>No companies found.</Text>
      ) : (
        suggestions.map((company) => (
          <Card key={company.id} style={styles.suggestionCard}>
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => onSelect(company)}
              accessible
              accessibilityLabel={`Select ${company.name}`}
            >
              <Text style={styles.suggestionText}>{company.name}</Text>
            </TouchableOpacity>
          </Card>
        ))
      )}
    </View>
  );
});

SuggestionsList.propTypes = {
  suggestions: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const CategorySection = React.memo(({ categories, onCategoryPress }) => {
  return (
    <View style={styles.categoriesSection}>
      <Text style={styles.sectionTitle}>Explore Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => onCategoryPress(category.name)}
            accessible
            accessibilityLabel={`Category ${category.name}`}
          >
            <View style={styles.iconContainer}>
              {category.image ? (
                <Image source={category.image} style={styles.categoryIcon} resizeMode="contain" />
              ) : (
                <View style={styles.iconPlaceholder} />
              )}
            </View>
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryTitle} numberOfLines={2}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

CategorySection.propTypes = {
  categories: PropTypes.array.isRequired,
  onCategoryPress: PropTypes.func.isRequired,
};

const ReorderHistorySection = React.memo(({ reorderHistoryData, onReorder }) => {
  return (
    <View style={styles.reorderSection}>
      <Text style={styles.sectionTitle}>Reorder History</Text>
      {reorderHistoryData.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.reorderItem}
          onPress={() => onReorder(item)}
          activeOpacity={0.8}
          accessible
          accessibilityLabel={`Reorder from ${item.name}`}
        >
          <Image source={{ uri: item.logo }} style={styles.reorderLogo} />
          <View style={styles.reorderInfo}>
            <Text style={styles.reorderName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.orderAgainButton}
              onPress={() => alert(`Order again from ${item.name}`)}
              accessible
              accessibilityLabel={`Order again from ${item.name}`}
            >
              <Text style={styles.orderAgainText}>Order Again</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
});

ReorderHistorySection.propTypes = {
  reorderHistoryData: PropTypes.array.isRequired,
  onReorder: PropTypes.func.isRequired,
};

function HomeScreen({ navigation }) {
  // Search-related state
  const [inputText, setInputText] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  // Data for companies and categories
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Dynamic user location state
  const [userLocation, setUserLocation] = useState('Fetching location...');

  const debouncedUpdate = useCallback(
    debounce((text) => {
      setDebouncedQuery(text);
    }, 300),
    []
  );

  const handleInputChange = useCallback((text) => {
    setInputText(text);
    debouncedUpdate(text);
  }, [debouncedUpdate]);

  // Load companies and categories data
  useEffect(() => {
    async function loadData() {
      try {
        const companiesData = await fetchCompanies();
        const categoriesData = await fetchCategories();
        setCompanies(companiesData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Get dynamic user location using Expo Location and reverse geocoding
  useEffect(() => {
    async function getLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setUserLocation('Location permission denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let [reverseGeocode] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
        if (reverseGeocode) {
          const address = `${reverseGeocode.street || ''} ${reverseGeocode.city || ''}`.trim();
          setUserLocation(address || 'Unknown Location');
        } else {
          setUserLocation('Unknown Location');
        }
      } catch (err) {
        console.error(err);
        setUserLocation('Error fetching location');
      }
    }
    getLocation();
  }, []);

  // Filter company suggestions based on debounced query
  const companySuggestions = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return companies.filter(company =>
      company.name.toLowerCase().includes(q)
    );
  }, [debouncedQuery, companies]);

  const handleSuggestionSelect = useCallback((company) => {
    navigation.navigate('UnifiedTemplateScreen', { company });
    setInputText('');
    setDebouncedQuery('');
  }, [navigation]);

  const handleCategoryPress = useCallback((categoryName) => {
    navigation.navigate('CompaniesScreen', { categoryName });
  }, [navigation]);

  const handleLocationPress = useCallback(() => {
    navigation.navigate('AddressManagementScreen');
  }, [navigation]);

  // Prepare reorder history based on selected target categories
  const electricalCompany = companies.find(company => company.categoryId === 'electrical_plumbing');
  const discountCompany = companies.find(company => company.categoryId === 'home_repairs');
  const cleaningCompany = companies.find(company => company.categoryId === 'cleaning_pest');
  const reorderHistoryData = [electricalCompany, discountCompany, cleaningCompany].filter(Boolean);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorState message={error} />;

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(500)}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <HeaderSection
          inputText={inputText}
          onInputChange={handleInputChange}
          companySuggestions={companySuggestions}
          onSuggestionSelect={handleSuggestionSelect}
          userLocation={userLocation}
          onLocationPress={handleLocationPress}
        />
        <CategorySection categories={categories} onCategoryPress={handleCategoryPress} />
        <ReorderHistorySection 
          reorderHistoryData={reorderHistoryData} 
          onReorder={(item) => navigation.navigate('UnifiedTemplateScreen', { company: item })} 
        />
      </ScrollView>
    </Animated.View>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topContainer: {
    paddingTop: 65,
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: 30,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: SIZES.bigRadius,
    borderBottomRightRadius: SIZES.bigRadius,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    marginBottom: 10,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  locationText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  greetingText: { fontSize: SIZES.fontTitle, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  subGreetingText: { fontSize: SIZES.fontSubtitle, color: '#F4E9E2', marginBottom: 16 },
  suggestionsList: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    marginTop: 8,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  suggestionCard: { marginHorizontal: 10, marginVertical: 4 },
  suggestionItem: { padding: 10 },
  suggestionText: { fontSize: SIZES.fontRegular, color: COLORS.textDark },
  noResults: { textAlign: 'center', color: '#999', marginTop: 10, fontSize: SIZES.fontRegular },
  categoriesSection: { marginTop: 10, marginBottom: 20, paddingHorizontal: SIZES.screenPadding },
  sectionTitle: { fontSize: SIZES.fontTitle, fontWeight: '600', color: COLORS.textDark, marginBottom: 15 },
  categoriesScroll: { paddingBottom: 5 },
  categoryCard: {
    width: 90,
    height: 110,
    marginRight: 15,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
  },
  iconContainer: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' },
  categoryIcon: { width: '60%', height: '60%', marginBottom: 8 },
  iconPlaceholder: { width: '60%', height: '60%', backgroundColor: COLORS.card, borderRadius: 8, marginBottom: 8 },
  categoryTextContainer: { width: '100%', alignItems: 'center' },
  categoryTitle: { fontSize: SIZES.fontRegular, color: COLORS.textDark, fontWeight: 'bold', textAlign: 'center' },
  reorderSection: { marginBottom: 30, paddingHorizontal: SIZES.screenPadding },
  reorderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: SIZES.radius,
    marginBottom: 10,
    elevation: 2,
  },
  reorderLogo: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  reorderInfo: { flex: 1 },
  reorderName: { fontSize: 16, fontWeight: '500', color: COLORS.textDark },
  orderAgainButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  orderAgainText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});

export default HomeScreen;
