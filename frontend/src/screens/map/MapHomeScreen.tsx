import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

interface MapHomeScreenProps {}

export default function MapHomeScreen({}: MapHomeScreenProps) {
  return (
    <MapView
      style={styles.container}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
