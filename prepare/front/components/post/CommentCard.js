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
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [removeModal, setRemoveModal] = useState(false);

  const onReviseComment = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancleReviseComment = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  const onReviseCommentSubmit = useCallback(
    (editText) => () => {
      console.log("typeof comment", typeof comment);
      dispatch(
        reviseCommentRequest({ editText: editText, commentId: comment.id })
      );
      setEditMode(false);
    },
    []
  );

  const onRemoveComment = useCallback(() => {
    setRemoveModal(true);
  }, []);

  return (
    <>
      {/* 댓글 삭제 모달창 */}
      {removeModal ? (
        <RemoveCommentModal
          commentId={comment.id}
          setRemoveModal={setRemoveModal}
        />
      ) : null}
      <div className="w-full px-2 mx-auto block">
        <div className="mt-1 ">
          <div className="p-2 justify-between rounde-md">
            <div className="flex">
              <img
                className="mt-2 h-8 w-8 rounded-full cursor-pointer"
                src={`http://localhost:3005/userImg/${comment.User.profileImg}`}
                alt={comment.profileImg}
              />
              <p className="p-2 m-1 font-bold text-xs">{comment.nickname}</p>
              {editMode ? (
                <div>
                  <textarea
                    id="message"
                    rows="2"
                    className="form-control block w-full lg:min-w-[590px] px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding
                    border border-solid border-gray-300 rounded transition ease-in-out m-0"
                    onChange={onChangeText}
                  >
                    {comment.content}
                  </textarea>
                  <div className="flex justify-end items-center mt-2 mr-4">
                    <button
                      onClick={onReviseCommentSubmit(editText)}
                      className="mr-2 px-1 h-5 text-xs lg:h-9 text-sm bg-light-beige rounded-md font-bold focus:bg-light-green focus:text-white"
                    >
                      수정
                    </button>
                    <button
                      onClick={onCancleReviseComment}
                      className="px-1 h-5 text-xs lg:h-9 text-sm bg-light-beige rounded-md font-bold focus:bg-red-500 focus:text-white"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <p
                  id="message"
                  rows="3"
                  className="text-clip overflow-hidden block p-2.5 bg-gray-100 rounded-lg text-xs lg:text-sm w-11/12 lg:h-full"
                >
                  {comment.content}
                </p>
              )}

              {editMode ? null : (
                <div className="ml-2">
                  <Popover>
                    <>
                      <Popover.Button className="rounded-md mt-1">
                        <div>
                          {me?.id === comment?.UserId ? (
                            <EllipsisHorizontalIcon className="h-5 w-5 lg:h-8 lg:w-8" />
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
                                onClick={onReviseComment}
                                className="flow-root rounded-md w-full p-1 transition duration-150 ease-in-out hover:bg-light-orange "
                              >
                                수정
                              </button>
                              <button
                                onClick={onRemoveComment}
                                className="flow-root rounded-md w-full p-1 transition duration-150 ease-in-out hover:bg-red-500 hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
