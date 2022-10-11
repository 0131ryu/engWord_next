import React from "react";
import { Menu, Row, Col, Button } from "antd";
import Link from "next/link";
import PropTypes from "prop-types";

const items = [
  { label: <Link href="/">영단어 외우기</Link>, key: "item-1" },
  { label: <Link href="/sns">SNS</Link>, key: "item-2" },
  {
    label: <Link href="/login">로그인</Link>,
    key: "item-3",
  },
  { label: <Link href="/signup">회원가입</Link>, key: "item-4" },
];

const AppLayout = ({ children }) => {
  return (
    <div>
      <Menu items={items} mode="horizontal" />
      <Row>
        <Col xs={24} md={3}></Col>
        <Col xs={24} md={18}>
          {children}
        </Col>
        <Col xs={24} md={3}>
          {/* <Button
            type="link"
            href="https://ba-gotocode131.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            블로그
          </Button> */}
        </Col>
      </Row>
    </div>
  );
};

AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
