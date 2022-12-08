import React, { useCallback, useEffect, useRef, useState } from "react";
import useCounter from "../hooks/useCounter";

const hello = () => {
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, stop, reset } = useCounter(0, 100);

  const timer = () => {
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    setCurrentHours(hours);
    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);
  };

  useEffect(timer, [count]);
  return (
    <>
      <h1>
        {currentHours < 10 ? `0${currentHours}` : currentHours} :
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes} :
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </h1>
      <button className="bg-gray-100 m-1" onClick={start}>
        시작
      </button>
      <button className="bg-gray-200 m-1" onClick={stop}>
        정지
      </button>
      <button className="bg-gray-300 m-1" onClick={reset}>
        초기화
      </button>
    </>
  );
};

export default hello;
