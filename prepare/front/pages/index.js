import React from "react";
import AppLayout from "../components/AppLayout";
import TopLayout from "../components/word/TopLayout";
import MiddleLayout from "../components/word/MiddleLayout";
import BottomLayout from "../components/word/Bottomlayout";

const Home = () => {
  return (
    <AppLayout>
      <TopLayout />
      <MiddleLayout />
      <br />
      <BottomLayout />
    </AppLayout>
  );
};

export default Home;
