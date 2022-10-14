import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWord,
  addEasyWord,
  addMiddleWord,
  addAdvanceWord,
} from "../../store/wordSlice";
import { List, Row, Col, Form, Input, Button, Checkbox, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import WordCard from "./WordCard";
import MiddleCard from "./MiddleCard";
import AdvanceCard from "./AdvanceCard";

const title = ["🥉 Easy", "🥈 Middle", "🥇 Advance"];

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: "HIHI",
  },
  english: "hello",
  korean: "안녕하세요",
  type: "easy",
  status: "C",
};

const AllWords = () => {
  const dispatch = useDispatch();
  const { easyList, middleList, advanceList } = useSelector(
    (state) => state.word
  );
  const onChangeEng = useCallback((e) => {
    setEnglish(e.target.value);
  }, []);
  const onChangeKor = useCallback((e) => {
    setKorean(e.target.value);
  }, []);
  const onSubmit = useCallback(() => {
    dispatch(addWord(dummyPost));
  }, []);

  const onEasySubmit = useCallback(() => {
    dispatch(addEasyWord(dummyPost));
  }, []);

  const onMiddleSubmit = useCallback(() => {
    dispatch(addMiddleWord(dummyPost));
  }, []);

  const onAdvanceSubmit = useCallback(() => {
    dispatch(addAdvanceWord(dummyPost));
  }, []);

  return (
    <Row gutter={18}>
      <Col span={8}>
        <List
          itemLayout="vertical"
          bordered
          header={
            <div>
              Easy
              <div>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                  <Col span={24}>
                    <Form onFinish={onEasySubmit}>
                      <Input
                        placeholder="영어 입력"
                        style={{
                          width: 95,
                          height: 37,
                          marginLeft: 10,
                          marginBottom: 5,
                        }}
                        onChange={onSubmit}
                      />

                      <Input
                        placeholder="한글 입력"
                        style={{
                          width: 95,
                          height: 37,
                          marginLeft: 10,
                          marginBottom: 5,
                        }}
                        onChange={onChangeKor}
                      />

                      <Button
                        style={{
                          width: 95,
                          height: 37,
                          marginLeft: 10,
                          marginBottom: 5,
                        }}
                        htmlType="submit"
                      >
                        등록
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </div>
            </div>
          }
        >
          <List.Item>
            {easyList.map((c) => {
              return <WordCard key={c.id} word={c} />;
            })}
          </List.Item>
        </List>
      </Col>
      <Col span={8}>
        <List
          itemLayout="vertical"
          bordered
          header={
            <div>
              Middle
              <div>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                  <Col span={24}>
                    <Form onFinish={onMiddleSubmit}>
                      <Input
                        placeholder="영어 입력"
                        style={{
                          width: 95,
                          height: 37,
                          marginLeft: 10,
                          marginBottom: 5,
                        }}
                        onChange={onChangeEng}
                      />

                      <Input
                        placeholder="한글 입력"
                        style={{
                          width: 95,
                          height: 37,
                          marginLeft: 10,
                          marginBottom: 5,
                        }}
                        onChange={onChangeKor}
                      />

                      <Button
                        style={{
                          width: 95,
                          height: 37,
                          marginLeft: 10,
                          marginBottom: 5,
                        }}
                        htmlType="submit"
                      >
                        등록
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </div>
            </div>
          }
        >
          <List.Item>
            {middleList.map((c) => {
              return <MiddleCard key={c.id} word={c} />;
            })}
          </List.Item>
        </List>
      </Col>
      <Col span={8}>
        <List
          itemLayout="vertical"
          bordered
          header={
            <div>
              Advance
              <div>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                  <Col span={24}>
                    <Form onFinish={onAdvanceSubmit}>
                      <Input
                        placeholder="영어 입력"
                        style={{
                          width: 95,
                          height: 37,
                          marginLeft: 10,
                          marginBottom: 5,
                        }}
                        onChange={onChangeEng}
                      />

                      <Input
                        placeholder="한글 입력"
                        style={{
                          width: 95,
                          height: 37,
                          marginLeft: 10,
                          marginBottom: 5,
                        }}
                        onChange={onChangeKor}
                      />

                      <Button
                        style={{
                          width: 95,
                          height: 37,
                          marginLeft: 10,
                          marginBottom: 5,
                        }}
                        htmlType="submit"
                      >
                        등록
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </div>
            </div>
          }
        >
          <List.Item>
            {advanceList.map((c) => {
              return <AdvanceCard key={c.id} word={c} />;
            })}
          </List.Item>
        </List>
      </Col>
    </Row>
  );
};

AllWords.prototype = {
  children: PropTypes.node.isRequired,
};

export default AllWords;
