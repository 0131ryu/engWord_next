import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action) => ({
      ...state,
      isLoggedIn: true,
      me: action.payload,
    }),
    logoutAction: (state, action) => ({
      ...state,
      isLoggedIn: false,
      me: null,
    }),
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
