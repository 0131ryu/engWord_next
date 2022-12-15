import { all } from "redux-saga/effects";
import { userSagas } from "./userSaga";
import { wordSagas } from "./wordSaga";
import { postSagas } from "./postSaga";
import { gameSaga } from "./gameSaga";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3005";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([...userSagas, ...wordSagas, ...postSagas, ...gameSaga]);
}
