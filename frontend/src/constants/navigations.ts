const mainNavigators = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDER: 'Calendar',
} as const;

const authNavigators = {
  AUTH_HOME: 'Home',
  LOGIN: 'Login',
  SIGN_UP: 'Signup',
} as const;

const mapNavigators = {
  MAP_HOME: 'MapHome',
  ADD_POST: 'AddPost',
} as const;

export {mainNavigators, authNavigators, mapNavigators};
