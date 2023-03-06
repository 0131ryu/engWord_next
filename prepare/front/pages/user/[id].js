import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";

import { loadUserPostsRequest } from "../../redux/feature/postSlice";
import {
  loadMyInfoRequest,
  loadUserRequest,
} from "../../redux/feature/userSlice";
import wrapper from "../../redux/store";

const Navbar = dynamic(import("../../components/Navbar"));
const PostCard = dynamic(import("../../components/post/PostCard"));
const UserInfo = dynamic(import("../../components/UserInfo"));

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const { userInfo, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadUserPostsRequest(lastId, id));
    }
  }, [hasMorePosts, loadPostsLoading, mainPosts, id]);

  const onGoSNS = useCallback(() => {
    router.push("/post");
  }, []);

  return (
    <Navbar>
      <Head>
        <title>{`title ${userInfo?.nickname}님의 작성 게시글`}</title>
        <meta name="description" content={`${userInfo?.content}`} />
        <meta
          property="og:title"
          content={`${userInfo?.nickname}님의 작성 게시글`}
        />
        <meta property="og:description" content={userInfo?.content} />
        <meta property="og:image" content="https://engword.shop/favicon.ico" />
        <meta property="og:url" content={`https://engword.shop/user/${id}`} />
      </Head>

      <div className="h-full mt-5">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <UserInfo />
          </div>
          <div className="col-span-2">
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

    context.store.dispatch(loadUserPostsRequest(context.params.id));
    context.store.dispatch(loadMyInfoRequest());

    context.store.dispatch(loadUserRequest(context.params.id));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default User;
