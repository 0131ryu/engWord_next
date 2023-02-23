import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeStatusWordAllRequest } from "../../redux/feature/wordSlice";

const GameCheckbox = ({ UserId, checkedWordList, wordLists }) => {
  const dispatch = useDispatch();
  const showStatus = wordLists.filter(
    (word) => word.status === "C" && word.UserId === UserId
  ).length;

  const onChangeAllSelected = useCallback((e) => {
    const checkboxClicked = e.target;
    const userId = e.target.value;

    if (checkboxClicked.checked) {
      dispatch(changeStatusWordAllRequest({ status: "C", userId: userId }));
    } else if (!checkboxClicked.checked) {
      dispatch(changeStatusWordAllRequest({ status: "A", userId: userId }));
    }
  }, []);

  return (
    <>
      <div className="flex">
        <p className="font-bold w-3/5">
          총 추가된 단어 :
          <span className="font-bold text-red-500 ml-3">
            {checkedWordList.length}
          </span>
        </p>
        <div className="w-2/5">
          <input
            checked={showStatus > 0 ? true : false}
            onChange={onChangeAllSelected}
            value={UserId}
            name="checkItem"
            type="checkbox"
            className="accent-light-green mr-1 h-4 w-4 rounded cursor-pointer"
          />
          <span className="font-bold">전체 선택 / 해제</span>
        </div>
      </div>
    </>
  );
};

export default GameCheckbox;
