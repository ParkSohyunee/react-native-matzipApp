type UserLoginInfo = {
  email: string;
  password: string;
};

const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

const validateUser = (inputs: UserLoginInfo) => {
  const error = {
    email: '',
    password: '',
  };

  if (!emailRegEx.test(inputs.email)) {
    error.email = '올바른 이메일 형식이 아닙니다.';
  }
  if (!(inputs.password.length >= 8 && inputs.password.length < 20)) {
    error.password = '비밀번호는 8~20자 사이로 입력해 주세요.';
  }

  return error; // ex) {email: '유효하지 않은 이메일입니다.'}
};

// 에러 객체를 리턴하는 유효성 검사 함수
const validateLogin = (inputs: UserLoginInfo) => {
  return validateUser(inputs);
};

const validateSignUp = (inputs: UserLoginInfo & {passwordCheck: string}) => {
  const errors = validateUser(inputs);
  const signupErrors = {...errors, passwordCheck: ''};

  if (inputs.passwordCheck !== inputs.password) {
    signupErrors.passwordCheck = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
};

export {validateLogin, validateSignUp};
