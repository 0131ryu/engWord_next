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
  changeStatusWordRequest,
  changeStatusWordSuccess,
  changeStatusWordError,
  changeStatusWordAllRequest,
  changeStatusWordAllSuccess,
  changeStatusWordAllError,
  searchWordRequest,
  searchWordSuccess,
  searchWordError,
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
  } catch (error) {
    yield put(removeWordError(error));
    console.log(error);
  }
}

function* changeStatus(action) {
  try {
    const data = action.payload;
    yield put(changeStatusWordSuccess(data));
  } catch (error) {
    yield put(changeStatusWordError(error));
    console.log(error);
  }
}

function* changeStatusAll(action) {
  try {
    const data = action.payload;
    yield put(changeStatusWordAllSuccess(data));
  } catch (error) {
    yield put(changeStatusWordAllError(error));
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
  //
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
    yield put(findWordError(error));
    console.log(error);
  }
}

//searchWord
function* searchWord(action) {
  try {
    const data = action.payload;
    yield put(searchWordSuccess(data));
  } catch (error) {
    yield put(searchWordError(error));
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

function* change_Status_Req() {
  yield takeLatest(changeStatusWordRequest.type, changeStatus);
}

function* change_StatusAll_Req() {
  yield takeLatest(changeStatusWordAllRequest.type, changeStatusAll);
}

function* search_Word_Req() {
  yield takeLatest(searchWordRequest.type, searchWord);
}

export const wordSagas = [
  fork(add_Word_Req),
  fork(revise_Word_Req),
  fork(remove_Word_Req),
  fork(find_Word_Req),
  fork(change_Status_Req),
  fork(change_StatusAll_Req),
  fork(search_Word_Req),
];
