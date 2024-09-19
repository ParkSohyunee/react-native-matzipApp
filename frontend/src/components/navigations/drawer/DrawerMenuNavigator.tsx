import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MapHomeScreen from '../../../screens/map/MapHomeScreen';
import FeedScreen from '../../../screens/feed/FeedScreen';
import CalendarScreen from '../../../screens/calendar/Calendar';

const Drawer = createDrawerNavigator();

export default function DrawerMenuNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
      <Drawer.Screen name="Feed" component={FeedScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
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
