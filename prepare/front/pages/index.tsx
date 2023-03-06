import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { projects as projectsData } from "../data";
import Navbar from "../components/Navbar";

import { loadMyInfoRequest } from "../redux/feature/userSlice";
import {
  loadAdvanceWordsRequest,
  loadEasyWordsRequest,
  loadMiddleWordsRequest,
  loadWordsRequest,
} from "../redux/feature/wordSlice";
import {
  BookmarkIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import ProjectCard from "../components/ProjectCard";
import ProjectTitle from "../components/ProjectTitle";

const Home = () => {
    const [projects, setProjects] = useState(projectsData)
    const [show, setShow] = useState<number | null>(1);
//   const dispatch = useDispatch();
//   const { me } = useSelector((state) => state.user);

//   console.log("me", me);

  return (
    <>
      <Navbar>
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
        {/* <section className="bg-white dark:bg-gray-900"> */}
        <section className="bg-white">
          <div className="max-w-screen-xl px-4 py-8 mx-auto ">
            <div className="max-w-screen-sm mx-auto mb-8 text-center lg:mb-16">
              <h2 className="mt-6 text-3xl text-dark-green lg:text-4xl">
                <span className="font-bold">engWord</span>
                에서
                <span className="ml-2 font-bold">영어 단어, 공부합시다!</span>
              </h2>
              <p className="font-light text-gray-500 sm:text-xl">
                영어단어를 만들고 sns에 다른 사람들과 공유하고
              </p>
              <p className="font-light text-gray-500 sm:text-xl">
                game으로 단어를 외워봅시다
              </p>
            </div>
            {/* steps */}
            <ol className="grid w-full grid-cols-3 gap-4 p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border rounded-lg shadow-sm place-items-center border-light-green sm:text-base sm:p-4 sm:space-x-4">
                {projects.map((project) => (
                    <ProjectTitle project={project} show={show} setShow={setShow} key={project.id} />
                ))}
            </ol>
            <div className="mt-5">
              {projects.map((project) => (
                <ProjectCard project={project} show={show} setShow={setShow} key={project.id}/>
              ))}
            </div>
          </div>
        </section>
      </Navbar>
    </>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   async (context) => {
//     const cookie = context.req ? context.req.headers.cookie : "";
//     axios.defaults.headers.Cookie = "";
//     if (context.req && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }

//     console.log("cookie", cookie);

//     context.store.dispatch(loadMyInfoRequest());
//     if (cookie !== undefined) {
//       context.store.dispatch(loadWordsRequest());
//       context.store.dispatch(loadEasyWordsRequest());
//       context.store.dispatch(loadMiddleWordsRequest());
//       context.store.dispatch(loadAdvanceWordsRequest());
//     }

//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
//   }
// );

export default Home;
