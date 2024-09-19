import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthHomeScreen from '../../screens/auth/AuthHomeScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignupScreen from '../../screens/auth/SignupScreen';

import {authNavigators} from '../../../constants/navigations';

export type AuthStackParamListType = {
  [authNavigators.AUTH_HOME]: undefined;
  [authNavigators.LOGIN]: undefined;
  [authNavigators.SIGN_UP]: undefined;
};

const Stack = createStackNavigator<AuthStackParamListType>();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={authNavigators.AUTH_HOME}
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={authNavigators.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigators.LOGIN}
        component={LoginScreen}
        options={{
          headerTitle: '로그인',
        }}
      />
      <Stack.Screen
        name={authNavigators.SIGN_UP}
        component={SignupScreen}
        options={{
          headerTitle: '회원가입',
        }}
      />
    </Stack.Navigator>
  );
}
