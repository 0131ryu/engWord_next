import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import UserReducer from "./feature/userSlice";
import WordReducer from "./feature/wordSlice";
import PostReducer from "./feature/postSlice";
import GameReducer from "./feature/gameSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: UserReducer,
    word: WordReducer,
    post: PostReducer,
    game: GameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
