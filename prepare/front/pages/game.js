import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StartModal from "../components/game/StartModal";
import NavbarForm from "../components/NavbarForm";
import { loadMyInfoRequest } from "../redux/feature/userSlice";

const game = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);
  return (
    <>
      <NavbarForm>
        <StartModal UserId={me?.id} />
      </NavbarForm>
    </>
  );
};

export default game;
