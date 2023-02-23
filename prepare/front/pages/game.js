import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { useInView } from "react-intersection-observer";
import { END } from "redux-saga";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";

import { loadMyInfoRequest } from "../redux/feature/userSlice";
import {
  loadCheckedRequest,
  loadWordListsRequest,
} from "../redux/feature/wordSlice";
import wrapper from "../redux/store";
import GameCheckbox from "../components/game/GameCheckbox";
import GameForm from "../components/game/GameForm";
import AlertModal from "../components/game/AlertModal";
import { startGameRequest } from "../redux/feature/gameSlice";
import { useRouter } from "next/router";
import AlertLogin from "../components/AlertLogin";

const StartWordList = dynamic(import("../components/game/StartWordList"));
const LoginForm = dynamic(import("../components/LoginForm"));
const StartModal = dynamic(import("../components/game/StartModal"));
const NavbarForm = dynamic(import("../components/NavbarForm"));

const game = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector((state) => state.user);
  const { wordLists, checkedWordList, hasMoreWords, loadWordsLoading } =
    useSelector((state) => state.word);
  const [ref, inView] = useInView();
  const [open, setOpen] = useState(true);
  const [gameStart, setGameStart] = useState(false);
  const [alert, setAlert] = useState(false);
  const checkedData = [...checkedWordList];
  const allData = [...wordLists];
  const answer = [1, 2, 3, 4];

  const result = [];

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (me && inView && hasMoreWords && !loadWordsLoading) {
      const lastId = wordLists[wordLists.length - 1]?.id;
      dispatch(loadWordListsRequest(lastId));
    }
  }, [inView, hasMoreWords, wordLists, loadWordsLoading]);

  useEffect(() => {
    dispatch(loadWordListsRequest());
    dispatch(loadCheckedRequest());
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
        checkedData.map((data) => {
          shuffleArray(answer);
          const allDataLists = [];
          if (answer[0] === 1) {
            allData.map((all) => {
              if (data.english !== all.english && data.korean !== all.korean) {
                allDataLists.push(all);
              }
            });

            result.push({
              question: data.korean,
              answer: 1,
              choices: Array.from(
                new Set([
                  data.english,
                  allDataLists[0].english,
                  allDataLists[1].english,
                  allDataLists[2].english,
                ])
              ),
            });
          } else if (answer[0] === 2) {
            allData.map((all) => {
              if (data.english !== all.english && data.korean !== all.korean) {
                allDataLists.push(all);
              }
            });

            result.push({
              question: data.korean,
              answer: 2,
              choices: Array.from(
                new Set([
                  allDataLists[0].english,
                  data.english,
                  allDataLists[1].english,
                  allDataLists[2].english,
                ])
              ),
            });
          } else if (answer[0] === 3) {
            allData.map((all) => {
              if (data.english !== all.english && data.korean !== all.korean) {
                allDataLists.push(all);
              }
            });

            result.push({
              question: data.korean,
              answer: 3,
              choices: Array.from(
                new Set([
                  allDataLists[0].english,
                  allDataLists[1].english,
                  data.english,
                  allDataLists[2].english,
                ])
              ),
            });
          } else if (answer[0] === 4) {
            allData.map((all) => {
              if (data.english !== all.english && data.korean !== all.korean) {
                allDataLists.push(all);
              }
            });
            result.push({
              question: data.korean,
              answer: 4,
              choices: Array.from(
                new Set([
                  allDataLists[0].english,
                  allDataLists[1].english,
                  allDataLists[2].english,
                  data.english,
                ])
              ),
            });
          }
        });
      }
      dispatch(startGameRequest(result));
      setGameStart(true);
      setOpen(false);
    }
  }, [result]);

  const onOpenCloseModal = useCallback(() => {
    setOpen(false);
    router.push("/");
  }, []);

  return (
    <>
      <NavbarForm>
        <Head>
          <title>{`등록한 영어단어로 게임을 즐겨보세요!`}</title>
          <meta
            name="description"
            content={`engWord에서 만든 영어단어로 자신의 실력을 검증해볼까요?`}
          />
          <meta
            property="og:title"
            content={`등록한 영어단어로 게임을 즐겨보세요!`}
          />
          <meta
            property="og:description"
            content="engWord에서 만든 영어단어로 자신의 실력을 검증해볼까요?"
          />
          <meta
            property="og:image"
            content="https://engword.shop/favicon.ico"
          />
          <meta property="og:url" content={`https://engword.shop/game`} />
        </Head>
        {alert ? (
          <AlertModal setAlert={setAlert} words={checkedWordList.length} />
        ) : null}
        {!me && <AlertLogin />}
        {me && gameStart ? (
          <GameForm />
        ) : (
          me && (
            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={() => setOpen(true)}
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
                      {me?.id && (
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
                                  <span className="font-bold text-red-500">
                                    10개
                                  </span>
                                  의 단어가&nbsp;
                                  <span className="font-bold">랜덤</span>으로
                                  진행됩니다.
                                  <p className="text-xs">
                                    (
                                    <span className="font-bold text-red-500">
                                      선택하지 않은 단어는 게임에서 제외됩니다.
                                    </span>
                                    )
                                  </p>
                                  <GameCheckbox
                                    UserId={me?.id}
                                    checkedWordList={checkedWordList}
                                    wordLists={wordLists}
                                  />
                                </Dialog.Title>
                                <div className="bg-gray-200 relative right-12 w-[450px] overflow-y-auto max-h-96 overflow-hidden rounded-md">
                                  {wordLists.map((word, index) => {
                                    {
                                      return (
                                        <>
                                          <StartWordList
                                            word={word}
                                            index={index}
                                            key={index}
                                          />
                                          <div
                                            ref={
                                              hasMoreWords && !loadWordsLoading
                                                ? ref
                                                : undefined
                                            }
                                            className="h-1"
                                          />
                                        </>
                                      );
                                    }
                                  })}
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
                      )}
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          )
        )}
      </NavbarForm>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch(loadMyInfoRequest());
    if (cookie !== undefined) {
      context.store.dispatch(loadWordListsRequest());
    }

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default game;
