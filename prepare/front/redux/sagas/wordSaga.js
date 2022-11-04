import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import {
  addWordRequest,
  addWordSuccess,
  addWordError,
} from "../feature/wordSlice";

function* addWord(action) {
  try {
    const data = action.payload;
    console.log("data type", typeof data);
    console.log("wordLists", typeof wordLists);
    yield put(addWordSuccess(data));
    // yield call(addWordSuccess, data);
  } catch (error) {
    yield put(addWordError(error));
    console.log(error);
  }
}

function* add_Word_Req() {
  yield takeLatest(addWordRequest.type, addWord);
}

export const wordSagas = [fork(add_Word_Req)];
