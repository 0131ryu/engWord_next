import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import {
  bookmarkRequest,
  likePostRequest,
  removeCommentRequest,
  retweetFailure,
  retweetRequest,
  reviseCommentRequest,
  revisePostRequest,
  unbookmarkRequest,
  unlikePostRequest,
} from "../../redux/feature/postSlice";

import CommentCard from "./CommentCard";
import PostCardContent from "./PostCardContent";
import { followRequest, unfollowRequest } from "../../redux/feature/userSlice";
import PostImages from "./PostImages";

const PostCardBookmark = ({ post, index, me }) => {
  const dispatch = useDispatch();

  const [removeModal, setRemoveModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers?.find((v) => v.id === id);
  const bookmark = post.Bookmarks?.find((v) => v.id === id);
  const [bookmarkUser, setBookmarkUser] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // console.log("post.Bookmarks", post.Bookmarks);
    post.Bookmarks?.map((b) => {
      //   console.log("b.Bookmark", b.Bookmark);
      //   console.log("북마크 유저 아이디", b.Bookmark?.UserId);
    });

    post.Bookmarks?.find((b) => setBookmarkUser(b.Bookmark?.UserId));
  }, []);

  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const blockingLists = me?.Blockings;
  const blockedLists = me?.Blockeds;

  const onClickRevise = useCallback(
    (e) => {
      setEditMode(true);
    },
    [id]
  );

  const onRevisePost = useCallback(
    (editText) => () => {
      const postId = post.id;
      dispatch(revisePostRequest({ postId, editText }));
      setEditMode(false);
    },
    [id]
  );

  const onCancleRevisePost = useCallback(() => {
    setEditMode(false);
  }, []);

  const onRemovePost = useCallback(() => {
    setRemoveModal(true);
  }, []);

  const onLike = useCallback(() => {
    dispatch(likePostRequest(post.id));
  }, [id]);

  const onUnLike = useCallback(() => {
    dispatch(unlikePostRequest(post.id));
  }, [id]);

  const onRetweet = useCallback(() => {
    dispatch(retweetRequest(post.id));
  }, []);

  const onClickFollow = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowRequest(post.User.id));
    } else {
      dispatch(followRequest(post.User.id));
    }
  }, [isFollowing]);

  const onBookmark = useCallback(() => {
    dispatch(bookmarkRequest(post.id));
  }, [id]);

  const onUnBookmark = useCallback(() => {
    dispatch(unbookmarkRequest(post.id));
  }, [id]);

  return (
    <>
      {/* card start */}
      {bookmark ? (
        <section className="flex justify-center">
          <article className="overflow-hidden w-full my-3 shadow shadow-black-500/40 rounded-md">
            <p className="ml-3 mt-2 text-gray-400">내가 북마크한 글</p>
            <header className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center font-bold">
                <span className="mr-2">
                  {post.User?.profileImg === "" ||
                  post.User?.profileImg === null ? (
                    <img
                      alt="profile-img"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={`http://localhost:3005/userImg/${post.User.profileImg}`}
                      alt={post.User.profileImg}
                    />
                  )}
                </span>

                <span>{post.User.nickname}</span>
              </div>
              <div className="float-right"></div>
            </header>
            {blockedLists &&
            blockedLists.find((block) => block.id === post.UserId) ? (
              <p className="ml-3 p-2 text-red-500">게시글을 볼 수 없습니다.</p>
            ) : post.RetweetId && post.Retweet ? (
              <>
                <p className="ml-5">
                  {post.RetweetId
                    ? `${post.User.nickname}님이 리트윗하셨습니다.`
                    : null}
                </p>
                <section className="flex justify-center">
                  <article className="border-solid border-2 border-gray-200 overflow-hidden w-11/12 my-3 shadow shadow-black-500/40 rounded-md">
                    <header className="px-4 py-3 flex">
                      <div className="flex items-center font-bold"></div>
                      <span className="mr-2">
                        <img
                          alt="profile-img"
                          src={`http://localhost:3005/userImg/${post.Retweet.User.profileImg}`}
                          className="h-8 w-8 rounded-full"
                        />
                      </span>
                      <span className="mr-2 mt-2 font-bold">
                        {post.Retweet.User.nickname}
                      </span>
                    </header>

                    <PostImages images={post?.Retweet.Images} />
                    <PostCardContent
                      editMode={editMode}
                      onCancleRevisePost={onCancleRevisePost}
                      onRevisePost={onRevisePost}
                      content={post.Retweet.content}
                      index={index}
                    />
                  </article>
                </section>
                <small className="text-gray-400 m-5 float-right">
                  1 hours ago
                </small>
              </>
            ) : (
              <>
                <PostImages images={post.Images} />
                <PostCardContent
                  editMode={editMode}
                  onCancleRevisePost={onCancleRevisePost}
                  onRevisePost={onRevisePost}
                  content={post.content}
                  index={index}
                />
              </>
            )}

            <div className="flex bg-gray-100 justify-between items-center w-full mb-2">
              <div className="flex item-center ml-3">
                <span className="flex mr-4">
                  {liked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  ) : (
                    <HeartIcon className="h-8 w-8" />
                  )}

                  <p className="mt-1">{post.Likers.length}</p>
                </span>
                <span className="flex mr-4">
                  <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
                  <p className="mt-1">{post.Comments.length}</p>
                </span>
                <span className="flex mr-1">
                  <ArrowPathRoundedSquareIcon className="h-8 w-8" />
                  <p className="mt-1">{post.Retweet?.length}</p>
                </span>
              </div>
              <div className="float:right mr-3">
                <span>
                  {bookmark ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mt-2 w-8 h-8 cursor-pointer"
                      onClick={onUnBookmark}
                    >
                      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mt-2 w-8 h-8 cursor-pointer"
                      onClick={onBookmark}
                    >
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {post.Comments.length === 0 ? null : (
              <div className="ml-4">
                <a href="#" className="text-gray-500">
                  View all comments
                </a>
              </div>
            )}
            {/* CommentCard start */}
            {post.Comments.map((comment, i) => {
              return <CommentCard comment={comment} />;
            })}
          </article>
        </section>
      ) : null}
      {/* card end */}
    </>
  );
};

export default PostCardBookmark;
