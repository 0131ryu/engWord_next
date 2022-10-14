import React, { useCallback, useState } from "react";
// import { useDispatch } from "react-redux";
import { List, Card, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
// import { addWord } from "../../store/wordSlice";

const WordCard = () => {
  const onChange = useCallback(() => {
    console.log("onChangeButton");
  }, []);
  return (
    <div>
      <List>
        <List.Item>
          <Card
            style={{
              width: 330,
              height: 50,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Checkbox onChange={onChange} />
            <span>hello</span> <span>hello2</span>
            <EditOutlined />
            <DeleteOutlined />
          </Card>
        </List.Item>
      </List>
    </div>
  );
};

WordCard.prototype = {
  children: PropTypes.node.isRequired,
};

export default WordCard;
