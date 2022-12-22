import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  reviseCommentRequest,
  revisePostRequest,
  unlikePostRequest,
} from "../../redux/feature/postSlice";
import { Popover, Transition } from "@headlessui/react";

import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import RemovePostModal from "./RemovePostModal";
import PostCardContent from "./PostCardContent";
import { followRequest, unfollowRequest } from "../../redux/feature/userSlice";

const PostCard = ({ post, index, me }) => {
  const dispatch = useDispatch();
  const [removeModal, setRemoveModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers?.find((v) => v.id === id);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  useEffect(() => {
    // console.log("post.id", post.id);
    // post.Likers.find((v) => {
    //   console.log("v.Like.PostId", v.Like.PostId);
    // });
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

  const onClickFollow = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowRequest(post.User.id));
    } else {
      dispatch(followRequest(post.User.id));
    }
  }, [isFollowing]);

  return (
    <>
      {/* 삭제 포스트 모달창 */}
      {removeModal ? (
        <RemovePostModal PostIndex={post.id} setRemoveModal={setRemoveModal} />
      ) : null}

      {/* card start */}
      <section className="flex justify-center">
        <article className="overflow-hidden w-full my-3 shadow shadow-black-500/40 rounded-md">
          <header className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center font-bold">
              <span className="mr-2">
                <img
                  className="rounded-full h-10 w-10"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="profile-img"
                />
              </span>
              <span>{post.nickname}</span>
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
                    {isFollowing ? "언팔로우" : "팔로우"}
                  </p>
                )}
              </button>
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
                      <Popover.Panel className="absolute mt-1 w-16 h-10">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="bg-light-beige p-1">
                            <button
                              value={index}
                              onClick={onClickRevise}
                              className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-light-beige focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              수정
                            </button>
                            <button
                              onClick={onRemovePost}
                              className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-light-beige focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              삭제
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

          <PostCardContent
            editMode={editMode}
            onCancleRevisePost={onCancleRevisePost}
            onRevisePost={onRevisePost}
            image={post?.Images}
            content={post.content}
            index={index}
          />
          {/* <div>
                <img
                  src={`${post.Images}`}
                  alt="post.Images"
                  className="w-1/2 mx-auto block"
                />
                <p className="p-4">{post.content}</p>
                <small className="text-gray-400 m-4">2 hours ago</small>
              </div> */}
          <div className="pl-4 pr-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex item-center">
                <span className="flex mr-4">
                  {liked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                      onClick={onUnLike}
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  ) : (
                    <HeartIcon onClick={onLike} className="h-8 w-8" />
                  )}

                  <p className="mt-1">{post.Likers.length}</p>
                </span>
                <span className="flex mr-4">
                  <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8" />
                  <p className="mt-1">{post.Comments.length}</p>
                </span>
                <span className="flex mr-1">
                  <ArrowPathRoundedSquareIcon className="h-8 w-8" />
                  <p className="mt-1">10</p>
                </span>
              </div>
              <div>
                <span className="flex">
                  <BookmarkIcon className="h-8 w-8" />
                </span>
              </div>
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
