import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../store/userSlice";

const SuccessLogin = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);
  return (
    <>
      <div className=" flex min-h-full items-center justify-center py-48 px-4 sm:px-6 lg:px-6">
        <div className="bg-gray-100 mx-auto max-w-7xl py-12 px-8 sm:px-6 lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-center mb-2">test님</span>
            <span className="block text-dark-green">
              로그인이 완료되었습니다!
            </span>
          </h2>
          <div className="mt-8 flex ">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-light-beige px-5 py-3 text-base font-medium text-black font-bold hover:bg-light-brown"
              >
                메인화면
              </a>
            </div>
            <button
              onClick={onLogout}
              className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-light-orange px-5 py-3 text-base font-medium text-black hover:bg-light-green"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessLogin;
