import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import user from "./userSlice";
import word from "./wordSlice";
import post from "./postSlice";
import game from "./gameSlice";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
        word,
        game,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
