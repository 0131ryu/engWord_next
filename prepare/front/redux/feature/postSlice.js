import shortId from "shortid";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainPosts: [],
  singlePost: null,
  hasMorePosts: true,
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
  loadPostsLoading: false, //게시글 가져오기
  loadPostsComplete: false,
  loadPostsError: null,
  loadPostLoading: false, //개별 게시글 가져오기
  loadPostComplete: false,
  loadPostError: null,
  bookmarkLoading: false, //bookmark
  bookmarkComplete: false,
  bookmarkError: null,
  unbookmarkLoading: false, //unbookmark
  unbookmarkComplete: false,
  unbookmarkError: null,
  likePostLoading: false, //like
  likePostComplete: false,
  likePostError: null,
  unlikePostLoading: false, //unlike
  unlikePostComplete: false,
  unlikePostError: null,
  uploadImagesLoading: false, //uploadImagesRequest
  uploadImagesComplete: false,
  uploadImagesError: null,
  retweetLoading: false, //retweet
  retweetComplete: false,
  retweetError: null,
  searchPostLoading: false, //searchPost
  searchPostComplete: false,
  searchPostError: null,
  Comments: [],
  imagePaths: [],
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
      state.imagePaths = [];
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
      const data = action.payload;
      console.log("data", data);
      state.removePostLoading = false;
      state.removePostComplete = true;
      state.mainPosts = state.mainPosts.filter((v) => v.id !== data.PostId);
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
      console.log("data", data);
      state.revisePostLoading = false;
      state.revisePostComplete = true;
      state.mainPosts.find((v) => v.id === data.PostId).content = data.content;
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
      post.Comments.unshift(data);
      state.addCommentLoading = false;
      state.addCommentComplete = true;
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
      const data = action.payload;
      state.removeCommentLoading = false;
      state.removeCommentComplete = true;
      state.mainPosts = state.mainPosts.filter((v) => v.id !== data.PostId);
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
    loadPostsRequest: (state) => {
      state.loadPostsLoading = true;
      state.loadPostsError = null;
      state.loadPostsComplete = false;
    },
    loadPostsSuccess: (state, action) => {
      const data = action.payload;
      state.loadPostsLoading = false;
      state.loadPostsComplete = true;
      state.mainPosts = state.mainPosts.concat(data);
      state.hasMorePosts = data.length === 10;
    },
    loadPostsFailure: (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
    },
    loadPostRequest: (state) => {
      state.loadPostLoading = true;
      state.loadPostError = null;
      state.loadPostComplete = false;
    },
    loadPostSuccess: (state, action) => {
      const data = action.payload;
      state.loadPostLoading = false;
      state.loadPostComplete = true;
      state.singlePost = data;
    },
    loadPostFailure: (state, action) => {
      state.loadPostLoading = false;
      state.loadPostError = action.error;
    },
    loadUserPostsRequest: (state) => {
      state.loadPostsLoading = true;
      state.loadPostsError = null;
      state.loadPostsComplete = false;
    },
    loadUserPostsSuccess: (state, action) => {
      const data = action.payload;
      console.log("결과", data);
      state.loadPostsLoading = false;
      state.loadPostsComplete = true;
      state.mainPosts = state.mainPosts.concat(data);
      state.hasMorePosts = data.length === 10;
    },
    loadUserPostsFailure: (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
    },
    loadHashtagPostsRequest: (state) => {
      state.loadPostsLoading = true;
      state.loadPostsError = null;
      state.loadPostsComplete = false;
    },
    loadHashtagPostsSuccess: (state, action) => {
      const data = action.payload;
      state.loadPostsLoading = false;
      state.loadPostsComplete = true;
      state.mainPosts = state.mainPosts.concat(data);
      state.hasMorePosts = data.length === 10;
    },
    loadHashtagPostsFailure: (state, action) => {
      state.loadPostsLoading = false;
      state.loadPostsError = action.error;
    },
    //like
    likePostRequest: (state) => {
      state.likePostLoading = true;
      state.likePostError = null;
      state.likePostComplete = false;
    },
    likePostSuccess: (state, action) => {
      const data = action.payload;
      const post = state.mainPosts.find((v) => v.id === data.PostId);
      post.Likers.push({ id: data.UserId });
      state.likePostLoading = false;
      state.likePostComplete = true;
    },
    likePostFailure: (state, action) => {
      state.likePostLoading = false;
      state.likePostError = action.payload.response.data;
    },
    //unlike
    unlikePostRequest: (state) => {
      state.unlikePostLoading = true;
      state.unlikePostError = null;
      state.unlikePostComplete = false;
    },
    unlikePostSuccess: (state, action) => {
      const data = action.payload;
      const post = state.mainPosts.find((v) => v.id === data.PostId);
      post.Likers = post.Likers.filter((v) => v.id !== data.UserId);
      state.unlikePostLoading = false;
      state.unlikePostComplete = true;
    },
    unlikePostFailure: (state, action) => {
      state.unlikePostLoading = false;
      state.unlikePostError = action.error;
    },
    //uploadImages
    uploadImagesRequest: (state) => {
      state.uploadImagesLoading = true;
      state.uploadImagesError = null;
      state.uploadImagesComplete = false;
    },
    uploadImagesSuccess: (state, action) => {
      const data = action.payload;
      state.imagePaths = data;
      state.uploadImagesLoading = false;
      state.uploadImagesComplete = true;
    },
    uploadImagesFailure: (state, action) => {
      state.uploadImagesLoading = false;
      state.uploadImagesError = action.error;
    },
    removeImage: (state, action) => {
      state.imagePaths = state.imagePaths.filter(
        (v, i) => i !== action.payload
      );
    },
    retweetRequest: (state) => {
      state.retweetLoading = true;
      state.retweetError = null;
      state.retweetComplete = false;
    },
    retweetSuccess: (state, action) => {
      const data = action.payload;
      state.retweetLoading = false;
      state.retweetComplete = true;
      state.mainPosts.unshift(data);
    },
    retweetFailure: (state, action) => {
      state.retweetLoading = false;
      state.retweetError = action.payload.response.data;
    },
    bookmarkRequest: (state) => {
      state.bookmarkLoading = true;
      state.bookmarkError = null;
      state.bookmarkComplete = false;
    },
    bookmarkSuccess: (state, action) => {
      const data = action.payload;
      console.log("data", data);
      const post = state.mainPosts.find((v) => v.id === data.PostId);
      post.Bookmarks.push({ id: data.UserId });
      state.bookmarkLoading = false;
      state.bookmarkComplete = true;
    },
    bookmarkFailure: (state, action) => {
      state.bookmarkLoading = false;
      state.bookmarkError = action.payload.response.data;
    },
    unbookmarkRequest: (state) => {
      state.unbookmarkLoading = true;
      state.unbookmarkError = null;
      state.unbookmarkComplete = false;
    },
    unbookmarkSuccess: (state, action) => {
      const data = action.payload;
      const post = state.mainPosts.find((v) => v.id === data.PostId);
      post.Bookmarks = post.Bookmarks.filter((v) => v.id !== data.UserId);
      state.unbookmarkLoading = false;
      state.unbookmarkComplete = true;
    },
    unbookmarkFailure: (state, action) => {
      state.unbookmarkLoading = false;
      state.unbookmarkError = action.error;
    },
    searchPostRequest: (state) => {
      state.searchPostLoading = true;
      state.searchPostError = null;
      state.searchPostComplete = false;
    },
    searchPostSuccess: (state, action) => {
      const data = action.payload;
      const post = state.mainPosts.find((v) => v.id === data.PostId);
      post.Bookmarks = post.Bookmarks.filter((v) => v.id !== data.UserId);
      state.searchPostLoading = false;
      state.searchPostComplete = true;
    },
    searchPostFailure: (state, action) => {
      state.searchPostLoading = false;
      state.searchPostError = action.error;
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
  loadPostsRequest,
  loadPostsSuccess,
  loadPostsFailure,
  loadPostRequest,
  loadPostSuccess,
  loadPostFailure,
  loadUserPostsRequest,
  loadUserPostsSuccess,
  loadUserPostsFailure,
  loadHashtagPostsRequest,
  loadHashtagPostsSuccess,
  loadHashtagPostsFailure,
  likePostRequest,
  likePostSuccess,
  likePostFailure,
  unlikePostRequest,
  unlikePostSuccess,
  unlikePostFailure,
  uploadImagesRequest,
  uploadImagesSuccess,
  uploadImagesFailure,
  removeImage,
  retweetRequest,
  retweetSuccess,
  retweetFailure,
  bookmarkRequest,
  bookmarkSuccess,
  bookmarkFailure,
  unbookmarkRequest,
  unbookmarkSuccess,
  unbookmarkFailure,
} = postSlice.actions;

export default postSlice.reducer;
