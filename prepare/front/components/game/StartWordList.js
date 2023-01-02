import React, { useCallback } from "react";
import { changeStatusWordRequest } from "../../redux/feature/wordSlice";

const StartWordList = ({ word, index }) => {
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
    <div className="m-1 flex border-2 border-light-green h-12 w-80 rounded-md">
      <input
        onClick={onClickSelected}
        value={index}
        id="checkItem"
        name="checkItem"
        type="checkbox"
        className="ml-2 mt-3 h-4 w-4 rounded border-light-green text-light-green focus:ring-light-green"
      />
      <li className="my-2.5 flex">
        <div className="flex ml-2">
          <p className="text-sm font-medium text-slate-900  w-32 truncate">
            ({index}) {word.english} ({word.status})
          </p>
          <p className="ml-3 text-sm font-medium text-slate-900 w-32 truncate">
            뜻: {word.korean}
          </p>
        </div>
      </li>
    </div>
  );
};

export default StartWordList;
