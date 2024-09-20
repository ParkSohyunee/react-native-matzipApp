import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';

import useForm from '../../components/hooks/useForm';
import {validateSignUp} from '../../utils';

interface SignupScreenProps {}

export default function SignupScreen({}: SignupScreenProps) {
  const passwordRef = useRef<TextInput>(null);
  const passwordCheckRef = useRef<TextInput>(null);

  const {inputs, touched, errors, getTextInputProps} = useForm({
    initialState: {email: '', password: '', passwordCheck: ''},
    validate: validateSignUp,
  });

  const handleSubmit = () => {
    console.log(inputs);
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
          onSubmitEditing={() => passwordCheckRef.current?.focus()}
          textContentType="oneTimeCode"
          {...getTextInputProps('password')}
        />
        <InputField
          ref={passwordCheckRef}
          placeholder="비밀번호를 한번 더 입력해주세요."
          errorMessage={errors.passwordCheck}
          secureTextEntry
          touched={touched.passwordCheck}
          onSubmitEditing={handleSubmit}
          returnKeyType="send"
          {...getTextInputProps('passwordCheck')}
        />
      </View>
      <CustomButton
        label="회원가입"
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
