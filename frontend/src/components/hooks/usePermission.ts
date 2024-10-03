// 접근 권한을 다루는 훅

import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  Permission,
} from 'react-native-permissions';
import {alerts} from '@/constants';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermission: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermission: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

export default function usePermission(type: PermissionType) {
  // 호출하면 권한 체크
  useEffect(() => {
    (async () => {
      // 플랫폼별로 요청할 권한 정의
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid ? androidPermission : iosPermission;

      const checked = await check(permissionOS[type]);
      // console.log('checked', checked); // checked denied

      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
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
          await request(permissionOS[type]); // Request one permission.
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    })();
  }, [type]);
}
