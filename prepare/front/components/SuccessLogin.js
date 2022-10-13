import React, { useCallback } from "react";
import { Button, Result } from "antd";
import { useDispatch } from "react-redux";
import { logoutAction } from "../store/userSlice";
import Link from "next/link";

const SuccessLogin = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);
  return (
    <>
      <Result
        status="success"
        title="성공적으로 로그인이 완료되었습니다!"
        subTitle="환영합니다, 테스터님"
        extra={[
          <Button type="primary" key="console">
            <Link href="/">메인화면</Link>
          </Button>,
          <Button onClick={onLogout}>로그아웃</Button>,
        ]}
      />
    </>
  );
};

export default SuccessLogin;
