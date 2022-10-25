import React, { useCallback } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import styled from "styled-components";

import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/userSlice";

const JoinWrapper = styled(Form)`
  background-color: white;
  width: 500px;
  height: 500px;
  border-radius: 1%;
  z-index: 2;
  // 가운데 정렬
  position: absolute;
  top: 120px;
  left: 50%;
  margin-left: calc(500px / -2);
`;

const JoinInputWrapper = styled(Input)`
  border-style: solid;
  border-color: green;
  width: 400px;
  height: 40px;
`;

const JoinDivWrapper = styled.div`
  position: relative;
  top: 80px;
  left: 50px;
`;

const JoinButtonWrapper = styled(Button)`
  background-color: green;
  color: white;
  width: 400px;
  height: 40px;
  margin-top: 30px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const JounForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <JoinWrapper>
      <JoinDivWrapper>
        <label htmlFor="user-email">이메일</label>
        <br />
        <JoinInputWrapper
          name="user-email"
          type="email"
          placeholder="이메일"
          // value={email}
          // onChange={onChangeEmail}
          required
        />
        <br />
        <label htmlFor="user-email">닉네임</label>
        <br />
        <JoinInputWrapper
          name="user-nickname"
          placeholder="닉네임"
          // value={password}
          // onChange={onChangePassword}
          type="text"
          required
        />
        <br />
        <label htmlFor="user-email">비밀번호</label>
        <br />
        <JoinInputWrapper
          name="user-password"
          placeholder="비밀번호"
          // value={password}
          // onChange={onChangePassword}
          type="password"
          required
        />
        <br />
        <label htmlFor="user-email">비밀번호 확인</label>
        <br />
        <JoinInputWrapper
          name="user-password"
          placeholder="비밀번호"
          // value={password}
          // onChange={onChangePassword}
          type="password"
          required
        />
        <div>
          <JoinButtonWrapper htmlType="submit">회원가입</JoinButtonWrapper>
        </div>
      </JoinDivWrapper>
    </JoinWrapper>
  );
};

export default JounForm;
