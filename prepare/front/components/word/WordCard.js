import React, { useCallback, useState } from "react";
// import { useDispatch } from "react-redux";
import { Button, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
// import { addWord } from "../../store/wordSlice";

const WordCard = () => {
  const onChange = useCallback(() => {
    console.log("onChangeButton");
  }, []);
  return (
    <div>
      <Button
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
      </Button>
    </div>
  );
};

WordCard.prototype = {
  children: PropTypes.node.isRequired,
};

export default WordCard;
