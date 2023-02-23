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
    <div className="bg-white m-1 pt-1 flex h-12 w-[420px] shadow-md shadow-black-500/40 rounded-md">
      <input
        checked={bChecked}
        onChange={onChangeSelected}
        value={word.id}
        name="checkItem"
        type="checkbox"
        className="accent-light-green mt-3 ml-2 h-4 w-4 rounded cursor-pointer"
      />
      <li className="my-2.5 flex w-[380px]">
        <div className="ml-2 w-1/2">
          <p className="text-sm font-medium text-slate-900 truncate">
            ({index + 1}) {word.english}
          </p>
        </div>
        <div className="ml-2 w-1/2">
          <p className="text-sm font-medium text-slate-900  truncate">
            뜻: {word.korean}
          </p>
        </div>
      </li>
    </div>
  );
};

export default StartWordList;
