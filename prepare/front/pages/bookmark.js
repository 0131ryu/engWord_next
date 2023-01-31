import { useRouter } from "next/router";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import AlertLoginModal from "../components/AletrtLoginModal";
import NavbarForm from "../components/NavbarForm";
import PostSearch from "../components/post/PostSearch";
import UserInfo from "../components/UserInfo";
import { loadPostsRequest } from "../redux/feature/postSlice";
import { loadMyInfoRequest } from "../redux/feature/userSlice";
import PostCardBookmark from "../components/post/PostCardBookmark";

const bookmark = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const { me, changeNicknameComplete, uploadProfileImageComplete } =
    useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, retweetError, unbookmarkComplete } =
    useSelector((state) => state.post);

  const cancelButtonRef = useRef(null);
  const id = useSelector((state) => state.user.me?.id);
  const postResult = mainPosts.filter((post) => post.UserId === id);

  const post = mainPosts.filter((v) => v.Bookmarks.length > 0);
  console.log("post", post);

  const onPost = useCallback(() => {
    router.push("/post");
  }, []);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    if (hasMorePosts) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsRequest(lastId));
    }
    if (changeNicknameComplete || uploadProfileImageComplete) {
      window.location.reload();
    }
    console.log("hello");
  }, [hasMorePosts, mainPosts, unbookmarkComplete]);

  return (
    <>
      <NavbarForm>
        {me ? (
          <div className="h-full mt-5">
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-1">
                <UserInfo />
                <div
                  className="bg-gray-100 ml-2 mt-2 rounded-xl"
                  onClick={onPost}
                >
                  <p className="rounded-xl text-gray-400 font-bold text-center cursor-pointer hover:text-light-orange">
                    게시글(sns)로 이동
                  </p>
                </div>
                <PostSearch />
              </div>
              <div className="col-span-2">
                {mainPosts.map((post, index) => {
                  return (
                    <PostCardBookmark
                      key={index}
                      post={post}
                      index={index}
                      me={me}
                    />
                  );
                })}
                {/*  <div className="text-red-500">
                    북마크한 게시글이 없습니다!
                  </div> */}
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
        ) : (
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <AlertLoginModal />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        )}
      </NavbarForm>
    </>
  );
};

export default bookmark;
