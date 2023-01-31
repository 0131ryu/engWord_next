import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";

import NavbarForm from "../components/NavbarForm";
import LoginForm from "../components/LoginForm";
import Profile from "../components/Profile";
import { loadMyInfoRequest } from "../redux/feature/userSlice";
import wrapper from "../redux/store";

const profile = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <NavbarForm>{me ? <Profile /> : <LoginForm />}</NavbarForm>
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
