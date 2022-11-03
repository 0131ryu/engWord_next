import React, { useCallback, useState } from "react";

import NavbarForm from "../components/NavbarForm";
import WordForm from "../components/word/WordForm";
// import WordList from "../components/word/WordList";

const Home = () => {
  return (
    <>
      <NavbarForm>
        <WordForm />
        {/* <WordList /> */}
      </NavbarForm>
    </>
  );
};

export default Home;
