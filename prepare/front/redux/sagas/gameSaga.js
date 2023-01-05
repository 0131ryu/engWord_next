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
  loadGamesRequest,
  loadGamesSuccess,
  loadGamesFailure,
  loadGameRequest,
  loadGameSuccess,
  loadGameFailure,
  addScoreRequest,
  addScoreSuccess,
  addScoreFailure,
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
    yield put(addResultGameSuccess(result.data));
  } catch (error) {
    yield put(addResultGameError(error));
    console.log(error);
  }
}

//loadGames
function loadGamesAPI() {
  return axios.get("/games");
}

function* loadGames(action) {
  try {
    const data = action.payload;
    const result = yield call(loadGamesAPI, data);
    // console.log("result.data", result.data);
    yield put(loadGamesSuccess(result.data));
  } catch (error) {
    yield put(loadGamesFailure(error));
    console.log(error);
  }
}

function loadGameAPI() {
  return axios.get("/games/now");
}

function* loadGame(action) {
  try {
    const data = action.payload;
    const result = yield call(loadGameAPI, data);
    yield put(loadGameSuccess(result.data));
  } catch (error) {
    yield put(loadGameFailure(error));
    console.log(error);
  }
}

// addScore
function addScoreAPI(data) {
  return axios.post("/game/score", data);
}

function* addScore(action) {
  try {
    const data = action.payload;
    console.log("data", data);
    const result = yield call(addScoreAPI, data);
    console.log("result.data", result.data);
    // yield put(addScoreSuccess(result.data));
  } catch (error) {
    yield put(addScoreFailure(error));
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

function* load_Games_Req() {
  yield takeLatest(loadGamesRequest.type, loadGames);
}

function* load_Game_Req() {
  yield takeLatest(loadGameRequest.type, loadGame);
}

function* add_Score_Req() {
  yield takeLatest(addScoreRequest.type, addScore);
}

export const gameSaga = [
  fork(start_Game_Req),
  fork(find_Hint_Req),
  fork(add_Result_Game_Req),
  fork(load_Games_Req),
  fork(load_Game_Req),
  fork(add_Score_Req),
];
