import { Fragment, useRef, useState, createRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { createPopper } from "@popperjs/core";
import useInput from "../../hooks/useInput";
import { BookOpenIcon } from "@heroicons/react/24/outline";

const typesName = [{ name: "easy" }, { name: "middle" }, { name: "advance" }];

const SearchResultModal = ({ korean, setModalSearch, setResultModal }) => {
  const dispatch = useDispatch();

  const { searchResult } = useSelector((state) => state.word);

  console.log(searchResult);

  const [open, setOpen] = useState(true);
  //popperjs/core 이용
  const [popoverShow, setPopoverShow] = useState(false);
  const btnRef = createRef();
  const popoverRef = createRef();

  const onOpenCloseModal = () => {
    setModalSearch(false);
    setResultModal(false);
  };

  const openPopover = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "bottom",
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };

  const cancelButtonRef = useRef(null);

  return (
    <>
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light-green sm:mx-0 sm:h-10 sm:w-10">
                        <BookOpenIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          검색 결과
                        </Dialog.Title>
                        <div className="w-96 mt-2">
                          {searchResult.map((result, index) => {
                            if (result.length > 1) {
                              return (
                                <div>
                                  <p className="mb-2 bg-gray-300 rounded-lg w-32 relative left-32 md:left-28 md:text-center">
                                    중복된 단어
                                  </p>
                                  {result.map((word, i) => {
                                    return (
                                      <div className="flex bg-gray-100">
                                        <p className="items-center">
                                          english: &nbsp; {result[i].english}
                                          &nbsp; | &nbsp;
                                        </p>
                                        <p>type : {result[i].type}</p>
                                      </div>
                                    );
                                  })}

                                  <div className="flex">
                                    <p className="mt-3 ml-3 font-bold">한글</p>
                                    <input
                                      readOnly
                                      placeholder={result[index].korean}
                                      type="text"
                                      name="korean"
                                      className="sm:600 w-80 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-lg m-2"
                                    />
                                  </div>
                                  <div className="flex">
                                    <p className="mt-3 ml-3 font-bold">영어</p>
                                    <input
                                      readOnly
                                      placeholder={result[index].english}
                                      type="text"
                                      name="english"
                                      className="sm:600 w-80 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-lg m-2"
                                    />
                                  </div>
                                  <div className="flex">
                                    <p className="mt-3 ml-3 font-bold">타입</p>
                                    <input
                                      readOnly
                                      placeholder={result[index].type}
                                      type="text"
                                      name="type"
                                      className="sm:600 w-80 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-lg m-2"
                                    />
                                  </div>
                                </div>
                              );
                            } else if (result.length === 0) {
                              return (
                                <div>
                                  <p>검색 결과가 없습니다.</p>
                                </div>
                              );
                            } else {
                              return (
                                <>
                                  <div className="flex">
                                    <p className="mt-3 ml-3 font-bold">한글</p>
                                    <input
                                      readOnly
                                      placeholder={result[index].korean}
                                      type="text"
                                      name="korean"
                                      className="sm:600 w-80 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-lg m-2"
                                    />
                                  </div>
                                  <div className="flex">
                                    <p className="mt-3 ml-3 font-bold">영어</p>
                                    <input
                                      readOnly
                                      placeholder={result[index].english}
                                      type="text"
                                      name="english"
                                      className="sm:600 w-80 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-lg m-2"
                                    />
                                  </div>
                                  <div className="flex">
                                    <p className="mt-3 ml-3 font-bold">타입</p>
                                    <input
                                      readOnly
                                      placeholder={result[index].type}
                                      type="text"
                                      name="type"
                                      className="sm:600 w-80 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-lg m-2"
                                    />
                                  </div>
                                </>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-light-green px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-dark-green hover:text-white  sm:ml-3 sm:w-auto sm:text-sm"
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
