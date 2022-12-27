import React from "react";
import Link from "next/link";

const UserInfo = ({ nickname, me, postResult }) => {
  return (
    <>
      <div className="ml-2 shadow shadow-black-500/40 rounded-xl">
        <div className="md:flex lg:flex">
          <img
            src="https://i.imgur.com/CeVfZyY.jpg"
            className="rounded-lg w-14 h-14 mt-2 ml-1"
          />

          <div className="ml-1">
            <p className="font-bold p-1 mt-1">{nickname}</p>
          </div>
        </div>

        <div className="p-2">
          <span>테스트입니다.</span>
        </div>

        <div className="lg:flex md:ml-5 lg:ml-10">
          <div className="flex p-1 items-center">
            <p className="text-gray-400 block">Article</p>
            <p className="ml-1 font-bold">{postResult.length}</p>
          </div>
          <div className="flex p-1 items-center">
            <p className="text-gray-400 block">Follower</p>
            <p className="ml-1 font-bold">
              <Link href={`/profile`}>
                <a>{me?.Followers.length}</a>
              </Link>
            </p>
          </div>
          <div className="flex p-1 items-center">
            <p className="text-gray-400 block">Following</p>
            <p className="ml-1 font-bold">
              <Link href={`/profile`}>
                <a>{me?.Followings.length}</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
    // <div className="md:col-span-1 ml-3 mr-3">
    //   <div className="bg-white border border-light-green rounded-lg px-4 py-5">
    //     <div className="flex w-72 h-8">
    //       <img
    //         className="h-8 w-8 rounded-full"
    //         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    //         alt=""
    //       />
    //       <h3 className="ml-3 text-lg md:text-md font-medium text-gray-900">
    //         Tester Name
    //       </h3>
    //     </div>
    //     <div className="flex">
    //       <p className="mt-1 max-w-2xl text-sm text-gray-300">
    //         가입날짜 : 2022-10-28
    //       </p>
    //       <div className="ml-4 mt-1">
    //         <a href="#">
    //           팔로잉 : <span>1</span>
    //         </a>
    //       </div>
    //       <div className="ml-4 mt-1">
    //         <a href="#">
    //           팔로워 : <span>2</span>
    //         </a>
    //       </div>
    //     </div>
    //     <p className="mt-1 max-w-2xl text-sm text-gray-500">
    //       Personal details and application. Personal details and application.
    //       Personal details and application. Personal details and application.
    //       Personal details and application. Personal details and application.
    //     </p>
    //   </div>
    // </div>
  );
};

export default UserInfo;
