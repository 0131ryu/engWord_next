import { Fragment, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { addScoreRequest } from "../../redux/feature/gameSlice";

const EndModal = ({ score }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const router = useRouter();
  const cancelButtonRef = useRef(null);

  const onAddResultGame = useCallback(() => {
    console.log("showResult", showResult);
    if (showResult === false) {
      dispatch(addScoreRequest({ score: score }));
      setShowResult(true);
    } else {
      alert("이미 저장되었습니다!");
    }
  }, []);

  const onRestartGame = () => {
    window.location.reload();
  };

  const onOpenCloseModal = () => {
    setOpen(!open);
    router.push("/");
  };
  return (
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
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-dark-green sm:mx-0 sm:h-10 sm:w-10">
                      <FaceSmileIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        모든 게임을 완료하였습니다.
                      </Dialog.Title>
                      <div className="mt-2 flex">
                        <p className="text-lg font-bold">
                          총 점수 :
                          <span className="text-dark-green ml-1">{score}</span>
                        </p>
                        <button
                          type="button"
                          className="ml-5 w-32 justify-center rounded-md border border-transparent bg-light-orange px-4 py-2 text-base font-medium shadow-sm hover:bg-light-orange focus:outline-none focus:ring-2 focus:ring-light-orange focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={onAddResultGame}
                        >
                          결과 저장
                        </button>
                      </div>
                      {showResult ? (
                        <p className="mt-2 text-red-500">
                          결과가 저장되었습니다!
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-dark-green px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-dark-green focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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

export default EndModal;
