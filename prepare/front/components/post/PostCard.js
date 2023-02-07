import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import { revisePostRequest } from "../../redux/feature/postSlice";
import { Popover, Transition } from "@headlessui/react";

import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import RemovePostModal from "./RemovePostModal";
import PostCardContent from "./PostCardContent";
import { followRequest, unfollowRequest } from "../../redux/feature/userSlice";
import PostImages from "./PostImages";
import { useRouter } from "next/router";
import moment from "moment";
import "moment/locale/ko";
import PostCardBar from "./PostCardBar";
import { backUrl } from "../../config/config";

const PostCard = ({ post, index, me, routerQueryId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [removeModal, setRemoveModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const id = me?.id;
  const isFollowing = me?.Followings.find((v) => v.id === post.User?.id);
  const blockingLists = me?.Blockings;
  const blockedLists = me?.Blockeds;

  const onClickRevise = useCallback(
    (e) => {
      setEditMode(true);
    },
    [id]
  );

  const onRevisePost = useCallback(
    (editText) => () => {
      const routerQueryId = post.id;
      dispatch(revisePostRequest({ routerQueryId, editText }));
      setEditMode(false);
    },
    [id]
  );

  const onCancleRevisePost = useCallback(() => {
    setEditMode(false);
  }, []);

  const onRemovePost = useCallback(() => {
    setRemoveModal(true);
  }, []);

  const onClickFollow = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowRequest(post.User.id));
    } else {
      dispatch(followRequest(post.User.id));
    }
  }, [isFollowing]);

  const onPostDetail = useCallback(() => {
    router.push(`/post/${post.id}`);
  }, []);

  return (
    <>
      {/* 삭제 포스트 모달창 */}
      {removeModal ? (
        <RemovePostModal postId={post.id} setRemoveModal={setRemoveModal} />
      ) : null}

      {/* card start */}
      <section className="flex justify-center">
        <article className="bg-white overflow-hidden w-full my-3 shadow shadow-black-500/40 rounded-md">
          <header className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center font-bold">
              <span className="mr-2">
                <Link href={`/user/${post?.UserId}`}>
                  {post?.User?.profileImg === "" ||
                  post?.User?.profileImg === null ? (
                    <img
                      alt="profile-img"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      className="h-8 w-8 rounded-full cursor-pointer"
                    />
                  ) : (
                    <>
                      <img
                        className="h-8 w-8 rounded-full cursor-pointer"
                        src={`http://${backUrl}/userImg/${post.User?.profileImg}`}
                        alt={post.User?.profileImg}
                      />
                    </>
                  )}
                </Link>
              </span>

              <span>{post?.User?.nickname}</span>

              {id === undefined ? null : blockingLists &&
                blockingLists?.find((block) => block.id === post.UserId) ? (
                <div className="ml-2 bg-gray-100 rounded w-20">차단한 유저</div>
              ) : (
                <button
                  onClick={onClickFollow}
                  className={`ml-2 ${
                    isFollowing ? "bg-red-500" : "bg-light-green"
                  } rounded w-20 text-white ${
                    isFollowing
                      ? "hover:bg-light-beige hover:text-red-500"
                      : "hover:bg-light-beige hover:text-light-green"
                  }  `}
                >
                  {id === post?.UserId ? null : (
                    <p className="text-sm">
                      {isFollowing ? "언팔로우" : "팔로우"}
                    </p>
                  )}
                </button>
              )}
            </div>
            <div className="float-right">
              {editMode ? null : (
                <Popover>
                  <>
                    <Popover.Button className="rounded-md px-3 py-2 text-base">
                      <div>
                        {id === post?.UserId ? (
                          <EllipsisHorizontalIcon className="h-9 w-9" />
                        ) : null}
                      </div>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="z-50 absolute mt-1 w-16 h-10">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="bg-light-beige p-1">
                            {post?.RetweetId ? null : (
                              <button
                                value={index}
                                onClick={onClickRevise}
                                className="flow-root rounded-md w-full p-1 transition duration-150 ease-in-out hover:bg-light-orange "
                              >
                                수정
                              </button>
                            )}

                            <button
                              onClick={onRemovePost}
                              className="flow-root rounded-md w-full p-1 transition duration-150 ease-in-out hover:bg-red-500 hover:text-white"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                </Popover>
              )}
            </div>
          </header>
          {blockedLists &&
          blockedLists.find((block) => block.id === post?.UserId) ? (
            <p className="ml-3 p-2 text-red-500">게시글을 볼 수 없습니다.</p>
          ) : post?.RetweetId && post?.Retweet ? (
            <>
              <p className="ml-5">
                {post?.RetweetId
                  ? `${post?.User.nickname}님이 리트윗하셨습니다.`
                  : null}
              </p>
              <section className="flex justify-center">
                <article className="border-solid border-2 border-gray-200 overflow-hidden w-11/12 my-3 shadow shadow-black-500/40 rounded-md">
                  <header className="px-4 py-3 flex">
                    <div className="flex items-center font-bold"></div>
                    <span className="mr-2">
                      <img
                        alt="profile-img"
                        src={`http://${backUrl}/userImg/${post.Retweet.User.profileImg}`}
                        className="h-8 w-8 rounded-full"
                      />
                    </span>
                    <span className="mr-2 mt-2 font-bold">
                      {post?.Retweet.User.nickname}
                    </span>
                  </header>

                  <PostCardContent
                    retweetId={post.id}
                    images={post?.Retweet.Images}
                    editMode={editMode}
                    onCancleRevisePost={onCancleRevisePost}
                    onRevisePost={onRevisePost}
                    content={post.Retweet.content}
                    index={index}
                  />

                  {editMode ? null : (
                    <div className="m-10">
                      <PostImages images={post?.Retweet.Images} />
                    </div>
                  )}
                </article>
              </section>
              <small
                className={`text-gray-400 m-5 float-right ${
                  routerQueryId ? null : "cursor-pointer"
                }`}
                onClick={routerQueryId ? null : onPostDetail}
              >
                {moment(post?.createdAt).fromNow()}
              </small>
            </>
          ) : (
            <>
              <PostCardContent
                images={post?.Images}
                id={post?.id}
                editMode={editMode}
                onCancleRevisePost={onCancleRevisePost}
                onRevisePost={onRevisePost}
                content={post?.content}
                index={index}
                routerQueryId={routerQueryId}
              />
              {editMode ? null : (
                <div className="m-10">
                  <PostImages images={post?.Images} />
                </div>
              )}
              <small className="text-gray-400 m-5 float-right ml-2">
                <p
                  className={`text-center ${
                    routerQueryId ? null : "cursor-pointer"
                  }`}
                  onClick={routerQueryId ? null : onPostDetail}
                >
                  {moment(post?.createdAt).fromNow()}
                </p>
              </small>
            </>
          )}

          <PostCardBar post={post} postId={post.id} />

          {/* CommentCard start */}
          {post?.Comments?.map((comment) => {
            return <CommentCard comment={comment} key={comment.id} />;
          })}
          {me && (
            <div className="flex">
              {me.profileImg === "" || me.profileImg === null ? (
                <img
                  alt="profile-img"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  className="h-8 w-8 rounded-full mt-6 mx-1"
                />
              ) : (
                <img
                  className="h-8 w-8 rounded-full mt-6 mx-1"
                  src={`http://${backUrl}/userImg/${me.profileImg}`}
                  alt={me.profileImg}
                />
              )}
              <CommentForm post={post} />
            </div>
          )}
        </article>
      </section>

      {/* card end */}
    </>
  );
};

export default PostCard;
