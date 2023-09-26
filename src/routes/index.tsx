import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Login from '../screens/Login';
import Root from './root';

import theme from '../theme';

export function Routes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.white }
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="Root" component={Root} />
    </Navigator>
  );
}