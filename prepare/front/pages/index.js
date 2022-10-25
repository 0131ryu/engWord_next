import React, { useCallback, useState } from "react";

import AppLayout from "../components/AppLayout";
import TopLayout from "../components/word/TopLayout";

import { Card } from "antd";
const tabList = [
  {
    key: "tab1",
    tab: "Easy",
  },
  {
    key: "tab2",
    tab: "Middle",
  },
  {
    key: "tab3",
    tab: "Advance",
  },
];

const contentList = {
  tab1: <p>content1</p>,
  tab2: <p>content2</p>,
  tab3: <p>content3</p>,
};

const Home = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  return (
    <AppLayout>
      <TopLayout />
      <Card
        style={{
          width: "100%",
        }}
        title="Card title"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br />
      <br />
    </AppLayout>
  );
};

export default Home;
