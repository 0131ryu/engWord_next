import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCommentRequest } from "../../redux/feature/postSlice";

const CommentCard = () => {
  const dispatch = useDispatch();
  const { Comments } = useSelector((state) => state.post);

  const onRemoveComment = useCallback((e) => {
    const index = e.target.value;
    dispatch(removeCommentRequest(index));
  }, []);

  return (
    <>
      {Comments.map((comment, index) => {
        return (
          <div className="border border-light-green m-2 p-2 rounded-lg sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <div className="flex w-56">
              <img
                className="mt-2 ml-16 h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="w-36 md:w-16 h-8 mt-3 ml-3 text-sm font-medium text-gray-500">
                {comment.ex_nickname}
              </div>
            </div>
            <div>
              <dd className="mt-1 text-sm text-gray-900 lg:w-96">
                {comment.content}
                <button
                  value={index}
                  className="bg-gray-100 w-10 h-10 mx-2 mt-1 rounded-lg"
                  onClick={onRemoveComment}
                >
                  삭제 ({index})
                </button>
              </dd>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CommentCard;
