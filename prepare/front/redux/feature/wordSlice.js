import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordLists: [],
  easyWordLists: [],
  middleWordLists: [],
  advanceWordLists: [],
  hasMoreEasy: true,
  hasMoreMiddle: true,
  hasMoreAdvance: true,
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
  loadWordListsLoading: false, //게임에 필요한 단어정보들 가져오기
  loadWordListsComplete: false,
  loadWordListsError: null,
  loadEasyWordsLoading: false, //easy 가져오기
  loadEasyWordsComplete: false,
  loadEasyWordsError: null,
  loadMiddleWordsLoading: false, //middle 가져오기
  loadMiddleWordsComplete: false,
  loadMiddleWordsError: null,
  loadAdvanceWordsLoading: false, //advance 가져오기
  loadAdvanceWordsComplete: false,
  loadAdvanceWordsError: null,
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
      state.addWordLoading = false;
      state.addWordComplete = true;
      data.map((d) => {
        state.wordLists.unshift(d);
        if (d.type === "easy") {
          state.easyWordLists.unshift(d);
        } else if (d.type === "middle") {
          state.middleWordLists.unshift(d);
        } else if (d.type === "advance") {
          state.advanceWordLists.unshift(d);
        }
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

      if (data.type === "easy") {
        const easyRevise = state.easyWordLists.find((v) => v.id === data.id);
        if (easyRevise) {
          //easyWordLists에 있는 경우(easy -> easy)
          easyRevise.english = data.english;
          easyRevise.korean = data.korean;
          easyRevise.type = data.type;
        } else {
          //easyWordLists에 없는 경우(다른 곳에서 easy로 옮김)
          const middleFindIndex = state.middleWordLists.findIndex(
            (w) => w.id === data.id
          );
          const advanceFindIndex = state.advanceWordLists.findIndex(
            (w) => w.id === data.id
          );
          if (middleFindIndex < 0) {
            //advance => easy
            state.advanceWordLists.splice(advanceFindIndex, 1);
          } else if (advanceFindIndex < 0) {
            //middle => easy
            state.middleWordLists.splice(middleFindIndex, 1);
          }
          state.easyWordLists.unshift(data);
        }
      } else if (data.type === "middle") {
        const middleRevise = state.middleWordLists.find(
          (v) => v.id === data.id
        );
        if (middleRevise) {
          //middleWordLists에 있는 경우(middle -> middle)
          middleRevise.english = data.english;
          middleRevise.korean = data.korean;
          middleRevise.type = data.type;
        } else {
          //middleWordLists에 없는 경우(다른 곳에서 middle로 옮김)
          const easyFindIndex = state.easyWordLists.findIndex(
            (w) => w.id === data.id
          );
          const advanceFindIndex = state.advanceWordLists.findIndex(
            (w) => w.id === data.id
          );
          if (easyFindIndex < 0) {
            //advance => middle
            state.advanceWordLists.splice(advanceFindIndex, 1);
          } else if (advanceFindIndex < 0) {
            //middle => middle
            state.easyWordLists.splice(easyFindIndex, 1);
          }
          state.middleWordLists.unshift(data);
        }
      } else if (data.type === "advance") {
        const advanceRevise = state.advanceWordLists.find(
          (v) => v.id === data.id
        );
        if (advanceRevise) {
          //advanceWordLists에 있는 경우(advance -> advance)
          advanceRevise.english = data.english;
          advanceRevise.korean = data.korean;
          advanceRevise.type = data.type;
        } else {
          //advanceWordLists에 없는 경우(다른 곳에서 advance로 옮김)
          const easyFindIndex = state.easyWordLists.findIndex(
            (w) => w.id === data.id
          );
          const middleFindIndex = state.middleWordLists.findIndex(
            (w) => w.id === data.id
          );
          if (easyFindIndex < 0) {
            //middle => advance
            state.middleWordLists.splice(middleFindIndex, 1);
          } else if (middleFindIndex < 0) {
            //easy => advance
            state.easyWordLists.splice(easyFindIndex, 1);
          }
          state.advanceWordLists.unshift(data);
        }
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

      if (data.type === "easy") {
        const easyFindIndex = state.easyWordLists.findIndex(
          (w) => w.id === data.id
        );
        state.easyWordLists.splice(easyFindIndex, 1);
      } else if (data.type === "middle") {
        const middleFindIndex = state.middleWordLists.findIndex(
          (w) => w.id === data.id
        );
        state.middleWordLists.splice(middleFindIndex, 1);
      } else if (data.type === "advance") {
        const advanceFindIndex = state.advanceWordLists.findIndex(
          (w) => w.id === data.id
        );
        state.advanceWordLists.splice(advanceFindIndex, 1);
      }
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

      const changeEasyStatus = state.easyWordLists.find(
        (v) => v.UserId === data[0].UserId
      );
      const changeMiddleStatus = state.middleWordLists.find(
        (v) => v.UserId === data[0].UserId
      );
      const changeAdvanceStatus = state.advanceWordLists.find(
        (v) => v.UserId === data[0].UserId
      );

      const showEasyStatus = state.easyWordLists.find(
        (v) => v.UserId === data[0].UserId && v.status === "C"
      );
      const showMiddleStatus = state.middleWordLists.find(
        (v) => v.UserId === data[0].UserId && v.status === "C"
      );
      const showAdvanceStatus = state.advanceWordLists.find(
        (v) => v.UserId === data[0].UserId && v.status === "C"
      );

      const changeStatus = state.wordLists.find(
        (v) => v.UserId === data[0].UserId
      );
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
      if (
        showStatus ||
        showEasyStatus ||
        showMiddleStatus ||
        showAdvanceStatus
      ) {
        state.checkedWordList.length = 0;
      }

      if (changeEasyStatus) {
        state.easyWordLists.map((word) => {
          word.status = data[0].status;
        });
      }
      if (changeMiddleStatus) {
        state.middleWordLists.map((word) => {
          word.status = data[0].status;
        });
      }
      if (changeAdvanceStatus) {
        state.advanceWordLists.map((word) => {
          word.status = data[0].status;
        });
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
      state.wordLists = state.wordLists.concat(data);
    },
    loadWordsFailure: (state, action) => {
      state.loadWordsLoading = false;
      state.loadWordsError = action.payload.response.data;
    },
    loadWordListsRequest: (state) => {
      state.loadWordListsLoading = true;
      state.loadWordListsError = null;
      state.loadWordListsComplete = false;
    },
    loadWordListsSuccess: (state, action) => {
      const data = action.payload;
      console.log("data", data);
      state.loadWordListsLoading = false;
      state.loadWordListsComplete = true;
      state.wordLists = state.wordLists.concat(data);
      state.hasMoreWords = data.length === 10;
    },
    loadWordListsFailure: (state, action) => {
      state.loadWordListsLoading = false;
      state.loadWordListsError = action.error;
    },
    loadEasyWordsRequest: (state) => {
      state.loadEasyWordsLoading = true;
      state.loadEasyWordsError = null;
      state.loadEasyWordsComplete = false;
    },
    loadEasyWordsSuccess: (state, action) => {
      const data = action.payload;
      state.loadEasyWordsLoading = false;
      state.loadEasyWordsComplete = true;
      state.easyWordLists = state.easyWordLists.concat(data);
      state.hasMoreEasy = data.length === 3;
    },
    loadEasyWordsFailure: (state, action) => {
      state.loadEasyWordsLoading = false;
      state.loadEasyWordsError = false;
    },
    loadMiddleWordsRequest: (state) => {
      state.loadMiddleWordsLoading = true;
      state.loadMiddleWordsError = null;
      state.loadMiddleWordsComplete = false;
    },
    loadMiddleWordsSuccess: (state, action) => {
      const data = action.payload;
      state.loadMiddleWordsLoading = false;
      state.loadMiddleWordsComplete = true;
      state.middleWordLists = state.middleWordLists.concat(data);
      state.hasMoreMiddle = data.length === 3;
    },
    loadMiddleWordsFailure: (state, action) => {
      state.loadMiddleWordsLoading = false;
      state.loadMiddleWordsError = false;
    },
    loadAdvanceWordsRequest: (state) => {
      state.loadAdvanceWordsLoading = true;
      state.loadAdvanceWordsError = null;
      state.loadAdvanceWordsComplete = false;
    },
    loadAdvanceWordsSuccess: (state, action) => {
      const data = action.payload;
      state.loadAdvanceWordsLoading = false;
      state.loadAdvanceWordsComplete = true;
      state.advanceWordLists = state.advanceWordLists.concat(data);
      state.hasMoreAdvance = data.length === 3;
    },
    loadAdvanceWordsFailure: (state, action) => {
      state.loadAdvanceWordsLoading = false;
      // state.loadAdvanceWordsError = action.payload.response.data;
      state.loadAdvanceWordsError = false;
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
  loadWordListsRequest,
  loadWordListsSuccess,
  loadWordListsFailure,
  loadEasyWordsRequest,
  loadEasyWordsSuccess,
  loadEasyWordsFailure,
  loadMiddleWordsRequest,
  loadMiddleWordsSuccess,
  loadMiddleWordsFailure,
  loadAdvanceWordsRequest,
  loadAdvanceWordsSuccess,
  loadAdvanceWordsFailure,
  loadCheckedRequest,
  loadCheckedSuccess,
  loadCheckedFailure,
  loadWordsWeekendRequest,
  loadWordsWeekendSuccess,
  loadWordsWeekendFailure,
} = wordSlice.actions;

export default wordSlice.reducer;
