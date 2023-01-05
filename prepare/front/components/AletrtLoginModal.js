import React from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/24/outline";

const AlertLoginModal = () => {
  const router = useRouter();

  const onGoLogin = () => {
    router.push("/signin");
  };

  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white sm:mx-0 sm:h-10 sm:w-10">
            <LockClosedIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title as="h2" className="text-sm leading-6 text-gray-900">
              <span className="font-bold">로그인이 필요합니다!&nbsp;</span>
            </Dialog.Title>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 text-white px-4 py-2 text-base font-medium shadow-sm hover:bg-dark-green hover:text-white  sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onGoLogin}
        >
          로그인으로 이동
        </button>
      </div>
    </>
  );
};

export default AlertLoginModal;
