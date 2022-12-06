import axios from "axios";
import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import {
  startTimerRequest,
  startTimerSuccess,
  startTimerError,
} from "../feature/gameSlice";

function* startTimer(action) {
  try {
    console.log("action", action);
    const data = action.payload;
    console.log("data", data);
    yield put(addWordSuccess(data));
  } catch (error) {
    yield put(addWordError(error));
    console.log(error);
  }
}

function* start_Timer_Req() {
  yield takeLatest(startTimerRequest.type, startTimer);
}

export const gameSaga = [fork(start_Timer_Req)];
