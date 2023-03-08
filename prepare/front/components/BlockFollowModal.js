import React, {
  useEffect,
  Fragment,
  useRef,
  useState,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition, Popover } from "@headlessui/react";
import { UserPlusIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import {
  cancleBlockRequest,
  loadBlockedRequest,
  loadBlockingRequest,
} from "../redux/feature/userSlice";

const BlockFollowModal = ({ setBlockFollowModal, blockInfo }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    dispatch(loadBlockedRequest());
    dispatch(loadBlockingRequest());
    console.log("blockInfo", blockInfo);
  }, []);

  const onCancleBlock = useCallback(
    (id) => () => {
      dispatch(cancleBlockRequest(id));
    },
    []
  );

  const onOpenCloseModal = useCallback(() => {
    console.log("open", open);
    setBlockFollowModal(false);
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
                <div className="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10">
                      <NoSymbolIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="dark:text-white text-lg mt-1 font-medium leading-6 text-gray-900"
                      >
                        차단한 목록
                      </Dialog.Title>
                      {/* 팔로잉 목록 start */}

                      <div className="mt-3 w-96 p-4 border rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="dark:text-white text-xl font-bold leading-none text-gray-900">
                            차단한 사람 수 : {blockInfo.length}
                          </h5>
                        </div>
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="divide-y divide-gray-200 dark:divide-gray-700"
                          >
                            <li className="py-3">
                              {blockInfo.map((block) => {
                                return (
                                  <div
                                    key={block.id}
                                    className="mt-3 flex items-center space-x-4"
                                  >
                                    <div className="flex-shrink-0">
                                      <img
                                        className="ml-2 w-8 h-8 rounded-full"
                                        src={`userImg/${block.profileImg}`}
                                        alt="Neil image"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {block.nickname}
                                      </p>
                                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {block.email}
                                      </p>
                                    </div>
                                    <button
                                      onClick={onCancleBlock(block.id)}
                                      className="bg-red-500 hover:bg-white  rounded inline-flex items-center text-base font-semibold text-gray-900"
                                    >
                                      <p className="text-white hover:text-red-500">
                                        취소
                                      </p>
                                    </button>
                                  </div>
                                );
                              })}
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* 팔로잉 목록 end */}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default BlockFollowModal;
