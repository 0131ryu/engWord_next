import React, { useEffect } from "react";
import PropTypes from "prop-types";
import JoinForm from "../components/JoinForm";
import NavbarForm from "../components/NavbarForm";
import { useSelector } from "react-redux";
import Router from "next/router";
import SuccessSignup from "../components/SuccessSignup";

const signUp = () => {
  const { me } = useSelector((state) => state.user);
  console.log("signup me", me);
  // useEffect(() => {
  //   if (me) {
  //     alert("회원가입이 완료되었습니다.");
  //     Router.push("/signin");
  //   }
  // }, [me && me.id]);
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
