// Components/ErrorState.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

const ErrorState = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && <Button title="Retry" onPress={onRetry} color={COLORS.primary} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', flex: 1, padding: 20 },
  message: { marginBottom: 10, fontSize: 16, color: 'red', textAlign: 'center' },
});

export default ErrorState;
