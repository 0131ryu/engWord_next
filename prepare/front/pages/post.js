import React from "react";
import { useSelector } from "react-redux";
import NavbarForm from "../components/NavbarForm";
import PostCard from "../components/post/PostCard";
import PostForm from "../components/post/postForm";
import PostSearch from "../components/post/PostSearch";
import UserInfo from "../components/UserInfo";

const post = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <>
      <NavbarForm />
      {/* <PostForm nickname={me?.nickname} id={me?.id} /> */}
      <div className="h-full mt-5">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            {me && <UserInfo nickname={me?.nickname} />}
          </div>
          <div className="col-span-2">
            {me && <PostForm />}
            {mainPosts.map((post, index) => {
              return <PostCard key={post.id} post={post} index={index} />;
            })}
          </div>
          <div className="col-span-1">
            <PostSearch />
          </div>
        </div>
      </div>
    </>
  );
};

export default post;
