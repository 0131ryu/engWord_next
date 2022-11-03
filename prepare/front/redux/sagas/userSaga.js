import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
} from "../feature/userSlice";

function* logIn(action) {
  try {
    const data = action.payload;
    console.log("data", data);
    yield put(loginSuccess({ data: data }));
    // yield call(loginSuccess, data);
  } catch (error) {
    yield put(loginFailure(error));
    console.log(error);
  }
}

function* logOut() {
  try {
    // yield delay(1000);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
    console.log(error);
  }
}

function* signUp(action) {
  console.log("Connected?");
  try {
    const data = action.payload;
    console.log("data", data);
    yield put(signupSuccess({ data: data }));
    // yield call(signupSuccess, data);
  } catch (error) {
    yield put(signupFailure(error));
    console.log(error);
  }
}

function* login_Req() {
  yield takeLatest(loginRequest.type, logIn);
}

function* logout_Req() {
  yield takeLatest(logoutRequest.type, logOut);
}

function* signup_Req() {
  yield takeLatest(signupRequest.type, signUp);
}

export const userSagas = [fork(login_Req), fork(logout_Req), fork(signup_Req)];
