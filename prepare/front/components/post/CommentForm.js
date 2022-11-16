import React from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { addCommentRequest } from "../../redux/feature/postSlice";

const CommentForm = () => {
  const dispatch = useDispatch();
  const [text, onChangeText] = useInput("");

  const onSubmitCommentForm = (e) => {
    e.preventDefault();
    console.log(text);
    dispatch(addCommentRequest(text));
  };
  return (
    <>
      <div className="flex bg-white border-2 border-light-beige m-2 p-2 rounded-lg">
        <form onSubmit={onSubmitCommentForm}>
          <div className="flex">
            <textarea
              placeholder="댓글 입력"
              onChange={onChangeText}
              className="group relative w-full justify-center rounded-md border border-transparent bg-white boder border-dark-green py-2 px-4 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2"
            />
            <button
              type="submit"
              className="group relative flex ml-2 w-28 justify-center rounded-md border border-transparent bg-light-orange p-5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2"
            >
              제출
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
