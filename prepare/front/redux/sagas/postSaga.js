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
  loadPostRequest,
  loadPostSuccess,
  loadPostFailure,
  loadUserPostsRequest,
  loadUserPostsSuccess,
  loadUserPostsFailure,
  loadHashtagPostsRequest,
  loadHashtagPostsSuccess,
  loadHashtagPostsFailure,
  loadSearchPostsRequest,
  loadSearchPostsSuccess,
  loadSearchPostsFailure,
  likePostRequest,
  likePostSuccess,
  likePostFailure,
  unlikePostRequest,
  unlikePostSuccess,
  unlikePostFailure,
  uploadImagesRequest,
  uploadImagesSuccess,
  uploadImagesFailure,
  deleteImageRequest,
  deleteImageSuccess,
  deleteImageFailure,
  reviseImageRequest,
  reviseImageSuccess,
  reviseImageFailure,
  retweetRequest,
  retweetSuccess,
  retweetFailure,
  bookmarkRequest,
  bookmarkSuccess,
  bookmarkFailure,
  unbookmarkRequest,
  unbookmarkSuccess,
  unbookmarkFailure,
} from "../feature/postSlice";
import axios from "axios";

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    const data = action.payload;
    const result = yield call(addPostAPI, data);
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
    const data = action.payload;
    const result = yield call(removePostAPI, data);
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
    const result = yield call(addCommentAPI, action.payload);
    yield put(addCommentSuccess(result.data));
  } catch (err) {
    console.error(err);
    yield put(addCommentFailure(err));
  }
}

function removeCommentAPI(data) {
  //PostId
  return axios.delete(`/post/comment/${data.commentId}`);
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
  return axios.patch(`/post/comment/${data.commentId}`, data);
}

function* reviseComment(action) {
  try {
    const data = action.payload;
    const result = yield call(reviseCommentAPI, data);
    yield put(reviseCommentSuccess(result.data));
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
    const result = yield call(loadPostsAPI, data);
    yield put(loadPostsSuccess(result.data));
  } catch (error) {
    yield put(loadPostsFailure(error));
    console.log(error);
  }
}

function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const data = action.payload;
    const result = yield call(loadPostAPI, data);
    yield put(loadPostSuccess(result.data));
  } catch (error) {
    yield put(loadPostFailure(error));
    console.log(error);
  }
}

function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`); //data로 넘어갔으므로 req.query.data?
}

function* loadUserPosts(action) {
  try {
    const data = action.payload;
    const result = yield call(loadUserPostsAPI, data);
    yield put(loadUserPostsSuccess(result.data));
  } catch (error) {
    yield put(loadUserPostsFailure(error));
    console.log(error);
  }
}

function loadHashtagPostsAPI(data, lastId) {
  return axios.get(
    `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`
  ); //data로 넘어갔으므로 req.query.data?
}

function* loadHashtagPosts(action) {
  try {
    const data = action.payload.data;
    const lastId = action.payload?.lastId;
    const result = yield call(loadHashtagPostsAPI, data, lastId);
    yield put(loadHashtagPostsSuccess(result.data));
  } catch (error) {
    yield put(loadHashtagPostsFailure(error));
    console.log(error);
  }
}

//loadSearchPosts
function loadSearchPostsAPI(data, lastId) {
  return axios.get(
    `/posts/search/${encodeURIComponent(data)}?lastId=${lastId || 0}`
  ); //data로 넘어갔으므로 req.query.data?
}

function* loadSearchPosts(action) {
  try {
    const data = action.payload.data;
    const lastId = action.payload?.lastId;
    const result = yield call(loadSearchPostsAPI, data, lastId);
    yield put(loadSearchPostsSuccess(result.data));
  } catch (error) {
    yield put(loadSearchPostsFailure(error));
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
    const result = yield call(unlikePostAPI, data);
    yield put(unlikePostSuccess(result.data));
  } catch (error) {
    yield put(unlikePostFailure(error));
    console.log(error);
  }
}

function uploadImagesAPI(data) {
  return axios.post("/post/images", data);
}

function* uploadImages(action) {
  try {
    const data = action.payload;
    const result = yield call(uploadImagesAPI, data);
    yield put(uploadImagesSuccess(result.data));
  } catch (error) {
    yield put(uploadImagesFailure(error));
    console.log(error);
  }
}

function deleteImageAPI(data) {
  return axios.delete(`post/images/${data}`, data);
}

function* deleteImage(action) {
  try {
    const data = action.payload;
    const result = yield call(deleteImageAPI, data);
    yield put(deleteImageSuccess(result.data));
  } catch (error) {
    yield put(deleteImageFailure(error));
    console.log(error);
  }
}

//reviseImage
function reviseImageAPI(data) {
  return axios.patch("post/images/revise", data);
}

function* reviseImage(action) {
  try {
    const data = action.payload;
    const result = yield call(reviseImageAPI, data);
    yield put(reviseImageSuccess(result.data));
  } catch (error) {
    yield put(reviseImageFailure(error));
    console.log(error);
  }
}

function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweet(action) {
  try {
    const data = action.payload;
    const result = yield call(retweetAPI, data);
    yield put(retweetSuccess(result.data));
  } catch (error) {
    yield put(retweetFailure(error));
  }
}

function bookmarkAPI(data) {
  return axios.patch(`/post/${data}/bookmark`);
}

function* bookmark(action) {
  try {
    const data = action.payload;
    const result = yield call(bookmarkAPI, data);
    yield put(bookmarkSuccess(result.data));
  } catch (error) {
    yield put(bookmarkFailure(error));
    console.log(error);
  }
}

function unbookmarkAPI(data) {
  return axios.delete(`/post/${data}/bookmark`);
}

function* unbookmark(action) {
  try {
    const data = action.payload;
    const result = yield call(unbookmarkAPI, data);
    yield put(unbookmarkSuccess(result.data));
  } catch (error) {
    yield put(unbookmarkFailure(error));
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

function* loadPost_Req() {
  yield takeLatest(loadPostRequest.type, loadPost);
}

function* loadUserPosts_Req() {
  yield takeLatest(loadUserPostsRequest.type, loadUserPosts);
}

function* loadHashtagPosts_Req() {
  yield takeLatest(loadHashtagPostsRequest.type, loadHashtagPosts);
}

function* loadSearchPosts_Req() {
  yield takeLatest(loadSearchPostsRequest.type, loadSearchPosts);
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

function* deleteImage_Req() {
  yield takeLatest(deleteImageRequest.type, deleteImage);
}

function* reviseImage_Req() {
  yield takeLatest(reviseImageRequest.type, reviseImage);
}

function* retweet_Req() {
  yield takeLatest(retweetRequest.type, retweet);
}

function* bookmark_Req() {
  yield takeLatest(bookmarkRequest.type, bookmark);
}

function* unbookmark_Req() {
  yield takeLatest(unbookmarkRequest.type, unbookmark);
}

export const postSagas = [
  fork(addPost_Req),
  fork(removePost_Req),
  fork(revisePost_Req),
  fork(addComment_Req),
  fork(removeComment_Req),
  fork(reviseComment_Req),
  fork(loadPosts_Req),
  fork(loadPost_Req),
  fork(loadUserPosts_Req),
  fork(loadHashtagPosts_Req),
  fork(loadSearchPosts_Req),
  fork(likePost_Req),
  fork(unlikePost_Req),
  fork(uploadImages_Req),
  fork(deleteImage_Req),
  fork(reviseImage_Req),
  fork(retweet_Req),
  fork(bookmark_Req),
  fork(unbookmark_Req),
];
