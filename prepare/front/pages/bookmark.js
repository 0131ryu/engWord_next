import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { useInView } from "react-intersection-observer";

import { loadPostsRequest } from "../redux/feature/postSlice";
import { loadMyInfoRequest } from "../redux/feature/userSlice";
import PostCardBookmark from "../components/post/PostCardBookmark";
import wrapper from "../redux/store";

const Navbar = dynamic(import("../components/Navbar"));
const PostSearch = dynamic(import("../components/post/PostSearch"));
const UserInfo = dynamic(import("../components/UserInfo"));

const bookmark = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const router = useRouter();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostsLoading, hasMorePosts, retweetError } =
    useSelector((state) => state.post);

  const onPost = useCallback(() => {
    router.push("/post");
  }, []);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsRequest(lastId));
      console.log("lastId", lastId);
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <>
      <Navbar>
        <Head>
          <title>{`북마크한 게시글`}</title>
          <meta name="description" content={`내가 북마크한 게시글`} />
          <meta property="og:title" content={`북마크한 게시글`} />
          <meta property="og:description" content="내가 북마크한 게시글" />
          <meta
            property="og:image"
            content="https://engword.shop/favicon.ico"
          />
          <meta property="og:url" content={`https://engword.shop/bookmark`} />
        </Head>
        {me && (
          <div className="h-full mt-5">
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-1">
                <UserInfo />
                <div
                  className="mt-2 ml-2 bg-gray-100 rounded-xl"
                  onClick={onPost}
                >
                  <p className="font-bold text-center text-gray-400 cursor-pointer rounded-xl hover:text-light-orange">
                    게시글(sns)로 이동
                  </p>
                </div>
                <PostSearch />
              </div>
              <div className="col-span-2">
                {mainPosts.map((post, index) => {
                  return (
                    <PostCardBookmark
                      key={index}
                      post={post}
                      index={index}
                      me={me}
                    />
                  );
                })}
                <div
                  ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
                  className="h-10"
                />
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
        )}
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

export default bookmark;
