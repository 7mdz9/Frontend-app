import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Dummy timeline steps for order tracking
const timelineSteps = [
  { step: 1, label: 'Order Confirmed' },
  { step: 2, label: 'Preparing Order' },
  { step: 3, label: 'Out for Delivery' },
  { step: 4, label: 'Delivered' },
];

// Dummy orders with three phases and progress for active orders
const orders = [
  {
    id: '1',
    name: 'Service 1',
    price: 50,
    company: 'Company A',
    status: 'Not Prepared',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Service 2',
    price: 75,
    company: 'Company B',
    status: 'Active',
    progress: 2, // Current progress step (0-indexed: 0 completed steps, 1 means step1 done, etc.)
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Service 3',
    price: 30,
    company: 'Company C',
    status: 'Active',
    progress: 1,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Service 4',
    price: 100,
    company: 'Company D',
    status: 'Completed',
    image: 'https://via.placeholder.com/150',
  },
];

// Advanced Order Tracking Modal Component
const OrderTrackingModal = ({ visible, onClose, order }) => {
  const currentProgress = order?.progress || 0;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Order Tracking</Text>
          <ScrollView contentContainerStyle={styles.timelineContainer}>
            {timelineSteps.map((step, index) => {
              const completed = index < currentProgress;
              const active = index === currentProgress;
              return (
                <View key={step.step} style={styles.timelineStep}>
                  <View style={styles.timelineIconContainer}>
                    {completed ? (
                      <Ionicons name="checkmark-circle" size={24} color="#28a745" />
                    ) : active ? (
                      <Ionicons name="ellipse" size={24} color="#007bff" />
                    ) : (
                      <Ionicons name="ellipse-outline" size={24} color="#ccc" />
                    )}
                    {index !== timelineSteps.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>
                  <Text style={styles.timelineLabel}>{step.label}</Text>
                </View>
              );
            })}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [trackingModalVisible, setTrackingModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Navigate to Chat screen (pass order id as a parameter)
  const handleChatPress = (order) => {
    navigation.navigate('Chat', { orderId: order.id });
  };

  // Navigate to Rating screen for completed orders
  const handleRatingPress = (order) => {
    navigation.navigate('Rating', { orderId: order.id });
  };

  // Show tracking timeline modal for active orders
  const handleTrackOrderPress = (order) => {
    setSelectedOrder(order);
    setTrackingModalVisible(true);
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <Text
          style={[
            styles.status,
            item.status === 'Not Prepared' && { color: '#f39c12' },
            item.status === 'Active' && { color: '#007bff' },
            item.status === 'Completed' && { color: '#28a745' },
          ]}
        >
          {item.status}
        </Text>
        <View style={styles.actions}>
          {item.status === 'Not Prepared' ? (
            <Text style={styles.infoText}>Your order is being prepared.</Text>
          ) : item.status === 'Active' ? (
            <>
              <TouchableOpacity style={styles.chatButton} onPress={() => handleChatPress(item)}>
                <Ionicons name="chatbubble-ellipses-outline" size={16} color="#fff" style={{ marginRight: 5 }} />
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.trackButton} onPress={() => handleTrackOrderPress(item)}>
                <Ionicons name="locate-outline" size={16} color="#fff" style={{ marginRight: 5 }} />
                <Text style={styles.buttonText}>Track Order</Text>
              </TouchableOpacity>
            </>
          ) : item.status === 'Completed' ? (
            <TouchableOpacity style={styles.ratingButton} onPress={() => handleRatingPress(item)}>
              <Ionicons name="star-outline" size={16} color="#fff" style={{ marginRight: 5 }} />
              <Text style={styles.buttonText}>Rate</Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.price}>{item.price ? `$${item.price}` : 'Price Not Set'}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContainer}
      />
      <OrderTrackingModal
        visible={trackingModalVisible}
        onClose={() => setTrackingModalVisible(false)}
        order={selectedOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, padding: 10, backgroundColor: '#f9f9f9' },
  listContainer: { paddingBottom: 20 },
  orderItem: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  image: { width: 60, height: 60, borderRadius: 10 },
  details: { flex: 1, marginLeft: 15 },
  name: { fontSize: 18, fontWeight: '500', color: '#333' },
  company: { fontSize: 16, color: '#555', marginVertical: 2 },
  status: { fontSize: 14, marginVertical: 2 },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  chatButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 5,
  },
  trackButton: {
    flexDirection: 'row',
    backgroundColor: '#6c757d',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 5,
  },
  ratingButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  infoText: { fontSize: 14, color: '#555' },
  price: { fontSize: 16, fontWeight: '500', color: '#333' },
  separator: { height: 10 },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  timelineContainer: {
    paddingVertical: 10,
    width: '100%',
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  timelineIconContainer: {
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },
  timelineLine: {
    width: 2,
    height: 30,
    backgroundColor: '#ccc',
    position: 'absolute',
    top: 28,
    left: 11,
  },
  timelineLabel: { fontSize: 16, color: '#555' },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  modalCloseButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default OrdersScreen;
