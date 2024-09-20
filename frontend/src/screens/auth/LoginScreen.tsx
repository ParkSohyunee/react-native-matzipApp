import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';

import useForm from '../../components/hooks/useForm';

export default function LoginScreen() {
  const {inputs, touched, getTextInputProps} = useForm({
    initialState: {
      email: '',
      password: '',
    },
  });

  // 로그인 폼 제출
  const handleSubmit = () => {
    console.log(inputs);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          inputMode="email" // determines which keyboard to open
          placeholder="이메일을 입력해주세요."
          errorMessage="이메일을 입력해주세요."
          touched={touched.email}
          {...getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
          touched={touched.password}
          {...getTextInputProps('password')}
        />
      </View>
      <CustomButton
        label="로그인"
        variant="filled"
        size="large"
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});
