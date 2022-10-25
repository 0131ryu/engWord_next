import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../components/LoginForm";
// import SuccessLogin from "../components/SuccessLogin";
import AppLayout from "../components/AppLayout";
import FormBg from "../components/FormBg";

const signIn = () => {
  return (
    <div>
      <FormBg>
        <AppLayout />
        <LoginForm />
      </FormBg>
    </div>
  );
};

signIn.prototype = {
  children: PropTypes.node.isRequired,
};

export default signIn;
