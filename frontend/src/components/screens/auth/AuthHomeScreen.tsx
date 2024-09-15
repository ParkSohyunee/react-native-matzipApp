// 인증 홈 화면
import React from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {AuthStackParamListType} from '../../navigations/stack/AuthStackNavigator';
import {authNavigators} from '../../../constants';

// (Reference) https://reactnavigation.org/docs/typescript/#type-checking-screens
type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamListType,
  typeof authNavigators.AUTH_HOME
>;

// Each screen component in your app is provided with the navigation prop automatically
// (Navigation prop reference) https://reactnavigation.org/docs/navigation-prop
export default function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => navigation.navigate(authNavigators.LOGIN)}
        />
      </View>
      <View>
        <Button
          title="회원가입 화면으로 이동"
          onPress={() => navigation.navigate(authNavigators.SIGN_UP)}
        />
      </View>
    </SafeAreaView>
  );
}
