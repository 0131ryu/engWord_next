import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusWordAllRequest } from "../../redux/feature/wordSlice";

const WordCheckbox = ({ me, easyLength, middleLength, advanceLength }) => {
  const dispatch = useDispatch();
  const [bChecked, setBChecked] = useState(false);

  const { wordLists } = useSelector((state) => state.word);
  const showStatus = wordLists.filter(
    (word) => word.status === "C" && word.UserId === me?.id
  ).length;

  useEffect(() => {
    showStatus;
  }, []);

  const onChangeAllSelected = useCallback((e) => {
    const checkboxClicked = e.target;
    const userId = e.target.value;

    if (checkboxClicked.checked) {
      setBChecked(true);
      dispatch(changeStatusWordAllRequest({ status: "C", userId: userId }));
    } else if (!checkboxClicked.checked) {
      setBChecked(false);
      dispatch(changeStatusWordAllRequest({ status: "A", userId: userId }));
    }
  }, []);
  return (
    <div className="absolute top-[280px] right-0 md:right-20 lg:right-52 lg:top-72">
      <div className="flex items-center mb-2">
        <input
          checked={showStatus > 0 || bChecked ? true : false}
          onChange={onChangeAllSelected}
          value={me?.id}
          name="checkItem"
          type="checkbox"
          className="h-4 w-4 rounded cursor-pointer accent-light-green"
        />
        전체 선택 / 해제
      </div>
      <p>
        체크된 단어 개수 :
        <span className="font-bold text-light-orange ml-2">
          {bChecked ? easyLength + middleLength + advanceLength : showStatus}
        </span>
        <span className="font-bold text-light-green">
          /{easyLength + middleLength + advanceLength}
        </span>
      </p>
    </div>
  );
};

export default WordCheckbox;
