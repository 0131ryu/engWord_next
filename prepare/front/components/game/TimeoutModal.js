import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { addScoreRequest } from "../../redux/feature/gameSlice";
import { useDispatch } from "react-redux";

const TimeoutModal = ({ score }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const cancelButtonRef = useRef(null);
  const router = useRouter();

  const onGoProfile = useCallback(() => {
    router.push("/profile");
  }, []);

  const onAddResultGame = useCallback(() => {
    if (showResult === false) {
      dispatch(addScoreRequest({ score: score }));
      setShowResult(true);
    } else {
      alert("이미 저장되었습니다!");
    }
  }, [showResult]);

  const onRestartGame = useCallback(() => {
    if (showResult) {
      window.location.reload();
    } else {
      alert("결과를 저장해주세요!");
    }
  }, [showResult]);

  const onOpenCloseModal = useCallback(() => {
    if (showResult) {
      setOpen(!open);
      router.push("/");
    } else {
      alert("결과를 저장해주세요!");
    }
  }, [showResult]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => setOpen(true)}
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
                <div className="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4모">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FaceFrownIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="dark:text-white text-lg font-medium leading-6 text-gray-900"
                      >
                        시간이 초과되었습니다.
                      </Dialog.Title>
                      <div className="mt-2 flex">
                        <p className="text-lg font-bold">
                          총 점수 :
                          <span className="text-red-600 ml-3">{score}</span>
                        </p>
                        {showResult ? (
                          <button
                            type="button"
                            className="dark:text-black ml-5 w-32 justify-center rounded-md border border-transparent bg-light-orange px-4 py-2 text-base font-medium shadow-sm hover:bg-light-orange focus:outline-none focus:ring-2 focus:ring-light-orange focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onGoProfile}
                          >
                            게임 결과들 보기
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="dark:text-black ml-5 w-32 justify-center rounded-md border border-transparent bg-light-orange px-4 py-2 text-base font-medium shadow-sm hover:bg-light-orange focus:outline-none focus:ring-2 focus:ring-light-orange focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onAddResultGame}
                          >
                            결과 저장
                          </button>
                        )}
                      </div>
                      {showResult ? (
                        <p className="mt-2 text-red-500">
                          결과가 저장되었습니다!
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onRestartGame}
                  >
                    다시 시작
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onOpenCloseModal}
                    ref={cancelButtonRef}
                  >
                    단어장으로 돌아가기
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

export default TimeoutModal;
