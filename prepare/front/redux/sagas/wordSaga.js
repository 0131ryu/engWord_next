import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import {
  addWordRequest,
  addWordSuccess,
  addWordError,
  reviseWordRequest,
  reviseWordSuccess,
  reviseWordError,
  removeWordRequest,
  removeWordSuccess,
  removeWordError,
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

function* reviseWord(action) {
  try {
    const data = action.payload;
    console.log("data type", typeof data);
    console.log("wordLists", typeof wordLists);
    yield put(reviseWordSuccess(data));
    // yield call(addWordSuccess, data);
  } catch (error) {
    yield put(reviseWordError(error));
    console.log(error);
  }
}

function* removeWord(action) {
  try {
    const data = action.payload;
    console.log("data type", typeof data);
    console.log("wordLists", typeof wordLists);
    yield put(removeWordSuccess(data));
    // yield call(addWordSuccess, data);
  } catch (error) {
    yield put(removeWordError(error));
    console.log(error);
  }
}

function* add_Word_Req() {
  yield takeLatest(addWordRequest.type, addWord);
}

function* revise_Word_Req() {
  yield takeLatest(reviseWordRequest.type, reviseWord);
}

function* remove_Word_Req() {
  yield takeLatest(removeWordRequest.type, removeWord);
}

export const wordSagas = [
  fork(add_Word_Req),
  fork(revise_Word_Req),
  fork(remove_Word_Req),
];
