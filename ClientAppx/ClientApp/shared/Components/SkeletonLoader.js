// Components/SkeletonLoader.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonLoader = ({ width = 100, height = 20, borderRadius = 5 }) => {
  return <View style={[styles.skeleton, { width, height, borderRadius }]} />;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
    opacity: 0.8,
  },
});

export default SkeletonLoader;

