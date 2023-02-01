import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { PencilIcon } from "@heroicons/react/24/outline";
import { addCommentRequest } from "../../redux/feature/postSlice";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentComplete } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput("");

  useEffect(() => {
    if (addCommentComplete) {
      setCommentText("");
    }
  }, [addCommentComplete]);

  const onSubmitCommentForm = useCallback(() => {
    if (!commentText) {
      alert("댓글은 입력 후 등록 가능합니다.");
    } else {
      dispatch(
        addCommentRequest({ content: commentText, postId: post.id, userId: id })
      );
    }
  }, [commentText, id]);
  return (
    <>
      <div className="w-full p-1 mx-auto block">
        <div className="mt-2 shadow shadow-black-500/40 rounded-lg">
          <div className="p-2 justify-between rounde-md">
            <div className="flex">
              <textarea
                className="w-full"
                type="text"
                value={commentText}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentForm;
