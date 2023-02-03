import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookmarkRequest,
  likePostRequest,
  retweetRequest,
  unbookmarkRequest,
  unlikePostRequest,
} from "../../redux/feature/postSlice";
import {
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as SolidHeartIcon,
  BookmarkIcon as SolidBookmarkIcon,
} from "@heroicons/react/24/solid";

const PostCardBar = ({ post, postId }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);

  const liked = post?.Likers?.find((v) => v.id === id);
  const bookmark = post?.Bookmarks?.find((v) => v.id === id);

  const onLike = useCallback(() => {
    dispatch(likePostRequest(postId));
  }, [postId]);

  const onUnLike = useCallback(() => {
    dispatch(unlikePostRequest(postId));
  }, [postId]);

  const onRetweet = useCallback(() => {
    dispatch(retweetRequest(postId));
  }, [postId]);

  const onBookmark = useCallback(() => {
    dispatch(bookmarkRequest(postId));
  }, [postId]);

  const onUnBookmark = useCallback(() => {
    dispatch(unbookmarkRequest(postId));
  }, [postId]);

  return (
    <div className="flex bg-gray-100 justify-between items-center w-full mb-2">
      <div className="flex item-center ml-3">
        <span className="flex mr-4">
          <button onClick={liked ? onUnLike : onLike}>
            {liked ? (
              <SolidHeartIcon className="h-6 w-6 cursor-pointer text-red-500 mt-0.5" />
            ) : (
              <HeartIcon className="h-6 w-6 cursor-pointer text-red-500 mt-0.5" />
            )}
          </button>

          <p className="mt-1">{post?.Likers?.length}</p>
        </span>
        <span className="flex mr-4">
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 mt-0.5" />
          <p className="mt-1">{post?.Comments?.length}</p>
        </span>
        <span className="flex mr-1">
          <ArrowPathRoundedSquareIcon
            onClick={onRetweet}
            className={`h-6 w-6 mt-0.5 cursor-pointer ${
              id && post?.RetweetId === null && post.UserId !== id
                ? "text-light-orange"
                : "text-black"
            }`}
          />
        </span>
      </div>
      <div className="float:right mr-3">
        <span>
          <button onClick={bookmark ? onUnBookmark : onBookmark}>
            {bookmark ? (
              <SolidBookmarkIcon className="h-6 w-6 mt-1 cursor-pointer text-light-green" />
            ) : (
              <BookmarkIcon className="h-6 w-6 mt-1 cursor-pointer text-light-green" />
            )}
          </button>
        </span>
      </div>
    </div>
  );
};

export default PostCardBar;
