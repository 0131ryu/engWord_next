import axios from "axios";
import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import {
  startGameRequest,
  startGameSuccess,
  startGameError,
  findHintRequest,
  findHintSuccess,
  findHintError,
} from "../feature/gameSlice";

function findHintAPI(data) {
  return axios.get(`/word/${data}`);
}

function* findHint(action) {
  try {
    const data = action.payload;
    const response = yield call(findHintAPI, data);
    console.log("response.data", response.data);
    yield put(findHintSuccess(response.data));
  } catch (error) {
    yield put(findHintError(error));
    console.log(error);
  }
}

// function startGameAPI() {
//   return axios.get("/game");
// }

function* startGame(action) {
  try {
    const data = action.payload;
    yield put(startGameSuccess(data));
  } catch (error) {
    yield put(startGameError(error));
    console.log(error);
  }
}

function* start_game_Req() {
  yield takeLatest(startGameRequest.type, startGame);
}

function* find_Hint_Req() {
  yield takeLatest(findHintRequest.type, findHint);
}

export const gameSaga = [fork(start_game_Req), fork(find_Hint_Req)];
