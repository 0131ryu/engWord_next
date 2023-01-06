import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import {
  addProfileImageRequest,
  changeNicknameRequest,
  loadBlockedFailure,
  loadBlockingRequest,
  uploadProfileImageRequest,
  removeProfileImage,
} from "../redux/feature/userSlice";
import { loadWordsRequest } from "../redux/feature/wordSlice";
import NicknameEditForm from "./NicknameEditForm";
import Link from "next/link";
import { CameraIcon, PhotoIcon } from "@heroicons/react/24/outline";

import FollowingModal from "./FollowingModal";
import FollowerModal from "./FollowerModal";
import BlockFollowModal from "./BlockFollowModal";
import { loadGameRequest } from "../redux/feature/gameSlice";
import AlertLoginModal from "./AletrtLoginModal";
import TodayChart from "./profile/TodayChart";

const Profile = ({ me, postResult, wordResult }) => {
  const dispatch = useDispatch();
  const { imagePaths, uploadProfileImageComplete } = useSelector(
    (state) => state.user
  );
  const { gameScore } = useSelector((state) => state.game);
  const id = useSelector((state) => state.user.me?.id);

  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const [editMode, setEditMode] = useState(false);
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [blockFollowModal, setBlockFollowModal] = useState(false);

  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
    console.log("imageInput.current", imageInput.current);
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch(uploadProfileImageRequest(imageFormData));
  }, []);

  const onSubmitProfileImg = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData();

      imagePaths.forEach((p) => {
        formData.append("image", p);
      });
      dispatch(addProfileImageRequest(formData));
    },
    [imagePaths]
  );

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch(removeProfileImage(index));
    },
    []
  );

  const onChangeNicknameEdit = useCallback(
    (editNickname) => () => {
      setEditMode(false);
      dispatch(changeNicknameRequest(editNickname));
    },
    []
  );

  useEffect(() => {
    // console.log("me", me);
    dispatch(loadWordsRequest(nickname));
    dispatch(loadBlockedFailure());
    dispatch(loadBlockingRequest());
    dispatch(loadGameRequest());
  }, []);

  const onChangeEdit = useCallback(() => {
    setEditMode(true);
  }, [id]);

  const onClickFollowerModal = useCallback(() => {
    setFollowerModal(true);
  }, []);

  const onClickFollowingModal = useCallback(() => {
    setFollowingModal(true);
  }, []);

  const onClickBlockFollowModal = useCallback(() => {
    setBlockFollowModal(true);
  }, []);

  return (
    <>
      {followingModal ? (
        <FollowingModal
          setFollowingModal={setFollowingModal}
          followingsInfo={me?.Followings}
        />
      ) : null}
      {followerModal ? (
        <FollowerModal
          setFollowerModal={setFollowerModal}
          followersInfo={me?.Followers}
          followingsInfo={me?.Followings}
        />
      ) : null}
      {blockFollowModal ? (
        <BlockFollowModal
          setBlockFollowModal={setBlockFollowModal}
          blockInfo={me?.Blockings}
        />
      ) : null}
      {me ? (
        <div className="mt-10 lg:mt-20">
          <section className="flex flex-wrap justify-center">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-10 shadow-xl rounded-lg">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className=" w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        {imagePaths.length === 0 ? (
                          <img
                            alt="profile-img"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="rounded-full h-40 w-40"
                          />
                        ) : (
                          imagePaths?.map((v, i) => (
                            <div key={v} className="flex justify-center">
                              <div>
                                <img
                                  className="rounded-full h-40 w-40"
                                  src={`http://localhost:3005/${v}`}
                                  alt={v}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={onRemoveImage(i)}
                                className="bg-red-500 text-white rounded-md mt-1 pb-2 pl-1 pr-1 w-10 h-5"
                              >
                                X
                              </button>
                            </div>
                          ))
                        )}

                        <div className="flex">
                          <form
                            encType="multipart/form-data"
                            onSubmit={onSubmitProfileImg}
                          >
                            <input
                              type="file"
                              name="image"
                              multiple
                              hidden
                              ref={imageInput}
                              onChange={onChangeImages}
                            />
                            {uploadProfileImageComplete ? (
                              <button
                                type="submit"
                                className="bg-gray-100 rounded-full w-20 h-5 relative left-32 bottom-10 cursor-pointer font-bold"
                              >
                                <p className="font-bold">변경 완료</p>
                              </button>
                            ) : (
                              <div className="flex">
                                <button
                                  type="button"
                                  className="bg-gray-100 rounded-full w-28 h-5 relative left-32 bottom-10 cursor-pointer "
                                  onClick={onClickImageUpload}
                                >
                                  <p className="font-bold">프로필 변경</p>
                                </button>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="grid grid-cols-1 place-items-end sm:mt-0">
                        <button
                          onClick={onChangeEdit}
                          className="bg-light-orange active:bg-light-orange uppercase font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded "
                        >
                          닉네임 수정
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            <Link href={`/post`}>
                              <a> {postResult.length}</a>
                            </Link>
                          </span>
                          <span className="text-sm text-blueGray-400">
                            게시글
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span
                            onClick={onClickFollowingModal}
                            className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                          >
                            <a className="hover:text-sky-500">
                              {me?.Followings.length}
                            </a>
                          </span>
                          <span className="text-sm text-blueGray-400">
                            팔로잉
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span
                            onClick={onClickFollowerModal}
                            className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                          >
                            <a className="hover:text-sky-500">
                              {me?.Followers.length}
                            </a>
                          </span>
                          <span className="text-sm text-blueGray-400">
                            팔로워
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span
                            onClick={onClickBlockFollowModal}
                            className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                          >
                            <a className="hover:text-sky-500">
                              {me?.Blockings?.length}
                            </a>
                          </span>
                          <span className="text-sm text-blueGray-400">
                            차단한 사람
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <NicknameEditForm
                      editMode={editMode}
                      nickname={me?.nickname}
                      onChangeNicknameEdit={onChangeNicknameEdit}
                    />
                    <div className="w-full lg:text-center lg:mt-3 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide">
                            <Link href={`/index`}>
                              <a>{wordResult.length}</a>
                            </Link>
                          </span>
                          <span className="text-sm text-blueGray-400">
                            작성한 단어 개수
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="flex text-xl font-bold block uppercase tracking-wide">
                            <p className="text-light-orange">{gameScore[0]}</p>
                            /100
                          </span>
                          <span className="text-sm text-blueGray-400">
                            최근 맞춘 점수
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mb-3">
                      <TodayChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <AlertLoginModal />
      )}
    </>
  );
};

export default Profile;
