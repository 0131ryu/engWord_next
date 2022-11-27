import React, { useCallback, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import ReviseWordModal from "./ReviseWordModal";
import RemoveWordModal from "./RemoveWordModal";
import {
  incrementEasy,
  decrementEasy,
  incrementMiddle,
  decrementMiddle,
} from "../../redux/feature/wordSlice";

const WordList = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [id, setId] = useState(0);
  const arrayEasy = [];
  const arrayMiddle = [];
  const arrayAdvance = [];

  const { wordLists, page, minIndex, maxIndex, pageMiddle } = useSelector(
    (state) => state.word
  );
  let { minIndexMiddle, maxIndexMiddle } = useSelector((state) => state.word);

  const onReviseWord = (e) => {
    setId(parseInt(e.target.value));
    setModal(true);
    // console.log("버튼 클릭 시 modal 2", modal);
  };

  const onRemoveWord = (e) => {
    setId(parseInt(e.target.value));
    setRemoveModal(true);
    console.log(e.target.value, id);
    console.log("메인에서 삭제 버튼 클릭 시 modal 2", removeModal);
  };

  wordLists.map((word, i) => {
    if (word.type === "easy") {
      arrayEasy.push(i);
    }
  });

  wordLists.map((word, i) => {
    if (word.type === "middle") {
      arrayMiddle.push(i);
    }
  });

  const easyLists = Object.keys(arrayEasy).length - 1;
  // let middleLists = Object.keys(arrayMiddle).length - 1;

  const onClickLeftEasy = useCallback(() => {
    dispatch(decrementEasy());
  });

  const onClickRightEasy = useCallback(() => {
    if (easyLists < maxIndex) {
      null;
    } else {
      dispatch(incrementEasy());
    }
  });

  const onClickLeftMiddle = useCallback(() => {
    if (Math.min.apply(null, arrayMiddle) > minIndexMiddle) {
      null;
    } else {
      dispatch(decrementMiddle());
    }
  });

  const onClickRightMiddle = useCallback(() => {
    if (Math.max.apply(null, arrayMiddle) === maxIndexMiddle) {
      null;
    } else {
      dispatch(incrementMiddle());
    }
  });

  return (
    <>
      {/* 수정 모달창 */}
      {modal ? <ReviseWordModal isId={id} setModal={setModal} /> : null}
      {/* 삭제 모달창 */}
      {removeModal ? (
        <RemoveWordModal isId={id} setRemoveModal={setRemoveModal} />
      ) : null}

      <div className="lg:w-full relative">
        <div className="h-max mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-1">
          {/* Easy start */}
          <div className="group relative rounded-lg p-3 lg:w-80 lg:ml-10">
            <div className="overflow-y-auto max-h-96 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white border-2 border-light-green lg:aspect-none">
              <div>
                <h1 className="text-slate-900 font-medium px-3 pt-2">
                  🥉 Easy
                </h1>
              </div>
              <div className="flex absolute left-32 top-4">
                <button className="hover:bg-gray-100 w-8 h-8 rounded-lg">
                  <ChevronLeftIcon onClick={onClickLeftEasy} />
                </button>
                <div className="font-medium mt-1">{page}</div>
                <button className="hover:bg-gray-100 w-8 h-8 rounded-lg">
                  <ChevronRightIcon onClick={onClickRightEasy} />
                  {minIndex} {maxIndex}
                </button>
              </div>
              {/* item start */}
              {wordLists.map((word, index) => {
                if (
                  word.type === "easy" &&
                  `${minIndex}` <= index &&
                  index < `${maxIndex}`
                ) {
                  return (
                    <>
                      <div
                        key={word}
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
                                {word.english} ({index})
                              </p>
                              <p className="text-sm text-slate-900 truncate">
                                {word.korean} {word.id}
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
                                      <button
                                        value={index}
                                        onClick={onReviseWord}
                                        className={
                                          (active
                                            ? "rounded-md bg-gray-100 text-gray-900"
                                            : "rounded-md text-gray-700 ",
                                          "block px-8 py-1 text-sm hover:bg-light-green hover:w-24 hover:text-white")
                                        }
                                      >
                                        수정
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        value={index}
                                        onClick={onRemoveWord}
                                        className={
                                          (active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-8 py-1 text-sm hover:bg-light-green hover:w-24 hover:text-white")
                                        }
                                      >
                                        삭제
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
              {/* item end */}
            </div>
          </div>
          {/* Easy end */}
          {/* Middle start */}
          <div className="group relative rounded-lg p-3 lg:w-80 lg:ml-10">
            <div className="overflow-y-auto max-h-96 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white border-2 border-light-green lg:aspect-none">
              <div>
                <h1 className="text-slate-900 font-medium px-3 pt-2">
                  🥈 Middle
                </h1>
              </div>
              <div className="flex absolute left-32 top-4">
                <button className="hover:bg-gray-100 w-8 h-8 rounded-lg">
                  <ChevronLeftIcon onClick={onClickLeftMiddle} />
                </button>
                <div className="font-medium mt-1">{pageMiddle}</div>
                <button className="hover:bg-gray-100 w-8 h-8 rounded-lg">
                  <ChevronRightIcon onClick={onClickRightMiddle} />
                  {minIndexMiddle} {maxIndexMiddle}
                </button>
              </div>
              {/* item start */}
              {wordLists.map((word, index) => {
                word.type === "middle";
                if (
                  `${minIndexMiddle}` < index &&
                  index <= `${maxIndexMiddle}`
                ) {
                  {
                    return (
                      <>
                        <div
                          key={word}
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
                                  {word.english} ({index})
                                </p>
                                <p className="text-sm text-slate-900 truncate">
                                  {word.korean} {word.id}
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
                                        <button
                                          value={index}
                                          onClick={onReviseWord}
                                          className={
                                            (active
                                              ? "rounded-md bg-gray-100 text-gray-900"
                                              : "rounded-md text-gray-700 ",
                                            "block px-8 py-1 text-sm hover:bg-light-green hover:w-24 hover:text-white")
                                          }
                                        >
                                          수정
                                        </button>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          value={index}
                                          onClick={onRemoveWord}
                                          className={
                                            (active
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-8 py-1 text-sm hover:bg-light-green hover:w-24 hover:text-white")
                                          }
                                        >
                                          삭제
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </div>
                      </>
                    );
                  }
                }
              })}
              {/* item end */}
            </div>
          </div>
          {/* Middle end */}
          {/* Advance start */}
          <div className="group relative rounded-lg p-3 lg:w-80 lg:ml-10">
            <div className=" overflow-y-auto max-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white border-2 border-light-green lg:aspect-none">
              <div>
                <h1 className="text-slate-900 font-medium px-3 pt-2">
                  🥇 Advance
                </h1>
              </div>
              {/* item start */}
              {wordLists.map((word, index) => {
                if (word.type === "advance") {
                  return (
                    <>
                      <div className="flex items-start bg-gray-400 group-hover:opacity-80 rounded-lg m-2">
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
                                {word.english} ({index})
                              </p>
                              <p className="text-sm text-slate-900 truncate">
                                {word.korean} {word.id}
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
                                      <button
                                        value={index}
                                        onClick={onReviseWord}
                                        className={
                                          (active
                                            ? "rounded-md bg-gray-100 text-gray-900"
                                            : "rounded-md text-gray-700 ",
                                          "block px-8 py-1 text-sm hover:bg-light-green hover:w-24 hover:text-white")
                                        }
                                      >
                                        수정
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        value={index}
                                        onClick={onRemoveWord}
                                        className={
                                          (active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-8 py-1 text-sm hover:bg-light-green hover:w-24 hover:text-white")
                                        }
                                      >
                                        삭제
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
              {/* item end */}
            </div>
          </div>
          {/* Advance end */}
        </div>
      </div>
    </>
  );
};

export default WordList;
