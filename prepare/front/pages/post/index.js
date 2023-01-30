import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { useInView } from "react-intersection-observer";

import NavbarForm from "../../components/NavbarForm";
import PostCard from "../../components/post/PostCard";
import PostForms from "../../components/post/PostForms";
import PostSearch from "../../components/post/PostSearch";
import WeekendWordChart from "../../components/post/WeekendWordChart";
import UserInfo from "../../components/UserInfo";
import { loadPostsRequest } from "../../redux/feature/postSlice";
import { loadMyInfoRequest } from "../../redux/feature/userSlice";
import { loadWordsWeekendRequest } from "../../redux/feature/wordSlice";
import wrapper from "../../redux/store";

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector((state) => state.user);
  const {
    mainPosts,
    loadPostsLoading,
    hasMorePosts,
    retweetError,
    likePostError,
    bookmarkError,
  } = useSelector((state) => state.post);
  const { weekendResult, wordLists } = useSelector((state) => state.word);
  const [ref, inView] = useInView();

  const onBookmark = useCallback(() => {
    router.push("/bookmark");
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
    console.log("mainPosts", mainPosts);
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsRequest(lastId));
      console.log("lastId", lastId);
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

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
                    mainPosts={mainPosts}
                  />
                  <div
                    className="bg-gray-100 ml-2 mt-2 rounded-xl"
                    onClick={onBookmark}
                  >
                    <p className="text-gray-400 font-bold text-center cursor-pointer hover:text-light-orange">
                      내가 북마크한 글
                    </p>
                  </div>
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
              <div
                ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
                className="h-10"
              />
            </div>
            {weekendResult.length > 0 ? (
              <div className="mt-10">
                <WeekendWordChart weekendResult={weekendResult} />
              </div>
            ) : null}
          </div>
        </div>
      </NavbarForm>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch(loadMyInfoRequest());
    context.store.dispatch(loadPostsRequest());
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Index;
