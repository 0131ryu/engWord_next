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
  likePostRequest,
  removeCommentRequest,
  retweetFailure,
  retweetRequest,
  reviseCommentRequest,
  revisePostRequest,
  unlikePostRequest,
} from "../../redux/feature/postSlice";
import { Popover, Transition } from "@headlessui/react";

import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import RemovePostModal from "./RemovePostModal";
import PostCardContent from "./PostCardContent";
import {
  followRequest,
  loadBlockingRequest,
  loadBlockedRequest,
  unfollowRequest,
} from "../../redux/feature/userSlice";
import PostImages from "./PostImages";
import { useRouter } from "next/router";

const PostCard = ({ post, index, me }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [removeModal, setRemoveModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers?.find((v) => v.id === id);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const blockingLists = me?.Blockings;
  const blockedLists = me?.Blockeds;

  useEffect(() => {
    if (me) {
      dispatch(loadBlockedRequest());
      dispatch(loadBlockingRequest());
      dispatch(loadBlockedRequest());
    }
  }, []);

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

  const onReviseComment = useCallback((e) => {
    const index = e.target.value;
    dispatch(reviseCommentRequest(index));
  }, []);

  const onRemoveComment = useCallback(() => {
    const index = e.target.value;
    dispatch(removeCommentRequest(index));
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

  const onGoProfile = useCallback(() => {
    router.push("/profile");
  }, []);

  return (
    <>
      {/* ?????? ????????? ????????? */}
      {removeModal ? (
        <RemovePostModal PostIndex={post.id} setRemoveModal={setRemoveModal} />
      ) : null}

      {/* card start */}
      <section className="flex justify-center">
        <article className="overflow-hidden w-full my-3 shadow shadow-black-500/40 rounded-md">
          <header className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center font-bold">
              <span className="mr-2">
                {post.User.profileImg === "" ||
                post.User.profileImg === null ? (
                  <img
                    alt="profile-img"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`http://localhost:3005/profile/${post.User.profileImg}`}
                    alt={post.User.profileImg}
                  />
                )}
              </span>

              <span>{post.User.nickname}</span>

              {id === undefined ? null : blockingLists &&
                blockingLists?.find((block) => block.id === post.UserId) ? (
                <div className="ml-2 bg-gray-100 rounded w-20">????????? ??????</div>
              ) : (
                <button
                  onClick={onClickFollow}
                  className={`ml-2 ${
                    isFollowing ? "bg-red-500" : "bg-light-green"
                  } rounded w-20 text-white ${
                    isFollowing
                      ? "hover:bg-light-beige hover:text-red-500"
                      : "hover:bg-light-beige hover:text-light-green"
                  }  `}
                >
                  {id === post.UserId ? null : (
                    <p className="text-sm">
                      {isFollowing ? "????????????" : "?????????"}
                    </p>
                  )}
                </button>
              )}
            </div>
            <div className="float-right">
              {editMode ? null : (
                <Popover>
                  <>
                    <Popover.Button className="rounded-md px-3 py-2 text-base">
                      <div>
                        {id === post.UserId ? (
                          <EllipsisHorizontalIcon className="h-9 w-9" />
                        ) : null}
                      </div>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="z-50 absolute mt-1 w-16 h-10">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="bg-light-beige p-1">
                            <button
                              value={index}
                              onClick={onClickRevise}
                              className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-light-beige focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              ??????
                            </button>
                            <button
                              onClick={onRemovePost}
                              className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-light-beige focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              ??????
                            </button>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                </Popover>
              )}
            </div>
          </header>
          {blockedLists &&
          blockedLists.find((block) => block.id === post.UserId) ? (
            <p className="ml-3 p-2 text-red-500">???????????? ??? ??? ????????????.</p>
          ) : post.RetweetId && post.Retweet ? (
            <>
              <p className="ml-5">
                {post.RetweetId
                  ? `${post.User.nickname}?????? ????????????????????????.`
                  : null}
              </p>
              <section className="flex justify-center">
                <article className="border-solid border-2 border-gray-200 overflow-hidden w-11/12 my-3 shadow shadow-black-500/40 rounded-md">
                  <header className="px-4 py-3 flex">
                    <div className="flex items-center font-bold"></div>
                    <span className="mr-2">
                      <img
                        alt="profile-img"
                        src={`http://localhost:3005/profile/${post.Retweet.User.profileImg}`}
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
                    className="w-8 h-8 cursor-pointer"
                    onClick={onUnLike}
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                ) : (
                  <HeartIcon
                    onClick={onLike}
                    className="h-8 w-8 cursor-pointer"
                  />
                )}

                <p className="mt-1">{post.Likers.length}</p>
              </span>
              <span className="flex mr-4">
                <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
                <p className="mt-1">{post.Comments.length}</p>
              </span>
              <span className="flex mr-1">
                <ArrowPathRoundedSquareIcon
                  onClick={onRetweet}
                  className="h-8 w-8 cursor-pointer"
                />
                <p className="mt-1">{post.Retweet?.length}</p>
              </span>
            </div>
            <div className="float:right mr-3">
              <span>
                <BookmarkIcon className="h-8 w-8 cursor-pointer" />
              </span>
            </div>
          </div>

          <div className="ml-4">
            <a href="#" className="text-gray-500">
              View all comments
            </a>
          </div>
          {/* CommentCard start */}
          {post.Comments.map((comment, i) => {
            return <CommentCard comment={comment} />;
          })}
          <div>
            <CommentForm post={post} />
          </div>
        </article>
      </section>

      {/* card end */}
    </>
  );
};

export default PostCard;
