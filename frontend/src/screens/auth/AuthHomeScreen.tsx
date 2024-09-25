// 인증 홈 화면
import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {authNavigators} from '@/constants';
import {AuthStackParamListType} from '@/components/navigations/stack/AuthStackNavigator';
import CustomButton from '@/components/CustomButton';

// (Reference) https://reactnavigation.org/docs/typescript/#type-checking-screens
type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamListType,
  typeof authNavigators.AUTH_HOME
>;

// Each screen component in your app is provided with the navigation prop automatically
// (Navigation prop reference) https://reactnavigation.org/docs/navigation-prop
export default function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/matzip.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 2,
  },
  buttonContainer: {
    flex: 1,
    gap: 10,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
