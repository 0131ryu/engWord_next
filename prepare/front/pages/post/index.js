import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { useInView } from "react-intersection-observer";

import { loadPostsRequest } from "../../redux/feature/postSlice";
import { loadMyInfoRequest } from "../../redux/feature/userSlice";
import { loadWordsWeekendRequest } from "../../redux/feature/wordSlice";
import wrapper from "../../redux/store";

const Navbar = dynamic(import("../../components/Navbar"));
const PostCard = dynamic(import("../../components/post/PostCard"));
const PostForms = dynamic(import("../../components/post/PostForms"));
const PostSearch = dynamic(import("../../components/post/PostSearch"));
const WeekendWordChart = dynamic(
  import("../../components/post/WeekendWordChart")
);
const Qutoes = dynamic(import("../../components/post/Quotes"));
const UserInfo = dynamic(import("../../components/UserInfo"));

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
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsRequest(lastId));
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <>
      <Navbar>
        <Head>
          <title>{`서로의 영단어와 지식을 공유 해보세요!`}</title>
          <meta
            name="description"
            content={`다른 사람들과 지식을 공유하고 꾸준히 학습하는 습관을 가져볼까요?`}
          />
          <meta
            property="og:title"
            content={`서로의 영단어와 지식을 공유 해보세요!`}
          />
          <meta
            property="og:description"
            content="다른 사람들과 지식을 공유하고 꾸준히 학습하는 습관을 가져볼까요?"
          />
          <meta
            property="og:image"
            content="https://engword.shop/favicon.ico"
          />
          <meta property="og:url" content={`https://engword.shop/post`} />
        </Head>
        <div className="h-full mt-5">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1">
              {me && (
                <>
                  <UserInfo />
                  <div
                    className="mt-2 ml-2 bg-gray-100 rounded-xl"
                    onClick={onBookmark}
                  >
                    <p className="font-bold text-center text-gray-400 cursor-pointer hover:text-light-orange">
                      내가 북마크한 글
                    </p>
                  </div>
                </>
              )}
              <PostSearch />
              {weekendResult.length > 0 ? (
                <div className="mt-10">
                  <WeekendWordChart weekendResult={weekendResult} />
                </div>
              ) : null}
            </div>
            <div className="col-span-2 p-2 bg-gray-100 rounded-lg">
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
            <Qutoes />
          </div>
        </div>
      </Navbar>
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
