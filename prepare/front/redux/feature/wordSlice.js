import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordLists: [
    {
      id: 2,
      english: "red",
      korean: "빨강",
      type: "easy",
      status: "A",
    },
    {
      id: 4,
      english: "orange",
      korean: "주황색",
      type: "easy",
      status: "A",
    },
    {
      id: 3,
      english: "yellow",
      korean: "노랑색",
      type: "easy",
      status: "A",
    },
    {
      id: 5,
      english: "green",
      korean: "초록색",
      type: "easy",
      status: "A",
    },
    {
      id: 7,
      english: "blue",
      korean: "파랑",
      type: "easy",
      status: "A",
    },
    {
      id: 9,
      english: "purple",
      korean: "보라색",
      type: "easy",
      status: "A",
    },
    {
      id: 2,
      english: "red",
      korean: "빨강",
      type: "easy",
      status: "A",
    },
    {
      id: 4,
      english: "blue",
      korean: "파랑",
      type: "easy",
      status: "A",
    },
    {
      id: 3,
      english: "blue2",
      korean: "파랑2",
      type: "easy",
      status: "A",
    },
    {
      id: 5,
      english: "blue3",
      korean: "파랑3",
      type: "easy",
      status: "A",
    },
    {
      id: 7,
      english: "blue4",
      korean: "파랑4",
      type: "easy",
      status: "A",
    },
    {
      id: 9,
      english: "blue5",
      korean: "파랑5",
      type: "easy",
      status: "A",
    },
    {
      id: 2,
      english: "red",
      korean: "빨강",
      type: "easy",
      status: "A",
    },
    {
      id: 4,
      english: "blue",
      korean: "파랑",
      type: "easy",
      status: "A",
    },

    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
      status: "A",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
      status: "A",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
      status: "A",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
      status: "A",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
      status: "A",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
      status: "A",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
      status: "A",
    },
    {
      id: 6,
      english: "yellow",
      korean: "노랑",
      type: "middle",
      status: "A",
    },

    {
      id: 8,
      english: "green",
      korean: "초록",
      type: "advance",
      status: "A",
    },
    {
      id: 10,
      english: "purple",
      korean: "보라",
      type: "advance",
      status: "A",
    },
    {
      id: 12,
      english: "black",
      korean: "검정",
      type: "advance",
      status: "A",
    },
    {
      id: 14,
      english: "gray",
      korean: "회색",
      type: "advance",
      status: "A",
    },
    {
      id: 16,
      english: "black2",
      korean: "검정2",
      type: "advance",
      status: "A",
    },
    {
      id: 18,
      english: "black3",
      korean: "검정3",
      type: "advance",
      status: "A",
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
  findWordLoading: false, //단어 찾기(추가)
  findWordComplete: false,
  findWordError: null,
  searchWordLoading: false, //단어 검색
  searchWordComplete: false,
  searchWordError: null,
  changeStatusWordLoading: false, //단어 상태 수정
  changeStatusWordComplete: false,
  changeStatusWordError: null,
  page: 0, // 페이지 이동
  minIndex: 0,
  maxIndex: 3,
  pageMiddle: 0, // 페이지 이동
  minIndexMiddle: 0,
  maxIndexMiddle: 3,
  searchResult: [],
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
      state.wordLists.unshift(action.payload.toLowerCase);
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
        english: wordInfo.english.toLowerCase,
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
      const data = action.payload;

      const findEng = data.english;
      console.log("findEng", findEng);
      const splitEnglish = findEng.split("; ");
      console.log("splitEnglish", splitEnglish);

      state.findWordLoading = false;
      state.findWordComplete = true;

      if (findEng.match(/[(;\)]+/g)) {
        for (let i = 0; i < splitEnglish.length; i++) {
          state.wordLists.unshift(
            {
              id: data.id,
              english: splitEnglish[i],
              korean: data.korean,
              type: data.type,
            },
            1
          );
        }
      } else {
        state.wordLists.unshift(
          {
            id: data.id,
            english: data.english,
            korean: data.korean,
            type: data.type,
          },
          1
        );
      }
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

      if (state.minIndexMiddle < 0) {
        state.minIndexMiddle = 0;
      }

      state.wordLists.map((word, i) => {
        if (word.type === "middle") {
          arrayMiddle.push(i);
        }
      });

      const lastMiddleIndex = arrayMiddle[arrayMiddle.length - 1];

      console.log(lastMiddleIndex);

      if (lastMiddleIndex < state.maxIndexMiddle) {
        state.minIndexMiddle = lastMiddleIndex - 3;
        state.maxIndexMiddle = lastMiddleIndex;
      } else {
        state.minIndexMiddle += 3;
        state.maxIndexMiddle += 3;
      }
    },
    decrementMiddle: (state) => {
      if (state.minIndexMiddle < 0) {
        state.minIndexMiddle = 0;
      }

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
    //개별 status 바꾸기
    changeStatusWordRequest: (state) => {
      state.changeStatusWordLoading = true;
      state.changeStatusWordError = null;
      state.changeStatusWordComplete = false;
    },
    changeStatusWordSuccess: (state, action) => {
      const wordInfo = action.payload;
      state.changeStatusWordLoading = false;
      state.changeStatusWordComplete = true;

      state.wordLists[wordInfo.id].status = wordInfo.status;
    },
    changeStatusWordError: (state, action) => {
      state.changeStatusWordLoading = true;
      state.changeStatusWordError = action.error;
    },
    //전체 status 바꾸기
    changeStatusWordAllRequest: (state) => {
      state.changeStatusWordLoading = true;
      state.changeStatusWordError = null;
      state.changeStatusWordComplete = false;
    },
    changeStatusWordAllSuccess: (state, action) => {
      const wordInfo = action.payload;
      state.changeStatusWordLoading = false;
      state.changeStatusWordComplete = true;

      state.wordLists.map((word) => {
        word.status = wordInfo.status;
      });
    },
    changeStatusWordAllError: (state, action) => {
      state.changeStatusWordLoading = true;
      state.changeStatusWordError = action.error;
    },
    //단어 검색
    searchWordRequest: (state) => {
      state.searchWordLoading = true;
      state.searchWordError = null;
      state.searchWordComplete = false;
    },
    searchWordSuccess: (state, action) => {
      const searchEng = action.payload;
      state.searchWordLoading = false;
      state.searchWordComplete = true;
      // const result = state.wordLists.find(
      //   (element) => element.english === searchEng
      // );
      const result = state.wordLists.filter(
        (element) => element.english === searchEng.toLowerCase()
      );

      console.log(result);
      state.searchResult.push(result);

      if (state.searchResult.length > 0) {
        state.searchResult = [];
        state.searchResult.push(result);
      }
    },
    searchWordError: (state, action) => {
      state.searchWordLoading = true;
      state.searchWordError = action.error;
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
  changeStatusWordRequest,
  changeStatusWordSuccess,
  changeStatusWordError,
  changeStatusWordAllRequest,
  changeStatusWordAllSuccess,
  changeStatusWordAllError,
  searchWordRequest,
  searchWordSuccess,
  searchWordError,
} = wordSlice.actions;

export default wordSlice.reducer;
