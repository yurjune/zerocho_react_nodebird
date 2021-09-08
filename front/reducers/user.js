export const initialState = {
  isLoggingIn: false, // 로그인 시도중
  isLoggingOut: false,
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

// action creator: 동적으로 action을 생성
export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  }
}

export const logoutRequestAction = (data) => {
  return {
    type: 'LOG_OUT_REQUEST',
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      console.log('reducer login');
      return {
        ...state,
        isLoggingIn: true,
      }
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
        me: { ...action.data, nickname: 'zerocho' }
      }
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      }
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
      }
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      }
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        isLoggingOut: false,
      }
    default:
      return state;
  }
};

export default reducer;