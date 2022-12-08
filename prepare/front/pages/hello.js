import React, { useState } from "react";

const hello = () => {
  const [글제목, 글제목변경] = useState([
    "남자 코트 추천",
    "강남 우동 맛집",
    "파이썬독학",
  ]);
  const [따봉, 따봉변경] = useState([0, 0, 0]);

  const [modal, modal변경] = useState(false);
  const [누른제목, 누른제목변경] = useState(0);
  const posts = "강남 고기 맛집";

  const 따봉바꾸기1 = () => {
    let copy = [...따봉];
    copy[0]++;
    따봉변경(copy);
  };

  const 따봉바꾸기2 = () => {
    let copy = [...따봉];
    copy[1]++;
    따봉변경(copy);
  };

  const 따봉바꾸기3 = () => {
    let copy = [...따봉];
    copy[2]++;
    따봉변경(copy);
  };

  const spanChange = () => {
    let copy = [...따봉];
    console.log("copy", copy);
    따봉.map((t, i) => {
      copy[i]++;
    });

    따봉변경(copy);
  };
  return (
    <>
      {글제목.map((글, i) => {
        return (
          <div>
            <h3 className="cursor-pointer" onClick={() => 누른제목변경(i)}>
              {글}
              <span onClick={spanChange}>?</span>
              {따봉[i]}
            </h3>
          </div>
        );
      })}

      <button className="bg-gray-100" onClick={따봉바꾸기1}>
        버튼1
      </button>
      <button className="bg-gray-200" onClick={따봉바꾸기2}>
        버튼2
      </button>
      <button className="bg-gray-300" onClick={따봉바꾸기3}>
        버튼3
      </button>
      <button className="bg-gray-400" onClick={spanChange}>
        버튼4
      </button>
    </>
  );
};

export default hello;
