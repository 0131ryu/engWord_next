import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import { loadMyInfoRequest } from "../redux/feature/userSlice";
import wrapper from "../redux/store";

const AlertLogin = dynamic(import("../components/AlertLogin"));
const NavbarForm = dynamic(import("../components/NavbarForm"));
const Profile = dynamic(import("../components/Profile"));

const profile = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <NavbarForm>
        <Head>
          <title>{`engWord 내 정보`}</title>
          <meta
            name="description"
            content={`내 정보에서는 닉네임 변경, 영단어 게임 결과, post 관련 정보를 확인할 수 있습니다.`}
          />
          <meta property="og:title" content={`engWord 내 정보`} />
          <meta
            property="og:description"
            content="내 정보에서는 닉네임 변경, 영단어 게임 결과, post 관련 정보를 확인할 수 있습니다."
          />
          <meta
            property="og:image"
            content="https://engword.shop/favicon.ico"
          />
          <meta property="og:url" content={`https://engword.shop/profile`} />
        </Head>
        {me ? <Profile /> : <AlertLogin />}
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default profile;
