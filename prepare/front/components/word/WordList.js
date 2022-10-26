import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$35",
    color: "Black",
    title: "🥉 Easy",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$35",
    color: "Black",
    title: "🥈 Middle",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$35",
    color: "Black",
    title: "🥇 Advance",
  },
];
const WordList = () => {
  return (
    <>
      <div className="bg-white lg:w-full w-full">
        <div className="bg-red-400 place-center mx-auto max-w-3xl py-8 px-4 sm:py-20 sm:px-3 lg:max-w-screen-xl">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-1">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative rounded-lg p-3 lg:w-80 lg:ml-10"
              >
                <div className="min-h-20 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none">
                  {/* item start */}
                  <div>
                    <h1 class="text-slate-900 font-medium px-3 pt-2">
                      {product.title}
                    </h1>
                  </div>
                  <div className="flex items-start bg-gray-400 group-hover:opacity-80 rounded-lg m-2">
                    <div className="h-24 w-90 sm:600 w-96 lg:w-48">
                      <div className="flex py-5 pl-1">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                      <li class="flex first:pt-0 last:pb-0">
                        <div class="relative bottom-10 ml-9 overflow-hidden">
                          <p class="text-sm font-medium text-slate-900">
                            {product.name}
                          </p>
                          <p class="text-sm text-slate-900 truncate">
                            {product.color}
                          </p>
                        </div>
                      </li>
                    </div>
                    <div class="relative h-24 w-24 py-2">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                            Options
                            <ChevronDownIcon
                              className="ml-1 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-90"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-0">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "rounded-md bg-gray-100 text-gray-900"
                                        : "rounded-md text-gray-700",
                                      "block px-8 py-1 text-sm"
                                    )}
                                  >
                                    수정
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-8 py-1 text-sm"
                                    )}
                                  >
                                    삭제
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  {/* item end */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WordList;
