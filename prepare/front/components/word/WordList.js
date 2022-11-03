import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

//객체 안에 배열
const words = {
  easy: [
    {
      id: 1,
      english: "Americano",
      korean: "아메리카노",
      type: "easy",
    },
  ],
  middle: [
    {
      id: 2,
      english: "Latte",
      korean: "라떼",
      type: "middle",
    },
  ],
  advance: [
    {
      id: 3,
      english: "Water",
      korean: "물",
      type: "advance",
    },
  ],
};

const WordList = () => {
  return (
    <>
      <div className=" lg:w-full relative bg-black">
        <div className=" place-content-center mx-auto max-w-1xl py-8 px-4 sm:py-20 sm:px-3 lg:max-w-screen-xl">
          <div className="bg-light-orange h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-1">
            {/* Easy start */}
            <div className="group relative rounded-lg p-3 lg:w-80 lg:ml-10">
              <div className="bg-gray-300 overflow-y-auto max-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white border-2 border-light-green lg:aspect-none">
                <div>
                  <h1 className="text-slate-900 font-medium px-3 pt-2">
                    🥉Easy
                  </h1>
                </div>
                {/* item start */}
                {words.easy.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-start bg-gray-400 group-hover:opacity-80 rounded-lg m-2"
                  >
                    <div className="h-24 w-90 sm:600 w-96 lg:w-48">
                      <div className="flex py-5 pl-1">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <li className="flex first:pt-0 last:pb-0">
                        <div className="relative bottom-10 ml-9 overflow-hidden">
                          <p className="text-sm font-medium text-slate-900">
                            {word.english}
                          </p>
                          <p className="text-sm text-slate-900 truncate">
                            {word.korean}
                          </p>
                        </div>
                      </li>
                    </div>
                    <div className="relative h-24 w-24 py-2">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            Options
                            <ChevronDownIcon
                              className="ml-1 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-90"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-0">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={
                                      (active
                                        ? "rounded-md bg-gray-100 text-gray-900"
                                        : "rounded-md text-gray-700",
                                      "block px-8 py-1 text-sm")
                                    }
                                  >
                                    수정
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={
                                      (active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-8 py-1 text-sm")
                                    }
                                  >
                                    삭제
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                ))}
                {/* item end */}
              </div>
            </div>
            {/* Easy end */}
            {/* Middle start */}
            <div className="group relative rounded-lg p-3 lg:w-80 lg:ml-10">
              <div className="bg-gray-300 overflow-y-auto max-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white border-2 border-light-green lg:aspect-none">
                <div>
                  <h1 className="text-slate-900 font-medium px-3 pt-2">
                    🥈 Middle
                  </h1>
                </div>
                {/* item start */}
                {words.middle.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-start bg-gray-400 group-hover:opacity-80 rounded-lg m-2"
                  >
                    <div className="h-24 w-90 sm:600 w-96 lg:w-48">
                      <div className="flex py-5 pl-1">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <li className="flex first:pt-0 last:pb-0">
                        <div className="relative bottom-10 ml-9 overflow-hidden">
                          <p className="text-sm font-medium text-slate-900">
                            {word.english}
                          </p>
                          <p className="text-sm text-slate-900 truncate">
                            {word.korean}
                          </p>
                        </div>
                      </li>
                    </div>
                    <div className="relative h-24 w-24 py-2">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            Options
                            <ChevronDownIcon
                              className="ml-1 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-90"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-0">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={
                                      (active
                                        ? "rounded-md bg-gray-100 text-gray-900"
                                        : "rounded-md text-gray-700",
                                      "block px-8 py-1 text-sm")
                                    }
                                  >
                                    수정
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={
                                      (active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-8 py-1 text-sm")
                                    }
                                  >
                                    삭제
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                ))}
                {/* item end */}
              </div>
            </div>
            {/* Middle end */}
            {/* Advance start */}
            <div className="group relative rounded-lg p-3 lg:w-80 lg:ml-10">
              <div className="bg-gray-300 overflow-y-auto max-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white border-2 border-light-green lg:aspect-none">
                <div>
                  <h1 className="text-slate-900 font-medium px-3 pt-2">
                    🥇 Advance
                  </h1>
                </div>
                {/* item start */}
                {words.advance.map((word) => (
                  <div
                    key={word.id}
                    className="flex items-start bg-gray-400 group-hover:opacity-80 rounded-lg m-2"
                  >
                    <div className="h-24 w-90 sm:600 w-96 lg:w-48">
                      <div className="flex py-5 pl-1">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <li className="flex first:pt-0 last:pb-0">
                        <div className="relative bottom-10 ml-9 overflow-hidden">
                          <p className="text-sm font-medium text-slate-900">
                            {word.english}
                          </p>
                          <p className="text-sm text-slate-900 truncate">
                            {word.korean}
                          </p>
                        </div>
                      </li>
                    </div>
                    <div className="relative h-24 w-24 py-2">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            Options
                            <ChevronDownIcon
                              className="ml-1 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-90"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-0">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={
                                      (active
                                        ? "rounded-md bg-gray-100 text-gray-900"
                                        : "rounded-md text-gray-700",
                                      "block px-8 py-1 text-sm")
                                    }
                                  >
                                    수정
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={
                                      (active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-8 py-1 text-sm")
                                    }
                                  >
                                    삭제
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                ))}
                {/* item end */}
              </div>
            </div>
            {/* Advance end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default WordList;
