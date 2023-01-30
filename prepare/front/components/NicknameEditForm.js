import React, { useCallback, useState } from "react";

const NicknameEditForm = ({
  editMode,
  onCancleChangeNickname,
  nickname,
  onChangeNicknameEdit,
}) => {
  const [editNickname, setEditNickname] = useState(nickname);

  const onEditNickname = useCallback((e) => {
    setEditNickname(e.target.value);
  }, []);

  return (
    <>
      {editMode ? (
        <div>
          <textarea
            rows="1"
            className="w-full h-12 rounded border-solid border-2 border-light-green text-4xl text-center "
            onChange={onEditNickname}
          >
            {nickname}
          </textarea>
          <div>
            <button
              onClick={onChangeNicknameEdit(editNickname)}
              className="mr-2 px-1 h-9 bg-light-beige rounded-md font-bold focus:bg-light-green focus:text-white"
            >
              수정
            </button>
            <button
              onClick={onCancleChangeNickname}
              className="px-1 h-9 bg-light-beige rounded-md font-bold focus:bg-red-500 focus:text-white"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
          {nickname}
        </h3>
      )}
    </>
  );
};

export default NicknameEditForm;
