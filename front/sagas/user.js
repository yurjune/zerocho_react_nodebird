import { all, fork, call, takeLatest, put, delay } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data) { // 제너레이터 아님
  return axios.post('/api/login', data);
}

function logOutAPI(data) {
  return axios.post('/api/logout', data);
}

function* logIn(action) {
  console.log('saga login');
  // 성공 결과는 result.data, 실패결과는 err.response.data에 담겨진다.
  try {
    // call()에서 첫 번째 인수는 함수, 나머지 인수들은 첫 번째 인수 함수의 매개변수가 된다.
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);  // 아직 서버가 없으므로
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    })
  }
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data
    })
  }
}

function* watchLogin() {
  // LOI_IN_REQUEST 액션이 실행되면 logIn을 실행
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogout() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
  // all은 배열을 받아 배열 안의 요소들을 한번에 실행
  // call은 동기적으로, fork는 비동기적으로 함수를 실행
  yield all([
    fork(watchLogin),
    fork(watchLogout),
  ]);
}