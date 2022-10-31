import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../components/LoginForm";
import SuccessLogin from "../components/SuccessLogin";
import NavbarForm from "../components/NavbarForm";

import { useSelector } from "react-redux";

const signIn = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div>
      <NavbarForm />
      {isLoggedIn ? <SuccessLogin /> : <LoginForm />}
    </div>
  );
};

signIn.prototype = {
  children: PropTypes.node.isRequired,
};

export default signIn;
