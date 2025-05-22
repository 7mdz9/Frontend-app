import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Keyboard,
  Animated,
  SafeAreaView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { id: '1', sender: 'agent', content: 'Hello, how can I help you today?', time_sent: new Date(Date.now() - 60000).toISOString() },
    { id: '2', sender: 'user', content: 'I have a question about my order.', time_sent: new Date(Date.now() - 30000).toISOString() },
  ]);
  const [message, setMessage] = useState('');
  const flatListRef = useRef();
  
  // Animated value for the input container's bottom offset
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  // Listen to keyboard events and animate the offset
  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardShowListener = Keyboard.addListener(showEvent, (event) => {
      Animated.timing(keyboardOffset, {
        toValue: event.endCoordinates.height,
        duration: event.duration || 250,
        useNativeDriver: false,
      }).start();
    });
    const keyboardHideListener = Keyboard.addListener(hideEvent, (event) => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: event.duration || 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [keyboardOffset]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: `${Date.now()}`,
      sender: 'user',
      content: message,
      time_sent: new Date().toISOString(),
    };
    setMessages(prev => [newMessage, ...prev]);
    setMessage('');
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.agentBubble]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.agentText]}>
          {item.content}
        </Text>
        <Text style={styles.timestamp}>
          {new Date(item.time_sent).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#007bff" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.headerTitle}>Support Agent</Text>
              <Text style={styles.headerStatus}>Online</Text>
            </View>
          </View>
        </View>
        {/* Message list */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          style={styles.flatListContainer}
        />
        {/* Animated Input Container */}
        <Animated.View style={[styles.inputContainer, { marginBottom: keyboardOffset }]}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f2f2f2' },
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  backButton: { padding: 5, marginRight: 10 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  headerStatus: { fontSize: 12, color: '#28a745' },
  flatListContainer: { flex: 1 },
  messageList: { padding: 10, paddingBottom: 20 },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 15,
    padding: 10,
    marginVertical: 5,
  },
  userBubble: { backgroundColor: '#007bff', alignSelf: 'flex-end', borderTopRightRadius: 0 },
  agentBubble: { backgroundColor: '#e5e5ea', alignSelf: 'flex-start', borderTopLeftRadius: 0 },
  messageText: { fontSize: 16 },
  userText: { color: '#fff' },
  agentText: { color: '#000' },
  timestamp: { fontSize: 10, color: '#888', alignSelf: 'flex-end', marginTop: 5 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    color: '#000',
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
});

export default ChatScreen;
