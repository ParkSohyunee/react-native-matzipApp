import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import {colors} from '@/constants';
import {mergeRefs} from '@/utils';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  errorMessage?: string;
  touched?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

export default forwardRef(function InputField(
  {disabled = false, errorMessage = '', touched, ...props}: InputFieldProps,
  ref?: ForwardedRef<TextInput>,
) {
  const isError = !!errorMessage;
  const innerRef = useRef<TextInput>(null);

  const handlePressInput = () => {
    innerRef.current?.focus();
  };

  return (
    <Pressable onPress={handlePressInput}>
      <View
        style={[
          styles.container,
          disabled && styles.disabled,
          touched && isError && styles.inputError,
        ]}>
        <TextInput
          ref={ref ? mergeRefs(innerRef, ref) : innerRef}
          editable={!disabled}
          style={styles.input}
          placeholderTextColor={colors.GRAY_500}
          autoCapitalize="none" // 첫 글자 대문자 옵션
          autoCorrect={false} // 단어 자동완성 옵션
          spellCheck={false}
          returnKeyType="next"
          blurOnSubmit={false}
          {...props}
        />
        {touched && isError && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    paddingVertical: deviceHeight > 700 ? 12 : 10,
    paddingHorizontal: deviceHeight > 700 ? 10 : 8,

    width: '100%',
    justifyContent: 'center',
    gap: 9,

    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  input: {
    width: '100%',
    fontSize: 16,
    fontWeight: '400',
    color: colors.BLACK,
  },
  inputError: {
    borderColor: colors.RED_300,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.PINK_700,
  },
  errorMessage: {
    color: colors.RED_500,
    fontSize: 14,
    fontWeight: '400',
  },
});
