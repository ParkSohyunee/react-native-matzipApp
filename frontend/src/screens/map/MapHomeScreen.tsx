import React, {useRef, useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';

import MapView, {
  Callout,
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {MainDrawerParamListType} from '@/components/navigations/drawer/DrawerMenuNavigator';
import {MapStackParamListType} from '@/components/navigations/stack/MapStackNavigator';
import useUserLocation from '@/components/hooks/useUserLocation';
import usePermission from '@/components/hooks/usePermission';

import {colors, mapNavigators} from '@/constants';
import mapStyle from '@/style/mapStyle';
import CustomMarker from '@/components/CustomMarker';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamListType>,
  DrawerNavigationProp<MainDrawerParamListType>
>;

export default function MapHomeScreen() {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();
  usePermission('LOCATION');
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>();

  // 길게 눌렀을 때 지도 좌표를 구하는 이벤트 핸들러
  const handleLongPressMapView = ({nativeEvent}: LongPressEvent) => {
    setSelectedLocation(nativeEvent.coordinate);
  };

  const handlePressUserLocation = () => {
    // 사용자가 위치 권한을 거부한 경우 등 에러가 발생하는 경우
    if (isUserLocationError) {
      // 에러메세지 표시
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      longitudeDelta: 0.0922,
      latitudeDelta: 0.0421,
    });
  };

  const handlePressAddPost = () => {
    if (!selectedLocation) {
      return Alert.alert(
        '추가할 위치를 선택해주세요.',
        '지도를 길게 누르면 위치가 선택됩니다.',
      );
    }
    // 선택한 위치를 param으로 전달
    // 추후 전달해야 할 정보가 많아지면 전역상태관리를 사용할 예정
    navigation.navigate(mapNavigators.ADD_POST, {
      location: selectedLocation,
    });
    // 장소추가 화면 이동 후 돌아왔을때는 선택한 위치 초기화
    setSelectedLocation(null);
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}>
        <CustomMarker
          coordinate={{
            latitude: 37.5516032365118,
            longitude: 126.98989626020192,
          }}
          color="RED"
          score={1}
        />
        {selectedLocation && (
          <Callout>
            <Marker coordinate={selectedLocation} />
          </Callout>
        )}
      </MapView>

      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color={colors.WHITE} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.button} onPress={handlePressAddPost}>
          <MaterialIcons name="add" size={25} color={colors.WHITE} />
        </Pressable>
        <Pressable style={styles.button} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" size={25} color={colors.WHITE} />
        </Pressable>
      </View>
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
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 10,
  },
  button: {
    backgroundColor: colors.PINK_700,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 4, // 안드로이드 shadow 속성 적용하는 방법

    marginVertical: 5,
    height: 48,
    width: 48,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
