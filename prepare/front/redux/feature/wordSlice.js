//등록하기
//삭제하기
//수정하기
//체크하기
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  words: [
    {
      id: 3,
      User: {
        id: 1,
        nickname: "HIHI",
      },
      english: "hello",
      korean: "안녕하세요",
      type: "easy",
      status: "C",
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
      state.wordList = action.payload;
      console.log("state.wordList", state.wordList);
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
