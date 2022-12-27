import React, { useEffect, useState } from "react";
import { useCallback } from "react";

const PostCardContent = ({
  images,
  content,
  editMode,
  onRevisePost,
  onCancleRevisePost,
  index,
}) => {
  const [editText, setEditText] = useState(content);
  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  // console.log("images", images);

  return (
    <>
      {editMode ? (
        <div>
          <textarea
            id="message"
            rows="4"
            className="ml-4 block p-2.5 w-11/12 h-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            onChange={onChangeText}
          >
            {content}
          </textarea>
          <div className="flex justify-end items-center mt-2 mr-4">
            <button
              onClick={onRevisePost(editText, index)}
              className="mr-2 px-1 h-9 bg-light-beige rounded-md font-bold focus:bg-light-green focus:text-white"
            >
              수정
            </button>
            <button
              onClick={onCancleRevisePost}
              className="px-1 h-9 bg-light-beige rounded-md font-bold focus:bg-red-500 focus:text-white"
            >
              취소
            </button>
          </div>
          <small className="text-gray-400 m-4">2 hours ago</small>
        </div>
      ) : (
        <div>
          <p className="p-4">{content}</p>
          <small className="text-gray-400 m-4">2 hours ago</small>
        </div>
      )}
    </>
  );
};

export default PostCardContent;
