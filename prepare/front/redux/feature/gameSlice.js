import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordLists: [],
  hasMoreWords: true,
  gameWordLists: [],
  gameResultLists: [],
  gameScoreLists: [],
  gameScore: [],
  time: 0,
  startGameLoading: false,
  startGameComplete: false,
  startGameError: null,
  findHintLoading: false,
  findHintComplete: false,
  findHintError: null,
  addResultGameLoading: false,
  addResultGameComplete: false,
  addResultGameError: null,
  HintLists: [],
  loadGamesLoading: false, //모든 게임 정보 가져오기
  loadGamesComplete: false,
  loadGamesError: null,
  loadGameLoading: false, //개별 게임 score 가져오기
  loadGameComplete: false,
  loadGameError: null,
  addScoreLoading: false, //개별 게임 score 저장하기
  addScoreComplete: false,
  addScoreError: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGameRequest: (state) => {
      state.startGameLoading = true;
      state.startGameError = null;
      state.startGameComplete = false;
    },
    startGameSuccess: (state, action) => {
      const data = action.payload;
      state.startGameLoading = false;
      state.startGameComplete = true;
      state.gameWordLists.length = 0;
      state.gameWordLists = state.gameWordLists.concat(data);
    },
    startGameError: (state, action) => {
      state.startGameLoading = true;
      state.startGameError = action.error;
    },
    //힌트 찾기
    findHintRequest: (state) => {
      state.findHintLoading = true;
      state.findHintError = null;
      state.findHintComplete = false;
    },
    findHintSuccess: (state, action) => {
      state.findHintLoading = false;
      state.findHintComplete = true;
      if (state.HintLists.length > 0) {
        state.HintLists.length = 0;
      }

      state.HintLists.push(action.payload);
    },
    findHintError: (state, action) => {
      state.findHintLoading = true;
      state.findHintError = action.error;
    },
    addResultGameRequest: (state) => {
      state.addResultGameLoading = true;
      state.addResultGameError = null;
      state.addResultGameComplete = false;
    },
    addResultGameSuccess: (state, action) => {
      const data = action.payload;
      state.addResultGameLoading = false;
      state.addResultGameComplete = true;
      state.gameResultLists = state.gameResultLists.concat(data);
    },
    addResultGameError: (state, action) => {
      state.addResultGameLoading = true;
      state.addResultGameError = action.error;
    },
    loadGamesRequest: (state) => {
      state.loadGamesLoading = true;
      state.loadGamesError = null;
      state.loadGamesComplete = false;
    },
    loadGamesSuccess: (state, action) => {
      const data = action.payload;
      state.loadGamesLoading = false;
      state.loadGamesComplete = true;
      if (state.gameScoreLists.length > 0) {
        state.gameScoreLists.length = 0;
      }
      state.gameScoreLists = state.gameScoreLists.concat(data);
    },
    loadGamesFailure: (state, action) => {
      state.loadGamesLoading = false;
      state.loadGamesError = action.error;
    },
    loadGameRequest: (state) => {
      state.loadGameLoading = true;
      state.loadGameError = null;
      state.loadGameComplete = false;
    },
    loadGameSuccess: (state, action) => {
      const data = action.payload;
      state.loadGameLoading = false;
      state.loadGameComplete = true;
      state.gameScore.length = 0;
      state.gameScore.push(data[0].score);
    },
    loadGameFailure: (state, action) => {
      state.loadGameLoading = false;
      state.loadGameError = action.error;
    },
    addScoreRequest: (state) => {
      state.addScoreLoading = true;
      state.addScoreError = null;
      state.addScoreComplete = false;
    },
    addScoreSuccess: (state, action) => {
      const data = action.payload;
      state.addScoreLoading = false;
      state.addScoreComplete = true;
      state.gameScore.length = 0;
      state.gameScore = state.gameScore.concat(data);
    },
    addScoreFailure: (state, action) => {
      state.addScoreLoading = false;
      state.addScoreError = action.error;
    },
  },
});

export const {
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
} = gameSlice.actions;

export default gameSlice.reducer;
