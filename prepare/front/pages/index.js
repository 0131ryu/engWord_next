import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavbarForm from "../components/NavbarForm";
import WordForm from "../components/word/WordForm";
import WordList from "../components/word/WordList";

import { loadMyInfoRequest } from "../redux/feature/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);
  return (
    <>
      <NavbarForm>
        <WordForm />
        <WordList />
      </NavbarForm>
    </>
  );
};

export default Home;
