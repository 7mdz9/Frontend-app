import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const faqs = [
  {
    id: '1',
    question: 'How can I track my order?',
    answer: 'You can track your order from the "Order History" section in your account.',
  },
  {
    id: '2',
    question: 'What is the return policy?',
    answer: 'We accept returns within 30 days of delivery. Conditions apply.',
  },
  {
    id: '3',
    question: 'How can I contact support?',
    answer: 'You can reach out to our support team via email or live chat.',
  },
];

const GetHelp = () => {
  const openEmail = () => {
    Linking.openURL('mailto:support@example.com');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FAQs</Text>
      <FlatList
        data={faqs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.faqCard}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        )}
      />
      <Text style={styles.subHeader}>Need More Help?</Text>
      <TouchableOpacity style={styles.contactButton} onPress={openEmail}>
        <Text style={styles.contactText}>Contact Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F1E1', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#333333', marginBottom: 20 },
  subHeader: { fontSize: 18, fontWeight: '600', color: '#333333', marginTop: 30, marginBottom: 10 },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  question: { fontSize: 16, fontWeight: 'bold', color: '#A67552' },
  answer: { fontSize: 14, color: '#333333', marginTop: 5 },
  contactButton: {
    backgroundColor: '#A67552',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  contactText: { fontSize: 16, color: '#FFFFFF', fontWeight: 'bold' },
});

export default GetHelp;
