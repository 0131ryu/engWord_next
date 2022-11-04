import React from "react";
import { useRouter } from "next/router";

const SuccessSignup = () => {
  const router = useRouter();
  const onMain = () => {
    router.push("/");
  };

  const onLogin = () => {
    router.push("/signin");
  };
  return (
    <>
      <div className=" flex min-h-full items-center justify-center py-48 px-4 sm:px-6 lg:px-6">
        <div className="bg-gray-100 mx-auto max-w-7xl py-12 px-8 sm:px-6 lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-dark-green">
              <span className="text-light-orange">회원가입</span>이
              완료되었습니다!
            </span>
          </h2>
          <div className="mt-8 flex ">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={onMain}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-light-beige px-5 py-3 text-base font-medium text-black font-bold hover:bg-light-brown hover:text-white"
              >
                메인화면
              </button>
            </div>
            <div className="inline-flex ml-3rounded-md shadow">
              <button
                onClick={onLogin}
                className="inline-flex ml-3 items-center justify-center rounded-md border border-transparent bg-light-orange px-5 py-3 text-base font-medium text-black font-bold hover:bg-light-brown hover:text-white"
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessSignup;
