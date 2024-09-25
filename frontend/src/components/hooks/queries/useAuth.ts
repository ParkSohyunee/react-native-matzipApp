// React-query의 useQuery와 useMutation을 wrapping해주는 custom hook
// 필요한 옵션을 인자로 주입받아 사용할 수 있도록 구현

import {useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';

import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';

import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {setHeader, removeHeader} from '@/utils/authHeader';
import {removeEncryptStorage, setEncryptStorage} from '@/utils';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKeys} from '@/constants';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader(`Bearer ${accessToken}`); // 로그인하면 헤더에 default 설정)
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      }); // 로그인 후 RT 옵션 실행을 위해
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      }); // 로그인 후 변경된 프로필 가져오기 위헤
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const {data, isSuccess, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  // useQuery 후 onSuccess 상태일 때
  useEffect(() => {
    if (isSuccess) {
      const {accessToken, refreshToken} = data;
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
      setHeader(`Bearer ${accessToken}`); // 로그인하면 헤더에 default 설정)
    }
  }, [isSuccess, data]);

  // useQuery 후 onError 상태일 때
  useEffect(() => {
    if (isError) {
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      removeHeader();
    }
  }, [isError]);

  return {isSuccess, isError};
}

function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      removeHeader();
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]}); // 로그아웃 후 auth에 해당하는 쿼리 무효화
    },
    ...mutationOptions,
  });
}

// 인증 관련된 hook
function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess; // refreshTokenQuery가 성공한 상태는 즉, 로그인이 된 상태이므로
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    logoutMutation,
    isLogin,
    getProfileQuery,
  };
}

export default useAuth;
