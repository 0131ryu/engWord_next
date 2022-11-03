import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import {
  addWordRequest,
  addWordSuccess,
  addWordError,
} from "../feature/wordSlice";

function* addWord(action) {
  try {
    const data = action.payload;
    console.log("data", data);
    yield put(addWordSuccess({ data: data }));
    // yield call(loginSuccess, data);
  } catch (error) {
    yield put(addWordError(error));
    console.log(error);
  }
}

function* add_Word_Req() {
  yield takeLatest(addWordRequest.type, addWord);
}

export const wordSagas = [fork(add_Word_Req)];
