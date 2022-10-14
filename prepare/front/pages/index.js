import React from "react";

import AppLayout from "../components/AppLayout";
import TopLayout from "../components/word/TopLayout";
import MiddleLayout from "../components/word/MiddleLayout";
import BottomLayout from "../components/word/Bottomlayout";
import AllWords from "../components/word/AllWords";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const Home = () => {
  return (
    <AppLayout>
      <TopLayout />
      <MiddleLayout />
      <br />
      {/* <BottomLayout /> */}
      <AllWords />
    </AppLayout>
  );
};

export default Home;
