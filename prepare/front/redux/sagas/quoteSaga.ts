import axios from "axios";
import { takeLatest, put, fork, call } from "redux-saga/effects";
import { quoteResponse } from "../../type";
import {
  showQuoteRequest,
  showQuoteSuccess,
  showQuoteError,
} from "../feature/quoteSlice";

function showQuoteAPI() {
  return axios.get<quoteResponse>("/quote");
}

function* showQuote() {
  try {
    const response = yield call(showQuoteAPI);
    yield put(showQuoteSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError<quoteResponse>(error)) {
    yield put(showQuoteError(error.response));
    console.log(error);
    } 
  }
}

function* show_Quote_Req() {
  yield takeLatest(showQuoteRequest.type, showQuote);
}

export const quoteSaga = [fork(show_Quote_Req)];
