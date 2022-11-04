import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { addWordRequest } from "../../redux/feature/wordSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";

const typesName = [{ name: "easy" }, { name: "middle" }, { name: "advance" }];

const WordForm = () => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(typesName[0]);
  const [english, onChangeEnglish, setEnglish] = useInput("");
  const [korean, onChangeKorean, setKorean] = useInput("");
  const type = selected.name;

  const onSubmitWord = useCallback(() => {
    console.log(english, korean, type);
    dispatch(
      addWordRequest({
        id: 10,
        english,
        korean,
        type,
      })
    );
    setEnglish = "";
    setKorean = "";
  }, [english, korean, type]);

  const checkboxChange = () => {
    console.log("체크박스");
  };
  return (
    <>
      <div className="lg:w-full relative">
        <div className=" h-80 place-content-center mx-auto max-w-2xl py-8 px-4 sm:py-20 sm:px-3 lg:max-w-screen-xl">
          <h2 className="text-2xl tracking-tight text-gray-900">
            <span className="text-dark-green font-bold">영어 단어</span>, 만들어
            봅시다!
            <button className="bg-light-orange ml-3 h-8 w-20 rounded-lg mb-2">
              <MagnifyingGlassIcon className="w-5 h-5 ml-2" />
            </button>
          </h2>
          <div className=" flex felx-row place-content-center rounded-lg lg:w-8/12 lg:relative left-48 top-5">
            {/* <form
              action="#"
              method="POST"
              onSubmit={onSubmitWord}
              className=" flex felx-row place-content-center rounded-lg lg:w-8/12 lg:relative left-48 top-5"
            > */}
            {/* english */}
            <input
              onChange={onChangeEnglish}
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
              placeholder="한글"
              type="text"
              name="korean"
              className="
            basis-1/5 md:basis-1/3 sm:600 w-28 lg:w-48 grid grid-cols-2 gap-4 place-content-center
            pl-2 h-9  placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-light-green group-hover:opacity-80 rounded-full m-2"
            />
            {/* typesName start */}
            {/* 여기 때문에 전체 길이가 너무 길어짐 */}
            <div className="w-20 h-48 mt-2 mr-2">
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
            {/* </form> */}
          </div>

          {/* checkbox */}
          <div className="absolute bottom-20 right-5 md:right-20 lg:right-52">
            <div className="flex items-center mb-2">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-light-green bg-gray-100 rounded border-light-green focus:ring-light-green dark:focus:ring-light-green dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-bold text-gray-900 border-light-green"
              >
                전체 선택
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked
                onChange={checkboxChange}
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-light-green bg-gray-900 rounded border-light-green focus:ring-light-green dark:focus:ring-light-green dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="checked-checkbox"
                className="ml-2 text-sm font-bold text-gray-900 border-light-green"
              >
                전체 해제(현재 : 1/20)
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordForm;
