import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { addPostRequest } from "../../redux/feature/postSlice";
import { PencilIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";

import UserInfo from "../UserInfo";
import PostSearch from "./PostSearch";
import PostCard from "./PostCard";

const PostForm = () => {
  const dispatch = useDispatch();
  const { me, loginComplete } = useSelector((state) => state.user);

  const [text, onChangeText] = useInput("");

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(text);
      dispatch(addPostRequest(text));
    },
    [text]
  );
  return (
    <>
      <div className="h-full mt-5">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <UserInfo />
            {/* {me && loginComplete ? <UserInfo /> : null} */}
          </div>
          <div className="bg-white col-span-2">
            <form
              onSubmit={onSubmitForm}
              className="mt-2 shadow shadow-black-500/40"
            >
              <div className="p-2 justify-between rounde-md">
                <div className="flex">
                  <textarea
                    className="w-full"
                    type="text"
                    onChange={onChangeText}
                    placeholder="무엇을 입력하시겠습니까?"
                  />
                  <button type="submit" className="mt-1 ml-2">
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
            </form>
            <PostCard />
          </div>

          <div className="col-span-1">
            <div>
              <PostSearch />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm;
