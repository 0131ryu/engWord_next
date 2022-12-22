import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { changeNicknameRequest } from "../redux/feature/userSlice";
import { loadWordsRequest } from "../redux/feature/wordSlice";
import NicknameEditForm from "./NicknameEditForm";
import Link from "next/link";
import FollowingModal from "./FollowingModal";
import FollowerModal from "./FollowerModal";

const Profile = ({ me, postResult, wordResult }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const [editMode, setEditMode] = useState(false);
  const [followerModal, setFollowerModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);

  const onCancleChangeNickname = useCallback(() => {}, []);

  const onChangeNicknameEdit = useCallback(
    (editNickname) => () => {
      setEditMode(false);
      dispatch(changeNicknameRequest(editNickname));
    },
    []
  );

  useEffect(() => {
    console.log("me", me);
    dispatch(loadWordsRequest(nickname));
    // dispatch(loadPostsRequest());
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
      <div className="mt-10 lg:mt-20">
        <section className="flex flex-wrap justify-center">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className=" w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="profile-img"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="rounded-full h-40 w-40"
                      />
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
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <NicknameEditForm
                    editMode={editMode}
                    nickname={me?.nickname}
                    onCancleChangeNickname={onCancleChangeNickname}
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
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          50/100
                        </span>
                        <span className="text-sm text-blueGray-400">
                          최근 맞춘 점수
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-light-green text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Profile;
