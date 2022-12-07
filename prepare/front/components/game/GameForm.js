import React, { useState, useEffect, useRef } from "react";
import { HandRaisedIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import GameList from "./GameList";
import HintModal from "./HintModal";
import { findHintRequest } from "../../redux/feature/gameSlice";
import TimeoutModal from "./TimeoutModal";
import EndModal from "./EndModal";
import ScoreComponent from "./ScoreComponent";

const GameForm = () => {
  const dispatch = useDispatch();
  const [sec, setSec] = useState(12);
  const [num, setNum] = useState(1);
  const time = useRef(12);
  const number = useRef(1);
  const timerId = useRef(null);
  const [modal, setModal] = useState(false);
  const [endModal, setEndModal] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [gameLists, setGameLists] = useState([]);

  const { checkedWordLists } = useSelector((state) => state.game);
  const checkedWords = [...checkedWordLists];

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        // 무작위로 index 값 생성 (0 이상 i 미만)
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    shuffleArray(checkedWords);
    setGameLists(checkedWords);
    console.log("gameLists", gameLists);
  }, []);

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
    setModal(true);
    let korean = e.currentTarget.value;
    dispatch(findHintRequest(korean));
  };

  const onClickAnswer = (e) => {
    setNum(parseInt(number.current));
    number.current = number.current + 1;

    const chooseAnswer = parseInt(e.currentTarget.value) + 1;
    console.log("chooseAnswer", chooseAnswer);
    console.log("gameLists[num].answer", gameLists[num].answer);
    if (chooseAnswer === gameLists[num].answer) {
      setShowScore(true);
      console.log("정답!");

      setScore((score += 10));
    } else {
      console.log("오답!");
    }

    console.log("score", score);
    //답이 맞으면 dispatch로 연결
  };

  return (
    <>
      {console.log("num", num)}
      {/* 시간초과시 모달 */}
      {/* {sec === 0 ? <TimeoutModal score={score} /> : null} */}
      {/* 모든 게임 다 진행 후 모달 */}
      {num === 10 ? <EndModal score={score} /> : null}
      {/* 힌트 모달 */}
      {/* {modal ? (
        <HintModal setModal={setModal} korean={checkedWords[0].question} />
      ) : null} */}
      <div className="flex lg:flex flex h-full my-3 pt-6 items-center justify-center">
        <div className="sm:500px hidden">quiz game</div>
        <div className="w-full max-w-sm overflow-hidden bg-white border-2 border-light-green flex-none relative shadow-lg rounded-lg px-10 py-3">
          {/* score start */}
          <div className="text-right text-gray-800">
            <p className="text-sm leading-3">Score</p>
            <p className="font-bold">{score}</p>
          </div>
          {/* score end */}
          {/* time start */}
          <div className="bg-white shadow-lg p-1 rounded-full w-full h-5 mt-4">
            {sec === 0 ? (
              <div className={`bg-light-green rounded-full w-0 h-full`}>
                {sec}
              </div>
            ) : (
              <div className={`bg-light-green rounded-full w-${sec}/12 h-full`}>
                {sec}
              </div>
            )}
          </div>
          {/* time end */}
          {/* Hint start */}
          {/* {sec <= 7 && ( */}
          <div>
            <button
              value={checkedWordLists[0].question}
              onClick={onClickHint}
              className="bg-light-orange flex rounded-lg m-5 relative left-24"
            >
              <HandRaisedIcon className="h-9 h-8" />
              <p className="py-2 px-1 font-bold">Hint!</p>
            </button>
          </div>
          {/* )} */}
          {/* Hint end */}

          <div className="relative z-1">
            <div className="rounded-lg bg-light-green p-2 neumorph-1 text-center font-bold text-gray-800 mt-5">
              <div className="bg-white p-5" name="korean">
                다음 단어와 맞는 영단어를 고르시오
                {gameLists.map((word, i) => {
                  {
                    return (
                      <div className="bg-light-beige text-lg">
                        {gameLists[`${num}`]?.question}
                      </div>
                    );
                  }
                })}
                {/* {gameLists[0].question} */}
              </div>
            </div>

            <div className="mt-5">
              <div>
                {/* quiz answer start */}

                {gameLists.map((word, i) => {
                  // console.log("gameLists[0].choices", gameLists[0].choices);
                  // console.log("첫 번째", gameLists[0].choices[0]);
                  // console.log("두 번째", gameLists[0].choices[1]);
                  // console.log("세 번째", gameLists[0].choices[2]);
                  // console.log("네 번째", gameLists[0].choices[3]);
                  {
                    return (
                      <>
                        {gameLists[i].choices[i] !== undefined ? (
                          <button
                            value={i}
                            onClick={onClickAnswer}
                            className="w-full bg-light-beige p-2 rounded-lg mb-3 relative"
                          >
                            <div className="rounded-lg font-bold flex ">
                              <div className="bg-white p-3 rounded-lg">
                                {i + 1}
                              </div>
                              <div
                                id="point"
                                className="flex items-center pl-10 w-full bg-gray-100 text-lg"
                                value={gameLists[0]?.answer}
                              >
                                {gameLists[`${num}`]?.choices[i]}
                                {/* {showScore ? (
                                  <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
                                    <p className="transform -rotate-45 text-black text-lg">
                                      +10
                                    </p>
                                  </div>
                                ) : null} */}
                              </div>
                            </div>
                          </button>
                        ) : null}
                      </>
                    );
                  }
                })}

                {/* quiz answer end */}

                {/* 1/10 */}
                <div className="mt-8 text-center">
                  <div className="h-1 w-12 bg-dark-green rounded-full mx-auto"></div>
                  <p className="font-bold text-dark-green">{num}/10</p>
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
