import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  loadMyInfoRequest,
  loadMyInfoSuccess,
  loadMyInfoFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  changeNicknameRequest,
  changeNicknameSuccess,
  changeNicknameFailure,
  followRequest,
  followSuccess,
  followFailure,
  unfollowRequest,
  unfollowSuccess,
  unfollowFailure,
  loadFollowingsRequest,
  loadFollowingsSuccess,
  loadFollowingsFailure,
  loadFollowersRequest,
  loadFollowersSuccess,
  loadFollowersFailure,
  blockfollowRequest,
  blockfollowSuccess,
  blockfollowFailure,
  loadBlockingRequest,
  loadBlockingSuccess,
  loadBlockingFailure,
  loadBlockedRequest,
  loadBlockedSuccess,
  loadBlockedFailure,
  cancleBlockRequest,
  cancleBlockSuccess,
  cancleBlockFailure,
  uploadProfileImageRequest,
  uploadProfileImageSuccess,
  uploadProfileImageFailure,
} from "../feature/userSlice";
import axios from "axios";

function logInAPI(data) {
  return axios.post("/user/login", data);
}

function* logIn(action) {
  try {
    const data = action.payload;
    const result = yield call(logInAPI, data);
    yield put(loginSuccess(result.data));
  } catch (error) {
    yield put(loginFailure(error));
    console.log(error);
  }
}

function logOutAPI() {
  return axios.post("/user/logout");
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
    console.log(error);
  }
}

function signUpAPI(data) {
  return axios.post("/user", data);
}

function* signUp(action) {
  try {
    const data = action.payload;
    const result = yield call(signUpAPI, data);
    console.log("result", result);
    yield put(signupSuccess());
    // yield call(signupSuccess, data);
  } catch (error) {
    yield put(signupFailure(error));
  }
}

function loadMyInfoAPI() {
  return axios.get("/user");
}

function* loadMyInfo(action) {
  try {
    const data = action.payload;
    const result = yield call(loadMyInfoAPI, data);
    yield put(loadMyInfoSuccess(result.data));
  } catch (error) {
    yield put(loadMyInfoFailure(error));
    console.log(error);
  }
}

function loadUserAPI(data) {
  return axios.get(`/user/${data}`);
}

function* loadUser(action) {
  try {
    const data = action.payload;
    const result = yield call(loadUserAPI, data);
    console.log("result.data", result.data);
    yield put(loadUserSuccess(result.data));
  } catch (error) {
    yield put(loadUserFailure(error));
    console.log(error);
  }
}

function changeNicknameAPI(data) {
  return axios.patch("/user/nickname", { nickname: data });
}

function* changeNickname(action) {
  try {
    const data = action.payload;
    const result = yield call(changeNicknameAPI, data);
    // console.log("result", result);
    yield put(changeNicknameSuccess(result.data));
  } catch (error) {
    yield put(changeNicknameFailure(error));
    console.log(error);
  }
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const data = action.payload;
    console.log("data", data);
    const result = yield call(followAPI, data);
    yield put(followSuccess(result.data));
  } catch (error) {
    yield put(followFailure(error));
    console.log(error);
  }
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    const data = action.payload;
    const result = yield call(unfollowAPI, data);
    yield put(unfollowSuccess(result.data));
  } catch (error) {
    yield put(unfollowFailure(error));
    console.log(error);
  }
}

function loadFollowersAPI(data) {
  return axios.get("/user/followers", data);
}

function* loadFollowers(action) {
  try {
    const data = action.payload;
    console.log("data", data);
    const result = yield call(loadFollowersAPI, data);
    yield put(loadFollowersSuccess(result.data));
  } catch (error) {
    yield put(loadFollowersFailure(error));
    console.log(error);
  }
}

function loadFollowingsAPI(data) {
  return axios.get("/user/followings", data);
}

function* loadFollowings(action) {
  try {
    const data = action.payload;
    const result = yield call(loadFollowingsAPI, data);
    yield put(loadFollowingsSuccess(result.data));
  } catch (error) {
    yield put(loadFollowingsFailure(error));
    console.log(error);
  }
}

function blockFollowAPI(data) {
  return axios.post(`/user/block/${data}`);
}

function* blockFollow(action) {
  try {
    const data = action.payload;
    const result = yield call(blockFollowAPI, data);
    yield put(blockfollowSuccess(result.data));
  } catch (error) {
    yield put(blockfollowFailure(error));
    console.log(error);
  }
}

function loadBlockingAPI(data) {
  return axios.get("/user/blockings", data);
}

function* loadBlocking(action) {
  try {
    const data = action.payload;
    const result = yield call(loadBlockingAPI, data);
    yield put(loadBlockingSuccess(result.data));
  } catch (error) {
    yield put(loadBlockingFailure(error));
    console.log(error);
  }
}

function loadBlockedAPI(data) {
  return axios.get("/user/blockeds", data);
}

function* loadBlocked(action) {
  try {
    const data = action.payload;
    const result = yield call(loadBlockedAPI, data);
    yield put(loadBlockedSuccess(result.data));
  } catch (error) {
    yield put(loadBlockedFailure(error));
    console.log(error);
  }
}

function cancleBlockAPI(data) {
  return axios.delete(`/user/${data}/block`, data);
}

function* cancleBlock(action) {
  try {
    const data = action.payload;
    const result = yield call(cancleBlockAPI, data);
    yield put(cancleBlockSuccess(result.data));
  } catch (error) {
    yield put(cancleBlockFailure(error));
    console.log(error);
  }
}
//uploadProfileImage
function uploadProfileImageAPI(data) {
  return axios.post("/user/image", data);
}

function* uploadProfileImage(action) {
  try {
    const data = action.payload;
    const result = yield call(uploadProfileImageAPI, data);
    yield put(uploadProfileImageSuccess(result.data));
  } catch (error) {
    yield put(uploadProfileImageFailure(error));
    console.log(error);
  }
}

function* login_Req() {
  yield takeLatest(loginRequest.type, logIn);
}

function* logout_Req() {
  yield takeLatest(logoutRequest.type, logOut);
}

function* signup_Req() {
  yield takeLatest(signupRequest.type, signUp);
}

function* loadmyinfo_Req() {
  yield takeLatest(loadMyInfoRequest.type, loadMyInfo);
}

function* loaduser_Req() {
  yield takeLatest(loadUserRequest.type, loadUser);
}

function* changenickname_Req() {
  yield takeLatest(changeNicknameRequest.type, changeNickname);
}

function* follow_Req() {
  yield takeLatest(followRequest.type, follow);
}

function* unfollow_Req() {
  yield takeLatest(unfollowRequest.type, unfollow);
}

function* loadFollowers_Req() {
  yield takeLatest(loadFollowersRequest.type, loadFollowers);
}

function* loadFollowings_Req() {
  yield takeLatest(loadFollowingsRequest.type, loadFollowings);
}

function* blockFollow_Req() {
  yield takeLatest(blockfollowRequest.type, blockFollow);
}

function* loadBlocking_Req() {
  yield takeLatest(loadBlockingRequest.type, loadBlocking);
}

function* loadBlocked_Req() {
  yield takeLatest(loadBlockedRequest.type, loadBlocked);
}

function* cancleBlock_Req() {
  yield takeLatest(cancleBlockRequest.type, cancleBlock);
}

function* uploadProfileImage_Req() {
  yield takeLatest(uploadProfileImageRequest.type, uploadProfileImage);
}

export const userSagas = [
  fork(login_Req),
  fork(logout_Req),
  fork(signup_Req),
  fork(loadmyinfo_Req),
  fork(loaduser_Req),
  fork(changenickname_Req),
  fork(follow_Req),
  fork(unfollow_Req),
  fork(loadFollowers_Req),
  fork(loadFollowings_Req),
  fork(blockFollow_Req),
  fork(loadBlocking_Req),
  fork(loadBlocked_Req),
  fork(cancleBlock_Req),
  fork(uploadProfileImage_Req),
];
