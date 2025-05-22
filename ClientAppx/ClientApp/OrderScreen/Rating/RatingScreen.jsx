import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import RatingForm from './RatingForm';

const RatingScreen = () => {
  const [ratingData, setRatingData] = useState({ rating: 4, comment: 'Great service!' });

  const handleFormSubmit = (data) => {
    setRatingData(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RatingForm onSubmit={handleFormSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
});

export default RatingScreen;
