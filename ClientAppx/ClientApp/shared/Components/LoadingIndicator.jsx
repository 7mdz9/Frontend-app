// ClientApp/shared/Components/LoadingIndicator.jsx
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme.js';
// ^^ Move up one folder from Components/ to shared/, then import from 'theme.js'

const LoadingIndicator = ({ message = 'Loading...', size = 'large' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={COLORS.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,        // Using SIZES here
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  message: {
    marginTop: 10,
    fontSize: SIZES.fontSizeRegular,
    color: COLORS.text,
  },
});
