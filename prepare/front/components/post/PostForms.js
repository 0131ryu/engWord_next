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

      if (imagePaths.length > 4) {
        alert(
          `이미지는 4개를 초과 불가(${
            imagePaths.length - 4
          }개를 삭제해야 등록할 수 있습니다.)`
        );
      } else {
        const formData = new FormData();
        imagePaths.forEach((p) => {
          formData.append("image", p);
        });
        formData.append("content", text);
        dispatch(addPostRequest(formData));
      }
    },
    [text, imagePaths]
  );

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(
    (e) => {
      const images = e.target.files;
      if (Object.keys(images).length > 4) {
        alert("이미지는 4장까지만 추가됩니다.");
      } else {
        const imageFormData = new FormData();
        [].forEach.call(images, (f) => {
          imageFormData.append("image", f);
        });
        dispatch(uploadImagesRequest(imageFormData));
      }
    },
    [imagePaths]
  );

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
        className="shadow shadow-black-500/40"
        onSubmit={onSubmitForm}
      >
        <textarea
          className="w-full p-2 rounde-md dark:bg-white dark:text-black"
          type="text"
          value={text}
          onChange={onChangeText}
          placeholder="무엇을 입력하시겠습니까?"
        />
        <div className="flex justify-between">
          {Object.keys(imagePaths).length >= 4 ? (
            <p className="text-center text-red-500 font-bold">
              최대 이미지 등록(4장)
            </p>
          ) : (
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
                className="ml-2 mb-1 bg-light-beige rounded-md font-bold hover:bg-light-orange dark:text-black"
              >
                이미지 추가
              </button>
              {imagePaths.length >= 1 && (
                <p className="ml-2 font-bold dark:text-black">
                  <span className="text-red-500">{imagePaths.length}</span>
                  개의 이미지가 등록되어 있습니다
                </p>
              )}
            </div>
          )}
          <button
            type="submit"
            className="flex dark:bg-light-green hover:bg-dark-green hover:text-white rounded-md h-7"
          >
            <PencilIcon className="h-5 w-5" />
            <h3 className="pr-1 font-bold hover:text-white">추가</h3>
          </button>
        </div>
        <div className="flex justify-center pl-1">
          {imagePaths.map((v, i) => (
            <div key={v} className="lg:p-1">
              <button
                type="button"
                onClick={onRemoveImage(i)}
                className="bg-red-500 text-white rounded-lg mt-2 ml-8 w-5 h-5"
              >
                X
              </button>
              <img
                className="w-10 h-10 lg:w-20 lg:h-20 rounded-lg"
                src={v.replace(/\/thumb\//, "/original/")}
                alt={v}
              />
            </div>
          ))}
        </div>
        {imagePaths.length >= 1 && (
          <p className="flex justify-center dark:text-black">
            이미지는 <span className="font-bold text-red-500 ml-2"> 4개</span>
            까지 가능합니다
          </p>
        )}
      </form>
    </div>
  );
};

export default PostForms;
