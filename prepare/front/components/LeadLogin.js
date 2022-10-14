import React from "react";
import { Button } from "antd";
import Link from "next/link";
const LeadLogin = () => {
  return (
    <>
      <Button type="primary">
        <Link href="/signin">로그인으로 이동</Link>
      </Button>
    </>
  );
};

export default LeadLogin;
