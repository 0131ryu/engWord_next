import React, { useCallback, useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { loadMyInfoRequest, logoutRequest } from "../redux/feature/userSlice";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavbarForm = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadMyInfoRequest());
  }, []);

  const onLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  const onGoMain = useCallback(() => {
    router.push("/");
  }, []);

  const onGoSNS = useCallback(() => {
    router.push("/post");
  }, []);

  const onGoGame = useCallback(() => {
    router.push("/game");
  }, []);

  const onYourProfileDetail = useCallback(() => {
    router.push("/profile");
  }, []);

  const onLogin = useCallback(() => {
    router.push("/signin");
  }, []);

  const onSignup = useCallback(() => {
    router.push("/signup");
  }, []);

  return (
    <>
      <Disclosure as="nav" className="bg-dark-green">
        {({ open, LoggedIn }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-3 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <div className="block h-6 w-auto lg:hidden bg-light-beige rounded-md h-6 w-6">
                      <BookmarkIcon className="w-6 h-6" onClick={onGoMain} />
                    </div>
                    <div className="hidden h-6 w-auto lg:block bg-light-beige rounded-md h-6 w-6">
                      <a href="/" className="underline hover:text-black ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <button
                        onClick={onGoMain}
                        className="px-3 py-2 font-medium rounded-lg bg-light-brown text-white hover:bg-light-beige hover:text-black"
                      >
                        Home
                      </button>
                      <button
                        onClick={onGoSNS}
                        className="px-3 py-2 font-medium rounded-lg bg-light-brown text-white hover:bg-light-beige hover:text-black"
                      >
                        SNS
                      </button>
                      <button
                        onClick={onGoGame}
                        className="px-3 py-2 font-medium rounded-lg bg-light-brown text-white hover:bg-light-beige hover:text-black"
                      >
                        Game
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      {me ? (
                        <div className="flex">
                          <p className="text-white mt-1 mr-3">
                            <span className="text-white font-bold">
                              {me?.nickname}
                            </span>
                            ???
                          </p>
                          <Menu.Button className="flex rounded-full bg-light-brown text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            {me.profileImg === "" || me.profileImg === null ? (
                              <img
                                alt="profile-img"
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                className="h-8 w-8 rounded-full"
                              />
                            ) : (
                              <img
                                className="h-8 w-8 rounded-full"
                                src={`http://localhost:3005/profile/${me.profileImg}`}
                                alt={me.profileImg}
                              />
                            )}
                          </Menu.Button>
                        </div>
                      ) : (
                        <div className="flex">
                          <div
                            onClick={onLogin}
                            className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium bg-light-beige text-black hover:bg-light-brown hover:text-white"
                          >
                            LogIn
                          </div>
                          <div
                            onClick={onSignup}
                            className="cursor-pointer ml-3 px-3 py-2 rounded-md text-sm font-medium bg-light-orange text-black hover:bg-light-brown hover:text-white"
                          >
                            Sign Up
                          </div>
                        </div>
                      )}
                    </div>
                    {
                      (LoggedIn = true ? (
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-light-brown text-white  py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active
                                      ? "w-full bg-light-beige text-white font-bold rounded-lg cursor-pointer"
                                      : "",
                                    "w-full block px-4 py-2 text-sm text-black font-bold cursor-pointer"
                                  )}
                                  onClick={onYourProfileDetail}
                                >
                                  Your Profile
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={onLogout}
                                  className={classNames(
                                    active
                                      ? "w-full bg-light-beige text-white font-bold rounded-lg cursor-pointer"
                                      : "",
                                    "w-full text-center block px-4 py-2 text-sm text-black font-bold cursor-pointer"
                                  )}
                                >
                                  Sign out
                                </div>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      ) : (
                        ""
                      ))
                    }
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 grid grid-rows-3">
                <Disclosure.Button
                  onClick={onGoMain}
                  className="h-10 mx-2 my-1 font-medium rounded-lg bg-light-brown text-white hover:bg-light-beige hover:text-black"
                >
                  Home
                </Disclosure.Button>
                <Disclosure.Button
                  onClick={onGoSNS}
                  className="h-10 mx-2 my-1 font-medium rounded-lg bg-light-brown text-white hover:bg-light-beige hover:text-black"
                >
                  SNS
                </Disclosure.Button>
                <Disclosure.Button
                  onClick={onGoGame}
                  className="h-10 mx-2 my-1 font-medium rounded-lg bg-light-brown text-white hover:bg-light-beige hover:text-black"
                >
                  Game
                </Disclosure.Button>
                {/* {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-light-brown text-white"
                        : "text-gray-300 hover:bg-light-beige hover:text-black",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))} */}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </>
  );
};

export default NavbarForm;
