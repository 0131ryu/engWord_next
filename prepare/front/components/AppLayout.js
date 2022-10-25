import React from "react";
import { useSelector } from "react-redux";
import { Menu, Row, Col, Button } from "antd";
import Link from "next/link";
import PropTypes from "prop-types";
// import styled from "styled-components";

// const AppLayoutWrapper = () => styled.div`
//   z-index: 10;
// `;

const items = [
  { label: <Link href="/">영단어 외우기</Link>, key: "item-1" },
  { label: <Link href="/sns">SNS</Link>, key: "item-2" },

  {
    label: <Link href="/signin">로그인</Link>,
    key: "item-3",
  },
  { label: <Link href="/signup">회원가입</Link>, key: "item-4" },
];

const loginItems = [
  { label: <Link href="/">영단어 외우기</Link>, key: "item-1" },
  { label: <Link href="/sns">SNS</Link>, key: "item-2" },
];

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div>
      <Menu items={isLoggedIn ? loginItems : items} mode="horizontal" />
      {/* <Row>
        <Col xs={0} md={4}></Col>
        <Col xs={8} md={16} lg={32}> */}
      {children}
      {/* </Col>
        <Col xs={0} md={4}> */}
      {/* <Button
            type="link"
            href="https://ba-gotocode131.tistory.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            블로그
          </Button> */}
      {/* </Col>
      </Row> */}
    </div>
  );
};

AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
