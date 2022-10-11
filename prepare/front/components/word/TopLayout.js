import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import Image from "next/image";
import mainImg from "../../public/images/study.png";

const TopLayout = () => {
  return (
    <div>
      <Row gutter={8}>
        <Col
          xs={14}
          sm={12}
          md={12}
          lg={15}
          style={{
            textAlign: "center",
            position: "relative",
            top: 35,
            left: 30,
          }}
        >
          <h2>매일매일 쌓아가는,</h2>
          <h3 style={{ fontWeight: "bold" }}>영단어 외우기</h3>
        </Col>
        <Col xs={10} sm={12} md={12} lg={9}>
          <Image src={mainImg} alt="img" width="360" height="200" />
        </Col>
      </Row>
    </div>
  );
};

TopLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default TopLayout;
