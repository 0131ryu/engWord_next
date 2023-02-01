import axios from "axios";
import { useRouter } from "next/router";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { useInView } from "react-intersection-observer";

import NavbarForm from "../components/NavbarForm";
import PostSearch from "../components/post/PostSearch";
import UserInfo from "../components/UserInfo";
import { loadPostsRequest } from "../redux/feature/postSlice";
import { loadMyInfoRequest } from "../redux/feature/userSlice";
import PostCardBookmark from "../components/post/PostCardBookmark";

import wrapper from "../redux/store";

const bookmark = () => {
  const dispatch = useDispatch();
  const [ref, inView] = useInView();
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostsLoading, hasMorePosts, retweetError } =
    useSelector((state) => state.post);

  const cancelButtonRef = useRef(null);
  const id = useSelector((state) => state.user.me?.id);
  const postResult = mainPosts.filter((post) => post.UserId === id);

  const post = mainPosts.filter((v) => v.Bookmarks.length > 0);
  console.log("post", post);

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
        {me && (
          <div className="h-full mt-5">
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-1">
                <UserInfo />
                <div
                  className="bg-gray-100 ml-2 mt-2 rounded-xl"
                  onClick={onPost}
                >
                  <p className="rounded-xl text-gray-400 font-bold text-center cursor-pointer hover:text-light-orange">
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

export default bookmark;
