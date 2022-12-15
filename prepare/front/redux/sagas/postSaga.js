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
  reviseCommentRequest,
  reviseCommentSuccess,
  reviseCommentFailure,
  loadPostsRequest,
  loadPostsSuccess,
  loadPostsFailure,
} from "../feature/postSlice";
import axios from "axios";

function addPostAPI(data) {
  return axios.post("/post", { content: data });
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.payload);
    yield put(addPostSuccess(result.data));
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
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    console.log("action.payload", action.payload);
    const result = yield call(addCommentAPI, action.payload);
    console.log("result", result);
    yield put(addCommentSuccess(result.data));
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

function reviseCommentAPI(data) {
  return axios.post("/post", data);
}

function* reviseComment(action) {
  try {
    //   const result = yield call(reviseCommentAPI, action.data);
    console.log(action.payload);
    yield put(reviseCommentSuccess(action.payload));
  } catch (err) {
    console.error(err);
    yield put(reviseCommentFailure(err));
  }
}

function loadPostsAPI() {
  return axios.get("/posts");
}

function* loadPosts(action) {
  try {
    const data = action.payload;
    const result = yield call(loadPostsAPI, data);
    yield put(loadPostsSuccess(result.data));
  } catch (error) {
    yield put(loadPostsFailure(error));
    console.log(error);
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

function* reviseComment_Req() {
  yield takeLatest(reviseCommentRequest.type, reviseComment);
}

function* loadPosts_Req() {
  yield takeLatest(loadPostsRequest.type, loadPosts);
}

export const postSagas = [
  fork(addPost_Req),
  fork(removePost_Req),
  fork(revisePost_Req),
  fork(addComment_Req),
  fork(removeComment_Req),
  fork(reviseComment_Req),
  fork(loadPosts_Req),
];
