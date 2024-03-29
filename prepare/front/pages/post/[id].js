import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";

import { loadPostRequest } from "../../redux/feature/postSlice";
import { loadMyInfoRequest } from "../../redux/feature/userSlice";
import wrapper from "../../redux/store";

const Navbar = dynamic(import("../../components/Navbar"));
const PostCard = dynamic(import("../../components/post/PostCard"));

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { me } = useSelector((state) => state.user);
  const { singlePost } = useSelector((state) => state.post);

  const onGoSNS = useCallback(() => {
    router.push("/post");
  }, []);

  return (
    <Navbar>
      <Head>
        <title>{`title ${singlePost?.User.nickname}님의 글`}</title>
        <meta name="description" content={`${singlePost?.content}`} />
        <meta
          property="og:title"
          content={`${singlePost?.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost?.content} />
        <meta
          property="og:image"
          content={
            singlePost?.Images[0]
              ? singlePost?.Images[0].src
              : "https://engword.shop/favicon.ico"
          }
        />
        <meta property="og:url" content={`https://engword.shop/post/${id}`} />
      </Head>

      <div className="h-full mt-5">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1"></div>
          <div className="col-span-2">
            <div className="flex justify-center">
              <button
                onClick={onGoSNS}
                className="px-3 py-2 font-medium text-white rounded-lg bg-light-green hover:bg-light-beige hover:text-black"
              >
                게시글로 돌아가기
              </button>
            </div>
            <PostCard post={singlePost} me={me} routerQueryId={id} />
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

    context.store.dispatch(loadMyInfoRequest());
    context.store.dispatch(loadPostRequest(context.params.id)); //단일 게시글 불러올 것
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
