import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import {colors} from '@/constants';
import useAuth from '@/components/hooks/queries/useAuth';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const {getProfileQuery} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.profileContainer}>
            {/* 이메일, 카카오 이미지 둘다 없는 경우 */}
            {imageUri === null && kakaoImageUri === null && (
              <Image
                style={styles.profile}
                source={require('@/assets/user-default.png')}
              />
            )}
            {/* 이메일 이미지는 없고, 카카오 이미지는 있는 경우 */}
            {imageUri === null && !!kakaoImageUri && (
              <Image source={{uri: kakaoImageUri}} style={styles.profile} />
            )}
            {/* 이메일 이미지가 있을 경우, 이메일 이미지 보여주기 */}
            {imageUri !== null && (
              <Image source={{uri: imageUri}} style={styles.profile} />
            )}
          </View>
          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  profileContainer: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  profile: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: colors.GRAY_100,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  nameText: {
    color: colors.BLACK,
  },
});
