import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import FeedScreen from '@/screens/feed/FeedScreen';
import CalendarScreen from '@/screens/calendar/Calendar';
import MapStackNavigator, {
  MapStackParamListType,
} from '../stack/MapStackNavigator';
import {mainNavigators} from '@/constants';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainDrawerParamListType = {
  [mainNavigators.HOME]: NavigatorScreenParams<MapStackParamListType>;
  [mainNavigators.FEED]: undefined;
  [mainNavigators.CALENDER]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamListType>();

export default function DrawerMenuNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
      }}>
      <Drawer.Screen
        name={mainNavigators.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
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
