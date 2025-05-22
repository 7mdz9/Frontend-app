// navigation/AppNavigator.jsx
import React, { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeAndRequestNavigator from './HomeAndRequestNavigator';
import OrderNavigator from './OrderNavigator';
import AccountNavigator from './AccountNavigator';
import ChatBot from '../../ClientApp/ChatBot';
import CustomTabBar from '../shared/Components/CustomTabBar';

const Tab = createBottomTabNavigator();

/**
 * Returns tabBarStyle based on the nested route.
 */
const getTabBarStyleForNestedScreen = (route, allowedRoute) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? allowedRoute;
  return routeName === allowedRoute
    ? { display: 'flex' }
    : { display: 'none' };
};

function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        children={(props) => (
          <HomeAndRequestNavigator
            {...props}
            route={{
              ...props.route,
              params: { initialRouteName: 'HomeScreen' },
            }}
          />
        )}
        options={({ route }) => ({
          title: 'Home',
          tabBarStyle: getTabBarStyleForNestedScreen(
            route,
            'HomeScreen'
          ),
          accessibilityLabel: 'Home Tab',
        })}
      />

      <Tab.Screen
        name="RequestTab"
        children={(props) => (
          <HomeAndRequestNavigator
            {...props}
            route={{
              ...props.route,
              params: { initialRouteName: 'RequestScreen' },
            }}
          />
        )}
        options={({ route }) => ({
          title: 'Request',
          tabBarStyle: getTabBarStyleForNestedScreen(
            route,
            'RequestScreen'
          ),
          accessibilityLabel: 'Request Tab',
        })}
      />

      <Tab.Screen
        name="ChatBot"
        component={ChatBot}
        options={{
          title: 'ChatBot',
          tabBarStyle: { display: 'flex' },
          accessibilityLabel: 'ChatBot Tab',
        }}
      />

      <Tab.Screen
        name="OrdersTab"
        children={(props) => (
          <OrderNavigator
            {...props}
            route={{
              ...props.route,
              params: { initialRouteName: 'Orders' },
            }}
          />
        )}
        options={({ route }) => ({
          title: 'Orders',
          tabBarStyle: getTabBarStyleForNestedScreen(
            route,
            'Orders'
          ),
          accessibilityLabel: 'Orders Tab',
        })}
      />

      <Tab.Screen
        name="AccountTab"
        children={(props) => (
          <AccountNavigator
            {...props}
            route={{
              ...props.route,
              params: { initialRouteName: 'AccountScreen' },
            }}
          />
        )}
        options={({ route }) => ({
          title: 'Account',
          tabBarStyle: getTabBarStyleForNestedScreen(
            route,
            'AccountScreen'
          ),
          accessibilityLabel: 'Account Tab',
        })}
      />
    </Tab.Navigator>
  );
}

export default memo(AppNavigator);
