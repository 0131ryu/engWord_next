import React, { useCallback } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../redux/feature/userSlice";

const navigation = [
  { name: "EngWord", href: "/", current: true },
  { name: "SNS", href: "/post", current: false },
  { name: "WordGame", href: "/game", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavbarForm = () => {
  const dispatch = useDispatch();
  const { me, loginComplete } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);
  return (
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
                    <a href="/" className="underline hover:text-black ">
                      <BookmarkIcon className="w-6 h-6" />
                    </a>
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
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-light-brown text-white  underline hover:text-white"
                            : "text-white hover:bg-light-beige hover:text-black",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    {me && loginComplete ? (
                      <div className="flex">
                        <p className="text-white mt-1 mr-3">
                          <span className="text-white font-bold">Tester</span>님
                        </p>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                    ) : (
                      <div className="flex">
                        <div>
                          <a
                            href="/signin"
                            className="px-3 py-2 rounded-md text-sm font-medium bg-light-beige text-black hover:bg-light-brown hover:text-white"
                          >
                            LogIn
                          </a>
                        </div>
                        <div>
                          <a
                            href="/signup"
                            className="ml-3 px-3 py-2 rounded-md text-sm font-medium bg-light-orange text-black hover:bg-light-brown hover:text-white"
                          >
                            Sign Up
                          </a>
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md  bg-light-brown  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-light-beige text-white font-bold rounded-lg"
                                    : "",
                                  "block  px-4 py-2 text-sm text-black font-bold"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={onLogout}
                                className={classNames(
                                  active
                                    ? "bg-light-beige text-white font-bold rounded-lg"
                                    : "",
                                  "block px-4 py-2 text-sm text-black font-bold"
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
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
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
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavbarForm;
