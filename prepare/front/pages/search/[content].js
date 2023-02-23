import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { useInView } from "react-intersection-observer";

import { loadSearchPostsRequest } from "../../redux/feature/postSlice";
import { loadMyInfoRequest } from "../../redux/feature/userSlice";
import wrapper from "../../redux/store";

const NavbarForm = dynamic(import("../../components/NavbarForm"));
const NonPostModal = dynamic(import("../../components/post/NonPostModal"));
const PostCard = dynamic(import("../../components/post/PostCard"));
const PostSearch = dynamic(import("../../components/post/PostSearch"));

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { content } = router.query;

  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const { me } = useSelector((state) => state.user);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadSearchPostsRequest({ lastId: lastId, data: content }));
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts, content]);

  const onGoSNS = useCallback(() => {
    router.push("/post");
  }, []);

  return (
    <NavbarForm>
      <Head>
        <title>{`#${content}로 찾은 게시글`}</title>
        <meta name="description" content={`${content}`} />
        <meta property="og:title" content={`#${content}로 찾은 게시글`} />
        <meta property="og:description" content={content} />
        <meta property="og:image" content="https://engword.shop/favicon.ico" />
        <meta
          property="og:url"
          content={`https://engword.shop/search/${content}`}
        />
      </Head>

      <div className="h-full mt-5">
        <div className="grid grid-cols-4 gap-6">
          {mainPosts.length > 0 ? (
            <div className="col-span-1">
              <div className="bg-gray-100 p-2 text-center ml-2 shadow shadow-black-500/40 rounded-lg">
                <div className="bg-white rounded-lg flex place-content-center">
                  <div className="ml-1">
                    <p className="font-bold p-1 mt-1">
                      <span className="text-light-orange lg:text-lg">
                        "{content}"
                      </span>{" "}
                      결과
                    </p>
                  </div>
                </div>
              </div>
              <PostSearch />
            </div>
          ) : null}

          <div className="col-span-2 bg-gray-100 p-2 rounded-lg">
            {mainPosts.length > 0 ? (
              <>
                <div className="flex justify-center">
                  <button
                    onClick={onGoSNS}
                    className="px-3 py-2 font-medium rounded-lg bg-light-green text-white hover:bg-light-beige hover:text-black"
                  >
                    게시글로 돌아가기
                  </button>
                </div>
                {mainPosts.map((post, index) => {
                  return (
                    <PostCard key={index} post={post} index={index} me={me} />
                  );
                })}
                <div
                  ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
                  className="h-10"
                />
              </>
            ) : (
              <NonPostModal content={content} />
            )}
          </div>

          <div className="col-span-1"></div>
        </div>
      </div>
    </NavbarForm>
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
      loadSearchPostsRequest({ data: context.params.content })
    );
    context.store.dispatch(loadMyInfoRequest());
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Search;
