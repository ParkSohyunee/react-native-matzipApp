import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LatLng} from 'react-native-maps';

import {mapNavigators} from '@/constants';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import AddPostScreen from '@/screens/map/AddPostScreen';

export type MapStackParamListType = {
  [mapNavigators.MAP_HOME]: undefined;
  [mapNavigators.ADD_POST]: {location: LatLng};
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
      <Stack.Screen
        name={mapNavigators.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: '장소 추가',
        }}
      />
    </Stack.Navigator>
  );
}
