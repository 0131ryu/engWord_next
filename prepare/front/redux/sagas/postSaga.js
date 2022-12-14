import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import shortId from "shortid";
import {
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  removePostRequest,
  removePostSuccess,
  removePostFailure,
  revisePostRequest,
  revisePostSuccess,
  revisePostFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  removeCommentRequest,
  removeCommentSuccess,
  removeCommentFailure,
} from "../feature/postSlice";

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    //   const result = yield call(addPostAPI, action.data);
    console.log(action.payload);
    const id = shortId.generate();
    yield put(addPostSuccess({ data: { id, content: action.payload } }));
  } catch (err) {
    console.error(err);
    yield put(addPostFailure(err));
  }
}

function removePostAPI(data) {
  return axios.post("/post", data);
}

function* removePost(action) {
  try {
    //   const result = yield call(removePostAPI, action.data);
    console.log(action.payload);
    yield put(removePostSuccess(action.payload));
  } catch (err) {
    console.error(err);
    yield put(removePostFailure(err));
  }
}

function revisePostAPI(data) {
  return axios.post("/post", data);
}

function* revisePost(action) {
  try {
    const data = action.payload;
    yield put(revisePostSuccess(data));
  } catch (err) {
    console.error(err);
    yield put(revisePostFailure(err));
  }
}

function addCommentAPI(data) {
  return axios.post("/post", data);
}

function* addComment(action) {
  try {
    //   const result = yield call(addCommentAPI, action.data);
    console.log(action.payload);
    const id = shortId.generate();
    yield put(addCommentSuccess({ data: { id, content: action.payload } }));
  } catch (err) {
    console.error(err);
    yield put(addCommentFailure(err));
  }
}

function removeCommentAPI(data) {
  return axios.post("/post", data);
}

function* removeComment(action) {
  try {
    //   const result = yield call(removeCommentAPI, action.data);
    console.log(action.payload);
    yield put(removeCommentSuccess(action.payload));
  } catch (err) {
    console.error(err);
    yield put(removeCommentFailure(err));
  }
}

function* addPost_Req() {
  yield takeLatest(addPostRequest.type, addPost);
}

function* removePost_Req() {
  yield takeLatest(removePostRequest.type, removePost);
}

function* revisePost_Req() {
  yield takeLatest(revisePostRequest.type, revisePost);
}

function* addComment_Req() {
  yield takeLatest(addCommentRequest.type, addComment);
}

function* removeComment_Req() {
  yield takeLatest(removeCommentRequest.type, removeComment);
}

export const postSagas = [
  fork(addPost_Req),
  fork(removePost_Req),
  fork(revisePost_Req),
  fork(addComment_Req),
  fork(removeComment_Req),
];
