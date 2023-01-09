import { Fragment, useEffect, useRef, useState, createRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { createPopper } from "@popperjs/core";
import useInput from "../../hooks/useInput";
import { addWordRequest, findWordRequest } from "../../redux/feature/wordSlice";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";

const typesName = [{ name: "easy" }, { name: "middle" }, { name: "advance" }];

const FindResultModal = ({ korean, setModal, setResultModal }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  //popperjs/core 이용
  const [popoverShow, setPopoverShow] = useState(false);
  const btnRef = createRef();
  const popoverRef = createRef();

  const { wordLists, findResult } = useSelector((state) => state.word);

  // console.log("wordLists", wordLists);

  const [english, onChangeEnglish, setEnglish] = useInput("");
  const [type, onChangeType, setType] = useInput(typesName[0]);

  const [resultEng, setResultEng] = useState("");
  const [resultExEnglish, setResultExEnglish] = useState([]);
  const splitEnglish = [];

  useEffect(() => {
    setResultEng(findResult[0]?.english);
    setResultExEnglish(findResult[0]?.ex_english);
  }, [findResult]);

  const onFindResultSubmit = useCallback(
    (e) => {
      setModal(false);
      setResultModal(false);
      //; 포함?
      if (resultEng.includes(";")) {
        const splitEnglish = resultEng?.split("; ");
        splitEnglish.map((eng) => {
          const english = eng;
          dispatch(
            addWordRequest({
              english,
              korean,
              type,
            })
          );
        });
      } else {
        const english = resultEng;
        dispatch(
          addWordRequest({
            english,
            korean,
            type,
          })
        );
      }
    },
    [english, korean, type]
  );

  const onOpenCloseModal = () => {
    setModal(false);
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light-orange sm:mx-0 sm:h-10 sm:w-10">
                        <DocumentMagnifyingGlassIcon
                          className="h-6 w-6 text-black"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          검색 결과
                          {/* 다른 단어들 start */}
                          {/* <div className="ml-20"> */}
                          <button
                            className={
                              "ml-2 w-16 h-8 bg-light-beige text-black active:bg-light-orange font-bold text-xs rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            }
                            type="button"
                            onClick={() => {
                              popoverShow ? closePopover() : openPopover();
                            }}
                            ref={btnRef}
                          >
                            다른 결과
                          </button>
                          <div
                            className={
                              (popoverShow ? "" : "hidden ") +
                              "bg-light-beige border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
                            }
                            ref={popoverRef}
                          >
                            <div className="mr-10">
                              <div
                                className={
                                  "bg-light-beige text-black opacity-75 font-semibold p-3 mb-0 border-b border-solid border-black uppercase rounded-t-lg"
                                }
                              >
                                {resultEng}의 다른 단어
                                <p className="text-xs">
                                  (단어 클릭 시 네이버 사전으로 이동)
                                </p>
                              </div>
                              {/* {resultExEnglish.map((eng, i) => {
                                console.log("eng", eng);
                                console.log("i", i);
                              })} */}
                              <a
                                href={`https://en.dict.naver.com/#/search?query=${resultExEnglish}&range=all`}
                                target="_blank"
                              >
                                <span className="text-dark-green font-bold hover:text-light-orange ml-2 mb-2">
                                  {}
                                </span>
                              </a>
                            </div>
                          </div>
                          {/* </div> */}
                          {/* 다른 단어들 end */}
                          <p className="text-xs">
                            (한국어기초사전 오픈 API 사용)
                          </p>
                        </Dialog.Title>
                        <div className="w-96">
                          <div className="flex">
                            <p className="mt-3 ml-3 font-bold">한글</p>
                            <input
                              // onChange={onChangeKorean}
                              readOnly
                              placeholder={korean}
                              type="text"
                              name="korean"
                              className="sm:600 w-80 lg:w-96 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-lg m-2"
                            />
                          </div>
                          <div className="flex">
                            <p className="mt-3 ml-3 font-bold">영어</p>
                            <input
                              onChange={onChangeEnglish}
                              placeholder={resultEng}
                              value={resultEng}
                              type="text"
                              name="english"
                              className="sm:600 w-80 lg:w-96 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-8 placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-lg m-2"
                            />
                          </div>
                          <div className="flex bg-gray-100">
                            <p className="mt-3 ml-3 font-bold">타입</p>
                            <div className="flex items-center">
                              {typesName.map((type) => (
                                <>
                                  <input
                                    id={type.name}
                                    name="type"
                                    value={type.name}
                                    onChange={onChangeType}
                                    type="radio"
                                    className="ml-3 mt-3 h-4 w-4 border-gray-300 text-dark-green focus:ring-dark-green"
                                  />
                                  <label
                                    htmlFor="easy"
                                    className="ml-3 mt-2 block text-sm font-medium text-gray-700"
                                  >
                                    {type.name}
                                  </label>
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      value={resultEng}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-light-orange px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-dark-green hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onFindResultSubmit}
                    >
                      단어 추가
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-dark-green focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default FindResultModal;
