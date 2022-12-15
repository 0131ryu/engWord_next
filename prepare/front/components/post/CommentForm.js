import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { PencilIcon } from "@heroicons/react/24/outline";
import { addCommentRequest } from "../../redux/feature/postSlice";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput("");

  const onSubmitCommentForm = useCallback(() => {
    dispatch(
      addCommentRequest({ content: commentText, postId: post.id, userId: id })
    );
  }, [commentText, id]);
  return (
    <>
      <div className="w-4/5 mx-auto block">
        <div className="mt-2 shadow shadow-black-500/40 rounded-lg">
          <div className="p-2 justify-between rounde-md">
            <div className="flex">
              <textarea
                className="w-full"
                type="text"
                onChange={onChangeCommentText}
                placeholder="댓글 입력"
              />
              <button onClick={onSubmitCommentForm} className="mt-1 ml-2">
                <PencilIcon
                  className="h-8 w-8 md:h-10 md:w-10 lg:h-10 lg:w-10 
                   hover:bg-light-green hover:text-white hover:rounded-md"
                />
              </button>
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-light-green file:text-light-beige
      hover:file:bg-light-green
    "
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentForm;
