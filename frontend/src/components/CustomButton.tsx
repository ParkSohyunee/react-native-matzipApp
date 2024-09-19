import React from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native';
import {colors} from '../constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
  invalid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

export default function CustomButton({
  label,
  variant = 'filled',
  size = 'large',
  invalid = true,
  ...props
}: CustomButtonProps) {
  /** (아래 주석처리된 코드)
   * ios의 경우 window, screen height가 동일하지만,
   * android의 경우 screen이 상태표시줄까지 포함된 길이임
   */
  //   const windowWidth = Dimensions.get('window').height;
  //   const screenHeight = Dimensions.get('screen').height;

  //   console.log(`windowWidth: ${windowWidth}`);
  //   console.log(`screenHeight: ${screenHeight}`);

  return (
    <Pressable
      disabled={invalid}
      style={({pressed}) => [
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        styles.container,
        styles[size],
        invalid && styles.invalid,
      ]}
      {...props}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PINK_500,
  },
  outlinedPressed: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5,
  },
  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: colors.PINK_700,
  },
  invalid: {
    opacity: 0.5,
  },
});
