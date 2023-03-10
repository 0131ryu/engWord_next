import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";

import rootReducer from "./feature";
import rootSaga from "./sagas/rootSaga";
import { quoteProps } from "../type";

const isDev = process.env.NODE_ENV === "development";

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: isDev,
  });
  (store as any).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(createStore, {
  debug: isDev,
});

export interface RootState {
  quote: quoteProps;
}

export default wrapper;
