import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

// 사용자가 백그라운드 상태에서 돌아왔는지를 확인하는 커스텀 훅 (react-native AppState 사용)
export default function useAppState() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComback, setIsComback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground
        setIsComback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComback(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {isComback, appStateVisible};
}
