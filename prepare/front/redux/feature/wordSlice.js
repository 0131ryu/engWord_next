import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordLists: [],
  checkedWordList: [],
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
  changeStatusWordLoading: false, //단어 상태 수정
  changeStatusWordComplete: false,
  changeStatusWordError: null,
  loadWordsLoading: false, //단어 가져오기
  loadWordsComplete: false,
  loadWordsError: null,
  loadCheckedLoading: false, //체크한 단어 가져오기
  loadCheckedComplete: false,
  loadCheckedError: null,
  loadWordsWeekendLoading: false, //일주일간 단어 가져오기
  loadWordsWeekendComplete: false,
  loadWordsWeekendError: null,
  findResult: [],
  searchResult: [],
  weekendResult: [],
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
      const data = action.payload;
      console.log("data", data);
      state.addWordLoading = false;
      state.addWordComplete = true;
      data.map((d) => {
        state.wordLists.unshift(d);
      });
      state.addWordError = null;
    },
    addWordError: (state, action) => {
      state.addWordLoading = false;
      state.addWordError = action.payload.response.data;
    },
    //단어 수정(index값 필요할 것)
    reviseWordRequest: (state) => {
      state.reviseWordLoading = true;
      state.reviseWordError = null;
      state.reviseWordComplete = false;
    },
    reviseWordSuccess: (state, action) => {
      const data = action.payload;
      state.reviseWordLoading = false;
      state.reviseWordComplete = true;

      const findRevise = state.wordLists.find((v) => v.id === data.id);

      if (findRevise) {
        findRevise.english = data.english;
        findRevise.korean = data.korean;
        findRevise.type = data.type;
      }
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
      const data = action.payload;
      state.removeWordLoading = false;
      state.removeWordComplete = true;

      const findIndex = state.wordLists.findIndex((w) => w.id === data.id);
      state.wordLists.splice(findIndex, 1);
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
      const data = action.payload;
      state.findResult.length = 0; //단어 검색할 때마다 초기화
      state.findResult.unshift(data);
    },
    findWordError: (state, action) => {
      state.findWordLoading = true;
      state.findWordError = action.error;
    },
    //개별 status 바꾸기
    changeStatusWordRequest: (state) => {
      state.changeStatusWordLoading = true;
      state.changeStatusWordError = null;
      state.changeStatusWordComplete = false;
    },
    changeStatusWordSuccess: (state, action) => {
      const data = action.payload;
      console.log("data", data);
      state.changeStatusWordLoading = false;
      state.changeStatusWordComplete = true;

      const changeStatus = state.wordLists.find((v) => v.id === data.id);
      const showStatus = state.wordLists.find(
        (v) => v.id === data.id && v.status === "C"
      );

      if (changeStatus) {
        changeStatus.status = data.status;
        state.checkedWordList = state.checkedWordList.concat(data);
      }
      if (showStatus) {
        //C -> A로 바꾸는 경우
        const index = state.checkedWordList.findIndex(
          (word) => word.id === data.id
        );
        console.log("index", index);
        state.checkedWordList.splice(index, 1);
        state.checkedWordList = state.checkedWordList.filter(
          (word) => word.id !== data.id
        );
      }
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
      const data = action.payload;
      state.changeStatusWordLoading = false;
      state.changeStatusWordComplete = true;

      const changeStatus = state.wordLists.find((v) => v.UserId === data[0].id);
      const showStatus = state.wordLists.find(
        (v) => v.UserId === data[0].UserId && v.status === "C"
      );

      if (changeStatus) {
        state.wordLists.map((word) => {
          word.status = data[0].status;
          state.checkedWordList.length = 0;
          state.checkedWordList = state.checkedWordList.concat(data);
        });
      }
      if (showStatus) {
        state.checkedWordList.length = 0;
        state.checkedWordList = state.checkedWordList.concat(data);
      }
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
      const data = action.payload;
      state.removeWordComplete = false;
      state.searchWordLoading = false;
      state.searchWordComplete = true;
      state.searchResult.length = 0;
      state.searchResult = state.searchResult.concat(data);
    },
    searchWordError: (state, action) => {
      state.searchWordLoading = true;
      state.searchWordError = action.error;
    },
    loadWordsRequest: (state) => {
      state.loadWordsLoading = true;
      state.loadWordsError = null;
      state.loadWordsComplete = false;
    },
    loadWordsSuccess: (state, action) => {
      const data = action.payload;
      state.loadWordsLoading = false;
      state.loadWordsComplete = true;
      //전체 word
      state.wordLists.length = 0;
      state.wordLists = state.wordLists.concat(data);
    },
    loadWordsFailure: (state, action) => {
      state.loadWordsLoading = false;
      state.loadWordsError = action.error;
    },
    loadCheckedRequest: (state) => {
      state.loadCheckedLoading = true;
      state.loadCheckedError = null;
      state.loadCheckedComplete = false;
    },
    loadCheckedSuccess: (state, action) => {
      const data = action.payload;
      state.loadCheckedLoading = false;
      state.loadCheckedComplete = true;
      state.checkedWordList.length = 0;
      state.checkedWordList = state.checkedWordList.concat(data);
    },
    loadCheckedFailure: (state, action) => {
      state.loadCheckedLoading = false;
      state.loadCheckedError = action.error;
    },
    loadWordsWeekendRequest: (state) => {
      state.loadWordsWeekendLoading = true;
      state.loadWordsWeekendError = null;
      state.loadWordsWeekendComplete = false;
    },
    loadWordsWeekendSuccess: (state, action) => {
      const data = action.payload;
      state.loadWordsWeekendLoading = false;
      state.loadWordsWeekendComplete = true;
      //전체 word
      state.weekendResult.length = 0;
      state.weekendResult = state.weekendResult.concat(data);
    },
    loadWordsWeekendFailure: (state, action) => {
      state.loadWordsWeekendLoading = false;
      state.loadWordsWeekendError = action.error;
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
  loadWordsRequest,
  loadWordsSuccess,
  loadWordsFailure,
  loadCheckedRequest,
  loadCheckedSuccess,
  loadCheckedFailure,
  loadWordsWeekendRequest,
  loadWordsWeekendSuccess,
  loadWordsWeekendFailure,
} = wordSlice.actions;

export default wordSlice.reducer;
