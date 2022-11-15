import React from "react";

const CommentCard = () => {
  return (
    <>
      <div className="border border-light-green m-2 p-2 rounded-lg sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <div className="flex">
          <img
            className="mt-2 h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <div className="w-40 h-8 mt-3 ml-3 text-sm font-medium text-gray-500">
            Hi My name is Tester!
          </div>
        </div>
        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt
          cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint.
          Sit id mollit nulla mollit nostrud in ea officia proident. Irure
          nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
        </dd>
      </div>
    </>
  );
};

export default CommentCard;
