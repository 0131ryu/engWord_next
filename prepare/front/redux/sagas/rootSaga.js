import { all } from "redux-saga/effects";
import { userSagas } from "./userSaga";
import { wordSagas } from "./wordSaga";
export default function* rootSaga() {
  yield all([...userSagas, ...wordSagas]);
}
