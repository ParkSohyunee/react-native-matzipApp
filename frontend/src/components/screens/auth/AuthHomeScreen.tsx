// 인증 홈 화면
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {AuthStackParamListType} from '../../navigations/stack/AuthStackNavigator';
import {authNavigators} from '../../../constants';
import CustomButton from '../../CustomButton';

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
        <CustomButton
          label="로그인하기"
          invalid={false}
          onPress={() => navigation.navigate(authNavigators.LOGIN)}
        />
        <CustomButton
          label="회원가입하기"
          invalid={false}
          variant="outlined"
          onPress={() => navigation.navigate(authNavigators.SIGN_UP)}
        />
      </View>
    </SafeAreaView>
  );
}
