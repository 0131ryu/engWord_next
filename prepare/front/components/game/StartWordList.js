import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusWordRequest } from "../../redux/feature/wordSlice";

const StartWordList = ({ word, index }) => {
  const dispatch = useDispatch();
  const [bChecked, setBChecked] = useState(false);
  const { checkedWordList } = useSelector((state) => state.word);

  useEffect(() => {
    if (word.status === "C") {
      setBChecked(true);
    } else if (word.status === "A") {
      setBChecked(false);
    }
    // console.log("checkedWordList", checkedWordList);
  }, [word.status]);

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
    <div className="m-1 flex border-2 border-light-green h-12 w-80 rounded-md">
      <input
        checked={bChecked}
        onChange={onChangeSelected}
        value={word.id}
        name="checkItem"
        type="checkbox"
        className="mt-3 ml-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
