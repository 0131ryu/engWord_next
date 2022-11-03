//등록하기
//삭제하기
//수정하기
//체크하기
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordList: [
    {
      id: 1,
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
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addWord: (state, action) => {
      state.wordList.push(action.payload),
        (state.wordList = [...state.wordList]);
    },
    addEasyWord: (state, action) => {
      state.easyList.push(action.payload),
        (state.easyList = [...state.easyList]);
    },
    addMiddleWord: (state, action) => {
      state.middleList.push(action.payload),
        (state.middleList = [...state.middleList]);
    },
    addAdvanceWord: (state, action) => {
      state.advanceList.push(action.payload),
        (state.advanceList = [...state.advanceList]);
    },
  },
});

export const { addWord, addEasyWord, addMiddleWord, addAdvanceWord } =
  postSlice.actions;

export default postSlice.reducer;
