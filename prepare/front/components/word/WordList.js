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
  changeStatusWordRequest,
  changeStatusWordAllRequest,
} from "../../redux/feature/wordSlice";

const WordList = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [id, setId] = useState(0);
  const [status, setStatus] = useState("C");
  const arrayEasy = [];
  const arrayMiddle = [];
  const arrayAdvance = [];
  const checkedWordList = [];

  const {
    wordLists,
    page,
    minIndex,
    maxIndex,
    pageMiddle,
    minIndexMiddle,
    maxIndexMiddle,
  } = useSelector((state) => state.word);

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
    if (word.type === "middle") {
      arrayMiddle.push(i);
    }
    if (word.status === "C") {
      checkedWordList.push(word);
    }
  });

  console.log("checkedWordList", checkedWordList);

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

  const onClickAllSelected = useCallback((e) => {
    const checkboxClickedAll = e.target;
    checkboxClickedAll.classList.toggle(status);
    const checkboxes = document.querySelectorAll("input[name=checkItem]");

    if (checkboxClickedAll.checked) {
      dispatch(changeStatusWordAllRequest({ status: status }));
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = checkboxClickedAll.checked;
      }
    } else {
      dispatch(changeStatusWordAllRequest({ status: "A" }));
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = checkboxClickedAll.checked;
      }
    }
  }, []);

  const onClickSelected = useCallback((e) => {
    const checkboxClicked = e.target;
    const wordIndex = e.target.value;

    checkboxClicked.classList.toggle(status);

    if (checkboxClicked.checked) {
      dispatch(changeStatusWordRequest({ id: wordIndex, status: status }));
    } else if (!checkboxClicked.checked) {
      dispatch(changeStatusWordRequest({ id: wordIndex, status: "A" }));
    }
  }, []);

  return (
    <>
      {/* checkbox */}
      <div className="absolute top-64 right-0 md:right-20 lg:right-52">
        <div className="flex items-center mb-2">
          <input
            onChange={onClickAllSelected}
            id="checkboxAll"
            type="checkbox"
            className="w-4 h-4 text-light-green bg-gray-900 rounded border-light-green focus:ring-light-green dark:focus:ring-light-green dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="checkboxAll"
            className="ml-2 text-sm font-bold text-gray-900 border-light-green"
          >
            전체 선택 / 해제
          </label>
        </div>
        <p>
          체크된 단어 개수 : {checkedWordList.length}/{wordLists.length}
        </p>
      </div>
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
              {/* <div className="flex absolute left-32 top-4">
                <button className="hover:bg-gray-100 w-8 h-8 rounded-lg">
                  <ChevronLeftIcon onClick={onClickLeftEasy} />
                </button>
                <div className="font-medium mt-1">{page}</div>
                <button className="hover:bg-gray-100 w-8 h-8 rounded-lg">
                  <ChevronRightIcon onClick={onClickRightEasy} />
                  {minIndex} {maxIndex}
                </button>
              </div> */}
              {/* item start */}
              {wordLists.map((word, index) => {
                if (
                  word.type === "easy"
                  // &&
                  // `${minIndex}` <= index &&
                  // index < `${maxIndex}`
                ) {
                  // console.log("index", index);
                  // console.log("minIndex", minIndex);
                  // console.log("maxIndex", maxIndex);
                  return (
                    <>
                      <div
                        key={word}
                        className="flex items-start bg-gray-400 group-hover:opacity-80 rounded-lg m-2"
                      >
                        <div className="h-24 w-90 sm:600 w-96 lg:w-48">
                          <div className="flex py-5 pl-1">
                            <input
                              onClick={onClickSelected}
                              value={index}
                              id="checkItem"
                              name="checkItem"
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
                                {word.korean} {word.id} {word.status}
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
              {/* <div className="flex absolute left-32 top-4">
                <button className="hover:bg-gray-100 w-8 h-8 rounded-lg">
                  <ChevronLeftIcon onClick={onClickLeftMiddle} />
                </button>
                <div className="font-medium mt-1">{pageMiddle}</div>
                <button className="hover:bg-gray-100 w-8 h-8 rounded-lg">
                  <ChevronRightIcon onClick={onClickRightMiddle} />
                  {minIndexMiddle} {maxIndexMiddle}
                </button>
              </div> */}
              {/* item start */}
              {wordLists.map((word, index) => {
                if (
                  word.type === "middle"
                  // &&
                  // parseInt(minIndexMiddle) < index &&
                  // index <= parseInt(maxIndexMiddle)
                ) {
                  // console.log("index", index);
                  // console.log("최소값", parseInt(minIndexMiddle));
                  // console.log("최대값", parseInt(maxIndexMiddle));
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
                                onClick={onClickSelected}
                                value={index}
                                id="checkItem"
                                name="checkItem"
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
                                  {word.korean} {word.id} {word.status}
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
                              onClick={onClickSelected}
                              value={index}
                              id="checkItem"
                              name="checkItem"
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
                                {word.korean} {word.id} {word.status}
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
