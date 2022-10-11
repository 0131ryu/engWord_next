import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";

const MiddleLayout = () => {
  return (
    <div>
      <Row gutter={8}>
        <Col xs={4} md={7}></Col>
        <Col xs={16} md={10} style={{ textAlign: "center" }}>
          <h2>잊어 버리기 쉬운 영단어를</h2>
          <h2>Easy, Middle, Advance로 분류해 외워봅시다</h2>
        </Col>
        <Col xs={4} md={1}></Col>
      </Row>
    </div>
  );
};

MiddleLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default MiddleLayout;
