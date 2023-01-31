import React, { useCallback, useState, useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import ReviseWordModal from "./ReviseWordModal";
import RemoveWordModal from "./RemoveWordModal";
import {
  changeStatusWordRequest,
  reviseWordRequest,
} from "../../redux/feature/wordSlice";

const WordItem = ({ UserId, word, index }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [modal, setModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [id, setId] = useState(0);
  const [bChecked, setBChecked] = useState(false);

  useEffect(() => {
    if (word.status === "C") {
      setBChecked(true);
    } else if (word.status === "A") {
      setBChecked(false);
    }
  }, [word.status]);

  const onChangeReviseWord = useCallback(
    (editKor, editEng, editType) => () => {
      setEditMode(false);
      console.log(
        "id, editKor, editEng, editType",
        word.id,
        editKor,
        editEng,
        editType
      );
      dispatch(reviseWordRequest({ id: word.id, editEng, editKor, editType }));
    },
    []
  );

  const onReviseWord = (e) => {
    setEditMode(true);
    setModal(true);
  };

  const onRemoveWord = (e) => {
    setId(parseInt(e.target.value));
    setRemoveModal(true);
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
          setEditMode={setEditMode}
          setModal={setModal}
          editMode={editMode}
          showEng={word.english}
          showKor={word.korean}
          showType={word.type}
          onChangeReviseWord={onChangeReviseWord}
        />
      ) : null}
      {/* 삭제 모달창 */}
      {removeModal ? (
        <RemoveWordModal id={word.id} setRemoveModal={setRemoveModal} />
      ) : null}
      {/* item start */}
      <div
        key={word}
        className="flex items-start bg-gray-200 group-hover:opacity-80 rounded-lg h-20 m-2"
      >
        <div className="h-24 w-90 sm:600 w-96 lg:w-48">
          <div className="flex py-5 pl-3">
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
              <p className="flex w-44">
                <span className="font-bold ml-1 text-clip overflow-hidden">
                  {word.english}
                </span>
              </p>
              <p className="text-sm w-44 text-slate-900 text-clip overflow-hidden">
                {word.korean}
              </p>
            </div>
          </li>
        </div>
        <div className="mr-2 mt-2">
          <Menu as="div" className="relative inline-block text-left lg:ml-10">
            <div>
              <Menu.Button className="rounded-md border border-gray-300 bg-white text-sm font-medium">
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="z-40 absolute right-0 top-2 mt-2 w-24 origin-top-right rounded-md bg-white ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      value={index}
                      onClick={onReviseWord}
                      className={
                        (active
                          ? "rounded-md bg-gray-100 text-gray-900"
                          : "rounded-md text-gray-700 ",
                        "rounded-md block px-8 py-1 text-sm hover:bg-light-green hover:w-24 hover:text-white")
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
                        (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "rounded-md block px-8 py-1 text-sm hover:bg-light-green hover:w-24 hover:text-white")
                      }
                    >
                      삭제
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default WordItem;
