// /navigation/AccountNavigator.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../AccountSettings/AccountScreen';
import OrderHistory from '../AccountSettings/OrderHistory';
import Logout from '../AccountSettings/Logout';
import PaymentMethods from '../AccountSettings/PaymentMethods';
import ProfileSelection from '../AccountSettings/ProfileSelection';
import Settings from '../AccountSettings/Settings';
import Offers from '../AccountSettings/Offers';
import GetHelp from '../AccountSettings/GetHelp';
import CountrySelection from '../AccountSettings/CountrySelection';
import Notifications from '../AccountSettings/Notifications';

const Stack = createStackNavigator();

export default function AccountNavigator({ route }) {
  // Use route.params?.initialRouteName or default to 'AccountScreen'
  const initialRoute = route.params?.initialRouteName || 'AccountScreen';

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{ title: 'Order History' }}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{ title: 'Logout' }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
        options={{ title: 'Payment Methods' }}
      />
      <Stack.Screen
        name="ProfileSelection"
        component={ProfileSelection}
        options={{ title: 'Profile Selection' }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="Offers"
        component={Offers}
        options={{ title: 'Offers' }}
      />
      <Stack.Screen
        name="GetHelp"
        component={GetHelp}
        options={{ title: 'Get Help' }}
      />
      <Stack.Screen
        name="CountrySelection"
        component={CountrySelection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
