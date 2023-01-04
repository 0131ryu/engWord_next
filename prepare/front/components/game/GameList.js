import React from "react";

const GameList = ({ onClickAnswer, buttonName, answerValue, choicesValue }) => {
  return (
    <>
      <div className="mt-5">
        <div>
          {/* quiz answer start */}
          <button
            value={buttonName}
            onClick={onClickAnswer}
            className={`w-full bg-light-beige p-2 rounded-lg mb-3 relative`}
          >
            <div id="point4" className="rounded-lg font-bold flex ">
              <div className="bg-white p-3 rounded-lg">{buttonName}</div>
              <div
                className="flex items-center pl-10 w-full text-lg"
                value={answerValue}
              >
                {choicesValue}
              </div>
            </div>
          </button>
          {/* quiz answer end */}
        </div>
      </div>
    </>
  );
};

export default GameList;
