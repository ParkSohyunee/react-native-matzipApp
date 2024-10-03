// 접근 권한을 다루는 훅

import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const androidPermission = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

const iosPermission = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
};

export default function usePermission() {
  // 호출하면 권한 체크
  useEffect(() => {
    (async () => {
      // 플랫폼별로 요청할 권한 정의
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid
        ? androidPermission.LOCATION
        : iosPermission.LOCATION;

      const checked = await check(permissionOS);
      // console.log('checked', checked); // checked denied

      const showPermissionAlert = () => {
        Alert.alert(
          '위치 권한 허용이 필요합니다.',
          '설정 화면에서 위치 권한을 허용해주세요.',
          [
            {
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      };

      // checked 상태에 따른 alert 구현
      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
          }
          await request(permissionOS); // Request one permission.
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    })();
  }, []);
}
