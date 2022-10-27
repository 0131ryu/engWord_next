import React from "react";
import { HandRaisedIcon } from "@heroicons/react/24/outline";

const GameForm = () => {
  return (
    <div className="flex lg:flex flex h-full my-3 pt-6 items-center justify-center">
      <div className="sm:500px hidden">hello</div>
      <div className="w-full max-w-sm overflow-hidden bg-white border-2 border-light-green flex-none relative shadow-lg rounded-lg px-10 py-3">
        {/* score start */}
        <div className="text-right text-gray-800">
          <p className="text-sm leading-3">Score</p>
          <p className="font-bold">60</p>
        </div>
        {/* score end */}
        {/* time start */}
        <div className="bg-white shadow-lg p-1 rounded-full w-full h-5 mt-4">
          <div className="bg-light-green rounded-full w-11/12 h-full"></div>
        </div>
        {/* time end */}
        {/* Hint start */}
        <div className="bg-light-orange flex rounded-lg m-5">
          <HandRaisedIcon className="h-9 h-8" />
          <p className="py-2 px-1 font-bold">Hint!</p>
        </div>
        {/* Hint end */}
        <div className="relative z-20">
          <div className="rounded-lg bg-light-green p-2 neumorph-1 text-center font-bold text-gray-800 mt-5">
            <div className="bg-white p-5">Quiz</div>
          </div>

          <div className="mt-5">
            <div>
              {/* quiz answer start */}
              <div className="option-default bg-light-beige p-2 rounded-lg mb-3 relative">
                <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
                  <p className="transform -rotate-45 text-black text-lg">+10</p>
                </div>

                <div className="rounded-lg font-bold flex ">
                  <div className="bg-white p-3 rounded-lg ">0</div>
                  <div className="flex items-center pl-10">choice</div>
                </div>
              </div>
              {/* quiz answer end */}
              {/* quiz answer start */}
              <div className="option-default bg-light-beige p-2 rounded-lg mb-3 relative">
                <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
                  <p className="transform -rotate-45 text-black text-lg">+10</p>
                </div>

                <div className="rounded-lg font-bold flex ">
                  <div className="bg-white p-3 rounded-lg ">0</div>
                  <div className="flex items-center pl-10">choice</div>
                </div>
              </div>
              {/* quiz answer end */}

              {/* quiz answer start */}
              <div className="option-default bg-light-beige p-2 rounded-lg mb-3 relative">
                <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
                  <p className="transform -rotate-45 text-black text-lg">+10</p>
                </div>

                <div className="rounded-lg font-bold flex ">
                  <div className="bg-white p-3 rounded-lg ">0</div>
                  <div className="flex items-center pl-10">choice</div>
                </div>
              </div>
              {/* quiz answer end */}
              {/* quiz answer start */}
              <div className="option-default bg-light-beige p-2 rounded-lg mb-3 relative">
                <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
                  <p className="transform -rotate-45 text-black text-lg">+10</p>
                </div>

                <div className="rounded-lg font-bold flex ">
                  <div className="bg-white p-3 rounded-lg ">0</div>
                  <div className="flex items-center pl-10">choice</div>
                </div>
              </div>
              {/* quiz answer end */}

              {/* 1/10 */}
              <div className="mt-8 text-center">
                <div className="h-1 w-12 bg-dark-green rounded-full mx-auto"></div>
                <p className="font-bold text-dark-green">1/10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameForm;
