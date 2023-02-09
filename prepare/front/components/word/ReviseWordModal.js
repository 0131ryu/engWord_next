import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import {
  ArrowsRightLeftIcon,
  ArrowDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const typesName = [{ name: "easy" }, { name: "middle" }, { name: "advance" }];

const ReviseWordModal = ({
  setEditMode,
  editMode,
  onChangeReviseWord,
  setModal,
  showEng,
  showKor,
  showType,
}) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(typesName[0]);
  const [editKor, setEditKor] = useState(showKor);
  const [editEng, setEditEng] = useState(showEng);

  const type = selected.name;

  useEffect(() => {
    console.log("showEng", showEng);
    console.log("showKor", showKor);
    console.log("showType", showType);
    if (showType === "middle") {
      setSelected(typesName[1]);
    } else if (showType === "advance") {
      setSelected(typesName[2]);
    }
  }, []);

  const onChangeEnglish = useCallback(
    (e) => {
      setEditEng(e.target.value);
    },
    [showEng]
  );

  const onChangeKorean = useCallback((e) => {
    setEditKor(e.target.value);
  }, []);

  const onOpenCloseModal = useCallback(() => {
    setModal(false);
  }, []);

  const onBackEdit = useCallback(() => {
    setEditMode(true);
  }, []);

  const cancelButtonRef = useRef(null);

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
                        {editMode ? <p>단어 수정</p> : <p>수정 완료</p>}
                      </Dialog.Title>
                      {editMode ? (
                        <>
                          <div className="flex bg-gray-100 rounded-lg py-1 mt-1">
                            <div>
                              <textarea
                                onChange={onChangeEnglish}
                                rows="1"
                                className="sm:600 w-52 grid grid-cols-2 gap-4 place-content-center
                                pl-2 h-7 shadow-lg shadow-black-500/40 rounded-full m-2"
                                defaultValue={showEng}
                              />

                              <textarea
                                onChange={onChangeKorean}
                                rows="1"
                                className="sm:600 w-52 grid grid-cols-2 gap-4 place-content-center
                                pl-2 h-7 shadow-lg shadow-black-500/40 rounded-full m-2"
                                defaultValue={showKor}
                              />
                            </div>
                            <div className="ml-10 mt-2 ">
                              <Listbox value={selected} onChange={setSelected}>
                                <div className="relative ">
                                  <Listbox.Button className="cursor-pointer bg-white py-2 pl-2 pr-10  sm:text-sm shadow-lg shadow-black-500/40 rounded-full mr-2">
                                    {/* <span className="block">{selected.name}</span> */}

                                    <span className="block">
                                      {selected.name}
                                    </span>
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
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                      {typesName.map((t, typeIdx) => (
                                        <Listbox.Option
                                          key={typeIdx + 1}
                                          className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 pl-2 pr-4 ${
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
                        </>
                      ) : (
                        <>
                          <div className="flex bg-gray-100 rounded-lg py-1 mt-1">
                            <div>
                              <input
                                readOnly
                                placeholder={showEng}
                                name="english"
                                className="sm:600 w-52 grid grid-cols-2 gap-4 place-content-center
                                pl-2 h-7 shadow-lg shadow-black-500/40 rounded-full m-2"
                              />

                              <input
                                readOnly
                                type="text"
                                placeholder={showKor}
                                name="korean"
                                className="sm:600 w-52 grid grid-cols-2 gap-4 place-content-center
                                pl-2 h-7 shadow-lg shadow-black-500/40 rounded-full m-2"
                              />
                            </div>
                            <div className="ml-10 mt-2 ">
                              <Listbox value={selected} onChange={setSelected}>
                                <div className="relative ">
                                  <Listbox.Button className="cursor-default bg-white py-2 pl-2 pr-10  sm:text-sm shadow-lg shadow-black-500/40 rounded-full mr-2">
                                    {/* <span className="block">{selected.name}</span> */}

                                    <span className="block">
                                      {selected.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ArrowDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                </div>
                              </Listbox>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-light-green px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={
                      editMode
                        ? onChangeReviseWord(editKor, editEng, type)
                        : onOpenCloseModal
                    }
                  >
                    {editMode ? <p> 수정</p> : <p>완료</p>}
                  </button>
                  {editMode ? (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onOpenCloseModal}
                      ref={cancelButtonRef}
                    >
                      취소
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-light-green focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onBackEdit}
                      ref={cancelButtonRef}
                    >
                      뒤로 가기
                    </button>
                  )}
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
