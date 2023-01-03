import { createSlice } from "@reduxjs/toolkit";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    // 무작위로 index 값 생성 (0 이상 i 미만)
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const initialState = {
  gameWordLists: [],
  time: 0,
  startGameLoading: false,
  startGameComplete: false,
  startGameError: null,
  findHintLoading: false,
  findHintComplete: false,
  findHintError: null,
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
      state.startGameLoading = false;
      state.startGameComplete = true;
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
  },
});

export const {
  startGameRequest,
  startGameSuccess,
  startGameError,
  findHintRequest,
  findHintSuccess,
  findHintError,
} = gameSlice.actions;

export default gameSlice.reducer;
