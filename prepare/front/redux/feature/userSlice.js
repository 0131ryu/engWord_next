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
  followLoading: false, //팔로우
  followComplete: false,
  followError: null,
  unfollowLoading: false, //언팔로우
  unfollowComplete: false,
  unfollowError: null,
  loadFollowersLoading: false, //팔로워 가져오기
  loadFollowersComplete: false,
  loadFollowersError: null,
  loadFollowingsLoading: false, //팔로잉 가져오기
  loadFollowingsComplete: false,
  loadFollowingsError: null,
  blockfollowLoading: false,
  blockfollowComplete: false,
  blockfollowError: null,
  loadBlockingLoading: false, //차단한 경우 가져오기 loadBlockings
  loadBlockingComplete: false,
  loadBlockingError: null,
  loadBlockedLoading: false, //차단된 경우 가져오기 loadBlockings
  loadBlockedComplete: false,
  loadBlockedError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

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
    followRequest: (state) => {
      state.followLoading = true;
      state.followError = null;
      state.followComplete = false;
    },
    followSuccess: (state, action) => {
      const data = action.payload;
      state.followLoading = false;
      state.followComplete = true;
      state.me.Followings.push({ id: data.UserId });
    },
    followFailure: (state, action) => {
      state.followLoading = false;
      state.followError = action.error;
    },
    unfollowRequest: (state) => {
      state.unfollowLoading = true;
      state.unfollowError = null;
      state.unfollowComplete = false;
    },
    unfollowSuccess: (state, action) => {
      const data = action.payload;
      state.unfollowLoading = false;
      state.unfollowComplete = true;
      state.me.Followings = state.me.Followings.filter(
        (v) => v.id !== data.UserId
      );
    },
    unfollowFailure: (state, action) => {
      state.unfollowLoading = false;
      state.unfollowError = action.error;
    },
    loadFollowingsRequest: (state) => {
      state.loadFollowingsLoading = true;
      state.loadFollowingsError = null;
      state.loadFollowingsComplete = false;
    },
    loadFollowingsSuccess: (state, action) => {
      const data = action.payload;
      state.loadFollowingsLoading = false;
      state.loadFollowingsComplete = true;
      state.me.Followings = data;
    },
    loadFollowingsFailure: (state, action) => {
      state.loadFollowingsLoading = false;
      state.loadFollowingsError = action.error;
    },
    loadFollowersRequest: (state) => {
      state.loadFollowersLoading = true;
      state.loadFollowersError = null;
      state.loadFollowersComplete = false;
    },
    loadFollowersSuccess: (state, action) => {
      const data = action.payload;
      state.loadFollowersLoading = false;
      state.loadFollowersComplete = true;
      state.me.Followers = data;
    },
    loadFollowersFailure: (state, action) => {
      state.loadFollowersLoading = false;
      state.loadFollowersError = action.error;
    },
    blockfollowRequest: (state) => {
      state.blockfollowLoading = true;
      state.blockfollowError = null;
      state.blockfollowComplete = false;
    },
    blockfollowSuccess: (state, action) => {
      const data = action.payload;
      console.log("data.blockingUser", data.blockingUser);
      console.log("data.blockedUser", data.blockedUser);
      state.blockfollowLoading = false;
      state.blockfollowComplete = true;
      //내 팔로워 목록에서 줄어들음
      state.me.Followers = state.me.Followers.filter(
        (v) => v.id !== data.blockingUser
      );
      //내가 차단한 경우
      state.me.Blockeds.push({ id: data.blockingUser });

      //내가 차단된 경우
      state.me.Blockings.push({ id: data.blockedUser });
    },
    blockfollowFailure: (state, action) => {
      state.blockfollowLoading = false;
      state.blockfollowError = action.error;
    },
    loadBlockingRequest: (state) => {
      state.loadBlockingLoading = true;
      state.loadBlockingError = null;
      state.loadBlockingComplete = false;
    },
    loadBlockingSuccess: (state, action) => {
      const data = action.payload;
      console.log("data", data);
      state.loadBlockingLoading = false;
      state.loadBlockingComplete = true;
      state.me.Blockings = data;
    },
    loadBlockingFailure: (state, action) => {
      state.loadBlockingLoading = false;
      state.loadBlockingError = action.error;
    },
    loadBlockedRequest: (state) => {
      state.loadBlockedLoading = true;
      state.loadBlockedError = null;
      state.loadBlockedComplete = false;
    },
    loadBlockedSuccess: (state, action) => {
      const data = action.payload;
      console.log("data", data);
      state.loadBlockedLoading = false;
      state.loadBlockedComplete = true;
      state.me.Blockeds = data;
    },
    loadBlockedFailure: (state, action) => {
      state.loadBlockedLoading = false;
      state.loadBlockedError = action.error;
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
  followRequest,
  followSuccess,
  followFailure,
  unfollowRequest,
  unfollowSuccess,
  unfollowFailure,
  loadFollowingsRequest,
  loadFollowingsSuccess,
  loadFollowingsFailure,
  loadFollowersRequest,
  loadFollowersSuccess,
  loadFollowersFailure,
  blockfollowRequest,
  blockfollowSuccess,
  blockfollowFailure,
  loadBlockingRequest,
  loadBlockingSuccess,
  loadBlockingFailure,
  loadBlockedRequest,
  loadBlockedSuccess,
  loadBlockedFailure,
} = userSlice.actions;

export default userSlice.reducer;
