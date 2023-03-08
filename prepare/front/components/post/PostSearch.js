import React, { useCallback } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const PostSearch = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const router = useRouter();
  const [detail, onChangeDetail] = useInput("");

  const onSearch = useCallback(() => {
    if (!detail) {
      alert("아무것도 검색하지 않았습니다.");
    } else {
      router.replace(`/search/${detail}`);
    }
  }, [detail]);
  return (
    <div className="mt-2 ml-2 w-full mx-auto block ">
      <div className="flex bg-gray-100 overflow-hidden w-full my-3 shadow shadow-black-500/40 rounded-md">
        <input
          onChange={onChangeDetail}
          className="flex-grow p-1 w-10  outline-none text-gray-600 dark:text-white"
          type="text"
          name="detail"
          placeholder="검색할 내용은?"
        />
        <span>
          <MagnifyingGlassIcon
            onClick={onSearch}
            className="dark:text-black mt-1 h-5 w-5 cursor-pointer"
          />
        </span>
      </div>
    </div>
  );
};

export default PostSearch;
