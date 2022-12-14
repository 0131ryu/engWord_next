import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../components/LoginForm";
import SuccessLogin from "../components/SuccessLogin";
import NavbarForm from "../components/NavbarForm";

import { useSelector } from "react-redux";

const signIn = () => {
  const { me, loginComplete } = useSelector((state) => state.user);
  return (
    <div>
      <NavbarForm nikcname={me?.nickname} />
      {me && loginComplete ? (
        <SuccessLogin nickname={me?.nickname} />
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

signIn.prototype = {
  children: PropTypes.node.isRequired,
};

export default signIn;
