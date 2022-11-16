import shortId from "shortid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainPosts: [
    {
      id: shortId.generate(),
      content: "첫 게시글",
      User: {
        id: shortId.generate(),
        nickname: "test",
      },
      Images: [],
      Comments: [],
    },
    {
      id: shortId.generate(),
      content: "두 번째 게시글",
      User: {
        id: shortId.generate(),
        nickname: "test",
      },
      Images: [],
      Comments: [],
    },
    {
      id: shortId.generate(),
      content: "세 번째 게시글",
      User: {
        id: shortId.generate(),
        nickname: "test",
      },
      Images: [],
      Comments: [],
    },
  ],
  addPostLoading: false, //게시글 추가 중
  addPostComplete: false,
  addPostError: null,
};

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: shortId.generate(),
    nickname: "test",
  },
  Images: [],
  Comments: [],
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    //게시글 추가
    addPostRequest: (state) => {
      state.addPostLoading = true;
      state.addPostError = null;
      state.addPostComplete = false;
    },
    addPostSuccess: (state, action) => {
      const postInfo = action.payload;
      console.log(postInfo.data);

      state.addPostLoading = false;
      state.addPostComplete = true;
      state.mainPosts.unshift(dummyPost(postInfo.data));
    },
    addPostFailure: (state, action) => {
      state.addPostLoading = false;
      state.addPostError = action.error;
    },
  },
});

export const { addPostRequest, addPostSuccess, addPostFailure } =
  postSlice.actions;

export default postSlice.reducer;
