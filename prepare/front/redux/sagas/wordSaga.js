import axios from "axios";
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
  findWordRequest,
  findWordSuccess,
  findWordError,
} from "../feature/wordSlice";

function* addWord(action) {
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

function* reviseWord(action) {
  try {
    console.log("action", action);
    const data = action.payload;
    console.log("data", data);
    yield put(reviseWordSuccess(data));
  } catch (error) {
    yield put(reviseWordError(error));
    console.log(error);
  }
}

function* removeWord(action) {
  try {
    console.log("action", action);
    const data = action.payload;
    console.log("data", data);
    yield put(removeWordSuccess(data));
    // yield call(addWordSuccess, data);
  } catch (error) {
    yield put(removeWordError(error));
    console.log(error);
  }
}

async function findWordAPI(data) {
  console.log("api로 전달한 data", data);
  //back에서 연결하기
  // try {
  //   await axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_WORD_URL}?key=${process.env.NEXT_PUBLIC_WORD_API}&q=${data}&advanced=y&method=exact&translated=y&trans_lang=1`
  //       //https://krdict.korean.go.kr/api/search?key=2022874DB25BA22E3C851287F7D87618&q=충전&advanced=y&method=exact&translated=y&trans_lang=1
  //     )
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error("Network response was not ok.");
  //     })
  //     .then((data) => {
  //       console.log(JSON.stringify(data));
  //     })
  //     .catch((error) => {
  //       (error) => {
  //         alert(error);
  //         return false;
  //       };
  //     });
  // } catch (error) {
  //   console.log(error);
  // }
}

function* findWord(action) {
  try {
    console.log("action", action);
    const data = action.payload;
    console.log("data", data);
    const response = yield call(findWordAPI, data);
    console.log("Response", response);
    // yield put(findWordSuccess(data));
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

function* find_Word_Req() {
  yield takeLatest(findWordRequest.type, findWord);
}

export const wordSagas = [
  fork(add_Word_Req),
  fork(revise_Word_Req),
  fork(remove_Word_Req),
  fork(find_Word_Req),
];
