import React, { useCallback, useState, useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import ReviseWordModal from "./ReviseWordModal";
import RemoveWordModal from "./RemoveWordModal";
import { changeStatusWordRequest } from "../../redux/feature/wordSlice";

const WordItem = ({ UserId, word, index }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [id, setId] = useState(0);
  const [checkedItem, setCheckedItems] = useState(new Set());
  const [bChecked, setBChecked] = useState(false);

  useEffect(() => {
    if (word.status === "C") {
      setBChecked(true);
    } else if (word.status === "A") {
      setBChecked(false);
    }
  }, [word.status]);

  const onReviseWord = (e) => {
    setId(parseInt(e.target.value));
    setModal(true);
  };

  const onRemoveWord = (e) => {
    setId(parseInt(e.target.value));
    setRemoveModal(true);
    console.log(e.target.value, id);
  };

  const onChangeSelected = useCallback((e) => {
    const checkboxClicked = e.target;
    const wordIndex = e.target.value;

    if (checkboxClicked.checked) {
      setBChecked(true);
      dispatch(changeStatusWordRequest({ id: wordIndex, status: "C" }));
    } else if (!checkboxClicked.checked) {
      setBChecked(false);
      dispatch(changeStatusWordRequest({ id: wordIndex, status: "A" }));
    }
  }, []);

  return (
    <>
      {/* 수정 모달창 */}
      {modal ? (
        <ReviseWordModal
          id={word.id}
          setModal={setModal}
          showEng={word.english}
          showKor={word.korean}
          showType={word.type}
        />
      ) : null}
      {/* 삭제 모달창 */}
      {removeModal ? (
        <RemoveWordModal id={word.id} setRemoveModal={setRemoveModal} />
      ) : null}
      {/* item start */}
      <div
        key={word}
        className="flex items-start bg-gray-400 group-hover:opacity-80 rounded-lg m-2"
      >
        <div className="bg-gary-400 h-24 w-90 sm:600 w-96 lg:w-48">
          <div className="flex py-5 pl-1">
            <input
              checked={bChecked}
              onChange={onChangeSelected}
              value={word.id}
              name="checkItem"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <li className="flex first:pt-0 last:pb-0">
            <div className="relative bottom-10 ml-9 overflow-hidden">
              <p className="text-sm font-medium text-slate-900">
                {word.english} ({word.id})
              </p>
              <p className="text-sm text-slate-900 truncate">
                {word.korean} {word.id} {word.status}
              </p>
            </div>
          </li>
        </div>
        <div className="relative h-24 w-24 py-2">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Options
                <ChevronDownIcon className="ml-1 h-5 w-5" aria-hidden="true" />
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
};

export default WordItem;
