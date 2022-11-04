//등록하기
//삭제하기
//수정하기
//체크하기
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordLists: [
    {
      id: 1,
      english: "red",
      korean: "빨강",
      type: "easy",
    },
    {
      id: 2,
      english: "blue",
      korean: "파랑",
      type: "easy",
    },
    {
      id: 3,
      english: "yellow",
      korean: "노랑",
      type: "middle",
    },

    {
      id: 4,
      english: "green",
      korean: "초록",
      type: "advance",
    },
    {
      id: 5,
      english: "purple",
      korean: "보라",
      type: "advance",
    },
    {
      id: 6,
      english: "black",
      korean: "검정",
      type: "advance",
    },
  ],
  addWordLoading: false, //단어 추가
  addWordComplete: false,
  addWordError: null,
};

export const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    //단어 추가
    addWordRequest: (state) => {
      state.addWordLoading = true;
      state.addWordError = null;
      state.addWordComplete = false;
    },
    addWordSuccess: (state, action) => {
      state.addWordLoading = false;
      state.addWordComplete = true;
      console.log("state.wordLists", typeof state.wordLists);
      state.wordLists.unshift(action.payload);
    },
    addWordError: (state, action) => {
      state.addWordLoading = true;
      state.addWordError = action.error;
    },
  },
});

export const { addWordRequest, addWordSuccess, addWordError } =
  wordSlice.actions;

export default wordSlice.reducer;
