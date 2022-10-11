import React from "react";
import useInput from "../hooks/useInput";
import Link from "next/link";
import { Input, Button } from "antd";

const LoginForm = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");

  // const onSubmitForm = useCallback(() => {
  //   console.log(id, password);
  // }, [id, password]);
  return (
    <>
      {/* <form onFinish={onSubmitForm}> */}
      <form>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input
            name="user-id"
            value={id}
            onChange={onChangeId}
            required
          ></Input>
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            value={password}
            onChange={onChangePassword}
            type="password"
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button type="primary" htmlType="submit" loading={false}>
            로그인
          </Button>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
