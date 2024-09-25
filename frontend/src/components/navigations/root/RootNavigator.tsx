import React from 'react';

import DrawerMenuNavigator from '../drawer/DrawerMenuNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';

import useAuth from '../../hooks/queries/useAuth';

interface RootNavigatorProps {}

function RootNavigator({}: RootNavigatorProps) {
  // 로그인 여부에 따른 네비게이터 설정
  const {isLogin} = useAuth();

  return <>{isLogin ? <DrawerMenuNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
