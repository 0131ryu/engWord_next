import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowDownIcon,
  CheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { addWordRequest } from "../../redux/feature/wordSlice";

import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import FindWordModal from "./FindWordModal";
import SearchWordModal from "./SearchWordModal";

const typesName = [{ name: "easy" }, { name: "middle" }, { name: "advance" }];

const WordForm = ({ UserId }) => {
  const dispatch = useDispatch();
  const { addWordComplete } = useSelector((state) => state.word);

  const [modal, setModal] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [selected, setSelected] = useState(typesName[0]);
  const [english, onChangeEnglish, setEnglish] = useInput("");
  const [korean, onChangeKorean, setKorean] = useInput("");

  const type = selected.name;

  useEffect(() => {
    if (addWordComplete) {
      setEnglish("");
      setKorean("");
      setSelected(typesName[0]);
    }
  }, [addWordComplete]);

  const onFindModal = useCallback(() => {
    setModal(true);
    // if (!UserId) {
    //   alert("로그인 후 진행해주세요.");
    // } else {
    //   setModal(true);
    // }
  }, []);

  const onSearchModal = useCallback(() => {
    setModalSearch(true);
  }, []);

  const onSubmitWord = useCallback(() => {
    const validEnglish = /^[a-zA-Z\s.,;,~]+$/;
    const validKorean = /^[가-힣\s.,;,~]+$/;

    if (!UserId) {
      alert("로그인 후 진행해주세요.");
    } else {
      if (!validEnglish.test(english) || !validKorean.test(korean)) {
        alert("english는 영어로만, korean은 한글로만 입력하세요");
      } else {
        dispatch(
          addWordRequest({
            english,
            korean,
            type,
          })
        );
      }
    }
  }, [english, korean, type]);

  return (
    <>
      {/* 검색 모달창 */}
      {modal ? <FindWordModal setModal={setModal} /> : null}

      {/* 검색 모달창 */}
      {modalSearch ? <SearchWordModal setModalSearch={setModalSearch} /> : null}
      <div className="lg:w-full relative">
        <div className=" h-80 place-content-center mx-auto max-w-2xl py-8 px-4 sm:py-20 sm:px-3 lg:max-w-screen-xl">
          <h2 className="text-2xl tracking-tight text-gray-900">
            <span className="text-dark-green font-bold">영어 단어</span>, 만들어
            봅시다!
            <button
              onClick={onFindModal}
              className="bg-light-orange ml-3 h-8 w-20 rounded-lg mb-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5 ml-2" />
            </button>
          </h2>
          <div className=" flex felx-row place-content-center rounded-lg lg:w-8/12 lg:relative left-48 top-5">
            {/* english */}
            <input
              onChange={onChangeEnglish}
              value={english}
              placeholder="English"
              type="text"
              name="english"
              className="
            basis-1/5 md:basis-1/3 sm:600 w-28 md:w-48 lg:w-48 grid grid-cols-2 gap-4 place-content-center
            pl-2 h-9  placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-full m-2"
            />
            {/* korean */}
            <input
              onChange={onChangeKorean}
              value={korean}
              placeholder="한글"
              type="text"
              name="korean"
              className="
            basis-1/5 md:basis-1/3 sm:600 w-28 lg:w-48 grid grid-cols-2 gap-4 place-content-center
            pl-2 h-9  placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-full m-2"
            />
            {/* typesName start */}
            <div className="z-10 w-20 h-48 mt-2 mr-2">
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
                                  selected ? "font-medium" : "font-normal"
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
            {/* typeName end */}
            {/* submit */}
            <button
              onClick={onSubmitWord}
              className="basis-1/7 inline-flex justify-center my-2 md:basis-1/5 h-9 lg:w-12  inline-flex items-center rounded-md border border-transparent bg-dark-green px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
          <div className="text-center font-bold absolute top-64 inset-x-44 lg:inset-x-96 bg-light-beige border-2 rounded-lg border-light-beige hover:border-light-green hover:text-light-green">
            <button onClick={onSearchModal}>단어 검색하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordForm;
