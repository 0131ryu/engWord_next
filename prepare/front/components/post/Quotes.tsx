import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showQuoteRequest } from "../../redux/feature/quoteSlice";
import { RootState } from "../../redux/store";

const Quotes = () => {
  const dispatch = useDispatch();
  const { quoteResult } = useSelector((state: RootState) => state.quote);

  useEffect(() => {
    dispatch(showQuoteRequest());
  }, []);

  return (
    <div className="w-11/12">
      <div
        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-900 bg-gray-100 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
        <h2 className="font-bold">추천 영어 문장</h2>
      </div>
      <div>
        <div className="p-5 font-light border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-b-xl">
        
          <p className="mb-2 text-gray-500 dark:text-gray-400">
              {quoteResult?.content === undefined ? "영어 인용문 찾아 오는 중" : quoteResult?.content}
          </p>
            <p>{quoteResult?.name === undefined ? null : `-${quoteResult?.name}-`}</p>
        </div>
      </div>
    </div>
  )
};

export default Quotes;
