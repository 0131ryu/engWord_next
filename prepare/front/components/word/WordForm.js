import React from "react";

const WordForm = () => {
  return (
    <>
      <div className="bg-white lg:w-full relative">
        <div className="bg-red-400 place-content-center mx-auto max-w-2xl py-8 px-4 sm:py-20 sm:px-3 lg:max-w-screen-xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
            <button className="bg-white ml-3 h-8 w-20 rounded-lg mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </h2>
          <br />
          <br />
          <div className="flex felx-row place-content-center bg-gray-400 rounded-lg lg:w-8/12 lg:relative left-48 top-2">
            <input
              placeholder="English"
              type="text"
              name="english"
              className="
            basis-1/5 md:basis-1/3 sm:600 w-40 md:w-48 lg:w-48 grid grid-cols-2 gap-4 place-content-center
            pl-2 h-9  placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-slate-400 group-hover:opacity-80 rounded-full m-2"
            />
            <input
              placeholder="한글"
              type="text"
              name="english"
              className="
            basis-1/5 md:basis-1/3 sm:600 w-40 lg:w-48 grid grid-cols-2 gap-4 place-content-center
            pl-2 h-9  placeholder:italic placeholder:text-slate-400 flex items-start bg-white border-solid border-2 border-slate-400 group-hover:opacity-80 rounded-full m-2"
            />
            <button
              type="button"
              className="basis-1/7  inline-flex justify-center my-2 md:basis-1/5 h-9  inline-flex items-center rounded-md border border-transparent bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordForm;
