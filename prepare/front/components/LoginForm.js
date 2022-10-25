import React, { useCallback } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import styled from "styled-components";
import Link from "next/link";
import { CommentOutlined, GoogleOutlined } from "@ant-design/icons";

import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/userSlice";

const LoginWrapper = styled(Form)`
  background-color: white;
  width: 500px;
  height: 500px;
  border-radius: 1%;
  z-index: 2;
  text-align: center;
  align-items: center;
  // 가운데 정렬
  position: absolute;
  top: 120px;
  left: 50%;
  margin-left: calc(500px / -2);
`;

const LoginInputWrapper = styled(Input)`
  margin-top: 10px;
  border-style: solid;
  border-color: green;
  width: 400px;
  height: 40px;
`;

const LoginDivWrapper = styled.div`
  position: relative;
  top: 140px;
`;

const LoginButtonWrapper = styled(Button)`
  background-color: green;
  color: white;
  width: 400px;
  height: 40px;
  margin-top: 30px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LoginWrapper>
      <LoginDivWrapper>
        <Link href="https://accounts.kakao.com/login?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount%2Finfo">
          <a>
            <CommentOutlined />
            카카오톡
          </a>
        </Link>
        <Link href="https://contacts.google.com/?hl=ko">
          <a>
            <GoogleOutlined />
            구글
          </a>
        </Link>
        {/* <Image src={kakaoIcon} alt="img" width="500" height="500" />
        <Image src={googleIcon} alt="img" width="500" height="500" /> */}
        <br />
        <LoginInputWrapper
          name="user-email"
          type="email"
          placeholder="이메일"
          // value={email}
          // onChange={onChangeEmail}
          required
        />
        <LoginInputWrapper
          name="user-password"
          placeholder="비밀번호"
          // value={password}
          // onChange={onChangePassword}
          type="password"
          required
        />
        <div>
          <LoginButtonWrapper htmlType="submit">로그인</LoginButtonWrapper>
          <Link href="/signup">
            <a>
              <ButtonWrapper>회원가입</ButtonWrapper>
            </a>
          </Link>
        </div>
      </LoginDivWrapper>
    </LoginWrapper>
  );
};

export default LoginForm;
