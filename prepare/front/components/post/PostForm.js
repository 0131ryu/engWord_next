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
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex  w-72 h-8">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">
                    Tester Name
                  </h3>
                </div>
                {/* 시간 표시는 복잡해지면 제거하기 */}
                <p className="mt-1 max-w-2xl text-sm text-gray-300">
                  8 hours ago
                </p>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and application. Personal details and
                  application. Personal details and application. Personal
                  details and application. Personal details and application.
                  Personal details and application.
                </p>
              </div>
              <div className="h-10 grid grid-cols-4 gap-4 content-center md:gap-6 bg-gray-200 px-5 py-3 sm:px-6">
                <div className="relative top-2 w-6 h-6 grid grid-cols-1">
                  <button className="rounded-md ">
                    <ArrowPathRoundedSquareIcon />
                  </button>
                </div>
                <div className="relative top-2 w-6 h-6 grid grid-cols-1 ">
                  <button className="rounded-md">
                    <HeartIcon />
                  </button>
                </div>
                <div className="w-10 h-10 grid grid-cols-1"></div>
                {/* 삭제 start */}
                <div className="w-10 h-10 grid grid-cols-1">
                  <Popover>
                    <>
                      <Popover.Button className="rounded-md px-3 py-2 text-base">
                        <div className="w-5 h-6">
                          <EllipsisHorizontalIcon />
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
                            <div className="bg-gray-100 p-1">
                              <a
                                href="##"
                                className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              >
                                삭제
                              </a>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  </Popover>
                </div>
                {/* 삭제 end */}
              </div>

              <div className="flex border border-gray-200">
                <p className="absolute ml-5 mt-3 max-w-2xl text-sm text-gray-900">
                  1개의 댓글
                </p>
                <Popover>
                  <>
                    <Popover.Button className="relative left-60 sm:left-52 lg:left-96 bottom-10 rounded-md px-3 py-2 text-base">
                      <div className="w-6 h-6">
                        <ChatBubbleBottomCenterTextIcon />
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
                      <Popover.Panel>
                        {/* 댓글 start */}
                        <div className="border border-light-green m-2 p-2 rounded-lg sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <div className="flex">
                            <img
                              className="mt-2 h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                            <div className="w-40 h-8 mt-3 ml-3 text-sm font-medium text-gray-500">
                              Hi My name is Tester!
                            </div>
                          </div>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            Fugiat ipsum ipsum deserunt culpa aute sint do
                            nostrud anim incididunt cillum culpa consequat.
                            Excepteur qui ipsum aliquip consequat sint. Sit id
                            mollit nulla mollit nostrud in ea officia proident.
                            Irure nostrud pariatur mollit ad adipisicing
                            reprehenderit deserunt qui eu.
                          </dd>
                        </div>
                        {/* 댓글 end */}
                      </Popover.Panel>
                    </Transition>
                  </>
                </Popover>
              </div>
            </div>
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
