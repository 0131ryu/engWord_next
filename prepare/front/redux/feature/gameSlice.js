import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkedWordLists: [
    { id: 1, english: "green", korean: "초록", type: "advance", status: "A" },
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
  ],
  time: 0,
  startTimerLoading: false,
  startTimerComplete: false,
  startTimerError: null,
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
      console.log("state.wordLists", typeof state.wordLists);
    },
    startTimerError: (state, action) => {
      state.startTimerLoading = true;
      state.startTimerError = action.error;
    },
  },
});

export const { startTimerRequest, startTimerSuccess, startTimerError } =
  gameSlice.actions;

export default gameSlice.reducer;
