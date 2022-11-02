import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../components/LoginForm";
import SuccessLogin from "../components/SuccessLogin";
import NavbarForm from "../components/NavbarForm";

import { useSelector } from "react-redux";

const signIn = () => {
  const { loginComplete, loginLoading, me } = useSelector(
    (state) => state.user
  );
  console.log("me", me);
  // const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div>
      <NavbarForm />
      {me ? <SuccessLogin /> : <LoginForm />}
      {/* {loginComplete ? <SuccessLogin /> : <LoginForm />} */}
      {/* {isLoggedIn ? <SuccessLogin /> : <LoginForm />} */}
    </div>
  );
};

signIn.prototype = {
  children: PropTypes.node.isRequired,
};

export default signIn;
