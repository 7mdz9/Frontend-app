import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const SearchBar = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder || 'Search...'}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
          autoCorrect={false}
          autoCapitalize="none"
          accessible
          accessibilityLabel="Search input"
        />
        {value.trim() !== '' && (
          <TouchableOpacity onPress={() => onChangeText('')} accessible accessibilityLabel="Clear search">
            <Icon name="close-circle" size={20} color="#999" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: { marginRight: 5 },
  input: { flex: 1, fontSize: 16, color: '#333' },
  clearIcon: { marginLeft: 5 },
});

export default SearchBar;
