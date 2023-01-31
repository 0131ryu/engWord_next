import axios from "axios";
import React, { useEffect } from "react";
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
