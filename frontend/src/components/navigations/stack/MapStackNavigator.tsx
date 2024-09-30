import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {mapNavigators} from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';

export type MapStackParamListType = {
  [mapNavigators.MAP_HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamListType>();

export default function MapStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={mapNavigators.MAP_HOME}
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
        name={mapNavigators.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
