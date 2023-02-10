import axios from "axios";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import StartModal from "../components/game/StartModal";
import NavbarForm from "../components/NavbarForm";
import { loadMyInfoRequest } from "../redux/feature/userSlice";
import { loadWordsRequest } from "../redux/feature/wordSlice";

import { END } from "redux-saga";
import wrapper from "../redux/store";
import LoginForm from "../components/LoginForm";

const game = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <NavbarForm>
        <Head>
          <title>{`등록한 영어단어로 게임을 즐겨보세요!`}</title>
          <meta
            name="description"
            content={`engWord에서 만든 영어단어로 자신의 실력을 검증해볼까요?`}
          />
          <meta
            property="og:title"
            content={`등록한 영어단어로 게임을 즐겨보세요!`}
          />
          <meta
            property="og:description"
            content="engWord에서 만든 영어단어로 자신의 실력을 검증해볼까요?"
          />
          <meta
            property="og:image"
            content="https://engword.shop/favicon.ico"
          />
          <meta property="og:url" content={`https://engword.shop/game`} />
        </Head>
        {me ? <StartModal UserId={me?.id} /> : <LoginForm />}
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

export default game;
