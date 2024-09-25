import React from 'react';
import {Button, Text, View} from 'react-native';
import useAuth from '../../components/hooks/queries/useAuth';

interface MapHomeScreenProps {}

export default function MapHomeScreen({}: MapHomeScreenProps) {
  const {logoutMutation} = useAuth();

  return (
    <View>
      <Text>맵 스크린</Text>
      <Button onPress={() => logoutMutation.mutate(null)} title="로그아웃" />
    </View>
  );
}
