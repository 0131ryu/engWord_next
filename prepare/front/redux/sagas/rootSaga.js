import { all } from "redux-saga/effects";
import { userSagas } from "./userSaga";
import { wordSagas } from "./wordSaga";
import { postSagas } from "./postSaga";
import { gameSaga } from "./gameSaga";
export default function* rootSaga() {
  yield all([...userSagas, ...wordSagas, ...postSagas, ...gameSaga]);
}
