import axios from "axios";
import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import {
  startTimerRequest,
  startTimerSuccess,
  startTimerError,
  findHintRequest,
  findHintSuccess,
  findHintError,
} from "../feature/gameSlice";

function* startTimer(action) {
  try {
    console.log("action", action);
    const data = action.payload;
    console.log("data", data);
    yield put(addWordSuccess(data));
  } catch (error) {
    yield put(addWordError(error));
    console.log(error);
  }
}

// async function findHintAPI(data) {
//   try {
//     const response = await axios
//       .get(`http://localhost:8000/word/${data}`)
//       .then((data) => {
//         data = JSON.stringify(data);
//       })
//       .catch((error) => {
//         alert(error);
//         console.error(error);
//       });
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

function findHintAPI(data) {
  return axios.get(`http://localhost:8000/word/${data}`);
}

function* findHint(action) {
  try {
    const data = action.payload;
    const response = yield call(findHintAPI, data);
    // console.log("response.data", response.data);
    yield put(findHintSuccess(response.data));
  } catch (error) {
    yield put(findHintError(error));
    console.log(error);
  }
}

function* start_Timer_Req() {
  yield takeLatest(startTimerRequest.type, startTimer);
}

function* find_Hint_Req() {
  yield takeLatest(findHintRequest.type, findHint);
}

export const gameSaga = [fork(start_Timer_Req), fork(find_Hint_Req)];
