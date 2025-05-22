// navigation/HomeAndRequestNavigator.jsx
import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen/HomeScreen';
import CompaniesScreen from '../HomeScreen/CompaniesScreen';
import ServicesScreen from '../HomeScreen/ServicesScreen';
import CheckoutPage from '../HomeScreen/CheckoutPage';
import Payment from '../HomeScreen/Payment';
import CartScreen from '../HomeScreen/CartScreen';
import UnifiedTemplateScreen from '../HomeScreen/UnifiedTemplateScreen';
import AddressManagementScreen from '../HomeScreen/AddressManagementScreen';
import RequestScreen from '../Request/RequestScreen';
import PropTypes from 'prop-types';

const Stack = createStackNavigator();

function HomeAndRequestNavigator({ route }) {
  const initialRoute = route.params?.initialRouteName || 'HomeScreen';

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="CompaniesScreen" component={CompaniesScreen} />
      <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
      <Stack.Screen name="Checkout" component={CheckoutPage} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen
        name="UnifiedTemplateScreen"
        component={UnifiedTemplateScreen}
        options={{ title: 'Company Details' }}
      />
      <Stack.Screen
        name="RequestScreen"
        component={RequestScreen}
        options={{
          headerShown: false,           // ← disable navigator header
          title: 'Request Service',
        }}
      />
      <Stack.Screen
        name="AddressManagementScreen"
        component={AddressManagementScreen}
      />
    </Stack.Navigator>
  );
}

HomeAndRequestNavigator.propTypes = {
  route: PropTypes.object.isRequired,
};

export default memo(HomeAndRequestNavigator);
