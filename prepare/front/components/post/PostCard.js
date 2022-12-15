import React, { Fragment, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import {
  removeCommentRequest,
  reviseCommentRequest,
  revisePostRequest,
} from "../../redux/feature/postSlice";
import { Popover, Transition } from "@headlessui/react";

import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import RemovePostModal from "./RemovePostModal";
import PostCardContent from "./PostCardContent";

const PostCard = ({ post, index }) => {
  const dispatch = useDispatch();
  const [removeModal, setRemoveModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const id = useSelector((state) => state.user.me?.id);

  // console.log("post", post);
  // console.log("index", index);
  // console.log("post.Comments", post.Comments);

  useSelector((state) => state.post);
  const onClickRevise = useCallback(
    (e) => {
      setEditMode(true);
    },
    [id]
  );

  const onRevisePost = useCallback(
    (editText, index) => () => {
      console.log("editText", editText);
      console.log("onRevisePost index", id);
      dispatch(revisePostRequest({ id: id, content: editText }));
    },
    [id]
  );

  const onCancleRevisePost = useCallback(() => {
    setEditMode(false);
  }, []);

  const onRemovePost = useCallback((e) => {
    setRemoveModal(true);
    setId(parseInt(e.target.value));
  }, []);

  const onReviseComment = useCallback((e) => {
    const index = e.target.value;
    dispatch(reviseCommentRequest(index));
  }, []);

  const onRemoveComment = useCallback(() => {
    const index = e.target.value;
    dispatch(removeCommentRequest(index));
  }, []);

  return (
    <>
      {/* 삭제 포스트 모달창 */}
      {removeModal ? (
        <RemovePostModal index={id} setRemoveModal={setRemoveModal} />
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
            </div>
            <div className="float-right">
              {editMode ? null : (
                <Popover>
                  <>
                    <Popover.Button className="rounded-md px-3 py-2 text-base">
                      <div>
                        <EllipsisHorizontalIcon className="h-9 w-9" />
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
                              value={index}
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
                  <HeartIcon className="h-8 w-8" />
                  <p className="mt-1">10</p>
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
