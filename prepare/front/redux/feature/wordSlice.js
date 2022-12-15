import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wordLists: [
    // {
    //   id: 2,
    //   english: "red",
    //   korean: "빨강",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 4,
    //   english: "orange",
    //   korean: "주황색",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 3,
    //   english: "yellow",
    //   korean: "노랑색",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 5,
    //   english: "green",
    //   korean: "초록색",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 7,
    //   english: "blue",
    //   korean: "파랑",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 9,
    //   english: "purple",
    //   korean: "보라색",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 2,
    //   english: "ban",
    //   korean: "금지",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 4,
    //   english: "yawn",
    //   korean: "하품",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 3,
    //   english: "topic",
    //   korean: "주제",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 5,
    //   english: "develop",
    //   korean: "성장하다",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 7,
    //   english: "murder",
    //   korean: "살인",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 9,
    //   english: "biology",
    //   korean: "생물학",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 2,
    //   english: "science",
    //   korean: "과학",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 4,
    //   english: "rainbow",
    //   korean: "무지개",
    //   type: "easy",
    //   status: "A",
    // },
    // {
    //   id: 6,
    //   english: "seed",
    //   korean: "씨앗",
    //   type: "middle",
    //   status: "A",
    // },
    // {
    //   id: 6,
    //   english: "kidney",
    //   korean: "신장",
    //   type: "middle",
    //   status: "A",
    // },
    // {
    //   id: 6,
    //   english: "culprit",
    //   korean: "범인",
    //   type: "middle",
    //   status: "A",
    // },
    // {
    //   id: 6,
    //   english: "pillow",
    //   korean: "베개",
    //   type: "middle",
    //   status: "A",
    // },
    // {
    //   id: 6,
    //   english: "ability",
    //   korean: "실력",
    //   type: "middle",
    //   status: "A",
    // },
    // {
    //   id: 6,
    //   english: "solution",
    //   korean: "해결",
    //   type: "middle",
    //   status: "A",
    // },
    // {
    //   id: 6,
    //   english: "purpose",
    //   korean: "목적",
    //   type: "middle",
    //   status: "A",
    // },
    // {
    //   id: 6,
    //   english: "arise",
    //   korean: "일어나다",
    //   type: "middle",
    //   status: "A",
    // },
    // {
    //   id: 8,
    //   english: "interval",
    //   korean: "(시간적)간격, 사이",
    //   type: "advance",
    //   status: "A",
    // },
    // {
    //   id: 10,
    //   english: "patent",
    //   korean: "특허(의), 특허권",
    //   type: "advance",
    //   status: "A",
    // },
    // {
    //   id: 12,
    //   english: "term",
    //   korean: "용어, 학기, 기간",
    //   type: "advance",
    //   status: "A",
    // },
    // {
    //   id: 14,
    //   english: "exceed",
    //   korean: "넘다, 초과하다",
    //   type: "advance",
    //   status: "A",
    // },
    // {
    //   id: 16,
    //   english: "emit",
    //   korean: "방출하다, 내뿜다",
    //   type: "advance",
    //   status: "A",
    // },
    // {
    //   id: 18,
    //   english: "contemporary",
    //   korean: "동시대의, 현대의",
    //   type: "advance",
    //   status: "A",
    // },
  ],
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
      const data = action.payload;
      state.addWordLoading = false;
      state.addWordComplete = true;
      state.wordLists.unshift(data);
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
      console.log("reviseWordSuccess", wordInfo);
      state.wordLists.splice(wordInfo.id, 1, {
        id: wordInfo.id,
        english: wordInfo.english.toLowerCase(),
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
              english: splitEnglish[i].toLowerCase(),
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
            english: data?.english.toLowerCase(),
            korean: data?.korean,
            type: data?.type,
          },
          1
        );
      }
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
      const wordInfo = action.payload;
      state.changeStatusWordLoading = false;
      state.changeStatusWordComplete = true;

      state.wordLists.splice(wordInfo.id, 1, {
        id: wordInfo.id,
        english: state.wordLists[wordInfo.id].english,
        korean: state.wordLists[wordInfo.id].korean,
        type: state.wordLists[wordInfo.id].type,
        status: wordInfo.status,
      });

      if (wordInfo.status === "C") {
        //  state.checkedWordList.splice()
        state.checkedWordList.push(state.wordLists[wordInfo.id]);
      } else if (wordInfo.status === "A") {
        state.checkedWordList.pop(state.wordLists[wordInfo.id]);
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
      const wordInfo = action.payload;
      state.changeStatusWordLoading = false;
      state.changeStatusWordComplete = true;

      state.checkedWordList.length = 0;

      state.wordLists.map((word, i) => {
        word.status = wordInfo.status;
        if (word.status === "C") {
          state.checkedWordList.push(state.wordLists[i]);
        } else if (word.status === "A") {
          state.checkedWordList.pop();
        }
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
      const searchWord = action.payload;
      const result = "";
      state.searchWordLoading = false;
      state.searchWordComplete = true;
      // const result = state.wordLists.filter(
      //   (element) => element.english === searchWord.toLowerCase()
      // );

      if (searchWord.match(/^[가-힣]*$/g)) {
        result = state.wordLists.filter(
          (element) => element.korean === searchWord
        );
      } else if (searchWord.match(/^[a-zA-Z]*$/g)) {
        result = state.wordLists.filter(
          (element) => element.english === searchWord.toLowerCase()
        );
      }

      console.log(result);
      state.searchResult.push(result);
      if (state.searchResult.length > 0) {
        state.searchResult = []; //검색 시 빈칸으로 시작
        state.searchResult.push(result);
      }
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
      console.log("Data", data);
      state.loadWordsLoading = false;
      state.loadWordsComplete = true;
      state.wordLists = state.wordLists.concat(data);
    },
    loadWordsFailure: (state, action) => {
      state.loadWordsLoading = false;
      state.loadWordsError = action.error;
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
} = wordSlice.actions;

export default wordSlice.reducer;
