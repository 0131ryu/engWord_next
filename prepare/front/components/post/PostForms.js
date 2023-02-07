import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  addPostRequest,
  uploadImagesRequest,
  removeImage,
} from "../../redux/feature/postSlice";
import { backUrl } from "../../config/config";

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
      console.log("imagePaths", imagePaths);
      imagePaths.forEach((p) => {
        formData.append("image", p);
      });
      formData.append("content", text);
      dispatch(addPostRequest(formData));
    },
    [text, imagePaths]
  );

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    const images = e.target.files;
    if (Object.keys(images).length >= 5) {
      alert("이미지는 4장까지만 추가됩니다.");
    } else {
      const imageFormData = new FormData();
      [].forEach.call(images, (f) => {
        imageFormData.append("image", f);
      });
      dispatch(uploadImagesRequest(imageFormData));
    }
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
        className="shadow shadow-black-500/40"
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
              className="ml-2 mb-1 bg-light-beige rounded-md font-bold hover:bg-light-orange"
            >
              이미지 추가
            </button>
          </div>
          <button
            type="submit"
            className="flex hover:bg-light-green hover:text-white hover:rounded-md"
          >
            <PencilIcon className="h-5 w-5" />
            <h3 className="pr-1 font-bold hover:text-white">추가</h3>
          </button>
        </div>
        {imagePaths.map((v, i) => (
          <div key={v} className="flex justify-center">
            <img
              className="w-20 h-20 pt-2"
              src={`http://${backUrl}/${v}`}
              alt={v}
            />
            <button
              type="button"
              onClick={onRemoveImage(i)}
              className="bg-red-500 text-white rounded-lg mt-2 ml-2 w-5 h-5"
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
