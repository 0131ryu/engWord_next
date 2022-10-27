import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../components/LoginForm";
// import SuccessLogin from "../components/SuccessLogin";
import AppLayout from "../components/AppLayout";
import FormBg from "../components/FormBg";
import NavbarForm from "../components/NavbarForm";

const signIn = () => {
  return (
    <div>
      {/* <FormBg>
        <AppLayout />
        <LoginForm />
      </FormBg> */}
      <NavbarForm />
      <LoginForm />
    </div>
  );
};

signIn.prototype = {
  children: PropTypes.node.isRequired,
};

export default signIn;
