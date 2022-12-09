import React from "react";

const Point = () => {
  let div = document.createElement("div");
  div.className =
    "relative right-0 top-10 bg-light-orange pt-2 pl-2 transform rotate-0 rounded-full h-12 w-12 text-white font-bold shadow-md transform -rotate-45 text-black text-lg";
  let text = document.createTextNode("+10");
  div.appendChild(text);
  document.body.appendChild(div);
};

export default Point;
