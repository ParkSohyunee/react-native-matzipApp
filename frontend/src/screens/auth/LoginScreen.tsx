import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import InputField from '../../components/InputField';

interface LoginInputType {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const [inputs, setInputs] = useState<LoginInputType>({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleChangeInputs = (name: string) => (text: string) => {
    setInputs(prev => ({
      ...prev,
      [name]: text,
    }));
  };

  const handleBlur = (name: string) => () => {
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          value={inputs.email}
          inputMode="email" // determines which keyboard to open
          placeholder="이메일을 입력해주세요."
          errorMessage="이메일을 입력해주세요."
          onChangeText={handleChangeInputs('email')}
          onBlur={handleBlur('email')}
          touched={touched.email}
        />
        <InputField
          value={inputs.password}
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
          onChangeText={handleChangeInputs('password')}
          onBlur={handleBlur('password')}
          touched={touched.password}
        />
      </View>
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
  },
});
