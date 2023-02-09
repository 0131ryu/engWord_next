import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loadPostsRequest } from "../redux/feature/postSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostsLoading, hasMorePosts } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsRequest(lastId));
    }
  }, [hasMorePosts, mainPosts]);

  return (
    <>
      <div className="bg-gray-100 ml-2 pr-2 lg:py-2 rounded-lg">
        <div className="ml-2 shadow shadow-black-500/40 rounded-xl bg-white">
          <div className="md:flex lg:flex">
            {me?.profileImg === "" || me?.profileImg === null ? (
              <img
                alt="profile-img"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                className="rounded-lg w-14 h-14 mt-2 ml-1"
              />
            ) : (
              <img
                className="rounded-lg w-14 h-14 mt-2 ml-1"
                src={`http://${me?.profileImg}`}
                alt={me?.profileImg}
              />
            )}
            <div className="ml-1">
              <p className="font-bold p-1 mt-1 lg:mt-5">{me.nickname}</p>
            </div>
          </div>
          <div className="text-center lg:flex md:ml-5 lg:ml-10">
            <div className="flex p-1 items-center">
              <p className="text-gray-400 block cursor-pointer">Article</p>
              <p className="ml-1 font-bold">
                <Link
                  href={{
                    pathname: "/user/[id]",
                    query: { id: me?.id },
                  }}
                  prefetch={false}
                >
                  <a>{me.Posts.length}</a>
                </Link>
              </p>
            </div>
            <div className="flex p-1 items-center">
              <p className="text-gray-400 block">Follower</p>
              <p className="ml-1 font-bold cursor-pointer">
                <Link href={`/profile`}>
                  <a>{me?.Followers.length >= 0 ? me?.Followers.length : 0}</a>
                </Link>
              </p>
            </div>
            <div className="flex p-1 items-center">
              <p className="text-gray-400 block">Following</p>
              <p className="ml-1 font-bold cursor-pointer">
                <Link href={`/profile`}>
                  <a>
                    {me?.Followings.length >= 0 ? me?.Followings.length : 0}
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
