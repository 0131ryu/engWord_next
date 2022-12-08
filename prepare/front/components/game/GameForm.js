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

  const [answers, setAnswers] = useState([false, false, false, false]);
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
    console.log("korean", korean);
    dispatch(findHintRequest(korean));
  };

  const onClickAnswer = (e) => {
    let copy = [...answers];

    setNum(parseInt(number.current));
    number.current = number.current + 1;
    const chooseAnswer = parseInt(e.currentTarget.value);
    setShowScore(false);

    // console.log("chooseAnswer", chooseAnswer);
    // console.log("gameLists[num].answer", gameLists[num].answer);
    if (chooseAnswer === gameLists[num].answer) {
      setShowScore(true);
      setScore((score += 10));
      console.log("정답!");

      copy[0] = false;
      copy[1] = false;
      copy[2] = false;
      copy[3] = false;

      if (chooseAnswer === 1) {
        copy[0] = true;
        setAnswers(copy);
      } else if (chooseAnswer === 2) {
        copy[1] = true;
        setAnswers(copy);
      } else if (chooseAnswer === 3) {
        copy[2] = true;
        setAnswers(copy);
      } else if (chooseAnswer === 4) {
        copy[3] = true;
        setAnswers(copy);
      }
    } else {
      setShowScore(false);
      console.log("오답!");
    }

    time.current = 12;
    setSec(parseInt(time.current));

    console.log("copy", copy);
    console.log("answers", answers);
    console.log("score", score);
    //답이 맞으면 dispatch로 연결
  };

  return (
    <>
      {/* {console.log("num", num)} */}
      {/* 시간초과시 모달 */}
      {sec === 0 ? <TimeoutModal score={score} /> : null}
      {/* 모든 게임 다 진행 후 모달 */}
      {num === 10 ? <EndModal score={score} /> : null}
      {/* 힌트 모달 */}
      {modal ? (
        <HintModal setModal={setModal} korean={gameLists[`${num}`]?.question} />
      ) : null}
      <div
        className={`flex lg:flex flex h-full pt-3 ${
          sec > 7 && "pt-10"
        } items-center justify-center`}
      >
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
            <div
              className={`bg-light-green rounded-full h-full
              ${sec === 11 && "w-11/12"}
              ${sec === 10 && "w-10/12"}
              ${sec === 9 && "w-9/12"}
              ${sec === 8 && "w-8/12"}
              ${sec === 7 && "w-7/12"}
              ${sec === 6 && "w-6/12"}
              ${sec === 5 && "w-5/12"}
              ${sec === 4 && "w-4/12"}
              ${sec === 3 && "w-3/12"}
              ${sec === 2 && "w-2/12"}
              ${sec === 1 && "w-1/12"}
              ${sec === 0 && "w-0"}`}
            ></div>
            시간: {sec}
          </div>
          {/* time end */}
          {/* Hint start */}
          {sec < 8 && (
            <div>
              <button
                value={gameLists[`${num}`]?.question}
                onClick={onClickHint}
                className="bg-light-orange flex rounded-lg m-5 relative left-24"
              >
                <HandRaisedIcon className="h-9 h-8" />
                <p className="py-2 px-1 font-bold">Hint!</p>
              </button>
            </div>
          )}

          {/* Hint end */}

          <div className="relative z-1">
            <div className="rounded-lg bg-light-green p-2 neumorph-1 text-center font-bold text-gray-800 mt-5">
              <div className="bg-white p-5" name="korean">
                다음 단어와 맞는 영단어를 고르시오
                <div className="bg-light-beige text-lg">
                  {gameLists[`${num}`]?.question}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div>
                {/* quiz answer start */}
                {/* {console.log(gameLists[`${num}`]?.answer)} */}

                <button
                  value="1"
                  onClick={onClickAnswer}
                  className={`w-full bg-light-beige p-2 rounded-lg mb-3 relative`}
                >
                  <div className="rounded-lg font-bold flex ">
                    <div className="bg-white p-3 rounded-lg">1</div>
                    <div
                      id="point"
                      className="flex items-center pl-10 w-full text-lg"
                      value={gameLists[`${num}`]?.answer}
                    >
                      {gameLists[`${num}`]?.choices[0]}

                      {answers[0] ? (
                        <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
                          <p className="transform -rotate-45 text-black text-lg">
                            +10
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </button>

                <button
                  value="2"
                  onClick={onClickAnswer}
                  className={`w-full bg-light-beige p-2 rounded-lg mb-3 relative`}
                >
                  <div className="rounded-lg font-bold flex ">
                    <div className="bg-white p-3 rounded-lg">2</div>
                    <div
                      id="point"
                      className="flex items-center pl-10 w-full text-lg"
                      value={gameLists[`${num}`]?.answer}
                    >
                      {gameLists[`${num}`]?.choices[1]}

                      {answers[1] ? (
                        <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
                          <p className="transform -rotate-45 text-black text-lg">
                            +10
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </button>

                <button
                  value="3"
                  onClick={onClickAnswer}
                  className={`w-full bg-light-beige p-2 rounded-lg mb-3 relative`}
                >
                  <div className="rounded-lg font-bold flex ">
                    <div className="bg-white p-3 rounded-lg">3</div>
                    <div
                      id="point"
                      className="flex items-center pl-10 w-full text-lg"
                      value={gameLists[`${num}`]?.answer}
                    >
                      {gameLists[`${num}`]?.choices[2]}

                      {answers[2] ? (
                        <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
                          <p className="transform -rotate-45 text-black text-lg">
                            +10
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </button>

                <button
                  value="4"
                  onClick={onClickAnswer}
                  className={`w-full bg-light-beige p-2 rounded-lg mb-3 relative`}
                >
                  <div className="rounded-lg font-bold flex ">
                    <div className="bg-white p-3 rounded-lg">4</div>
                    <div
                      id="point"
                      className="flex items-center pl-10 w-full text-lg"
                      value={gameLists[`${num}`]?.answer}
                    >
                      {gameLists[`${num}`]?.choices[3]}

                      {answers[3] ? (
                        <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
                          <p className="transform -rotate-45 text-black text-lg">
                            +10
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </button>

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
