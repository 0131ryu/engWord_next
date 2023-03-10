import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { quoteProps } from "../../type";

const initialState:quoteProps = {
  quoteResult: null,
  showQuoteLoading: false,
  showQuoteComplete: false,
  showQuoteError: null,
};

export const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    showQuoteRequest: (state: quoteProps, action:PayloadAction<null>) => {
      state.showQuoteLoading = true;
      state.showQuoteError = null;
      state.showQuoteComplete = false;
    },
    showQuoteSuccess: (state: quoteProps, action:PayloadAction<null>) => {
      const data = action.payload;
      state.showQuoteLoading = false;
      state.showQuoteComplete = true;
      state.quoteResult = data;
    },
    showQuoteError: (state, action) => {
      state.showQuoteLoading = true;
      state.showQuoteError = action.payload.error;
    },
  }
});

export const { showQuoteRequest, showQuoteSuccess, showQuoteError } =
  quoteSlice.actions;

export default quoteSlice.reducer;
