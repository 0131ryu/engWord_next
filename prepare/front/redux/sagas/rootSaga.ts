import { all } from "redux-saga/effects";
import { userSagas } from "./userSaga";
import { wordSagas } from "./wordSaga";
import { postSagas } from "./postSaga";
import { gameSaga } from "./gameSaga";
import { quoteSaga } from "./quoteSaga";
import axios from "axios";
import { backUrl } from "../../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...wordSagas,
    ...postSagas,
    ...gameSaga,
    ...quoteSaga,
  ]);
}
