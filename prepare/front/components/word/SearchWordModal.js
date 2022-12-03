import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { searchWordRequest } from "../../redux/feature/wordSlice";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import SearchResultModal from "./SearchResultModal";

const typesName = [{ name: "easy" }, { name: "middle" }, { name: "advance" }];

const SearchWordModal = ({ setModalSearch }) => {
  const dispatch = useDispatch();
  const [resultModal, setResultModal] = useState(false);
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(typesName[0]);

  const [english, onChangeKorean, setKorean] = useInput("");

  const type = selected.name;

  const onSearchWordSubmit = () => {
    setResultModal(true);
    if (!english) {
      setResultModal(false);
    } else {
      dispatch(searchWordRequest(english));
    }
  };

  const onOpenCloseModal = () => {
    console.log("open", open);
    setModalSearch(false);
  };
  const cancelButtonRef = useRef(null);

  return (
    <>
      {/* 검색 결과창 */}
      {resultModal ? (
        <SearchResultModal
          english={english}
          setResultModal={setResultModal}
          setModalSearch={setModalSearch}
        />
      ) : null}

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
                          단어 찾기
                          <p className="text-xs">
                            (찾고자하는 단어를 입력하세요.)
                          </p>
                        </Dialog.Title>
                        <div className="flex w-96">
                          <div>
                            <input
                              onChange={onChangeKorean}
                              placeholder="영어 검색"
                              type="text"
                              name="english"
                              className="ml-8 lg:ml-0 sm:600 w-80 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-9  placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-full m-2"
                            />
                            {!english ? (
                              <p className="absolute inset-x-20 lg:inset-x-36 text-red-500">
                                영어 단어를 입력하지 않았습니다.
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-light-green px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-dark-green hover:text-white  sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onSearchWordSubmit}
                    >
                      검색
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onOpenCloseModal}
                      ref={cancelButtonRef}
                    >
                      취소
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

export default SearchWordModal;