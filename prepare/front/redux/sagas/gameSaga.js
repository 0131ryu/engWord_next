import axios from "axios";
import { takeLatest, put, fork, call, delay } from "redux-saga/effects";
import {
  startGameRequest,
  startGameSuccess,
  startGameError,
  findHintRequest,
  findHintSuccess,
  findHintError,
  addResultGameRequest,
  addResultGameSuccess,
  addResultGameError,
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

function* startGame(action) {
  try {
    const data = action.payload;
    yield put(startGameSuccess(data));
  } catch (error) {
    yield put(startGameError(error));
    console.log(error);
  }
}

function addResultGameAPI(data) {
  return axios.post("/game", {
    answer: data.answer,
    wrongAnswer: data.wrongAnswer,
    score: data.score,
  });
}

function* addResultGame(action) {
  try {
    const data = action.payload;
    console.log("data", data);
    const result = yield call(addResultGameAPI, data);
    console.log("result.data", result.data);
    // yield put(addResultGameSuccess(result.data));
  } catch (error) {
    yield put(addResultGameError(error));
    console.log(error);
  }
}

function* start_Game_Req() {
  yield takeLatest(startGameRequest.type, startGame);
}

function* find_Hint_Req() {
  yield takeLatest(findHintRequest.type, findHint);
}

function* add_Result_Game_Req() {
  yield takeLatest(addResultGameRequest.type, addResultGame);
}

export const gameSaga = [
  fork(start_Game_Req),
  fork(find_Hint_Req),
  fork(add_Result_Game_Req),
];
