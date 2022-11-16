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
  removePostLoading: false, //게시글 삭제 중
  removePostComplete: false,
  removePostError: null,
  addCommentLoading: false, //댓글 추가 중
  addCommentComplete: false,
  addCommentError: null,
  removeCommentLoading: false, //댓글 삭제 중
  removeCommentComplete: false,
  removeCommentError: null,
  Comments: [
    {
      id: shortId.generate(),
      ex_nickname: "test2",
      content: "incididunt cillum culpa consequat.",
      User: {
        id: shortId.generate(),
        nickname: "test3",
      },
      Images: [],
      Comments: [],
    },
    {
      id: shortId.generate(),
      ex_nickname: "test2",
      content:
        "Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.",
      User: {
        id: shortId.generate(),
        nickname: "test3",
      },
      Images: [],
      Comments: [],
    },
  ],
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

// const dummyComment = (data) => ({
//   id: data.id,
//   content: data.content,
//   User: {
//     id: shortId.generate(),
//     nickname: "test2",
//   },
//   Images: [],
//   Comments: [],
// });

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
    //게시글 삭제
    removePostRequest: (state) => {
      state.removePostLoading = true;
      state.removePostError = null;
      state.removePostComplete = false;
    },
    removePostSuccess: (state, action) => {
      console.log(action.payload);
      state.removePostLoading = false;
      state.removePostComplete = true;
      state.mainPosts.splice(action.payload, 1);
    },
    removePostFailure: (state, action) => {
      state.removePostLoading = false;
      state.removePostError = action.error;
    },
    //댓글 추가
    addCommentRequest: (state) => {
      state.addCommentLoading = true;
      state.addCommentError = null;
      state.addCommentComplete = false;
    },
    addCommentSuccess: (state, action) => {
      const Info = action.payload;
      console.log(Info.data);
      state.addCommentLoading = false;
      state.addCommentComplete = true;
      state.Comments.unshift(Info.data);
    },
    addCommentFailure: (state, action) => {
      state.addCommentLoading = false;
      state.addCommentError = action.error;
    },
    //댓글 삭제
    removeCommentRequest: (state) => {
      state.removeCommentLoading = true;
      state.removeCommentError = null;
      state.removeCommentComplete = false;
    },
    removeCommentSuccess: (state, action) => {
      console.log(action.payload);
      state.removeCommentLoading = false;
      state.removeCommentComplete = true;
      state.Comments.splice(action.payload, 1);
    },
    removeCommentFailure: (state, action) => {
      state.removeCommentLoading = false;
      state.removeCommentError = action.error;
    },
  },
});

export const {
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  removePostRequest,
  removePostSuccess,
  removePostFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  removeCommentRequest,
  removeCommentSuccess,
  removeCommentFailure,
} = postSlice.actions;

export default postSlice.reducer;
