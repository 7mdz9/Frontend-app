import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StarterScreen from '../ClientApp/onboarding/StarterScreen';
import OnboardingScreen from '../ClientApp/onboarding/WelcomeScreen';
import Login from '../ClientApp/auth/Login';
import SignUp from '../ClientApp/auth/SignUp';
import AppNavigator from '../ClientApp/AppNavigator/AppNavigator';
import PropTypes from 'prop-types';

const RootStack = createStackNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator initialRouteName="StarterScreen">
      <RootStack.Screen name="StarterScreen" component={StarterScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <RootStack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}

RootNavigator.propTypes = {};

export default memo(RootNavigator);
