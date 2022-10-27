import React, { useCallback, useState } from "react";

import NavbarForm from "../components/NavbarForm";
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
