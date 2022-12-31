import React, { useCallback, useEffect, useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Test2 = () => {
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
      <h2>2개 일 때</h2>
      <div className="bg-gray-700 flex w-full h-60">
        <div className="bg-gray-100 w-1/2 h-1/2">1</div>
        <div className="bg-gray-200 w-1/2 h-1/2">2</div>
      </div>
      <h2>3개 일 때</h2>
      <div className="bg-gray-700 flex flex-wrap w-full h-60">
        <div className="bg-gray-100 w-2/4 h-2/4">1</div>
        <div className="bg-gray-200 w-2/4 h-1/4">2</div>
        <div className="bg-gray-300 w-1/4 h-1/4">3</div>
      </div>
      <h2>4개 일 때</h2>
      <div   className="bg-gray-700 flex flex-wrap w-full h-60">
        <div className="bg-gray-100 w-2/4 h-2/4">1</div>
        <div className="bg-gray-200 w-2/4 h-1/4">2</div>
        <div className="bg-gray-300 w-1/4 h-1/4">3</div>
      </div>
    </>
  );
};

export default Test2;
