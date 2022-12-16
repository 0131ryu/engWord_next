import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginLoading: false, //로그인 시도
  loginComplete: false,
  loginError: null,
  logoutLoading: false, //로그아웃 시도
  logoutComplete: false,
  logoutError: null,
  signupLoading: false, //회원가입 시도
  signupComplete: false,
  signupError: null,
  loadMyInfoLoading: false, //내 정보 가져오기
  loadMyInfoComplete: false,
  loadMyInfoError: null,
  changeNicknameLoading: false, //닉네임 변경
  changeNicknameComplete: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

const testUser = (data) => ({
  nickname: "tester",
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [],
  Followers: [],
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //로그인
    loginRequest: (state) => {
      state.loginLoading = true;
      state.loginError = null;
      state.loginComplete = false;
    },
    loginSuccess: (state, action) => {
      state.loginLoading = false;
      state.loginComplete = true;
      state.me = action.payload;
    },
    loginFailure: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.error;
    },
    //로그아웃
    logoutRequest: (state) => {
      state.logoutLoading = true;
      state.logoutError = null;
      state.logoutComplete = false;
    },
    logoutSuccess: (state) => {
      state.me = null;
      state.logoutLoading = false;
      state.logoutComplete = true;
    },
    logoutFailure: (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.error;
    },
    //회원가입
    signupRequest: (state) => {
      state.signupLoading = true;
      state.signupError = null;
      state.signupComplete = false;
    },
    signupSuccess: (state) => {
      state.me = null;
      state.signupLoading = false;
      state.signupComplete = true;
    },
    signupFailure: (state, action) => {
      state.signupLoading = false;
      state.signupError = action.error;
    },
    //내정보 불러오기 loadMyInfoRequest
    loadMyInfoRequest: (state) => {
      state.loadMyInfoLoading = true;
      state.loadMyInfoError = null;
      state.loadMyInfoComplete = false;
    },
    loadMyInfoSuccess: (state, action) => {
      state.loadMyInfoLoading = false;
      state.loadMyInfoComplete = true;
      state.me = action.payload;
    },
    loadMyInfoFailure: (state, action) => {
      state.loadMyInfoLoading = false;
      state.loadMyInfoError = action.error;
    },
    //닉네임 변경
    changeNicknameRequest: (state) => {
      state.changeNicknameLoading = true;
      state.changeNicknameError = null;
      state.changeNicknameComplete = false;
    },
    changeNicknameSuccess: (state, action) => {
      const data = action.payload;
      state.changeNicknameLoading = false;
      state.changeNicknameComplete = true;
      state.me.nickname = data.nickname;
    },
    changeNicknameFailure: (state, action) => {
      state.changeNicknameLoading = false;
      state.changeNicknameError = action.error;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  loadMyInfoRequest,
  loadMyInfoSuccess,
  loadMyInfoFailure,
  changeNicknameRequest,
  changeNicknameSuccess,
  changeNicknameFailure,
} = userSlice.actions;

export default userSlice.reducer;
