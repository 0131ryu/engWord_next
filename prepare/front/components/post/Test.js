import React, { useCallback, useEffect, useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Test = () => {
  const [id, setId] = useState(1);
  const totalSlides = useRef(null);

  const leftButton = () => {
    if (id > 1) {
      setId(id - 1);
    }
  };

  const rightButton = () => {
    const innerElements = totalSlides.current.innerHTML;
    let count = (innerElements.match(/<li/g) || []).length; //3

    if (id < count) {
      setId(id + 1);
    }
  };

  return (
    <>
      {console.log("id 결과", id)}
      <section>
        <div className="relative">
          <ul id="slider" ref={totalSlides}>
            <li
              name="slide"
              className={`h-[50vh] relative ${id === 1 ? null : "hidden"}`}
            >
              <img
                className="h-full w-full object-cover"
                src="https://placeimg.com/1200/800/nature"
                alt=""
              />
              <div className="absolute  top-0 left-0 h-full w-full flex">
                <h2 className="text-4xl font-bold text-white my-auto w-full text-center text-center px-20">
                  Some Big Heading 1
                </h2>
              </div>
            </li>
            <li
              name="slide"
              className={`h-[50vh] relative ${id === 2 ? null : "hidden"}`}
            >
              <img
                className="h-full w-full object-cover"
                src="https://placeimg.com/1200/800/animals"
                alt=""
              />
              <div className="absolute  top-0 left-0 h-full w-full flex">
                <h2 className="text-4xl font-bold text-white my-auto w-full text-center text-center px-20">
                  Some Big Heading 2
                </h2>
              </div>
            </li>
            <li
              name="slide"
              className={`h-[50vh] relative ${id === 3 ? null : "hidden"}`}
            >
              <img
                className="h-full w-full object-cover"
                src="https://placeimg.com/1200/800/tech"
                alt=""
              />
              <div className="absolute  top-0 left-0 h-full w-full flex">
                <h2 className="text-4xl font-bold text-white my-auto w-full text-center text-center px-20">
                  Some Big Heading 3
                </h2>
              </div>
            </li>
          </ul>

          <div className="absolute px-5 flex h-full w-full top-0 left-0">
            <div className="my-auto w-full flex justify-between">
              <button className="bg-white p-2 rounded-full bg-opacity-80 shadow-lg">
                <ChevronLeftIcon onClick={leftButton} className="w-5 h-5" />
              </button>
              <button className="bg-white p-2 rounded-full bg-opacity-80 shadow-lg">
                <ChevronRightIcon onClick={rightButton} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Test;
