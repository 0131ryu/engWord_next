import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import UserInfo from "../components/UserInfo";

const signIn = () => {
  // const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div>
      <AppLayout>
        <LoginForm />
        <UserInfo />
      </AppLayout>
    </div>
  );
};

signIn.prototype = {
  children: PropTypes.node.isRequired,
};

export default signIn;
