import React, { useCallback, useState } from "react";

import AppLayout from "../components/AppLayout";
import BottomLayout from "../components/word/BottomLayout";
import TopLayout from "../components/word/TopLayout";
import WordList from "../components/word/WordList";

const Home = () => {
  return (
    // <AppLayout>
    <>
      {/* <TopLayout /> */}
      <WordList />
    </>
    // {/* </AppLayout> */}
  );
};

export default Home;
