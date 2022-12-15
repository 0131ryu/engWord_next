import shortId from "shortid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainPosts: [],
  addPostLoading: false, //게시글 추가 중
  addPostComplete: false,
  addPostError: null,
  removePostLoading: false, //게시글 삭제 중
  removePostComplete: false,
  removePostError: null,
  revisePostLoading: false, //게시글 수정 중
  revisePostComplete: false,
  revisePostError: null,
  addCommentLoading: false, //댓글 추가 중
  addCommentComplete: false,
  addCommentError: null,
  removeCommentLoading: false, //댓글 삭제 중
  removeCommentComplete: false,
  removeCommentError: null,
  reviseCommentLoading: false, //댓글 수정 중
  reviseCommentComplete: false,
  reviseCommentError: null,
  Comments: [],
  updatedImages: [], //이미 업로드할 이미지
  revisedImages: [], //새로 업로드할 이미지
};

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
      state.addPostLoading = false;
      state.addPostComplete = true;
      state.mainPosts.unshift(postInfo);
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
    //게시글 수정
    revisePostRequest: (state) => {
      state.revisePostLoading = true;
      state.revisePostError = null;
      state.revisePostComplete = false;
    },
    revisePostSuccess: (state, action) => {
      const data = action.payload;
      state.revisePostLoading = false;
      state.revisePostComplete = true;
      state.mainPosts.splice(data.id, 1, {
        id: shortId.generate(),
        content: data.content,
        User: {
          id: shortId.generate(),
          nickname: "test",
        },
        Images: ["https://picsum.photos/500"],
        Comments: [],
      });
    },
    revisePostFailure: (state, action) => {
      state.revisePostLoading = false;
      state.revisePostError = action.error;
    },
    //댓글 추가
    addCommentRequest: (state) => {
      state.addCommentLoading = true;
      state.addCommentError = null;
      state.addCommentComplete = false;
    },
    addCommentSuccess: (state, action) => {
      const data = action.payload;
      const post = state.mainPosts.find((v) => v.id === data.PostId);
      state.addCommentLoading = false;
      state.addCommentComplete = true;
      state.Comments.unshift(data);
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
    //댓글 수정
    reviseCommentRequest: (state) => {
      state.reviseCommentLoading = true;
      state.reviseCommentError = null;
      state.reviseCommentComplete = false;
    },
    reviseCommentSuccess: (state, action) => {
      const data = action.payload;
      state.reviseCommentLoading = false;
      state.reviseCommentComplete = true;
      state.mainPosts.splice(data.id, 1, {
        id: shortId.generate(),
        content: data.content,
        User: {
          id: shortId.generate(),
          nickname: "test",
        },
        Images: ["https://picsum.photos/500"],
        Comments: [],
      });
    },
    reviseCommentFailure: (state, action) => {
      state.reviseCommentLoading = false;
      state.reviseCommentError = action.error;
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
  revisePostRequest,
  revisePostSuccess,
  revisePostFailure,
  addCommentRequest,
  addCommentSuccess,
  addCommentFailure,
  removeCommentRequest,
  removeCommentSuccess,
  removeCommentFailure,
  reviseCommentRequest,
  reviseCommentSuccess,
  reviseCommentFailure,
} = postSlice.actions;

export default postSlice.reducer;
