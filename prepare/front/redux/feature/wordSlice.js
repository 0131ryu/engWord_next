//등록하기
//삭제하기
//수정하기
//체크하기
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordLists: [
    {
      id: 0,
      english: "red",
      korean: "빨강",
      type: "easy",
    },
    {
      id: 1,
      english: "blue",
      korean: "파랑",
      type: "easy",
    },
    {
      id: 2,
      english: "yellow",
      korean: "노랑",
      type: "middle",
    },

    {
      id: 3,
      english: "green",
      korean: "초록",
      type: "advance",
    },
    {
      id: 4,
      english: "purple",
      korean: "보라",
      type: "advance",
    },
    {
      id: 5,
      english: "black",
      korean: "검정",
      type: "advance",
    },
  ],
  addWordLoading: false, //단어 추가
  addWordComplete: false,
  addWordError: null,
  reviseWordLoading: false, //단어 수정
  reviseWordComplete: false,
  reviseWordError: null,
  removeWordLoading: false, //단어 삭제
  removeWordComplete: false,
  removeWordError: null,
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
    //단어 수정(index값 필요할 것)
    reviseWordRequest: (state) => {
      state.reviseWordLoading = true;
      state.reviseWordError = null;
      state.reviseWordComplete = false;
    },
    reviseWordSuccess: (state, action) => {
      state.reviseWordLoading = false;
      state.reviseWordComplete = true;
      console.log("state.wordLists", state.wordLists);
      console.log(action.payload);
      // state.wordLists.splice(action.payload, 1);
    },
    reviseWordError: (state, action) => {
      state.reviseWordLoading = true;
      state.reviseWordError = action.error;
    },
    //단어 삭제(index값 필요할 것)
    removeWordRequest: (state) => {
      state.removeWordLoading = true;
      state.removeWordError = null;
      state.removeWordComplete = false;
    },
    removeWordSuccess: (state, action) => {
      state.removeWordLoading = false;
      state.removeWordComplete = true;
      state.wordLists.shift(action.payload);
      // state.wordLists.splice(action.payload, 1); //나중에 사용
    },
    removeWordError: (state, action) => {
      state.removeWordLoading = true;
      state.removeWordError = action.error;
    },
  },
});

export const {
  addWordRequest,
  addWordSuccess,
  addWordError,
  reviseWordRequest,
  reviseWordSuccess,
  reviseWordError,
  removeWordRequest,
  removeWordSuccess,
  removeWordError,
} = wordSlice.actions;

export default wordSlice.reducer;
