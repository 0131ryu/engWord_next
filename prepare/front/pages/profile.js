import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarForm from "../components/NavbarForm";
import LoginForm from "../components/LoginForm";
import Profile from "../components/Profile";
import { loadPostsRequest } from "../redux/feature/postSlice";
import { loadMyInfoRequest } from "../redux/feature/userSlice";
import { loadWordsRequest } from "../redux/feature/wordSlice";

const profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  const { wordLists } = useSelector((state) => state.word);

  const id = useSelector((state) => state.user.me?.id);
  const postResult = mainPosts.filter((post) => post.UserId === id);
  const wordResult = wordLists.filter((word) => word.UserId === id);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
    dispatch(loadPostsRequest());
    dispatch(loadWordsRequest());
  }, []);
  return (
    <>
      <NavbarForm />
      {me ? (
        <Profile me={me} postResult={postResult} wordResult={wordResult} />
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default profile;
