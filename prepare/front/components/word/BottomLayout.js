import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWord } from "../../store/wordSlice";
import { List, Row, Col, Form, Input, Button, Checkbox, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import WordCard from "./WordCard";

const title = ["🥉 Easy", "🥈 Middle", "🥇 Advance"];

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "제로초",
  },
  Images: [],
  Comments: [],
};

const BottomLayout = () => {
  const dispatch = useDispatch();
  const { wordList } = useSelector((state) => state.word);
  const onChangeEng = useCallback((e) => {
    setEnglish(e.target.value);
  }, []);
  const onChangeKor = useCallback((e) => {
    setKorean(e.target.value);
  }, []);
  const onSubmit = useCallback(() => {
    dispatch(addWord(dummyPost));
  }, []);

  return (
    <Row gutter={18}>
      {title.map((c, i) => {
        return (
          <Col span={8}>
            <List
              itemLayout="vertical"
              bordered
              header={
                <div>
                  {title[i]}
                  <div>
                    <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                      <Col span={18}></Col>
                    </Row>
                  </div>
                </div>
              }
            >
              {/* <List.Item>
                {wordList.map((c) => {
                  return <WordCard key={c.id} word={c} />;
                })}
              </List.Item> */}
            </List>
          </Col>
        );
      })}
    </Row>
  );
};

BottomLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default BottomLayout;
