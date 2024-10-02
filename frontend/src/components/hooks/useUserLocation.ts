import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {LatLng} from 'react-native-maps';

/**
 * 사용자의 현재 위치를 구하는 훅
 * @returns 현재 위치, 에러 상태
 */
export default function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626020192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        console.log(info, latitude, longitude);
        setUserLocation({latitude, longitude});
      },
      () => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true, // GPS 사용 여부, false면 wifi location
      },
    );
  }, []);
  return {userLocation, isUserLocationError};
}
