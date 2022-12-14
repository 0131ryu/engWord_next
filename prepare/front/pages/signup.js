import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import JoinForm from "../components/JoinForm";
import NavbarForm from "../components/NavbarForm";
import { useSelector } from "react-redux";
import SuccessSignup from "../components/SuccessSignup";

const signUp = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const { signupComplete } = useSelector((state) => state.user);

  useEffect(() => {
    if (signupComplete) {
      setShowSignUp(true);
    }
  }, [signupComplete]);

  return (
    <div>
      <NavbarForm />
      {showSignUp ? <SuccessSignup /> : <JoinForm />}
    </div>
  );
};

signUp.prototype = {
  children: PropTypes.node.isRequired,
};

export default signUp;
