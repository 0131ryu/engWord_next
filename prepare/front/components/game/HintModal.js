import { Fragment, useEffect, useRef, useState, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { searchWordRequest } from "../../redux/feature/wordSlice";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import SearchResultModal from "../word/SearchResultModal";
import axios from "axios";

const typesName = [{ name: "easy" }, { name: "middle" }, { name: "advance" }];

const HintModal = ({ setModal, korean }) => {
  const [resultEnglish, setResultEnglish] = useState([]);
  const [resultEnglishDfn, setResultEnglishDfn] = useState([]);
  const [resultExEnglish, setResultExEnglish] = useState([]);
  const [resultExEnglishDfn, setResultExEnglishDfn] = useState([]);

  const [resultModal, setResultModal] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    async function result() {
      const response = await axios.get(`http://localhost:8000/word/${korean}`);
      const { english, english_dfn, ex_english, ex_english_dfn } =
        response.data;

      setResultEnglish(english);
      setResultEnglishDfn(english_dfn);
      if (
        ex_english === "중복된 단어는 없습니다." &&
        ex_english_dfn === "중복된 뜻은 없습니다."
      ) {
        setResultExEnglish("");
        setResultExEnglishDfn("");
      } else {
        setResultExEnglish(ex_english);
        setResultExEnglishDfn(ex_english_dfn);
      }
    }

    result();
  }, []);

  const onOpenCloseModal = () => {
    setModal(false);
  };
  const cancelButtonRef = useRef(null);

  return (
    <>
      {/* 검색 결과창 */}
      {resultModal ? (
        <SearchResultModal
          word={word}
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light-orange sm:mx-0 sm:h-10 sm:w-10">
                        <LightBulbIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Hint
                        </Dialog.Title>
                        <div className="w-96">
                          <div>
                            <div className="relative left-16 grid grid-rows-2 grid-flow-col gap-2 place-content-center w-64">
                              <div className="mt-1">
                                <span className="font-bold">{korean}</span>과
                                뜻이 비슷한 영어 단어
                              </div>
                              <div className="flex">
                                <div
                                  className={`w-full text-center bg-light-beige rounded-md font-bold`}
                                >
                                  {resultEnglish}
                                </div>
                                {resultExEnglish && (
                                  <div className="ml-2 bg-light-beige rounded-md font-bold">
                                    {resultExEnglish}
                                  </div>
                                )}
                              </div>
                            </div>
                            {resultEnglish && resultEnglishDfn && (
                              <>
                                <p className="mt-2 font-bold">
                                  {resultEnglish} 뜻
                                </p>
                                <p>{resultEnglishDfn}</p>
                              </>
                            )}
                            {resultExEnglish && resultEnglishDfn && (
                              <>
                                <p className="mt-2 font-bold">
                                  {resultExEnglish} 뜻
                                </p>
                                <p>{resultExEnglishDfn}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-light-orange px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-dark-green hover:text-white  sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onOpenCloseModal}
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
    </>
  );
};

export default HintModal;
