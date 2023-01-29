import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  deleteImageRequest,
  reviseImageRequest,
} from "../../redux/feature/postSlice";
import { useDispatch } from "react-redux";

const PostCardContent = ({
  retweetId,
  images,
  id,
  content,
  editMode,
  onRevisePost,
  onCancleRevisePost,
  index,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [editText, setEditText] = useState(content);
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(
    (e) => {
      if (Object.keys(images).length >= 5) {
        alert("이미지는 4장까지만 추가됩니다.");
      } else {
        const image = e.target.files;
        if (Object.keys(image).length + Object.keys(images).length >= 5) {
          alert(
            `현재 등록한 이미지 수(${
              Object.keys(image).length
            }개)가 가능한 이미지 개수(${
              4 - Object.keys(images).length
            }개)보다 많습니다.`
          );
        } else {
          const formData = new FormData();
          [].forEach.call(image, (value) => {
            formData.append("image", value);
          });
          formData.append("id", id);
          dispatch(reviseImageRequest(formData));
        }
      }
    },
    [images]
  );

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  const onPostRetweetDetail = useCallback(() => {
    router.push(`/post/${retweetId}`);
  }, []);

  const onPostDetail = useCallback(() => {
    router.push(`/post/${id}`);
  }, []);

  const onRemoveImage = useCallback(
    (id) => () => {
      if (!confirm("삭제 할 경우 (예)를, 취소는 (아니오)를 누르세요.")) {
        alert("취소(아니오)를 누르셨습니다.");
      } else {
        alert("삭제(예)을 누르셨습니다.");
        dispatch(deleteImageRequest(id));
      }
    },
    []
  );

  return (
    <>
      {editMode ? (
        <div>
          <textarea
            id="message"
            rows="4"
            className="ml-2.5 block p-2.5 w-11/12 lg:ml-7 h-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            onChange={onChangeText}
          >
            {content}
          </textarea>
          {images?.length === 1 && (
            <div className="flex justify-center mt-1 ml-3">
              <img
                src={`http://localhost:3005/${images[0]?.src}`}
                alt={images[0]?.src}
                className="rounded-lg h-7 w-7 lg:h-10 lg:w-10"
              />
              <button
                className="bg-red-500 text-white w-5 h-5 rounded-full"
                onClick={onRemoveImage(images[0]?.id)}
              >
                X
              </button>
            </div>
          )}
          {images?.length === 2 && (
            <div className="flex justify-center mt-1 ml-3">
              <img
                src={`http://localhost:3005/${images[0]?.src}`}
                alt={images[0]?.src}
                className="rounded-lg h-7 w-7 lg:h-10 lg:w-10"
              />
              <button
                className="bg-red-500 text-white w-5 h-5 rounded-full"
                onClick={onRemoveImage(images[0]?.id)}
              >
                X
              </button>
              <img
                src={`http://localhost:3005/${images[1]?.src}`}
                alt={images[1]?.src}
                className="rounded-lg h-7 w-7 lg:h-10 lg:w-10"
              />
              <button
                className="bg-red-500 text-white w-5 h-5 rounded-full"
                onClick={onRemoveImage(images[1]?.id)}
              >
                X
              </button>
            </div>
          )}
          {images?.length === 3 && (
            <div className="flex justify-center mt-1 ml-3">
              <img
                src={`http://localhost:3005/${images[0]?.src}`}
                alt={images[0]?.src}
                className="rounded-lg h-7 w-7 lg:h-10 lg:w-10"
              />
              <button
                className="bg-red-500 text-white w-5 h-5 rounded-full"
                onClick={onRemoveImage(images[0]?.id)}
              >
                X
              </button>
              <img
                src={`http://localhost:3005/${images[1]?.src}`}
                alt={images[1]?.src}
                className="rounded-lg h-7 w-7 lg:h-10 lg:w-10"
              />
              <button
                className="bg-red-500 text-white w-5 h-5 rounded-full"
                onClick={onRemoveImage(images[1]?.id)}
              >
                X
              </button>
              <img
                src={`http://localhost:3005/${images[2]?.src}`}
                alt={images[2]?.src}
                className="rounded-lg h-7 w-7 lg:h-10 lg:w-10"
              />
              <button
                className="bg-red-500 text-white w-5 h-5 rounded-full"
                onClick={onRemoveImage(images[2]?.id)}
              >
                X
              </button>
            </div>
          )}
          {images?.length === 4 && (
            <div className="flex justify-center mt-1 ml-3">
              <img
                src={`http://localhost:3005/${images[0]?.src}`}
                alt={images[0]?.src}
                className="rounded-lg h-7 w-7 lg:h-10 lg:w-10"
              />
              <button
                className="bg-red-500 text-white w-5 h-5 rounded-full"
                onClick={onRemoveImage(images[0]?.id)}
              >
                X
              </button>
              <img
                src={`http://localhost:3005/${images[1]?.src}`}
                alt={images[1]?.src}
                className="rounded-lg h-7 w-7 lg:h-10 lg:w-10"
              />
              <button
                className="bg-red-500 text-white w-5 h-5 rounded-full"
                onClick={onRemoveImage(images[1]?.id)}
              >
                X
              </button>
              <img
                src={`http://localhost:3005/${images[2]?.src}`}
                alt={images[2]?.src}
                className="rounded-lg h-7 w-7 lg:h-10 lg:w-10"
              />
              <button
                className="bg-red-500 text-white w-5 h-5 rounded-full"
                onClick={onRemoveImage(images[2]?.id)}
              >
                X
              </button>
              <img
                src={`http://localhost:3005/${images[3]?.src}`}
                alt={images[3]?.src}
                className="rounded-lg h-7 w-7 lg:h-10 lg:w-10"
              />
              <button
                className="bg-red-500 text-white w-5 h-5 rounded-full"
                onClick={onRemoveImage(images[3]?.id)}
              >
                X
              </button>
            </div>
          )}

          {Object.keys(images).length === 4 ? (
            <div className="flex justify-center">
              <p className="text-center text-red-500 font-bold">
                최대 이미지 등록(4장)
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
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
                className="ml-4 mt-3 bg-light-beige rounded-md font-bold hover:bg-light-orange"
              >
                이미지 추가
              </button>
            </div>
          )}

          <div className="flex justify-end items-center mt-2 mr-4">
            <button
              onClick={onRevisePost(editText, index)}
              className="mr-2 px-1 h-9 bg-light-beige rounded-md font-bold focus:bg-light-green focus:text-white"
            >
              수정
            </button>
            <button
              onClick={onCancleRevisePost}
              className="px-1 h-9 bg-light-beige rounded-md font-bold focus:bg-red-500 focus:text-white"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-5">
            {retweetId
              ? content?.split(/(#[^\s#]+)/g).map((v, i) => {
                  if (v.match(/(#[^\s#]+)/)) {
                    return (
                      <>
                        <div key={i} className="float-left mx-1">
                          <Link className="" href={`/hashtag/${v.slice(1)}`}>
                            <p className="cursor-pointer text-sky-500">{v}</p>
                          </Link>
                        </div>
                      </>
                    );
                  }
                  return (
                    <>
                      <div
                        className="cursor-pointer"
                        onClick={onPostRetweetDetail}
                      >
                        {v}
                      </div>
                    </>
                  );
                })
              : content?.split(/(#[^\s#]+)/g).map((v, i) => {
                  if (v.match(/(#[^\s#]+)/)) {
                    return (
                      <>
                        <div key={i} className="float-left mx-1">
                          <Link className="" href={`/hashtag/${v.slice(1)}`}>
                            <p className="cursor-pointer text-sky-500">{v}</p>
                          </Link>
                        </div>
                      </>
                    );
                  }
                  return (
                    <>
                      <div className="cursor-pointer" onClick={onPostDetail}>
                        {v}
                      </div>
                    </>
                  );
                })}
          </div>
        </>
      )}
    </>
  );
};

export default PostCardContent;
