import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatusWordAllRequest,
  loadWordsRequest,
} from "../../redux/feature/wordSlice";
import WordChart from "./WordChart";
import WordItem from "./WordItem";

const WordList = ({ UserId }) => {
  const dispatch = useDispatch();
  const [bChecked, setBChecked] = useState(false);
  const { wordLists } = useSelector((state) => state.word);

  const showStatus = wordLists.filter(
    (word) => word.status === "C" && word.UserId === UserId
  ).length;

  const allWord = wordLists.filter((word) => word.UserId === UserId).length;

  const easyLength = wordLists.filter((d) => d.type === "easy").length;
  const middleLength = wordLists.filter((d) => d.type === "middle").length;
  const advanceLength = wordLists.filter((d) => d.type === "advance").length;

  useEffect(() => {
    dispatch(loadWordsRequest());
  }, [showStatus]);

  const onChangeAllSelected = useCallback((e) => {
    const checkboxClicked = e.target;
    const userId = e.target.value;

    console.log("checkboxClicked", checkboxClicked);

    if (checkboxClicked.checked) {
      setBChecked(true);
      dispatch(changeStatusWordAllRequest({ status: "C", userId: userId }));
    } else if (!checkboxClicked.checked) {
      setBChecked(false);
      dispatch(changeStatusWordAllRequest({ status: "A", userId: userId }));
    }
  }, []);

  return (
    <>
      {/* checkbox */}
      <div className="absolute top-64 right-0 md:right-20 lg:right-52 lg:top-72">
        <div className="flex items-center mb-2">
          <input
            checked={showStatus > 0 || bChecked ? true : false}
            onChange={onChangeAllSelected}
            value={UserId}
            name="checkItem"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          전체 선택 / 해제
        </div>
        <p>
          체크된 단어 개수 :
          <span className="font-bold text-light-orange ml-2">{showStatus}</span>
          <span className="font-bold text-light-green">/{allWord}</span>
        </p>
      </div>

      {(easyLength !== 0 || middleLength !== 0 || advanceLength !== 0) &&
        UserId && (
          <div className="flex justify-center relative bottom-10">
            <WordChart
              easyLength={easyLength}
              middleLength={middleLength}
              advanceLength={advanceLength}
            />
          </div>
        )}

      <div className="lg:w-full relative">
        <div className="h-max mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-1">
          {/* Easy start */}
          <div className="group relative rounded-lg p-3 lg:w-80 lg:ml-10">
            <div className="overflow-y-auto max-h-96 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white border-2 border-light-green lg:aspect-none">
              <div className={`${easyLength > 0 ? "h-full" : "h-40"}`}>
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
                <div className="relative bottom-20 sm:600">
                  <div className="bg-gray-300 h-3/5 rounded mx-1 flex py-5 mt-1 h-20">
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
              <div className={`${middleLength > 0 ? "h-full" : "h-40"}`}>
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
                <div className="relative bottom-20 sm:600">
                  <div className="bg-gray-300 h-3/5 rounded mx-1 flex py-5 mt-1 h-20">
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
              <div className={`${advanceLength > 0 ? "h-full" : "h-40"}`}>
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
                <div className="relative bottom-20 sm:600">
                  <div className="bg-gray-300 h-3/5 rounded mx-1 flex py-5 mt-1 h-20">
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
