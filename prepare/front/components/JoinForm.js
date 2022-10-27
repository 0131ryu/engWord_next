import React, { useCallback } from "react";
import { LockOpenIcon } from "@heroicons/react/20/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";

const JoinForm = () => {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="mt-20 mx-auto w-auto bg-light-beige rounded-md h-10 w-10">
            <BookmarkIcon className="w-10 h-10" />
          </div>
          <h4 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">
            회원가입
          </h4>
          <h4 className="mt-2 text-center text-light-brown font-medium">
            EngWord와 함께해요!
          </h4>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className=" rounded-lg shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative mb-2 block w-full appearance-none rounded-lg border-2 border-light-beige px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark-green focus:outline-none focus:dark-green sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="nickname" className="sr-only">
                nickname
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                autoComplete="current-nickname"
                required
                className="relative mb-2 block w-full appearance-none rounded-lg border-2 border-light-beige px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark-green focus:outline-none focus:dark-green sm:text-sm"
                placeholder="Nickname"
              />
            </div>
            <div>
              <label htmlFor="nickname" className="sr-only">
                nickname
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                autoComplete="current-nickname"
                required
                className="relative block w-full appearance-none rounded-lg border-2 border-light-beige px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark-green focus:outline-none focus:dark-green sm:text-sm"
                placeholder="Nickname"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-dark-green py-2 px-4 text-sm font-medium text-white hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-light-beige focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockOpenIcon
                  className="h-5 w-5 text-light-beige group-hover:text-light-beige"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
