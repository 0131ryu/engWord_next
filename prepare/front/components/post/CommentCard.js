import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popover, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import {
  removeCommentRequest,
  reviseCommentRequest,
} from "../../redux/feature/postSlice";

const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();

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
      <div className="w-4/5 mx-auto block">
        <div className="mt-2 shadow shadow-black-500/40 rounded-lg">
          <div className="p-2 justify-between rounde-md">
            <div className="flex">
              {/* <img
                className="rounded-full h-5 w-5 m-1"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile-img"
              /> */}
              <p className="bg-gray-100 p-2 m-1">{comment.nickname}</p>
              <p
                id="message"
                rows="3"
                className="block p-2.5 w-11/12 h-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-light-green focus:border-light-green"
                onChange={onRemoveComment}
              >
                {/* {post.Comments[index]?.content}
                    {console.log("post.Comments", post.Comments[0]?.content)} */}
                {comment.content}
              </p>
              <div className="ml-2">
                <Popover>
                  <>
                    <Popover.Button className="rounded-md px-3 py-2 text-base">
                      <div>
                        <EllipsisHorizontalIcon className="h-5 w-5" />
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
                              // value={index}
                              onClick={onReviseComment}
                              className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-light-orange focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              수정
                            </button>
                            <button
                              // value={index}
                              onClick={onRemoveComment}
                              className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-red-500 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
