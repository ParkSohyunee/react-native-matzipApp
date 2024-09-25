import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';

import useForm from '@/components/hooks/useForm';
import {validateLogin} from '@/utils';
import useAuth from '@/components/hooks/queries/useAuth';

export default function LoginScreen() {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<TextInput>(null);

  const {inputs, touched, errors, getTextInputProps} = useForm({
    initialState: {email: '', password: ''},
    validate: validateLogin,
  });

  // 로그인 폼 제출
  const handleSubmit = () => {
    loginMutation.mutate({
      email: inputs.email,
      password: inputs.password,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          inputMode="email" // determines which keyboard to open
          placeholder="이메일을 입력해주세요."
          errorMessage={errors.email}
          touched={touched.email}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.password}
          secureTextEntry
          touched={touched.password}
          textContentType="oneTimeCode"
          onSubmitEditing={handleSubmit}
          returnKeyType="join"
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
