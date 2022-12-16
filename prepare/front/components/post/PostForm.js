import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { addPostRequest } from "../../redux/feature/postSlice";
import { PencilIcon } from "@heroicons/react/24/outline";

const PostForm = ({ nickname, id }) => {
  const dispatch = useDispatch();
  const { addPostComplete } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const [text, onChangeText, setText] = useInput("");

  useEffect(() => {
    console.log("text", text);
    console.log("onChangeText", onChangeText);
    if (addPostComplete) {
      setText("");
    }
  }, [addPostComplete]);

  const onSubmitForm = useCallback(() => {
    console.log("text", text);
    if (!text) {
      alert("게시글에 아무것도 입력되지 않았습니다.");
    } else {
      dispatch(addPostRequest(text));
    }
  }, [text]);
  return (
    <>
      <div className="bg-white col-span-2">
        <div className="mt-2 shadow shadow-black-500/40">
          <div className="p-2 justify-between rounde-md">
            <div className="flex">
              <textarea
                className="w-full"
                type="text"
                onChange={onChangeText}
                placeholder="무엇을 입력하시겠습니까?"
              />
              <button onClick={onSubmitForm} className="mt-1 ml-2">
                <PencilIcon
                  className="h-8 w-8 md:h-10 md:w-10 lg:h-10 lg:w-10 
                   hover:bg-light-green hover:text-white hover:rounded-md"
                />
              </button>
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-light-green file:text-light-beige
      hover:file:bg-light-green
    "
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostForm;
