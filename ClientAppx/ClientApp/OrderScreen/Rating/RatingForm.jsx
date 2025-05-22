import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

const RatingForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Rate the Service</Text>
        <StarRating rating={rating} onChange={setRating} starSize={30} />
        <TextInput
          style={styles.input}
          placeholder="Leave a comment"
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    height: 80,
    textAlignVertical: 'top'
  },
});

export default RatingForm;
