import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";
import {
  loadWordsRequest,
  loadCheckedRequest,
  changeStatusWordAllRequest,
} from "../../redux/feature/wordSlice";
import { startGameRequest } from "../../redux/feature/gameSlice";
import GameForm from "./GameForm";
import AlertModal from "./AlertModal";
import StartWordList from "./StartWordList";
import AlertLoginModal from "../AletrtLoginModal";

const StartModal = ({ UserId }) => {
  const { wordLists, checkedWordList } = useSelector((state) => state.word);

  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [gameStart, setGameStart] = useState(false);
  const [alert, setAlert] = useState(false);
  const checkedData = [...checkedWordList];
  const allData = [...wordLists];
  const answer = [1, 2, 3, 4];
  const result = [];

  const showStatus = wordLists.filter(
    (word) => word.status === "C" && word.UserId === UserId
  ).length;

  useEffect(() => {
    dispatch(loadWordsRequest());
    dispatch(loadCheckedRequest());
  }, []);

  const onChangeAllSelected = useCallback((e) => {
    const checkboxClicked = e.target;
    const userId = e.target.value;

    if (checkboxClicked.checked) {
      dispatch(changeStatusWordAllRequest({ status: "C", userId: userId }));
    } else if (!checkboxClicked.checked) {
      dispatch(changeStatusWordAllRequest({ status: "A", userId: userId }));
    }
  }, []);

  const onStartGame = useCallback(() => {
    if (checkedWordList.length < 10) {
      setAlert(true);
      setGameStart(false);
      setOpen(true);
    } else {
      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          // 무작위로 index 값 생성 (0 이상 i 미만)
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
      shuffleArray(allData);
      shuffleArray(checkedData);
      checkedData.splice(10, checkedData.length); //10개만 남기기

      if (result.length !== 10) {
        checkedData.map((data, i) => {
          shuffleArray(answer);
          if (answer[0] === 1 && i < 10) {
            result.push({
              question: data.korean,
              answer: 1,
              choices: Array.from(
                new Set([
                  data.english,
                  allData[i]?.english,
                  allData[i + 1]?.english,
                  allData[i + 2]?.english,
                ])
              ),
            });
          } else if (answer[0] === 2 && i < 10) {
            result.push({
              question: data.korean,
              answer: 2,
              choices: Array.from(
                new Set([
                  allData[i]?.english,
                  data.english,
                  allData[i + 1]?.english,
                  allData[i + 2]?.english,
                ])
              ),
            });
          } else if (answer[0] === 3 && i < 10) {
            result.push({
              question: data.korean,
              answer: 3,
              choices: Array.from(
                new Set([
                  allData[i]?.english,
                  allData[i + 1]?.english,
                  data.english,
                  allData[i + 2]?.english,
                ])
              ),
            });
          } else if (answer[0] === 4 && i < 10) {
            result.push({
              question: data.korean,
              answer: 4,
              choices: Array.from(
                new Set([
                  allData[i]?.english,
                  allData[i + 1]?.english,
                  allData[i + 2]?.english,
                  data.english,
                ])
              ),
            });
          }
          if (result[i]?.choices.length < 4) {
            if (
              result[i]?.answer === 2 &&
              result[i]?.choices[1] !== data.english
            ) {
              console.log("답 2 index", i);
              console.log("답 2에 다른 값 있음");
              result.splice(i, 1, {
                question: data.korean,
                answer: 2,
                choices: [
                  data.english !== allData[i + 9]?.english &&
                    allData[i + 9]?.english,
                  data.english !== allData[i + 8]?.english &&
                    allData[i + 8]?.english,
                  data.english,
                ],
              });
            } else if (
              result[i]?.answer === 3 &&
              result[i]?.choices[2] !== data.english
            ) {
              console.log("답 3 index", i);
              console.log("답 3에 다른 값 있음");
              result.splice(i, 1, {
                question: data.korean,
                answer: 3,
                choices: [
                  data.english !== allData[i + 9]?.english &&
                    allData[i + 9]?.english,
                  data.english !== allData[i + 8]?.english &&
                    allData[i + 8]?.english,
                  data.english,
                ],
              });
            } else if (
              result[i]?.answer === 4 &&
              result[i]?.choices[4] !== data.english
            ) {
              console.log("답 4 index", i);
              console.log("답 4에 다른 값 있음");
              // result.splice(i, 1);
              // i--;
              console.log("결과는?", result[i].choices[4] === undefined); //3으로 답을 바꿔야 함
              if (result[i].choices[4] === undefined) {
                result.splice(i, 1, {
                  question: data.korean,
                  answer: 3,
                  choices: [
                    allData[i]?.english,
                    allData[i + 1]?.english,
                    data.english,
                  ],
                });
              }
            }
          }
        });
      }

      console.log("result", result);

      dispatch(startGameRequest(result));
      setGameStart(true);
      setOpen(false);
    }
  }, [result]);

  const onOpenCloseModal = () => {
    setOpen(false);
    router.push("/");
  };
  const cancelButtonRef = useRef(null);

  const onGoLogin = () => {
    router.push("/signin");
  };

  return (
    <>
      {alert ? (
        <AlertModal setAlert={setAlert} words={checkedWordList.length} />
      ) : null}
      {gameStart ? <GameForm /> : null}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                {UserId ? (
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light-orange text-white sm:mx-0 sm:h-10 sm:w-10">
                          <BookmarkSquareIcon
                            className="h-6 w-6 text-black"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-sm leading-6 text-gray-900"
                          >
                            <span className="font-bold">
                              체크한 영단어&nbsp;
                            </span>
                            중
                            <span className="font-bold text-red-500">10개</span>
                            의&nbsp;
                            <span className="font-bold">랜덤 게임</span>이
                            진행됩니다.
                            <p className="text-xs">
                              (
                              <span className="font-bold text-red-500">
                                제외
                              </span>
                              를 누를 경우,
                              <span className="font-bold text-red-500">
                                게임에서 제외됩니다.
                              </span>
                              )
                            </p>
                            <div className="flex">
                              <p className="w-1/2">
                                총 추가된 단어 :
                                <span className="font-bold text-red-500 ml-3">
                                  {checkedWordList.length}
                                </span>
                              </p>
                              <div className="w-1/2 bg-gray-100">
                                <input
                                  checked={showStatus > 0 ? true : false}
                                  onChange={onChangeAllSelected}
                                  value={UserId}
                                  name="checkItem"
                                  type="checkbox"
                                  className="mr-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="font-bold">
                                  전체 선택 / 해제
                                </span>
                              </div>
                            </div>
                          </Dialog.Title>
                          <div className="group justify-center flex overflow-y-auto max-h-96 overflow-hidden rounded-md">
                            <div>
                              {wordLists.map((word, index) => {
                                {
                                  return (
                                    <StartWordList word={word} index={index} />
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-light-orange text-white px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-dark-green hover:text-white  sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onStartGame}
                      >
                        시작!
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onOpenCloseModal}
                        ref={cancelButtonRef}
                      >
                        단어로 이동
                      </button>
                    </div>
                  </Dialog.Panel>
                ) : (
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <AlertLoginModal />
                  </Dialog.Panel>
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default StartModal;
