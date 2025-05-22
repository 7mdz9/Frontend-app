import React, { useState, useMemo, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  ActivityIndicator, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../HomeScreen/SearchBar';
import { fetchCompanies, fetchCategories } from '../Data/api';
import debounce from 'lodash.debounce';

export default function SearchScreen() {
  const navigation = useNavigation();
  // Immediate input state for a smooth typing experience
  const [inputText, setInputText] = useState('');
  // Debounced query state used for filtering
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  // Fetch companies from API
  const { data: companies, isLoading: companiesLoading, isError: companiesError } = useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
  });

  // Fetch categories from API
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Debounce only the query update (300ms)
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

  // Filter companies using the debounced query state
  const filteredCompanies = useMemo(() => {
    if (!companies || debouncedQuery.trim() === '') return [];
    const q = debouncedQuery.trim().toLowerCase();
    return companies.filter(company => company.name.toLowerCase().includes(q));
  }, [debouncedQuery, companies]);

  const handleCompanySelect = useCallback((company) => {
    setRecentSearches(prev => {
      const updated = prev.filter(c => c.id !== company.id);
      return [company, ...updated];
    });
    navigation.navigate('UnifiedTemplateScreen', { company });
    setInputText('');
    setDebouncedQuery('');
  }, [navigation]);

  const popularSearches = ['Discounts', 'Plumbing', 'Cleaning', 'Repairs'];
  const handlePopularSearchSelect = useCallback((searchTerm) => {
    navigation.navigate('ServicesSearchScreen', { query: searchTerm });
  }, [navigation]);

  const handleCategoryPress = useCallback((categoryName) => {
    navigation.navigate('CompaniesSearchScreen', { categoryName });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Search</Text>
      <SearchBar
        placeholder="Search for companies..."
        value={inputText}
        onChangeText={handleInputChange}
      />
      {inputText.trim() !== '' ? (
        <View style={styles.suggestionsContainer}>
          {companiesLoading ? (
            <ActivityIndicator style={{ padding: 10 }} />
          ) : companiesError ? (
            <Text style={styles.errorText}>Error loading companies.</Text>
          ) : (
            <FlatList
              data={filteredCompanies}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleCompanySelect(item)}
                >
                  <Text style={styles.suggestionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.noResults}>No companies found.</Text>
              }
              nestedScrollEnabled={true}
            />
          )}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <FlatList
            data={popularSearches}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.popularSearchItem}
                onPress={() => handlePopularSearchSelect(item)}
              >
                <Text style={styles.popularSearchText}>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.horizontalList}
          />

          <Text style={styles.sectionTitle}>Categories</Text>
          {categoriesLoading ? (
            <ActivityIndicator style={{ padding: 10 }} />
          ) : categoriesError ? (
            <Text style={styles.errorText}>Error loading categories.</Text>
          ) : (
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => handleCategoryPress(item.name)}
                >
                  {item.icon ? (
                    <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
                  ) : (
                    <View style={[styles.categoryIcon, styles.categoryPlaceholder]}>
                      <Text style={styles.placeholderText}>No Icon</Text>
                    </View>
                  )}
                  <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.horizontalList}
            />
          )}

          {recentSearches.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <FlatList
                data={recentSearches}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.popularSearchItem}
                    onPress={() =>
                      navigation.navigate('UnifiedTemplateScreen', { company: item })
                    }
                  >
                    <Text style={styles.popularSearchText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.horizontalList}
              />
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginTop: 60, 
    marginBottom: 20, 
    color: '#333', 
    paddingHorizontal: 20 
  },
  suggestionsContainer: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginHorizontal: 20,
    marginTop: 10, 
    maxHeight: 300 
  },
  suggestionItem: { 
    padding: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  suggestionText: { 
    fontSize: 16, 
    color: '#333' 
  },
  noResults: { 
    textAlign: 'center', 
    color: '#999', 
    marginTop: 20, 
    fontSize: 16 
  },
  errorText: { 
    color: 'red', 
    textAlign: 'center', 
    marginVertical: 10 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '600', 
    color: '#333', 
    marginTop: 30, 
    marginBottom: 10,
    paddingHorizontal: 20 
  },
  popularSearchItem: { 
    backgroundColor: '#f5f5f5', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 20, 
    marginRight: 15 
  },
  popularSearchText: { 
    fontSize: 16, 
    color: '#555' 
  },
  horizontalList: { 
    paddingLeft: 20, 
    paddingBottom: 10 
  },
  categoryItem: { 
    alignItems: 'center', 
    marginRight: 20, 
    width: 100 
  },
  categoryIcon: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginBottom: 5, 
    resizeMode: 'cover', 
    backgroundColor: '#f0f0f0' 
  },
  categoryPlaceholder: { 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  placeholderText: { 
    fontSize: 12, 
    color: '#999' 
  },
  categoryText: { 
    fontSize: 14, 
    color: '#333', 
    textAlign: 'center' 
  },
});

