import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../components/LoginForm";
import SuccessLogin from "../components/SuccessLogin";
import NavbarForm from "../components/NavbarForm";

import { useSelector } from "react-redux";

const signIn = () => {
  const { me } = useSelector((state) => state.user);
  console.log("me", me);
  return (
    <div>
      <NavbarForm>{me ? <SuccessLogin /> : <LoginForm />}</NavbarForm>
    </div>
  );
};

signIn.prototype = {
  children: PropTypes.node.isRequired,
};

export default signIn;
