import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameWordLists: [],
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
      console.log("data", data);
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
      console.log(action.payload);
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
      state.gameWordLists = state.gameWordLists.concat(data);
    },
    addResultGameError: (state, action) => {
      state.addResultGameLoading = true;
      state.addResultGameError = action.error;
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
} = gameSlice.actions;

export default gameSlice.reducer;
