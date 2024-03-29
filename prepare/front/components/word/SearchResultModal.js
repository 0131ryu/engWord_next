import { Fragment, useRef, useState, createRef, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { createPopper } from "@popperjs/core";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const SearchResultModal = ({ word, setModalSearch, setResultModal }) => {
  const { searchResult, removeWordComplete } = useSelector(
    (state) => state.word
  );
  const [open, setOpen] = useState(true);
  //popperjs/core 이용
  const [popoverShow, setPopoverShow] = useState(false);
  const btnRef = createRef();
  const popoverRef = createRef();

  const onOpenCloseModal = useCallback(() => {
    setModalSearch(false);
    setResultModal(false);
  }, []);

  const openPopover = useCallback(() => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "bottom",
    });
    setPopoverShow(true);
  }, []);

  const closePopover = useCallback(() => {
    setPopoverShow(false);
  }, []);

  const cancelButtonRef = useRef(null);

  return (
    <>
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light-green sm:mx-0 sm:h-10 sm:w-10">
                        <BookOpenIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="dark:text-white text-lg font-medium leading-6 text-gray-900"
                        >
                          <span className="text-light-orange font-bold">
                            "{word}"
                          </span>
                          의 검색 결과
                        </Dialog.Title>

                        <div className="w-96 mt-2 font-bold">
                          {searchResult === null && (
                            <div>검색 결과가 없습니다!</div>
                          )}

                          {removeWordComplete ? (
                            <p>
                              <span className="text-red-500 font-bold">
                                {searchResult[0].english}
                              </span>
                              (이/가) 삭제되었습니다.
                            </p>
                          ) : (
                            searchResult?.length === 1 &&
                            searchResult.map((result, index) => {
                              return (
                                <>
                                  <div className="bg-gray-100 dark:bg-gray-500 rounded-lg">
                                    <div className="flex">
                                      <p className="mt-3 ml-3 font-bold w-9">
                                        한글
                                      </p>
                                      <input
                                        readOnly
                                        placeholder={result.korean}
                                        type="text"
                                        name="korean"
                                        className="sm:600 w-80 lg:w-96 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 shadow-lg shadow-black-500/40 rounded-full m-2 m-2 dark:bg-white dark:text-black"
                                      />
                                    </div>
                                    <div className="flex">
                                      <p className="mt-3 ml-3 font-bold w-9">
                                        영어
                                      </p>
                                      <input
                                        readOnly
                                        placeholder={result.english}
                                        type="text"
                                        name="english"
                                        className="sm:600 w-80 lg:w-96 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 shadow-lg shadow-black-500/40 rounded-full m-2 m-2 dark:bg-white dark:text-black"
                                      />
                                    </div>
                                    <div className="flex">
                                      <p className="mt-3 ml-3 font-bold w-9">
                                        타입
                                      </p>
                                      <input
                                        readOnly
                                        placeholder={result.type}
                                        type="text"
                                        name="type"
                                        className="sm:600 w-80 lg:w-96 grid grid-cols-2 gap-4 place-content-center
                                      pl-2 h-8 shadow-lg shadow-black-500/40 rounded-full m-2 m-2  dark:bg-white dark:text-black"
                                      />
                                    </div>
                                  </div>
                                </>
                              );
                            })
                          )}

                          {removeWordComplete ||
                            (searchResult?.length > 1 && (
                              <>
                                <button
                                  onClick={() => {
                                    popoverShow
                                      ? closePopover()
                                      : openPopover();
                                  }}
                                  className="mb-2 text-gray-500 bg-gray-300 rounded-lg w-32 lg:relative lg:left-32 "
                                >
                                  중복된 단어
                                </button>
                                {popoverShow
                                  ? searchResult.map((result) => {
                                      return (
                                        <div className="flex mb-2 justify-center ">
                                          <p>
                                            한글: &nbsp;
                                            <span className="font-bold">
                                              {result.korean}
                                            </span>
                                            &nbsp; | &nbsp;
                                          </p>
                                          <p>
                                            영어: &nbsp;{" "}
                                            <span className="font-bold">
                                              {result.english}
                                            </span>
                                            &nbsp; | &nbsp;
                                          </p>
                                          <p>
                                            타입 :{" "}
                                            <span className="font-bold">
                                              {result.type}{" "}
                                            </span>
                                          </p>
                                        </div>
                                      );
                                    })
                                  : null}
                                <div className="bg-gray-100 rounded-lg">
                                  <div className="flex">
                                    <p className="mt-3 ml-3 font-bold w-10">
                                      한글
                                    </p>
                                    <input
                                      readOnly
                                      placeholder={searchResult[0].korean}
                                      type="text"
                                      name="korean"
                                      className="sm:600 w-80 lg:w-96 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 shadow-lg shadow-black-500/40 rounded-full m-2 m-2"
                                    />
                                  </div>
                                  <div className="flex">
                                    <p className="mt-3 ml-3 w-10 font-bold w-10">
                                      영어
                                    </p>
                                    <input
                                      readOnly
                                      placeholder={searchResult[0].english}
                                      type="text"
                                      name="english"
                                      className="sm:600 w-80 lg:w-96 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 shadow-lg shadow-black-500/40 rounded-full m-2 m-2"
                                    />
                                  </div>
                                  <div className="flex">
                                    <p className="mt-3 ml-3 font-bold w-10">
                                      타입
                                    </p>
                                    <input
                                      readOnly
                                      placeholder={searchResult[0].type}
                                      type="text"
                                      name="type"
                                      className="sm:600 w-80 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 shadow-lg shadow-black-500/40 rounded-full m-2 m-2"
                                    />
                                  </div>
                                </div>
                              </>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full text-white justify-center rounded-md border border-transparent bg-light-green px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-dark-green hover:text-white  sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onOpenCloseModal}
                    >
                      종료하기
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SearchResultModal;
