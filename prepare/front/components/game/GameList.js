import React from "react";

const GameList = ({ word, index }) => {
  console.log(numbers[0]);
  return (
    <>
      <div className="mt-5">
        <div>
          {/* quiz answer start */}
          <div className="option-default bg-light-beige p-2 rounded-lg mb-3 relative">
            <div className="bg-light-orange pt-2 pl-1 transform rotate-45 rounded-full h-12 w-12 text-white font-bold absolute right-0 bottom-8 shadow-md">
              <p className="transform -rotate-45 text-black text-lg">+10</p>
            </div>

            <div className="rounded-lg font-bold flex ">
              <div className="bg-white p-3 rounded-lg">{index}</div>
              <div className="flex items-center pl-10">
                {word.choices[index][index]}
              </div>
            </div>
          </div>
          {/* quiz answer end */}
        </div>
      </div>
    </>
  );
};

export default GameList;
