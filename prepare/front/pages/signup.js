import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import JoinForm from "../components/JoinForm";
import NavbarForm from "../components/NavbarForm";
import { useSelector } from "react-redux";
import SuccessSignup from "../components/SuccessSignup";

import { END } from "redux-saga";
import wrapper from "../redux/store";
import { loadMyInfoRequest } from "../redux/feature/userSlice";

const signUp = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const { me, signupComplete, signupError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (signupComplete) {
      setShowSignUp(true);
    }
  }, [signupComplete]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  return (
    <div>
      <NavbarForm>
        <Head>
          <title>{`engWord 회원가입`}</title>
          <meta
            name="description"
            content={`engWord에 회원가입을 하면 영단어 만들기, sns, 게임을 즐길 수 있습니다`}
          />
          <meta property="og:title" content={`engWord 회원가입`} />
          <meta
            property="og:description"
            content="engWord에 회원가입을 하면 영단어 만들기, sns, 게임을 즐길 수 있습니다"
          />
          <meta
            property="og:image"
            content="https://engword.shop/favicon.ico"
          />
          <meta property="og:url" content={`https://engword.shop/signup`} />
        </Head>
        {me || showSignUp ? <SuccessSignup me={me} /> : <JoinForm />}
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

export default signUp;
