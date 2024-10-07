import React from 'react';
import {Dimensions} from 'react-native';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FeedScreen from '@/screens/feed/FeedScreen';
import CalendarScreen from '@/screens/calendar/Calendar';
import MapStackNavigator, {
  MapStackParamListType,
} from '../stack/MapStackNavigator';
import {colors, mainNavigators} from '@/constants';
import CustomDrawerContent from './CustomDrawerContent';

export type MainDrawerParamListType = {
  [mainNavigators.HOME]: NavigatorScreenParams<MapStackParamListType>;
  [mainNavigators.FEED]: undefined;
  [mainNavigators.CALENDER]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamListType>();

function DrawerIcons(
  route: RouteProp<MainDrawerParamListType>,
  focused: boolean,
) {
  let iconName = '';

  switch (route.name) {
    case mainNavigators.HOME:
      iconName = 'location-on';
      break;
    case mainNavigators.FEED:
      iconName = 'book';
      break;
    case mainNavigators.CALENDER:
      iconName = 'event-note';
      break;
  }

  return (
    <MaterialIcons
      name={iconName}
      size={18}
      color={focused ? colors.BLACK : colors.GRAY_500}
    />
  );
}

export default function DrawerMenuNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({route}) => ({
        drawerType: 'front',
        headerShown: false,
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors.WHITE,
        },
        drawerActiveTintColor: colors.BLACK,
        drawerInactiveTintColor: colors.GRAY_500,
        drawerActiveBackgroundColor: colors.PINK_200,
        drawerInactiveBackgroundColor: colors.GRAY_100,
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerIcon: ({focused}) => DrawerIcons(route, focused),
      })}>
      <Drawer.Screen
        name={mainNavigators.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigators.FEED}
        component={FeedScreen}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={mainNavigators.CALENDER}
        component={CalendarScreen}
        options={{
          title: '캘린더',
        }}
      />
    </Drawer.Navigator>
  );
}

/**
 * react-native-reanimated 에러 해결
 * (Reference - ios) https://github.com/software-mansion/react-native-reanimated/issues/4663
 * (Reference - android) https://github.com/software-mansion/react-native-reanimated/issues/5855
 *
 * 1. 버전 업그레이드 (v.3.5.4)
 * 2. babel.config.js 파일 plugins 추가
 * 3. metro 캐시 삭제 yarn start --reset-cache
 * 4. npx pod-install ios (ios)
 * 5-1. yarn ios or yarn start + i (ios)
 * 5-2. npx react-native run-android (안드로이드)
 */
