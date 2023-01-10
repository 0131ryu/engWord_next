import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  addPostRequest,
  uploadImagesRequest,
  removeImage,
} from "../../redux/feature/postSlice";

const PostForms = () => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput("");
  const { addPostComplete, imagePaths } = useSelector((state) => state.post);
  const imageInput = useRef();

  useEffect(() => {
    if (addPostComplete) {
      setText("");
    }
  }, [addPostComplete]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log("text", text);

      if (!text || !text.trim()) {
        return alert("게시글을 작성하세요.");
      }

      const formData = new FormData();

      imagePaths.forEach((p) => {
        formData.append("image", p);
      });
      console.log("formData", formData);
      formData.append("content", text);
      dispatch(addPostRequest(formData));
    },
    [text, imagePaths]
  );

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch(uploadImagesRequest(imageFormData));
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(removeImage(index));
    },
    []
  );

  return (
    <div className="bg-white col-span-2">
      <form
        encType="multipart/form-data"
        className="mt-2 shadow shadow-black-500/40"
        onSubmit={onSubmitForm}
      >
        <textarea
          className="w-full p-2 rounde-md"
          type="text"
          value={text}
          onChange={onChangeText}
          placeholder="무엇을 입력하시겠습니까?"
        />
        <div className="flex justify-between">
          <div>
            <input
              type="file"
              name="image"
              multiple
              hidden
              ref={imageInput}
              onChange={onChangeImages}
            />
            <button
              type="button"
              onClick={onClickImageUpload}
              className="ml-2 mb-1 hover:font-bold hover:text-light-orange"
            >
              이미지 추가
            </button>
          </div>
          <button
            type="submit"
            className="flex hover:bg-light-green hover:text-white hover:rounded-md"
          >
            <PencilIcon className="h-5 w-5 md:h-8 md:w-8 lg:h-8 lg:w-8" />
            <h3 className="mr-2 font-bold hover:text-white">추가</h3>
          </button>
        </div>
        {imagePaths.map((v, i) => (
          <div key={v} className="flex justify-center">
            <div>
              <img className="p-1" src={`http://localhost:3005/${v}`} alt={v} />
            </div>
            <button
              type="button"
              onClick={onRemoveImage(i)}
              className="bg-red-500 text-white rounded-md mt-1 pb-2 pl-1 pr-1 w-10 h-5"
            >
              X
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};

export default PostForms;
