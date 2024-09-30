import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {MainDrawerParamListType} from '@/components/navigations/drawer/DrawerMenuNavigator';
import {MapStackParamListType} from '@/components/navigations/stack/MapStackNavigator';
import {colors} from '@/constants';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamListType>,
  DrawerNavigationProp<MainDrawerParamListType>
>;

export default function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();

  return (
    <>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton={false}
      />
      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Text>서랍</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,

    paddingVertical: 10,
    paddingHorizontal: 12,

    backgroundColor: colors.PINK_500,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 4, // 안드로이드 shadow 속성 적용하는 방법

    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
});
