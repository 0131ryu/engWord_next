import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const typesName = [{ name: "easy" }, { name: "middle" }, { name: "advance" }];

const ImagesZoomModal = ({ images, onClose }) => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          이미지 결과
                        </Dialog.Title>
                        <div className=" w-full h-full">
                          {/* start */}
                          {/*  {images.length === 2 &&
                                images.map((v) => (
                                  <div
                                    key={v.src}
                                    className="hidden duration-700 ease-in-out"
                                    data-carousel-item="active"
                                  >
                                    <img
                                      src={`http://localhost:3005/${v?.src}`}
                                      alt={v?.src}
                                      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                    />
                                  </div>
                                ))} */}
                          <div
                            id="default-carousel"
                            className="relative"
                            data-carousel="static"
                          >
                            {/* <!-- Carousel wrapper --> */}
                            <div className="relative overflow-hidden rounded-lg">
                              {images.map((v) => (
                                <>
                                  <div key={v?.src}>
                                    <img
                                      src={`http://localhost:3005/${v?.src}`}
                                    />
                                  </div>
                                </>
                              ))}
                            </div>
                            {/* <!-- Slider indicators --> */}
                            <div className="bg-gray-100 absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                              {images.map((v) => (
                                <>
                                  <button
                                    type="button"
                                    className="w-3 h-3 rounded-full bg-gray-200 hover:bg-gray-400"
                                    aria-current="false"
                                    aria-label={`${v}`}
                                    data-carousel-slide-to="0"
                                  ></button>
                                </>
                              ))}
                            </div>

                            {/* <!-- Slider controls --> */}
                            <button
                              type="button"
                              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                              data-carousel-prev
                            >
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg
                                  aria-hidden="true"
                                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <ChevronLeftIcon className="w-5 h-5 text-white" />
                                </svg>
                                <span className="sr-only">Previous</span>
                              </span>
                            </button>
                            <button
                              type="button"
                              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                              data-carousel-next
                            >
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg
                                  aria-hidden="true"
                                  className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <ChevronRightIcon className="w-5 h-5 text-white" />
                                </svg>
                                <span className="sr-only">Next</span>
                              </span>
                            </button>
                          </div>

                          {/* end */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-light-orange px-4 py-2 text-base font-medium text-black shadow-sm hover:bg-dark-green hover:text-white  sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={onClose}
                    >
                      닫기
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ImagesZoomModal;
