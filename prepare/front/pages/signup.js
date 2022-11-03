import React, { useEffect } from "react";
import PropTypes from "prop-types";
import JoinForm from "../components/JoinForm";
import NavbarForm from "../components/NavbarForm";
import { useSelector } from "react-redux";
import SuccessSignup from "../components/SuccessSignup";

const signUp = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <NavbarForm>{me ? <SuccessSignup /> : <JoinForm />}</NavbarForm>
    </div>
  );
};

signUp.prototype = {
  children: PropTypes.node.isRequired,
};

export default signUp;
