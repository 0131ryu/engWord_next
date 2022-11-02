import { all } from "redux-saga/effects";
import { userSagas } from "./userSaga";

export default function* rootSaga() {
  yield all([...userSagas]);
}
