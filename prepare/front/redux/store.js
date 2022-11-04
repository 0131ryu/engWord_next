import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import UserReducer from "./feature/userSlice";
import WordReducer from "./feature/wordSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: UserReducer,
    word: WordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
