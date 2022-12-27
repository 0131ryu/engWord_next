import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";
import {
  changeStatusWordRequest,
  loadWordsRequest,
} from "../../redux/feature/wordSlice";
import { startGameRequest } from "../../redux/feature/gameSlice";
import GameForm from "./GameForm";
import AlertModal from "./AlertModal";

const typesName = [{ name: "easy" }, { name: "middle" }, { name: "advance" }];

const StartModal = ({ isId, setModal }) => {
  const { wordLists, checkedWordList } = useSelector((state) => state.word);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [gameStart, setGameStart] = useState(false);
  const [alert, setAlert] = useState(false);
  const checkedData = [...checkedWordList];
  const allData = [...wordLists];
  const numbers = [1, 2, 3, 4];
  const result = [];

  useEffect(() => {
    loadWordsRequest();
  }, []);

  const onStartGame = useCallback(() => {
    if (checkedWordList.length < 10) {
      console.log("10개 미만!");
      setAlert(true);
      setGameStart(false);
      setOpen(true);
    } else {
      const remainderData = allData.filter((data) => data.status === "A");
      const remainderEnglish = [];
      const remainderIndex = [];

      remainderData.map((data, i) => {
        remainderEnglish.push(data.english);
        remainderIndex.push(i);
        // remainderIndex(0, 5);
      });

      remainderIndex.splice(0, 5);

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          // 무작위로 index 값 생성 (0 이상 i 미만)
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };

      shuffleArray(remainderEnglish);
      shuffleArray(remainderIndex);

      checkedData.map((data, i) => {
        shuffleArray(numbers); //랜덤 1, 2, 3, 4
        const randomIdx1 = remainderIndex[0];
        const randomIdx2 = remainderIndex[1];
        const randomIdx3 = remainderIndex[2];
        if (numbers[0] === 1) {
          result.push({
            question: data.korean,
            answer: 1,
            choices: [
              data.english,
              remainderEnglish[randomIdx1],
              remainderEnglish[randomIdx2],
              remainderEnglish[randomIdx3],
            ],
          });
        } else if (numbers[0] === 2) {
          result.push({
            question: data.korean,
            answer: 2,
            choices: [
              remainderEnglish[randomIdx1],
              data.english,
              remainderEnglish[randomIdx2],
              remainderEnglish[randomIdx3],
            ],
          });
        } else if (numbers[0] === 3) {
          result.push({
            question: data.korean,
            answer: 3,
            choices: [
              remainderEnglish[randomIdx1],
              remainderEnglish[randomIdx2],
              data.english,
              remainderEnglish[randomIdx3],
            ],
          });
        } else if (numbers[0] === 4) {
          result.push({
            question: data.korean,
            answer: 4,
            choices: [
              remainderEnglish[randomIdx1],
              remainderEnglish[randomIdx2],
              remainderEnglish[randomIdx3],
              data.english,
            ],
          });
        }
      });
      // console.log("checkedData", checkedData);
      console.log("result", result);

      dispatch(startGameRequest(result));
      setGameStart(true);
      setOpen(false);
      console.log("gameStart", gameStart);
    }
  }, [result]);

  const onOpenCloseModal = () => {
    console.log("open", open);
    setOpen(false);
  };
  const cancelButtonRef = useRef(null);

  const onClickSelected = useCallback((e) => {
    const checkboxClicked = e.target;
    const wordIndex = e.target.value;

    if (checkboxClicked.checked) {
      dispatch(changeStatusWordRequest({ id: wordIndex, status: "C" }));
    } else if (!checkboxClicked.checked) {
      dispatch(changeStatusWordRequest({ id: wordIndex, status: "A" }));
    }
  }, []);

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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light-orange sm:mx-0 sm:h-10 sm:w-10">
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
                          <span className="font-bold">체크한 영단어&nbsp;</span>
                          중<span className="font-bold text-red-500">10개</span>
                          의&nbsp;
                          <span className="font-bold">랜덤 게임</span>이
                          진행됩니다.
                          <p className="text-xs">
                            (
                            <span className="font-bold text-red-500">제외</span>
                            를 누를 경우,
                            <span className="font-bold text-red-500">
                              게임에서 제외됩니다.
                            </span>
                            )
                          </p>
                          <p>
                            총 추가된 단어 :
                            <span className="font-bold text-red-500 ml-3">
                              {checkedWordList.length}
                            </span>
                          </p>
                        </Dialog.Title>
                        <div className="group justify-center flex overflow-y-auto max-h-96 overflow-hidden rounded-md">
                          <div>
                            {wordLists.map((word, index) => {
                              {
                                return (
                                  <div className="m-1 flex border-2 border-light-green h-12 w-80 rounded-md">
                                    <input
                                      onClick={onClickSelected}
                                      value={index}
                                      id="checkItem"
                                      name="checkItem"
                                      type="checkbox"
                                      className="ml-2 mt-3 h-4 w-4 rounded border-light-green text-light-green focus:ring-light-green"
                                    />
                                    <li className="my-2.5 flex">
                                      <div className="flex ml-2">
                                        <p className="text-sm font-medium text-slate-900  w-32 truncate">
                                          ({index}) {word.english} (
                                          {word.status})
                                        </p>
                                        <p className="ml-3 text-sm font-medium text-slate-900 w-32 truncate">
                                          뜻: {word.korean}
                                        </p>
                                      </div>
                                    </li>
                                  </div>
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
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-light-orange px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-dark-green hover:text-white  sm:ml-3 sm:w-auto sm:text-sm"
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
                      취소
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default StartModal;
