import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
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

function* login_Req() {
  yield takeLatest(loginRequest.type, logIn);
}

function* logout_Req() {
  yield takeLatest(logoutRequest.type, logOut);
}

export const userSagas = [fork(login_Req), fork(logout_Req)];
