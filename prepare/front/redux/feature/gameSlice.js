import { createSlice } from "@reduxjs/toolkit";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    // 무작위로 index 값 생성 (0 이상 i 미만)
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const initialState = {
  checkedWordLists: [
    // {
    //   question: "초록",
    //   answer: 1,
    //   choices: ["green", "purple", "yellow", "blue"],
    // },
    // {
    //   question: "보라",
    //   answer: 2,
    //   choices: ["red", "purple", "yellow", "blue"],
    // },
    // {
    //   question: "노랑",
    //   answer: 3,
    //   choices: ["orange", "sky blue", "yellow", "blue"],
    // },
    // {
    //   question: "파랑",
    //   answer: 4,
    //   choices: ["black", "white", "pink", "blue"],
    // },
    // {
    //   question: "자바",
    //   answer: 1,
    //   choices: ["Java", "Python", "C", "Jakarta"],
    // },
    // {
    //   question: "사과",
    //   answer: 3,
    //   choices: ["grape", "mango", "apple", "blueberry"],
    // },
    // {
    //   question: "노트북",
    //   answer: 1,
    //   choices: ["labtop", "headphone", "mouse", "microphone"],
    // },
    // {
    //   question: "영어",
    //   answer: 1,
    //   choices: ["english", "korean", "chinese", "japanes"],
    // },
    // {
    //   question: "도움",
    //   answer: 3,
    //   choices: ["happy", "sad", "help", "good"],
    // },
    // {
    //   question: "바다",
    //   answer: 4,
    //   choices: ["sky", "earth", "dark", "sea"],
    // },
    // {
    //   question: "비디오",
    //   answer: 2,
    //   choices: ["computer", "video", "audio", "phone"],
    // },
  ],
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
      data.map((d) => {
        state.checkedWordLists.push(d);
      });
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
