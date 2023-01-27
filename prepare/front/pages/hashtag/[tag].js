import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";

import NavbarForm from "../../components/NavbarForm";
import PostCard from "../../components/post/PostCard";
import UserInfo from "../../components/UserInfo";
import {
  loadHashtagPostsRequest,
  loadUserPostsRequest,
} from "../../redux/feature/postSlice";
import {
  loadMyInfoRequest,
  loadUserRequest,
} from "../../redux/feature/userSlice";
import wrapper from "../../redux/store";

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;

  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadUserPostsRequest(lastId, tag));
    }
  }, [hasMorePosts, loadPostsLoading, mainPosts, tag]);

  const onGoSNS = useCallback(() => {
    router.push("/post");
  }, []);

  return (
    <NavbarForm>
      <Head>
        {/* <title>{`title ${userInfo?.nickname}님의 작성 게시글`}</title>
        <meta name="description" content={`${userInfo?.content}`} />
        <meta
          property="og:title"
          content={`${userInfo?.nickname}님의 작성 게시글`}
        />
        <meta property="og:description" content={userInfo?.content} />
        <meta property="og:image" content="https://engword.shop/favicon.ico" />
        <meta property="og:url" content={`https://engword.shop/post/${id}`} /> */}
      </Head>

      <div className="h-full mt-5">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className=" text-center ml-2 shadow shadow-black-500/40 rounded-xl">
              <div className="md:flex lg:flex">
                <div className="ml-1">
                  <p className="font-bold p-1 mt-1 lg:mt-5">
                    <span className="text-sky-500">#{tag}</span> 결과
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex justify-center">
              <button
                onClick={onGoSNS}
                className="px-3 py-2 font-medium rounded-lg bg-light-green text-white hover:bg-light-beige hover:text-black"
              >
                게시글로 돌아가기
              </button>
            </div>
            {mainPosts.map((post, index) => {
              return <PostCard key={index} post={post} index={index} me={me} />;
            })}
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

    context.store.dispatch(loadHashtagPostsRequest(context.params.tag));
    context.store.dispatch(loadMyInfoRequest());

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Hashtag;