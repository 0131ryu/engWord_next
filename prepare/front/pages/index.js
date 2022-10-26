import React, { useCallback, useState } from "react";

import AppLayout from "../components/AppLayout";
import NavbarForm from "../components/NavbarForm";
import BottomLayout from "../components/word/BottomLayout";
import TopLayout from "../components/word/TopLayout";
import WordForm from "../components/word/WordForm";
import WordList from "../components/word/WordList";

const Home = () => {
  return (
    // <AppLayout>
    <>
      {/* <TopLayout /> */}
      <NavbarForm />
      <WordForm />
      <WordList />
    </>
    // {/* </AppLayout> */}
  );
};

export default Home;
