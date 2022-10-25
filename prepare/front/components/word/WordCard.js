import React, { useCallback, useState } from "react";
// import { useDispatch } from "react-redux";
import { Row, Col, Checkbox, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 130;
  height: 50;
  textalign: "center";
  display: "flex";
  justifycontent: "center";
  alignitems: "center";
`;

const WordCard = ({ word }) => {
  const onChange = useCallback(() => {
    console.log("onChangeButton");
  }, []);
  return (
    <div>
      <Row gutter={{ xs: 24, sm: 16, md: 8 }}>
        <Col span={24}>
          <Card>
            <Card.Grid style={{ border: "none" }} hoverable={false}>
              <Checkbox onChange={onChange} />
              <span>A</span>
            </Card.Grid>
            <Card.Grid style={{ border: "none" }} hoverable={false}>
              <span>B</span>
            </Card.Grid>
            <Card.Grid style={{ border: "none" }} hoverable={false}>
              <EditOutlined />
              <DeleteOutlined />
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

WordCard.prototype = {
  children: PropTypes.node.isRequired,
};

export default WordCard;
