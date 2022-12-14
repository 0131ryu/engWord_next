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
import axios from "axios";

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    const data = action.payload;
    const result = yield call(logInAPI, data);
    console.log("result", result);
    yield put(loginSuccess(result.data));
  } catch (error) {
    yield put(loginFailure(error));
    console.log(error);
  }
}

function logOutAPI() {
  return axios.post("/user/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
    console.log(error);
  }
}

function signUpAPI(data) {
  return axios.post("/user", data);
}

function* signUp(action) {
  try {
    const data = action.payload;
    const result = yield call(signUpAPI, data);
    console.log("result", result);
    yield put(signupSuccess());
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
