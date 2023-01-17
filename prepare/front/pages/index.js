import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarForm from "../components/NavbarForm";
import WordForm from "../components/word/WordForm";
import WordList from "../components/word/WordList";

import { loadMyInfoRequest } from "../redux/feature/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { addWordError } = useCallback((state) => state.word);

  useEffect(() => {
    console.log("me", me);
    dispatch(loadMyInfoRequest());
  }, []);

  console.log("addWordError", addWordError);

  useEffect(() => {
    if (addWordError) {
      alert(addWordError);
    }
  }, [addWordError]);

  return (
    <>
      <NavbarForm>
        <WordForm UserId={me?.id} />
        <WordList UserId={me?.id} />
      </NavbarForm>
    </>
  );
};

export default Home;
