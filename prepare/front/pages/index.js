import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NavbarForm from "../components/NavbarForm";
import WordForm from "../components/word/WordForm";
import WordList from "../components/word/WordList";

import { END } from "redux-saga";
import wrapper from "../redux/store";

import { loadMyInfoRequest } from "../redux/feature/userSlice";
import { loadWordsRequest } from "../redux/feature/wordSlice";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { addWordError, loadWordsError } = useSelector((state) => state.word);

  useEffect(() => {
    if (addWordError) {
      alert(addWordError);
    }
  }, [addWordError]);

  useEffect(() => {
    if (loadWordsError) {
      alert(loadWordsError);
    }
  }, [loadWordsError]);

  return (
    <>
      <NavbarForm>
        <WordForm UserId={me?.id} />
        <WordList UserId={me?.id} />
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
    if (cookie !== undefined) {
      context.store.dispatch(loadWordsRequest());
    }

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
