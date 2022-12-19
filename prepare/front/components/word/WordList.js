import React, { useCallback, useState, useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import ReviseWordModal from "./ReviseWordModal";
import RemoveWordModal from "./RemoveWordModal";
import {
  changeStatusWordRequest,
  changeStatusWordAllRequest,
  loadWordsRequest,
} from "../../redux/feature/wordSlice";
import WordItem from "./WordItem";

const WordList = ({ UserId }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);
  const [id, setId] = useState(0);

  const { wordLists, checkedWordList } = useSelector((state) => state.word);

  useEffect(() => {
    dispatch(loadWordsRequest());
  }, []);

  const onClickAllSelected = useCallback((e) => {
    const checkboxClickedAll = e.target;
    const checkboxes = document.querySelectorAll("input[name=checkItem]");

    if (checkboxClickedAll.checked) {
      dispatch(changeStatusWordAllRequest({ status: "C" }));
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

    if (checkboxClicked.checked) {
      dispatch(changeStatusWordRequest({ id: wordIndex, status: "C" }));
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

      <div className="lg:w-full relative">
        <div className="h-max mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-1">
          {/* Easy start */}
          <div className="group relative rounded-lg p-3 lg:w-80 lg:ml-10">
            <div className="overflow-y-auto max-h-96 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white border-2 border-light-green lg:aspect-none">
              <div className="h-full">
                <h1 className="text-slate-900 font-medium px-3 pt-2">
                  🥉 Easy
                </h1>
              </div>

              {UserId ? (
                wordLists.map((word, index) => {
                  if (word?.type === "easy" && word.UserId === UserId) {
                    return (
                      <>
                        <WordItem key={word.id} word={word} index={index} />
                      </>
                    );
                  }
                })
              ) : (
                <div className="h-40 sm:600 w-full mt-2">
                  <div className="bg-gray-400 h-3/5 rounded mx-1 flex py-5 mt-1 h-20">
                    <div className="w-full mt-3 text-center h-10">
                      <p className="text-sm font-bold text-slate-900">
                        단어는 로그인 후 입력 가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}
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

              {UserId ? (
                wordLists.map((word, index) => {
                  if (word?.type === "middle" && word.UserId === UserId) {
                    return (
                      <>
                        <WordItem key={word.id} word={word} index={index} />
                      </>
                    );
                  }
                })
              ) : (
                <div className="h-40 sm:600 w-full mt-2">
                  <div className="bg-gray-400 h-3/5 rounded mx-1 flex py-5 mt-1 h-20">
                    <div className="w-full mt-3 text-center h-10">
                      <p className="text-sm font-bold text-slate-900">
                        단어는 로그인 후 입력 가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}
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
              {UserId ? (
                wordLists.map((word, index) => {
                  if (word?.type === "advance" && word.UserId === UserId) {
                    return (
                      <>
                        <WordItem key={word.id} word={word} index={index} />
                      </>
                    );
                  }
                })
              ) : (
                <div className="h-40 sm:600 w-full mt-2">
                  <div className="bg-gray-400 h-3/5 rounded mx-1 flex py-5 mt-1 h-20">
                    <div className="w-full mt-3 text-center h-10">
                      <p className="text-sm font-bold text-slate-900">
                        단어는 로그인 후 입력 가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Advance end */}
        </div>
      </div>
    </>
  );
};

export default WordList;
