import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import user from "./userSlice";
import word from "./wordSlice";

const rootReducer = combineReducers({
  user,
  word,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      user: user.reducer,
      word: word.reducer,
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true }); //마지막 이 부분