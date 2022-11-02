import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginLoading: false, //로그인 시도
  loginComplete: false,
  loginError: null,
  logoutLoading: false, //로그아웃 시도
  logoutComplete: false,
  logoutError: null,
  isLoggedIn: false,
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
      state.me = action.payload; //state.me = testUser(action.data);
      console.log("state.me", state.me);
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
    logoutSuccess: (state, action) => {
      state.me = action.payload;

      state.logoutLoading = false;
      state.logoutComplete = true;
    },
    logoutFailure: (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.error;
    },
    loginAction: (state, action) => ({
      ...state,
      isLoggedIn: true,
      me: action.payload,
    }),
    logoutAction: (state) => ({
      ...state,
      isLoggedIn: false,
      me: null,
    }),
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  loginAction,
  logoutAction,
} = userSlice.actions;

export default userSlice.reducer;
