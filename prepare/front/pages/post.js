import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarForm from "../components/NavbarForm";
import PostCard from "../components/post/PostCard";
import PostForms from "../components/post/PostForms";
import PostSearch from "../components/post/PostSearch";
import UserInfo from "../components/UserInfo";
import { loadPostsRequest } from "../redux/feature/postSlice";
import { loadMyInfoRequest } from "../redux/feature/userSlice";

const post = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostsLoading, hasMorePosts } = useSelector(
    (state) => state.post
  );
  const id = useSelector((state) => state.user.me?.id);
  const postResult = mainPosts.filter((post) => post.UserId === id);

  useEffect(() => {
    if (hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;

      dispatch(loadPostsRequest(lastId));
    }
  }, [hasMorePosts, mainPosts]);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);

  return (
    <>
      <NavbarForm me={me}>
        <div className="h-full mt-5">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1">
              {me && (
                <UserInfo
                  nickname={me?.nickname}
                  me={me}
                  postResult={postResult}
                />
              )}
            </div>
            <div className="col-span-2">
              {me && <PostForms />}
              {mainPosts.map((post, index) => {
                return (
                  <PostCard key={index} post={post} index={index} me={me} />
                );
              })}
            </div>
            <div className="col-span-1">
              <PostSearch />
            </div>
          </div>
        </div>
      </NavbarForm>
    </>
  );
};

export default post;
