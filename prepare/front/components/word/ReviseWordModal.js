import { Fragment, useRef, useState, useCallback } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { reviseWordRequest } from "../../redux/feature/wordSlice";
import {
  ArrowsRightLeftIcon,
  ArrowDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const typesName = [{ name: "easy" }, { name: "middle" }, { name: "advance" }];

const ReviseWordModal = ({ isId, setModal, showEng, showKor }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(typesName[0]);

  const type = selected.name;
  const { wordLists } = useSelector((state) => state.word);

  const [english, onChangeEnglish, setEnglish] = useInput("");
  const [korean, onChangeKorean, setKorean] = useInput("");

  const onReviseWordSubmit = useCallback(() => {
    setModal(false);
    // setType(selected.name);
    console.log(english, korean, type, isId);
    // dispatch(reviseWordRequest({ id: isId, english, korean, type }));

    if (!english && !korean) {
      dispatch(
        reviseWordRequest({ id: isId, english: showEng, korean: showKor, type })
      );
    } else {
      dispatch(reviseWordRequest({ id: isId, english, korean, type }));
    }
  }, [type]);

  const onOpenCloseModal = () => {
    console.log("open", open);
    setModal(false);
  };
  const cancelButtonRef = useRef(null);

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
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-light-green sm:mx-0 sm:h-10 sm:w-10">
                      <ArrowsRightLeftIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        단어 수정
                      </Dialog.Title>
                      <div className="flex w-96">
                        <div>
                          <input
                            onChange={onChangeEnglish}
                            placeholder={`${wordLists[isId].english}`}
                            // value={wordLists[isId].english}
                            type="text"
                            name="english"
                            className="sm:600 w-52 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-9  placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-full m-2"
                          />
                          <input
                            onChange={onChangeKorean}
                            placeholder={`${wordLists[isId].korean}`}
                            // value={wordLists[isId].korean}
                            type="text"
                            name="korean"
                            className="sm:600 w-52 grid grid-cols-2 gap-4 place-content-center
                          pl-2 h-9  placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-full m-2"
                          />
                        </div>
                        <div className="ml-10 mt-2">
                          <Listbox value={selected} onChange={setSelected}>
                            <div className="relative ">
                              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-2 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border-2 border-light-green">
                                <span className="block">{selected.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ArrowDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {typesName.map((t, typeIdx) => (
                                    <Listbox.Option
                                      key={typeIdx + 1}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-2 pr-4 ${
                                          active
                                            ? "bg-light-orange rounded-lg text-black"
                                            : "text-gray-900"
                                        }`
                                      }
                                      value={t}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block ${
                                              selected
                                                ? "font-medium"
                                                : "font-normal"
                                            }`}
                                            name={t.name}
                                          >
                                            {t.name}
                                          </span>
                                          {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                              <CheckIcon
                                                className="h-5 w-5 ml-11"
                                                aria-hidden="false"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </Listbox>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-light-green px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onReviseWordSubmit}
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
  );
};

export default ReviseWordModal;
