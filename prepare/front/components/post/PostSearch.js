import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const PostSearch = () => {
  return (
    <div className="flex mt-2 w-1/2 mx-auto block">
      <div className="bg-gray-100 border-2 border-light-green flex justify-between rounde-md rounded-md">
        <input
          className="flex-grow p-1 w-10 md:w-20 lg:w-40 outline-none text-gray-600 focus:text-blue-600"
          type="text"
          placeholder="Search..."
        />
        <span>
          <MagnifyingGlassIcon className="mt-1 h-5 w-5 cursor-pointer" />
        </span>
      </div>
    </div>
  );
};

export default PostSearch;
