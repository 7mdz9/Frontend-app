// Enhanced AppErrorBoundary.jsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { COLORS } from './shared/theme';

class AppErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>Oops, something went wrong.</Text>
          <Button title="Retry" onPress={this.handleRetry} color={COLORS.primary} />
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  message: { marginBottom: 20, fontSize: 18, color: COLORS.text },
});

export default AppErrorBoundary;
