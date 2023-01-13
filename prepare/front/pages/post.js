import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarForm from "../components/NavbarForm";
import PostCard from "../components/post/PostCard";
import PostForms from "../components/post/PostForms";
import PostSearch from "../components/post/PostSearch";
import WeekendWordChart from "../components/post/WeekendWordChart";
import UserInfo from "../components/UserInfo";
import { loadPostsRequest } from "../redux/feature/postSlice";
import { loadMyInfoRequest } from "../redux/feature/userSlice";
import { loadWordsWeekendRequest } from "../redux/feature/wordSlice";

const post = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me, changeNicknameComplete, uploadProfileImageComplete } =
    useSelector((state) => state.user);
  const {
    mainPosts,

    loadPostsLoading,

    hasMorePosts,

    retweetError,
    likePostError,
    bookmarkError,
  } = useSelector((state) => state.post);
  const { weekendResult, wordLists } = useSelector((state) => state.word);
  const id = useSelector((state) => state.user.me?.id);
  const postResult = mainPosts.filter((post) => post.UserId === id);

  const onBookmark = useCallback(() => {
    router.push("/bookmark");
  }, []);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);

  useEffect(() => {
    dispatch(loadWordsWeekendRequest());
  }, [wordLists]);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    if (likePostError) {
      alert(likePostError);
    }
  }, [likePostError]);

  useEffect(() => {
    if (bookmarkError) {
      alert(bookmarkError);
    }
  }, [bookmarkError]);

  useEffect(() => {
    if (hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsRequest(lastId));
    }
    if (changeNicknameComplete || uploadProfileImageComplete) {
      window.location.reload();
    }
  }, [hasMorePosts, mainPosts]);

  return (
    <>
      <NavbarForm>
        <div className="h-full mt-5">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1">
              {me && (
                <>
                  <UserInfo
                    nickname={me?.nickname}
                    me={me}
                    postResult={postResult}
                  />
                  <div
                    className="bg-gray-100 ml-2 mt-2 rounded-xl"
                    onClick={onBookmark}
                  >
                    <p className="text-gray-400 font-bold text-center cursor-pointer hover:text-light-orange">
                      내가 북마크한 글
                    </p>
                  </div>
                  <PostSearch />
                </>
              )}
              <PostSearch />
            </div>
            <div className="col-span-2">
              {me && <PostForms />}
              {mainPosts.map((post, index) => {
                return (
                  <PostCard key={index} post={post} index={index} me={me} />
                );
              })}
            </div>
            <div className="col-span-1"></div>
          </div>
        </div>
      </NavbarForm>
    </>
  );
};

export default post;
