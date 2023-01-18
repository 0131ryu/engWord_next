import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarForm from "../components/NavbarForm";
import LoginForm from "../components/LoginForm";
import Profile from "../components/Profile";
import { loadPostsRequest } from "../redux/feature/postSlice";
import { loadMyInfoRequest } from "../redux/feature/userSlice";
import { loadWordsRequest } from "../redux/feature/wordSlice";
// import wrapper from "../redux/store";
// import axios from "axios";
// import { END } from "redux-saga";

const profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadPostsLoading, hasMorePosts } = useSelector(
    (state) => state.post
  );
  const { wordLists, loadWordsLoading, hasMoreWords } = useSelector(
    (state) => state.word
  );

  const id = useSelector((state) => state.user.me?.id);
  const { imagePaths } = useSelector((state) => state.user);
  const postResult = mainPosts.filter((post) => post.UserId === id);
  const wordResult = wordLists.filter((word) => word.UserId === id);

  useEffect(() => {
    if (hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsRequest(lastId));
      dispatch(loadWordsRequest());
    }
  }, [hasMorePosts, mainPosts]);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, [imagePaths]);

  return (
    <>
      <NavbarForm>
        {me ? (
          <Profile me={me} postResult={postResult} wordResult={wordResult} />
        ) : (
          <LoginForm />
        )}
      </NavbarForm>
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   async (context) => {
//     const cookie = context.req ? context.req.headers.cookie : "";
//     axios.defaults.headers.Cookie = "";
//     if (context.req && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }

//     context.store.dispatch(loadMyInfoRequest());
//     context.store.dispatch(loadPostsRequest());
//     context.store.dispatch(loadWordsRequest());
//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
//   }
// );

export default profile;
