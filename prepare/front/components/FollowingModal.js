import React, {
  useEffect,
  Fragment,
  useRef,
  useState,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { UsersIcon } from "@heroicons/react/24/outline";
import {
  loadFollowingsRequest,
  unfollowRequest,
} from "../redux/feature/userSlice";

const FollowingModal = ({ setFollowingModal, followingsInfo }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    dispatch(loadFollowingsRequest());
  }, []);

  const onClickUnFollow = useCallback(
    (id) => () => {
      dispatch(unfollowRequest(id));
    },
    []
  );

  const onOpenCloseModal = useCallback(() => {
    console.log("open", open);
    setFollowingModal(false);
    setOpen(!open);
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onOpenCloseModal}
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
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light-orange sm:mx-0 sm:h-10 sm:w-10">
                      <UsersIcon className="h-6 w-6 " aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg mt-1 font-medium leading-6 text-gray-900"
                      >
                        팔로잉 목록
                      </Dialog.Title>
                      <div className="mt-3 w-96 p-4 border rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-xl font-bold leading-none text-gray-900">
                            팔로잉 수 : {followingsInfo.length}
                          </h5>
                        </div>
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="divide-y divide-gray-200 dark:divide-gray-700"
                          >
                            <li className="py-3">
                              {followingsInfo.map((following) => {
                                return (
                                  <div
                                    key={following.id}
                                    className="flex items-center space-x-4"
                                  >
                                    <div className="flex-shrink-0">
                                      <img
                                        className="ml-2 w-8 h-8 rounded-full"
                                        src={`http://${following.profileImg}`}
                                        alt="Neil image"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {following.nickname}
                                      </p>
                                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {following.email}
                                      </p>
                                    </div>
                                    <button
                                      onClick={onClickUnFollow(following.id)}
                                      className="bg-red-500 hover:bg-white rounded inline-flex items-center text-base font-semibold text-gray-900"
                                    >
                                      <p className="text-white hover:text-red-500">
                                        언팔로우
                                      </p>
                                    </button>
                                  </div>
                                );
                              })}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-light-orange"
                    onClick={onOpenCloseModal}
                    ref={cancelButtonRef}
                  >
                    닫기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FollowingModal;
