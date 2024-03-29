import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ImagesZoomModal = ({ showNum, showImg, images, onClose }) => {
  const [open, setOpen] = useState(true);
  const [num, setNum] = useState(showNum);
  const [mainImage, setMainImage] = useState(true);
  const [hideImages, setHideImages] = useState(false);

  const leftButton = () => {
    setMainImage(false);
    setHideImages(true);
    if (num >= 1) {
      setNum(num - 1);
    }
  };

  const rightButton = () => {
    setMainImage(false);
    setHideImages(true);
    const imgLength = images.length - 1;

    if (num < imgLength) {
      setNum(num + 1);
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                          <section>
                            <div className="relative">
                              {mainImage ? (
                                <img
                                  className="h-full w-full rounded-lg object-cover"
                                  src={`${showImg.replace(
                                    /\/thumb\//,
                                    "/original/"
                                  )}`}
                                  alt={showImg}
                                />
                              ) : null}
                              <ul id="slider">
                                {hideImages
                                  ? images.map((v, i) => (
                                      <li
                                        name="slide"
                                        className={`h-full w-full rounded-lg relative ${
                                          num === i ? null : "hidden"
                                        }`}
                                        key={v.id}
                                      >
                                        <img
                                          className="h-full w-full rounded-lg object-cover"
                                          src={`${v.src.replace(
                                            /\/thumb\//,
                                            "/original/"
                                          )}`}
                                          alt={v?.src}
                                        />
                                      </li>
                                    ))
                                  : null}
                              </ul>
                              {images.length === 1 ? null : (
                                <div className="absolute px-5 flex h-full w-full top-0 left-0">
                                  <div className="my-auto w-full flex justify-between">
                                    <button className="bg-white p-2 rounded-full bg-opacity-80 shadow-lg">
                                      <ChevronLeftIcon
                                        onClick={leftButton}
                                        className="w-5 h-5"
                                      />
                                    </button>
                                    <button className="bg-white p-2 rounded-full bg-opacity-80 shadow-lg">
                                      <ChevronRightIcon
                                        onClick={rightButton}
                                        className="w-5 h-5"
                                      />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </section>
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
