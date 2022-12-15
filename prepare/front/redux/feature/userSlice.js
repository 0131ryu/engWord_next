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
} = userSlice.actions;

export default userSlice.reducer;
