import React from "react";
import PropTypes from "prop-types";
import AppLayout from "../components/AppLayout";
import FormBg from "../components/FormBg";
import JoinForm from "../components/JoinForm";
import NavbarForm from "../components/NavbarForm";

const signUp = () => {
  return (
    <div>
      {/* <FormBg>
        <AppLayout />
        <JoinForm />
      </FormBg> */}
      <NavbarForm />
      <JoinForm />
    </div>
  );
};

signUp.prototype = {
  children: PropTypes.node.isRequired,
};

export default signUp;
