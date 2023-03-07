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
  loadWordsRequest,
  loadWordsSuccess,
  loadWordsFailure,
  loadWordListsRequest,
  loadWordListsSuccess,
  loadWordListsFailure,
  loadEasyWordsRequest,
  loadEasyWordsSuccess,
  loadEasyWordsFailure,
  loadMiddleWordsRequest,
  loadMiddleWordsSuccess,
  loadMiddleWordsFailure,
  loadAdvanceWordsRequest,
  loadAdvanceWordsSuccess,
  loadAdvanceWordsFailure,
  loadCheckedRequest,
  loadCheckedSuccess,
  loadCheckedFailure,
  loadWordsWeekendRequest,
  loadWordsWeekendSuccess,
  loadWordsWeekendFailure,
} from "../feature/wordSlice";

function addWordAPI(data) {
  return axios.post("/word", {
    english: data.english,
    korean: data.korean,
    type: data.type,
  });
}

function* addWord(action) {
  try {
    const data = action.payload;
    const result = yield call(addWordAPI, data);
    yield put(addWordSuccess(result.data));
  } catch (error) {
    yield put(addWordError(error));
  }
}

function reviseWordAPI(data) {
  return axios.patch(`/word/${data.id}`, {
    id: data.id,
    english: data.editEng,
    korean: data.editKor,
    type: data.editType,
  });
}

function* reviseWord(action) {
  try {
    const data = action.payload;
    const result = yield call(reviseWordAPI, data);
    yield put(reviseWordSuccess(result.data));
  } catch (error) {
    yield put(reviseWordError(error));
    console.log(error);
  }
}

function removeWordAPI(data) {
  return axios.delete(`/word/${data}`, data);
}

function* removeWord(action) {
  try {
    const data = action.payload;
    const result = yield call(removeWordAPI, data);
    yield put(removeWordSuccess(result.data));
  } catch (error) {
    yield put(removeWordError(error));
    console.log(error);
  }
}

function changeStatusAPI(data) {
  return axios.patch(`/word/${data.id}/${data.status}`, {
    id: data.id,
    status: data.status,
  });
}

function* changeStatus(action) {
  try {
    const data = action.payload;
    const result = yield call(changeStatusAPI, data);
    yield put(changeStatusWordSuccess(result.data));
  } catch (error) {
    yield put(changeStatusWordError(error));
    console.log(error);
  }
}

function changeStatusAllAPI(data) {
  return axios.patch(`/word/all/${data.userId}/${data.status}`, {
    status: data.status,
    userId: data.userId,
  });
}

function* changeStatusAll(action) {
  try {
    const data = action.payload;
    const result = yield call(changeStatusAllAPI, data);
    yield put(changeStatusWordAllSuccess(result.data));
  } catch (error) {
    yield put(changeStatusWordAllError(error));
    console.log(error);
  }
}

function findWordAPI(data) {
  return axios.get(`/word/${data}`);
}

function* findWord(action) {
  try {
    const data = action.payload;
    const result = yield call(findWordAPI, data);
    yield put(findWordSuccess(result.data));
  } catch (error) {
    yield put(findWordError(error));
    console.log(error);
  }
}

function searchWordAPI(data) {
  return axios.get(`/word/search/${data}`);
}

function* searchWord(action) {
  try {
    const data = action.payload;
    const result = yield call(searchWordAPI, data);
    console.log("result", result);
    yield put(searchWordSuccess(result.data));
  } catch (error) {
    yield put(searchWordError(error));
    console.log(error);
  }
}

function loadWordsAPI() {
  return axios.get("/words");
}

function* loadWords(action) {
  try {
    const data = action.payload;
    const result = yield call(loadWordsAPI, data);
    yield put(loadWordsSuccess(result.data));
  } catch (error) {
    yield put(loadWordsFailure(error));
    console.log(error);
  }
}

function loadWordListsAPI(data) {
  return axios.get(`/words/game?lastId=${data || 0}`);
}

function* loadWordLists(action) {
  try {
    const data = action.payload;
    console.log("data", data);
    const result = yield call(loadWordListsAPI, data);
    yield put(loadWordListsSuccess(result.data));
  } catch (error) {
    yield put(loadWordListsFailure(error));
    console.log(error);
  }
}

function loadEasyWordsAPI(data) {
  return axios.get(`/words/easy?lastId=${data || 0}`);
}

function* loadEasyWords(action) {
  try {
    const data = action.payload;
    const result = yield call(loadEasyWordsAPI, data);
    yield put(loadEasyWordsSuccess(result.data));
  } catch (error) {
    yield put(loadEasyWordsFailure(error));
    console.log(error);
  }
}

function loadMiddleWordsAPI(data) {
  return axios.get(`/words/middle?lastId=${data || 0}`);
}

function* loadMiddleWords(action) {
  try {
    const data = action.payload;
    const result = yield call(loadMiddleWordsAPI, data);
    yield put(loadMiddleWordsSuccess(result.data));
  } catch (error) {
    yield put(loadMiddleWordsFailure(error));
    console.log(error);
  }
}

function loadAdvanceWordsAPI(data) {
  return axios.get(`/words/advance?lastId=${data || 0}`);
}

function* loadAdvanceWords(action) {
  try {
    const data = action.payload;
    const result = yield call(loadAdvanceWordsAPI, data);
    yield put(loadAdvanceWordsSuccess(result.data));
  } catch (error) {
    yield put(loadAdvanceWordsFailure(error));
    console.log(error);
  }
}

//loadChecked
function loadCheckedAPI() {
  return axios.get("/words/checked");
}

function* loadChecked(action) {
  try {
    const data = action.payload;
    const result = yield call(loadCheckedAPI, data);
    yield put(loadCheckedSuccess(result.data));
  } catch (error) {
    yield put(loadCheckedFailure(error));
    console.log(error);
  }
}

function loadWordsWeekendAPI() {
  return axios.get("/words/weekend");
}

function* loadWordsWeekend(action) {
  try {
    const data = action.payload;
    const result = yield call(loadWordsWeekendAPI, data);
    yield put(loadWordsWeekendSuccess(result.data));
  } catch (error) {
    yield put(loadWordsWeekendFailure(error));
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

function* load_Words_Req() {
  yield takeLatest(loadWordsRequest.type, loadWords);
}

function* load_WordLists_Req() {
  yield takeLatest(loadWordListsRequest.type, loadWordLists);
}

function* load_EasyWords_Req() {
  yield takeLatest(loadEasyWordsRequest.type, loadEasyWords);
}

function* load_MiddleWords_Req() {
  yield takeLatest(loadMiddleWordsRequest.type, loadMiddleWords);
}

function* load_AdvanceWords_Req() {
  yield takeLatest(loadAdvanceWordsRequest.type, loadAdvanceWords);
}

function* load_Checked_Req() {
  yield takeLatest(loadCheckedRequest.type, loadChecked);
}

function* load_Words_Weekend_Req() {
  yield takeLatest(loadWordsWeekendRequest.type, loadWordsWeekend);
}

export const wordSagas = [
  fork(add_Word_Req),
  fork(revise_Word_Req),
  fork(remove_Word_Req),
  fork(find_Word_Req),
  fork(change_Status_Req),
  fork(change_StatusAll_Req),
  fork(search_Word_Req),
  fork(load_Words_Req),
  fork(load_WordLists_Req),
  fork(load_EasyWords_Req),
  fork(load_MiddleWords_Req),
  fork(load_AdvanceWords_Req),
  fork(load_Checked_Req),
  fork(load_Words_Weekend_Req),
];
