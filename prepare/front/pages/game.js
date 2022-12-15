import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import StartModal from "../components/game/StartModal";
import NavbarForm from "../components/NavbarForm";
import { loadMyInfoRequest } from "../redux/feature/userSlice";

const game = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);
  return (
    <>
      <NavbarForm />
      <StartModal />
    </>
  );
};

export default game;
