import React, { useState, useEffect, useRef } from "react";
import { HandRaisedIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import GameList from "./GameList";
import HintModal from "./HintModal";
import { findHintRequest } from "../../redux/feature/gameSlice";
import TimeoutModal from "./TimeoutModal";
import EndModal from "./EndModal";

const GameForm = () => {
  const dispatch = useDispatch();
  const [sec, setSec] = useState(12);
  const time = useRef(12);
  const timerId = useRef(null);
  const [modal, setModal] = useState(false);
  const [endModal, setEndModal] = useState(false);
  const [score, setScore] = useState(0);

  const { checkedWordLists, startTimerLoading, startTimerComplete } =
    useSelector((state) => state.game);

  // console.log("checkedWordLists", checkedWordLists);
  // const checkedWords = { ...checkedWordLists };

  // const shuffleArray = (array) => {
  //   for (let loop = array.length - 1; loop >= 0; loop--) {
  //     let randomNum = Math.floor(Math.random() * (loop + 1));
  //     let randomArrayItem = array[randomNum];

  //     array[randomNum] = array[loop];
  //     array[loop] = randomArrayItem;
  //   }
  // };

  // console.log("checkedWords", shuffleArray(checkedWords));

  //타이머
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSec(parseInt(time.current));
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  //타임아웃
  useEffect(() => {
    if (time.current < 0) {
      console.log("타임 아웃");
      clearInterval(timerId.current);
    }
  }, [sec]);

  const onClickHint = (e) => {
    let korean = e.currentTarget.value;
    setModal(true);
    console.log("korean", korean);
    dispatch(findHintRequest(korean));
  };

  const onClickAnswer = () => {
    setScore((score += 10));
    console.log("score", score);
  };

  return (
    <>
      {/* 시간초과시 모달 */}
      {/* {sec === 0 ? <TimeoutModal /> : null} */}
      {/* 모든 게임 다 진행 후 모달 */}
      {/* {sec === 0 ? <EndModal /> : null} */}
      {/* 힌트 모달 */}
      {modal ? (
        <HintModal setModal={setModal} korean={checkedWordLists[0].korean} />
      ) : null}
      <div className="flex lg:flex flex h-full my-3 pt-6 items-center justify-center">
        <div className="sm:500px hidden">quiz game</div>
        <div className="w-full max-w-sm overflow-hidden bg-white border-2 border-light-green flex-none relative shadow-lg rounded-lg px-10 py-3">
          {/* score start */}
          <div className="text-right text-gray-800">
            <p className="text-sm leading-3">Score</p>
            <p className="font-bold">60</p>
          </div>
          {/* score end */}
          {/* time start */}
          <div className="bg-white shadow-lg p-1 rounded-full w-full h-5 mt-4">
            <div className={`bg-light-green rounded-full w-${sec}/12 h-full`}>
              {sec}
            </div>
          </div>

          {/* time end */}
          {/* Hint start */}
          <div>
            <button
              value={checkedWordLists[1].korean}
              onClick={onClickHint}
              className="bg-light-orange flex rounded-lg m-5 relative left-24"
            >
              <HandRaisedIcon className="h-9 h-8" />
              <p className="py-2 px-1 font-bold">Hint!</p>
            </button>
          </div>
          {/* {sec <= 7 && (
            <div>
              <button
                onClick={onClickHint}
                className="bg-light-orange flex rounded-lg m-5 relative left-24"
              >
                <HandRaisedIcon className="h-9 h-8" />
                <p className="py-2 px-1 font-bold">Hint!</p>
              </button>
            </div>
          )} */}

          {/* Hint end */}

          <div className="relative z-1">
            <div className="rounded-lg bg-light-green p-2 neumorph-1 text-center font-bold text-gray-800 mt-5">
              <div className="bg-white p-5" name="korean">
                다음 단어와 맞는 영단어를 고르시오
                <div className="bg-light-beige">
                  {checkedWordLists[1].korean}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div>
                {/* quiz answer start */}
                {/* https://developer-talk.tistory.com/290 */}
                {checkedWordLists.map((word, index) => {
                  {
                    // console.log("random 섞은 배열", shuffleArray(checkedWords));
                    // return <GameList word={word} index={index} />;
                    return (
                      <div className="option-default bg-light-beige p-2 rounded-lg mb-3 relative">
                        <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
                          <p className="transform -rotate-45 text-black text-lg">
                            +10
                          </p>
                        </div>

                        <div className="rounded-lg font-bold flex ">
                          <div className="bg-white p-3 rounded-lg">{index}</div>
                          <div
                            onClick={onClickAnswer}
                            className="flex items-center pl-10"
                          ></div>
                        </div>
                      </div>
                    );
                  }
                })}
                {/* quiz answer end */}

                {/* 1/10 */}
                <div className="mt-8 text-center">
                  <div className="h-1 w-12 bg-dark-green rounded-full mx-auto"></div>
                  <p className="font-bold text-dark-green">1/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameForm;
