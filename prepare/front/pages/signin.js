import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoginForm from "../components/LoginForm";
import SuccessLogin from "../components/SuccessLogin";
import NavbarForm from "../components/NavbarForm";

import { useSelector } from "react-redux";

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

signIn.prototype = {
  children: PropTypes.node.isRequired,
};

export default signIn;
