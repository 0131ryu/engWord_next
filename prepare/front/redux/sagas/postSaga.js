import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import shortId from "shortid";
import {
  addPostRequest,
  addPostSuccess,
  addPostFailure,
} from "../feature/postSlice";

function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    //   const result = yield call(addPostAPI, action.data);
    const id = shortId.generate();
    yield put(addPostSuccess({ data: { id, content: action.payload } }));
  } catch (err) {
    console.error(err);
    yield put(addPostFailure(err));
  }
}
function* addPost_Req() {
  yield takeLatest(addPostRequest.type, addPost);
}

export const postSagas = [fork(addPost_Req)];
