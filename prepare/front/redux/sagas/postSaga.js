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
  likePostRequest,
  likePostSuccess,
  likePostFailure,
  unlikePostRequest,
  unlikePostSuccess,
  unlikePostFailure,
  uploadImagesRequest,
  uploadImagesSuccess,
  uploadImagesFailure,
} from "../feature/postSlice";
import axios from "axios";

function addPostAPI(data) {
  return axios.post("/post", data);
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
  return axios.delete(`/post/${data}`, data);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.payload);
    console.log("result.data", result.data);
    yield put(removePostSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(removePostFailure(err));
  }
}

function revisePostAPI(data) {
  return axios.patch(`/post/${data.postId}`, {
    postId: data.postId,
    editText: data.editText,
  });
}

function* revisePost(action) {
  try {
    const data = action.payload;
    const result = yield call(revisePostAPI, data);
    console.log("result", result);
    yield put(revisePostSuccess(result.data));
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
  //PostId
  return axios.delete(`/post/${data}`);
}

function* removeComment(action) {
  try {
    const data = action.payload;
    const result = yield call(removeCommentAPI, data);
    yield put(removeCommentSuccess(result.data));
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

function loadPostsAPI(data) {
  return axios.get(`/posts?lastId=${data || 0}`); //data로 넘어갔으므로 req.query.data?
}

function* loadPosts(action) {
  try {
    const data = action.payload;
    // console.log("data", data);
    const result = yield call(loadPostsAPI, data);
    yield put(loadPostsSuccess(result.data));
  } catch (error) {
    yield put(loadPostsFailure(error));
    console.log(error);
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const data = action.payload;
    const result = yield call(likePostAPI, data);
    yield put(likePostSuccess(result.data));
  } catch (error) {
    yield put(likePostFailure(error));
    console.log(error);
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const data = action.payload;
    console.log("data", data);
    const result = yield call(unlikePostAPI, data);
    yield put(unlikePostSuccess(result.data));
  } catch (error) {
    yield put(unlikePostFailure(error));
    console.log(error);
  }
}

//uploadImages
function uploadImagesAPI(data) {
  return axios.post("/post/images", data);
}

function* uploadImages(action) {
  try {
    const data = action.payload;
    console.log("data", data);
    const result = yield call(uploadImagesAPI, data);
    console.log("result.data", result.data);
    yield put(uploadImagesSuccess(result.data));
  } catch (error) {
    yield put(uploadImagesFailure(error));
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

function* likePost_Req() {
  yield takeLatest(likePostRequest.type, likePost);
}

function* unlikePost_Req() {
  yield takeLatest(unlikePostRequest.type, unlikePost);
}

function* uploadImages_Req() {
  yield takeLatest(uploadImagesRequest.type, uploadImages);
}

export const postSagas = [
  fork(addPost_Req),
  fork(removePost_Req),
  fork(revisePost_Req),
  fork(addComment_Req),
  fork(removeComment_Req),
  fork(reviseComment_Req),
  fork(loadPosts_Req),
  fork(likePost_Req),
  fork(unlikePost_Req),
  fork(uploadImages_Req),
];
