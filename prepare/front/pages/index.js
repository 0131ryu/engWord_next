import React, { useCallback, useState } from "react";

import AppLayout from "../components/AppLayout";
import TopLayout from "../components/word/TopLayout";
import MiddleLayout from "../components/word/MiddleLayout";
import BottomLayout from "../components/word/Bottomlayout";
import WordCard from "../components/word/WordCard";
import { useSelector } from "react-redux";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const Home = () => {
  const { wordList } = useSelector((state) => state.word);
  return (
    <AppLayout>
      <TopLayout />
      <MiddleLayout />
      <br />
      <BottomLayout />
      {wordList.map((c) => {
        return <WordCard key={c.id} word={c} />;
      })}
    </AppLayout>
  );
};

export default Home;
