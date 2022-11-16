import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { addPostRequest } from "../../redux/feature/postSlice";

import UserInfo from "../UserInfo";
import PostSearch from "./PostSearch";
import PostCard from "./PostCard";

const PostForm = () => {
  const dispatch = useDispatch();
  const { me, loginComplete } = useSelector((state) => state.user);

  const [text, onChangeText] = useInput("");

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log(text);
    dispatch(addPostRequest(text));
  });
  return (
    <>
      <div className="h-full mt-5">
        <div className="md:grid md:grid-cols-4 md:gap-6"></div>
        {me && loginComplete ? <UserInfo /> : <div></div>}
        <div className="bg-white md:col-span-2 md:mt-0">
          <div className="flex bg-light-beige m-2 p-2 rounded-lg">
            <form onSubmit={onSubmitForm}>
              <div className="flex">
                <textarea
                  placeholder="입력"
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
              <button className="mt-2 group relative flex ml-2 w-20 justify-center rounded-md border border-transparent bg-light-brown py-2 px-4 text-sm font-medium text-white hover:bg-light-orange focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2">
                이미지 추가
              </button>
            </form>
          </div>
          {/* Card start */}
          <PostCard />
          {/* Card end */}
        </div>
      </div>
      {/* search form */}
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <PostSearch />
        </div>
      </div>
    </>
  );
};

export default PostForm;
