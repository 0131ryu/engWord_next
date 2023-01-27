import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Popover, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { reviseCommentRequest } from "../../redux/feature/postSlice";
import RemoveCommentModal from "./RemoveCommentModal";

const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [removeModal, setRemoveModal] = useState(false);

  const onReviseComment = useCallback((e) => {
    const index = e.target.value;
    dispatch(reviseCommentRequest(index));
  }, []);

  const onRemoveComment = useCallback((e) => {
    setRemoveModal(true);
  }, []);

  return (
    <>
      {/* 댓글 삭제 모달창 */}
      {removeModal ? (
        <RemoveCommentModal
          postId={comment.PostId}
          commentId={comment.id}
          setRemoveModal={setRemoveModal}
        />
      ) : null}
      <div className="w-full px-2 mx-auto block">
        <div className="mt-1 ">
          <div className="p-2 justify-between rounde-md">
            <div className="flex">
              <p className="p-2 m-1 font-bold">{comment.nickname}</p>
              <p
                id="message"
                rows="3"
                className="block p-2.5 w-11/12 h-full text-sm text-gray-900 bg-white"
                onChange={onRemoveComment}
              >
                {comment.content}
              </p>
              <div className="ml-2">
                <Popover>
                  <>
                    <Popover.Button className="rounded-md px-3 py-2 text-base">
                      <div>
                        {me?.id === comment?.UserId ? (
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
                              value={comment.PostId}
                              onClick={onReviseComment}
                              className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-light-orange focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              수정
                            </button>
                            <button
                              value={comment.PostId}
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
