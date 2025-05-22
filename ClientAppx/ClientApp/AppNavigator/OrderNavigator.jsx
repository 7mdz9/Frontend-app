// /navigation/OrderNavigator.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from '../OrderScreen/OrderScreen';
import ChatScreen from '../OrderScreen/ChatScreen';
import RatingScreen from '../OrderScreen/Rating/RatingScreen';

const Stack = createStackNavigator();

export default function OrderNavigator({ route }) {
  // If parent tab passes { initialRouteName: 'Orders' }, use it:
  const initialRoute = route.params?.initialRouteName || 'Orders';

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Rating" component={RatingScreen} />
    </Stack.Navigator>
  );
}
