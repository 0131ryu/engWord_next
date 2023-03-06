import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { useInView } from "react-intersection-observer";

import { loadHashtagPostsRequest } from "../../redux/feature/postSlice";
import { loadMyInfoRequest } from "../../redux/feature/userSlice";
import wrapper from "../../redux/store";

const Navbar = dynamic(import("../../components/Navbar"));
const PostCard = dynamic(import("../../components/post/PostCard"));
const PostSearch = dynamic(import("../../components/post/PostSearch"));

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;

  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const { me } = useSelector((state) => state.user);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadHashtagPostsRequest({ lastId: lastId, data: tag }));
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts, tag]);

  const onGoSNS = useCallback(() => {
    router.push("/post");
  }, []);

  return (
    <Navbar>
      <Head>
        <title>{`#${tag}로 찾은 게시글`}</title>
        <meta name="description" content={`${tag}`} />
        <meta property="og:title" content={`#${tag}로 찾은 게시글`} />
        <meta property="og:description" content={tag} />
        <meta property="og:image" content="https://engword.shop/favicon.ico" />
        <meta
          property="og:url"
          content={`https://engword.shop/hashtag/${tag}`}
        />
      </Head>

      <div className="h-full mt-5">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1 ">
            <div className="p-2 ml-2 text-center bg-gray-100 rounded-lg shadow shadow-black-500/40">
              <div className="flex bg-white rounded-lg place-content-center">
                <div className="ml-1 ">
                  <p className="p-1 mt-1 font-bold">
                    <span className="text-sky-500 lg:text-lg">#{tag}</span> 결과
                  </p>
                </div>
              </div>
            </div>
            <PostSearch />
          </div>
          <div className="col-span-2 p-2 bg-gray-100 rounded-lg">
            <div className="flex justify-center">
              <button
                onClick={onGoSNS}
                className="px-3 py-2 font-medium text-white rounded-lg bg-light-green hover:bg-light-beige hover:text-black"
              >
                게시글로 돌아가기
              </button>
            </div>
            {mainPosts.map((post, index) => {
              return <PostCard key={index} post={post} index={index} me={me} />;
            })}
            <div
              ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
              className="h-10"
            />
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
    </Navbar>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch(
      loadHashtagPostsRequest({ data: context.params.tag })
    );
    context.store.dispatch(loadMyInfoRequest());

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Hashtag;
