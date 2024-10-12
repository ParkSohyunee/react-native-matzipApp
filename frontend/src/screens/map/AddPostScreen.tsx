import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {MapStackParamListType} from '@/components/navigations/stack/MapStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import Octicons from 'react-native-vector-icons/Octicons';

import {colors, mapNavigators} from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import useForm from '@/components/hooks/useForm';
import {validateAddPost} from '@/utils';

type AddPostScreenProps = StackScreenProps<
  MapStackParamListType,
  typeof mapNavigators.ADD_POST
>;

function AddPostScreen({route}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput>(null);

  const {inputs, touched, errors, getTextInputProps} = useForm({
    initialState: {title: '', description: ''},
    validate: validateAddPost,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value=""
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton variant="outlined" label="날짜 선택" size="large" />
          <InputField
            autoFocus
            placeholder="제목을 입력해주세요."
            errorMessage={errors.title}
            touched={touched.title}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력해주세요.(선택)"
            errorMessage={errors.description}
            touched={touched.description}
            multiline
            returnKeyType="next"
            {...getTextInputProps('description')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});

export default AddPostScreen;
