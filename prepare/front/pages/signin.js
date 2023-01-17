import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SuccessLogin from "../components/SuccessLogin";
import NavbarForm from "../components/NavbarForm";
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
    // const cookie = context.req ? context.req.headers.cookie : "";
    // axios.defaults.headers.Cookie = "";
    // // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    // if (context.req && cookie) {
    //   axios.defaults.headers.Cookie = cookie;
    // }
    // await context.store.dispatch(loadMyInfoRequest());
    // console.log("context", context);
    context.store.dispatch(loadMyInfoRequest());
    console.log("context", context);

    return {
      props: {},
    };
  }
);

export default signIn;
