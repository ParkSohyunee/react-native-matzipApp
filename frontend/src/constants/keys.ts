const queryKeys = {
  AUTH: 'auth',
  GET_PROFILE: 'getProfile',
  GET_ACCESS_TOKEN: 'getAccessToken',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

export {queryKeys, storageKeys};
