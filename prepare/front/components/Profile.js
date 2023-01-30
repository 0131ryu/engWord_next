import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import {
  changeNicknameRequest,
  loadBlockedFailure,
  loadBlockingRequest,
  uploadProfileImageRequest,
} from "../redux/feature/userSlice";
import { loadWordsRequest } from "../redux/feature/wordSlice";
import NicknameEditForm from "./NicknameEditForm";
import Link from "next/link";

import FollowingModal from "./FollowingModal";
import FollowerModal from "./FollowerModal";
import BlockFollowModal from "./BlockFollowModal";
import { loadGameRequest } from "../redux/feature/gameSlice";
import AlertLoginModal from "./AletrtLoginModal";
import TodayChart from "./profile/TodayChart";

const Profile = ({ me, postResult, wordResult }) => {
  const dispatch = useDispatch();
  const { imagePaths } = useSelector((state) => state.user);
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
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch(uploadProfileImageRequest(imageFormData));
  }, []);

  const onChangeNicknameEdit = useCallback(
    (editNickname) => () => {
      setEditMode(false);
      dispatch(changeNicknameRequest(editNickname));
    },
    []
  );

  useEffect(() => {
    dispatch(loadWordsRequest(nickname));
    dispatch(loadBlockedFailure());
    dispatch(loadBlockingRequest());
    dispatch(loadGameRequest());
  }, []);

  const onChangeEdit = useCallback(() => {
    setEditMode(true);
  }, [id]);

  const onCancleChangeNickname = useCallback(() => {
    setEditMode(false);
  }, []);

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
                        {me.profileImg === "" || me.profileImg === null ? (
                          <img
                            alt="profile-img"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            className="rounded-full h-40 w-40"
                          />
                        ) : (
                          <img
                            className="rounded-full h-40 w-40"
                            src={`http://localhost:3005/userImg/${me.profileImg}`}
                            alt={me.profileImg}
                          />
                        )}

                        <div className="flex">
                          <form encType="multipart/form-data">
                            <input
                              type="file"
                              name="image"
                              multiple
                              hidden
                              ref={imageInput}
                              onChange={onChangeImages}
                            />
                            <div className="flex">
                              <button
                                type="button"
                                className="bg-gray-100 rounded-full w-28 h-5 relative left-32 bottom-10 cursor-pointer "
                                onClick={onClickImageUpload}
                              >
                                <p className="font-bold">프로필 변경</p>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="grid grid-cols-1 place-items-end sm:mt-0">
                        <button
                          onClick={onChangeEdit}
                          className="font-bold bg-light-orange hover:bg-gray-100 hover:text-light-orange px-4 py-2 rounded"
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
                      onCancleChangeNickname={onCancleChangeNickname}
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
