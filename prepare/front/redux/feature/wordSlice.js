import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordLists: [
    {
      id: 2,
      english: "red",
      korean: "빨강",
      type: "easy",
    },
    {
      id: 4,
      english: "blue",
      korean: "파랑",
      type: "easy",
    },
    {
      id: 3,
      english: "blue2",
      korean: "파랑2",
      type: "easy",
    },
    {
      id: 5,
      english: "blue3",
      korean: "파랑3",
      type: "easy",
    },
    {
      id: 7,
      english: "blue4",
      korean: "파랑4",
      type: "easy",
    },
    {
      id: 9,
      english: "blue5",
      korean: "파랑5",
      type: "easy",
    },
    {
      id: 2,
      english: "red",
      korean: "빨강",
      type: "easy",
    },
    {
      id: 4,
      english: "blue",
      korean: "파랑",
      type: "easy",
    },
    {
      id: 3,
      english: "blue2",
      korean: "파랑2",
      type: "easy",
    },
    {
      id: 5,
      english: "blue3",
      korean: "파랑3",
      type: "easy",
    },
    {
      id: 7,
      english: "blue4",
      korean: "파랑4",
      type: "easy",
    },
    {
      id: 9,
      english: "blue5",
      korean: "파랑5",
      type: "easy",
    },
    {
      id: 2,
      english: "red",
      korean: "빨강",
      type: "easy",
    },
    {
      id: 4,
      english: "blue",
      korean: "파랑",
      type: "easy",
    },

    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
    },

    {
      id: 8,
      english: "green",
      korean: "초록",
      type: "advance",
    },
    {
      id: 10,
      english: "purple",
      korean: "보라",
      type: "advance",
    },
    {
      id: 12,
      english: "black",
      korean: "검정",
      type: "advance",
    },
    {
      id: 14,
      english: "gray",
      korean: "회색",
      type: "advance",
    },
    {
      id: 16,
      english: "black2",
      korean: "검정2",
      type: "advance",
    },
    {
      id: 18,
      english: "black3",
      korean: "검정3",
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
  findWordLoading: false, //단어 찾기
  findWordComplete: false,
  findWordError: null,
  page: 0, // 페이지 이동
  minIndex: 0,
  maxIndex: 3,
  pageMiddle: 0, // 페이지 이동
  minIndexMiddle: 0,
  maxIndexMiddle: 3,
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
      const wordInfo = action.payload;
      state.reviseWordLoading = false;
      state.reviseWordComplete = true;
      console.log("slice", action.payload);
      console.log("slice.id", action.payload.id);
      state.wordLists.splice(wordInfo.id, 1, {
        id: wordInfo.id,
        english: wordInfo.english,
        korean: wordInfo.korean,
        type: wordInfo.type,
      });
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
      state.wordLists.splice(action.payload, 1);
    },
    removeWordError: (state, action) => {
      state.removeWordLoading = true;
      state.removeWordError = action.error;
    },
    //단어 찾기
    findWordRequest: (state) => {
      state.findWordLoading = true;
      state.findWordError = null;
      state.findWordComplete = false;
    },
    findWordSuccess: (state, action) => {
      state.findWordLoading = false;
      state.findWordComplete = true;
      // state.wordLists.unshift(action.payload, 1);
    },
    findWordError: (state, action) => {
      state.findWordLoading = true;
      state.findWordError = action.error;
    },
    //페이지 이동
    incrementEasy: (state) => {
      state.page += 1;
      const arrayEasy = [];

      state.wordLists.map((word, i) => {
        if (word.type === "easy") {
          arrayEasy.push(i);
        }
      });

      const easyLists = Object.keys(arrayEasy).length - 1;

      if (easyLists === state.maxIndex) {
        // state.page === state.page; //값 고정 필요
        state.minIndex = easyLists - 3;
        state.maxIndex = easyLists;
      } else {
        state.minIndex += 3;
        state.maxIndex += 3;
      }
    },
    decrementEasy: (state) => {
      state.page -= 1;
      if (state.page < 0) {
        state.page = 0;
        state.minIndex = 0;
        state.maxIndex = 3;
      } else {
        state.minIndex -= 3;
        state.maxIndex -= 3;
      }
    },
    incrementMiddle: (state) => {
      state.pageMiddle += 1;
      const arrayMiddle = [];

      state.wordLists.map((word, i) => {
        if (word.type === "middle") {
          arrayMiddle.push(i);
        }
      });

      // state.minIndexMiddle = Math.min.apply(null, arrayMiddle);
      // state.maxIndexMiddle = Math.min.apply(null, arrayMiddle) + 2;

      const middleLists = Object.keys(arrayMiddle).length - 1;

      if (middleLists === state.maxIndexMiddle) {
        // state.page === state.page; //값 고정 필요
        state.minIndexMiddle = middleLists - 3;
        state.maxIndexMiddle = middleLists;
      } else {
        state.minIndexMiddle += 3;
        state.maxIndexMiddle += 3;
      }
    },
    decrementMiddle: (state) => {
      state.pageMiddle -= 1;
      if (state.pageMiddle < 0) {
        state.pageMiddle = 0;
        state.minIndexMiddle = 0;
        state.maxIndexMiddle = 3;
      } else {
        state.minIndexMiddle -= 3;
        state.maxIndexMiddle -= 3;
      }
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
  findWordRequest,
  findWordSuccess,
  findWordError,
  incrementEasy,
  decrementEasy,
  incrementMiddle,
  decrementMiddle,
} = wordSlice.actions;

export default wordSlice.reducer;
