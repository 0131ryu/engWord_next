import React from "react";
import PostSearch from "./PostSearch";
import UserInfo from "../UserInfo";
import {
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PostCard from "./PostCard";
import CommentCard from "./CommentCard";

const PostForm = () => {
  return (
    <>
      <div className="h-full mt-5">
        <div className="md:grid md:grid-cols-4 md:gap-6">
          <UserInfo />
          {/* mainPost */}
          <div className="bg-white md:col-span-2 md:mt-0">
            {/* post 생성 start */}
            <div className="flex bg-light-beige m-2 p-2 rounded-lg">
              <form className="w-full h-full" action="#" method="POST">
                <div className="flex">
                  <label htmlFor="word" className="sr-only">
                    Email address
                  </label>
                  <textarea
                    id="word"
                    name="word"
                    type="text"
                    autoComplete="word"
                    required
                    className="group relative w-full justify-center rounded-md border border-transparent bg-white boder border-dark-green py-2 px-4 text-sm font-medium text-black hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2"
                    placeholder="which one do you find?"
                  />

                  <button
                    type="submit"
                    className="group relative flex ml-2 w-20 justify-center rounded-md border border-transparent bg-light-orange py-2 px-4 text-sm font-medium text-white hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2"
                  >
                    search
                  </button>
                </div>
                <button
                  type="submit"
                  className="mt-2 group relative flex ml-2 w-20 justify-center rounded-md border border-transparent bg-light-brown py-2 px-4 text-sm font-medium text-white hover:bg-light-orange focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2"
                >
                  이미지 추가
                </button>
              </form>
            </div>
            {/* post 생성 end */}
            {/* Card start */}
            <PostCard />
            {/* Card end */}
          </div>

          {/* search form */}
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <PostSearch />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm;
