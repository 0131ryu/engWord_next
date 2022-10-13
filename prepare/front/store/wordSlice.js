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

const dummyPost = {
  id: 1,
  User: {
    id: 1,
    nickname: "HI2",
  },
  english: "test",
  korean: "테스트",
  type: "easy",
  status: "C",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addWord: (state, action) => {
      state.wordList.push(action.payload),
        (state.wordList = [...state.wordList]);
    },
  },
});

export const { addWord } = postSlice.actions;

export default postSlice.reducer;
