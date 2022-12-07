import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkedWordLists: [
    { id: 1, english: "green", korean: "초록", type: "advance", status: "C" },
    {
      id: 3,
      english: "purple",
      korean: "보라",
      type: "advance",
      status: "C",
    },
    {
      id: 5,
      english: "yellow",
      korean: "노랑",
      type: "advance",
      status: "C",
    },
    {
      id: 7,
      english: "red",
      korean: "빨강",
      type: "advance",
      status: "C",
    },
    {
      id: 9,
      english: "blue",
      korean: "파랑",
      type: "advance",
      status: "C",
    },
    { id: 2, english: "book", korean: "책", type: "advance", status: "C" },
    {
      id: 4,
      english: "pencil",
      korean: "연필",
      type: "advance",
      status: "C",
    },
    {
      id: 6,
      english: "laptop",
      korean: "노트북",
      type: "advance",
      status: "C",
    },
    {
      id: 8,
      english: "water bottle",
      korean: "물통",
      type: "advance",
      status: "C",
    },
    {
      id: 10,
      english: "keyboard",
      korean: "키보드",
      type: "advance",
      status: "C",
    },
  ],
  time: 0,
  startTimerLoading: false,
  startTimerComplete: false,
  startTimerError: null,
  findHintLoading: false,
  findHintComplete: false,
  findHintError: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    //timer
    startTimerRequest: (state) => {
      state.startTimerLoading = true;
      state.startTimerError = null;
      state.startTimerComplete = false;
    },
    startTimerSuccess: (state, action) => {
      state.startTimerLoading = false;
      state.startTimerComplete = true;
    },
    startTimerError: (state, action) => {
      state.startTimerLoading = true;
      state.startTimerError = action.error;
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
      const data = action.payload;
      console.log("hint slice data", data);
    },
    findHintError: (state, action) => {
      state.findHintLoading = true;
      state.findHintError = action.error;
    },
  },
});

export const {
  startTimerRequest,
  startTimerSuccess,
  startTimerError,
  findHintRequest,
  findHintSuccess,
  findHintError,
} = gameSlice.actions;

export default gameSlice.reducer;
