// authorization header default 설정 유틸 함수

import axiosInstance from '../api/axios';

function setHeader(value: string) {
  axiosInstance.defaults.headers.common['Authorization'] = value;
}

function removeHeader() {
  if (!axiosInstance.defaults.headers.common['Authorization']) {
    return null;
  }
  delete axiosInstance.defaults.headers.common['Authorization'];
}

export {setHeader, removeHeader};
