import axios from "axios";
import Head from "next/head";
import React from "react";
import LoginForm from "../components/LoginForm";
import SuccessLogin from "../components/SuccessLogin";
import NavbarForm from "../components/NavbarForm";
import { END } from "redux-saga";
import wrapper from "../redux/store";

import { useSelector } from "react-redux";
import { loadMyInfoRequest } from "../redux/feature/userSlice";

const signIn = () => {
  const { me, loginComplete } = useSelector((state) => state.user);

  return (
    <div>
      <NavbarForm>
        <Head>
          <title>{`engWord 로그인`}</title>
          <meta
            name="description"
            content={`engWord에 로그인하면 영단어 만들기, sns, 게임을 즐길 수 있습니다`}
          />
          <meta property="og:title" content={`engWord 로그인`} />
          <meta
            property="og:description"
            content="engWord에 로그인하면 영단어 만들기, sns, 게임을 즐길 수 있습니다"
          />
          <meta
            property="og:image"
            content="https://engword.shop/favicon.ico"
          />
          <meta property="og:url" content={`https://engword.shop/signin`} />
        </Head>
        {me || loginComplete ? <SuccessLogin me={me} /> : <LoginForm />}
      </NavbarForm>
    </div>
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default signIn;
