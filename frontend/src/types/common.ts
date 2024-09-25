import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

// 기본 에러 타입을 AxiosError 타입으로 변경
type ResponseError = AxiosError<{
  statusCode: string;
  message: string;
  error: string;
}>;

// useMutation 옵션을 사용하기 위한 커스텀 타입
type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

// useQuery 옵션을 사용하기 위한 커스텀 타입
type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;

export type {ResponseError, UseMutationCustomOptions, UseQueryCustomOptions};
