import axios from "axios";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarForm from "../components/NavbarForm";
import WordForm from "../components/word/WordForm";

import { END } from "redux-saga";
import wrapper from "../redux/store";

import { loadMyInfoRequest } from "../redux/feature/userSlice";
import {
  loadAdvanceWordsRequest,
  loadEasyWordsRequest,
  loadMiddleWordsRequest,
  loadWordsRequest,
} from "../redux/feature/wordSlice";
import WordChart from "../components/word/WordChart";
import WordItem from "../components/word/WordItem";
import { useInView } from "react-intersection-observer";
import WordCheckbox from "../components/word/WordCheckbox";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const {
    addWordError,
    loadWordsError,
    easyWordLists,
    middleWordLists,
    advanceWordLists,
    hasMoreEasy,
    hasMoreMiddle,
    hasMoreAdvance,
    loadEasyWordsLoading,
    loadMiddleWordsLoading,
    loadAdvanceWordsLoading,
    wordLists,
  } = useSelector((state) => state.word);
  const [refAdvance, inViewAdvance] = useInView();
  const [refEasy, inViewEasy] = useInView();
  const [refMiddle, inViewMiddle] = useInView();

  useEffect(() => {
    if (inViewEasy && hasMoreEasy && !loadEasyWordsLoading) {
      const lastId = easyWordLists[easyWordLists.length - 1]?.id;
      dispatch(loadEasyWordsRequest(lastId));
    }
  }, [inViewEasy, hasMoreEasy, loadEasyWordsLoading, easyWordLists]);

  useEffect(() => {
    if (inViewMiddle && hasMoreMiddle && !loadMiddleWordsLoading) {
      const lastId = middleWordLists[middleWordLists.length - 1]?.id;
      dispatch(loadMiddleWordsRequest(lastId));
    }
  }, [inViewMiddle, hasMoreMiddle, loadMiddleWordsLoading, middleWordLists]);

  useEffect(() => {
    if (inViewAdvance && hasMoreAdvance && !loadAdvanceWordsLoading) {
      const lastId = advanceWordLists[advanceWordLists.length - 1]?.id;
      dispatch(loadAdvanceWordsRequest(lastId));
    }
  }, [
    inViewAdvance,
    hasMoreAdvance,
    loadAdvanceWordsLoading,
    advanceWordLists,
  ]);

  const easyLength = wordLists.filter((d) => d.type === "easy").length;
  const middleLength = wordLists.filter((d) => d.type === "middle").length;
  const advanceLength = wordLists.filter((d) => d.type === "advance").length;

  useEffect(() => {
    easyLength, middleLength, advanceLength;
  }, []);

  useEffect(() => {
    if (addWordError) {
      alert(addWordError);
    }
  }, [addWordError]);

  useEffect(() => {
    if (loadWordsError) {
      alert(loadWordsError);
    }
  }, [loadWordsError]);

  return (
    <>
      <NavbarForm>
        <Head>
          <title>{`engWord에서 영어 단어, 만들어 봅시다!`}</title>
          <meta
            name="description"
            content={`engWord에서 영어단어를 만들고, sns에 공유하고 게임을 즐기세요!`}
          />
          <meta
            property="og:title"
            content={`engWord에서 영어 단어, 만들어 봅시다!`}
          />
          <meta
            property="og:description"
            content="engWord에서 영어단어를 만들고, sns에 공유하고 게임을 즐기세요!"
          />
          <meta
            property="og:image"
            content="https://engword.shop/favicon.ico"
          />
          <meta property="og:url" content={`https://engword.shop/`} />
        </Head>
        <WordForm UserId={me?.id} />
        <WordCheckbox me={me} />

        {(easyLength !== 0 || middleLength !== 0 || advanceLength !== 0) &&
          me?.id && (
            <div className="flex justify-center relative bottom-10">
              <WordChart
                easyLength={easyLength}
                middleLength={middleLength}
                advanceLength={advanceLength}
              />
            </div>
          )}

        <div className="lg:w-full relative">
          <div className="h-max mx-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-1">
            {/* Easy start */}
            <div className="bg-gray-100 group relative rounded-lg p-3 lg:w-80 lg:ml-10">
              <div className="bg-white overflow-y-auto max-h-96 aspect-w-1 aspect-h-1 overflow-hidden w-full shadow-lg shadow-black-500/40 rounded-md">
                <div className={`${easyLength > 0 ? "h-full" : "h-40"}`}>
                  <h1 className="text-slate-900 font-medium px-3 pt-2">
                    🥉 Easy
                  </h1>
                </div>

                {me?.id ? (
                  easyWordLists.map((word, index) => {
                    return <WordItem key={word.id} word={word} index={index} />;
                  })
                ) : (
                  <div className="relative bottom-20 sm:600">
                    <div className="bg-gray-100 h-3/5 rounded mx-1 flex py-5 mt-1 h-20">
                      <div className="w-full mt-3 text-center h-10">
                        <p className="text-sm font-bold text-slate-900">
                          단어는 로그인 후 입력 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  ref={
                    hasMoreEasy && !loadEasyWordsLoading ? refEasy : undefined
                  }
                  className="h-5"
                />
              </div>
            </div>
            {/* Easy end */}
            {/* Middle start */}
            <div className="bg-gray-100 group relative rounded-lg p-3 lg:w-80 lg:ml-10">
              <div className="bg-white overflow-y-auto max-h-96 aspect-w-1 aspect-h-1 overflow-hidden w-full shadow-lg shadow-black-500/40 rounded-md">
                <div className={`${middleLength > 0 ? "h-full" : "h-40"}`}>
                  <h1 className="text-slate-900 font-medium px-3 pt-2">
                    🥈 Middle
                  </h1>
                </div>

                {me ? (
                  middleWordLists.map((word, index) => {
                    return (
                      <>
                        <WordItem key={word.id} word={word} index={index} />
                      </>
                    );
                  })
                ) : (
                  <div className="relative bottom-20 sm:600">
                    <div className="bg-gray-100 h-3/5 rounded mx-1 flex py-5 mt-1 h-20">
                      <div className="w-full mt-3 text-center h-10">
                        <p className="text-sm font-bold text-slate-900">
                          단어는 로그인 후 입력 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  ref={
                    hasMoreMiddle && !loadMiddleWordsLoading
                      ? refMiddle
                      : undefined
                  }
                  className="h-5"
                />
              </div>
            </div>
            {/* Middle end */}
            {/* Advance start */}
            <div className="bg-gray-100 group relative rounded-lg p-3 lg:w-80 lg:ml-10">
              <div className="bg-white overflow-y-auto max-h-96 aspect-w-1 aspect-h-1 overflow-hidden w-full shadow-lg shadow-black-500/40 rounded-md">
                <div className={`${advanceLength > 0 ? "h-full" : "h-40"}`}>
                  <h1 className="text-slate-900 font-medium px-3 pt-2">
                    🥇 Advance
                  </h1>
                </div>
                {me ? (
                  advanceWordLists.map((word, index) => {
                    return (
                      <>
                        <WordItem key={word.id} word={word} index={index} />
                      </>
                    );
                  })
                ) : (
                  <div className="relative bottom-20 sm:600">
                    <div className="bg-gray-100 h-3/5 rounded mx-1 flex py-5 mt-1 h-20">
                      <div className="w-full mt-3 text-center h-10">
                        <p className="text-sm font-bold text-slate-900">
                          단어는 로그인 후 입력 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  ref={
                    hasMoreAdvance && !loadAdvanceWordsLoading
                      ? refAdvance
                      : undefined
                  }
                  className="h-5"
                />
              </div>
            </div>
            {/* Advance end */}
          </div>
        </div>
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
      context.store.dispatch(loadWordsRequest());
      context.store.dispatch(loadEasyWordsRequest());
      context.store.dispatch(loadMiddleWordsRequest());
      context.store.dispatch(loadAdvanceWordsRequest());
    }

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
