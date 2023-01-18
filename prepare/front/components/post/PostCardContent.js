import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const PostCardContent = ({
  id,
  content,
  editMode,
  onRevisePost,
  onCancleRevisePost,
  index,
}) => {
  const router = useRouter();
  const [editText, setEditText] = useState(content);
  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  const onPostDetail = useCallback(() => {
    router.push(`/post/${id}`);
  }, []);

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
          <small className="text-gray-400 m-5 float-right">2 hours ago</small>
        </div>
      ) : (
        <>
          <div className="mx-5">
            {content?.split(/(#[^\s#]+)/g).map((v, i) => {
              if (v.match(/(#[^\s#]+)/)) {
                return (
                  <>
                    <div key={i} className="float-left mx-1">
                      <Link className="" href={`/hashtag/${v.slice(1)}`}>
                        <p className="cursor-pointer text-sky-500">{v}</p>
                      </Link>
                    </div>
                  </>
                );
              }
              return (
                <>
                  <div className="cursor-pointer" onClick={onPostDetail}>
                    {v}
                  </div>
                </>
              );
            })}
          </div>
          <small className="text-gray-400 m-5 float-right ml-2">
            2 hours ago
          </small>
        </>
      )}
    </>
  );
};

export default PostCardContent;
