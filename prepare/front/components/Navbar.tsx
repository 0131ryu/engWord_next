import React, { FunctionComponent, useCallback, useEffect, useState, Fragment } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { loadMyInfoRequest, logoutRequest } from "../redux/feature/userSlice";
import { Action, Dispatch } from "redux";
import DarkMode from "./darkMode";

interface RootState {
    user: any;
  }

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }  

const Navbar = ({children}) => {
    const [activeItem, setActiveItem] = useState<string>("")
    const [userNavItem, setUserNavItem] = useState<string>("")
    const { pathname } = useRouter();
    const router = useRouter();
    const { me } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const NavItem:FunctionComponent<{
        activeItem:string,
        setActiveItem:Function,
        name:string,
        route:string
    }> =  ({activeItem, setActiveItem, name, route}) => {
        return (
            activeItem !== name ? (
                <Link href={route}>
                    <span onClick={() => setActiveItem(name)} className="ml-5 font-bold text-white cursor-pointer hover:text-light-orange">{name}</span>
                </Link>
        ) : null
        )
    }

    const UserNavItem:FunctionComponent<{
        userNavItem:string,
        setUserNavItem:Function,
        name:string,
        route:string
    }> =  ({userNavItem, setUserNavItem, name, route}) => {
        return (
            userNavItem !== name ? (
                <Link href={route}>
                    <span onClick={() => setUserNavItem(name)} className="mx-2 font-bold text-white cursor-pointer hover:text-light-orange">{name}</span>
                </Link>
        ) : null
        )
    }

    const ProfileItem:FunctionComponent<{
        userNavItem:string,
        setUserNavItem:Function,
        name:string,
        route:string
    }> =  ({userNavItem, setUserNavItem, name, route}) => {
        return (
            userNavItem !== name ? (
                <Link href={route}>
                    <span onClick={() => setUserNavItem(name)} className="block w-full px-4 py-2 text-sm font-bold text-center text-black cursor-pointer hover:bg-light-beige hover:rounded-lg">{name}</span>
                </Link>
        ) : null
        )
    }

    const LogoutItem:FunctionComponent<{
        userNavItem:string,
        name:string,
        dispatch:Dispatch,
        action:Action,
    }> =  ({userNavItem, name, action}) => {
        return (
            userNavItem !== name ? (
                <div onClick={() => dispatch(action)}>
                    <span className="block w-full px-4 py-2 text-sm font-bold text-center text-black cursor-pointer hover:bg-light-beige hover:rounded-lg">{name}</span>
                </div>
        ) : null
        )
    }

    const onGoHome = useCallback(() => {
        router.push("/");
      }, []);

    useEffect(() => {
        dispatch(loadMyInfoRequest());
      }, []);
    
    useEffect(() => {
        if(pathname === "/") {
            setActiveItem('Home')  
        }
        if(pathname === "/word") {
            setActiveItem('Word')  
        }
        if(pathname === "/post") {
            setActiveItem('SNS')  
        }
        if(pathname === "/game") {
            setActiveItem('Game')  
        }
    }, [])

    return (
        <>
        {/* user Info */}
        <Disclosure as="nav" className="bg-dark-green">
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-3 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-1 sm:block">
                    {/* navar items */}
                    <div className="flex justify-start">
                        <button onClick={onGoHome}>
                            <img src="https://engword.shop/favicon.ico" className="w-8 h-8" />
                        </button>
                        <span className="ml-5 text-xl font-bold border-b-4 text-light-orange md:text-2xl">{activeItem}</span> 
                        <div className="mt-1 text-lg">
                            <NavItem activeItem={activeItem} setActiveItem={setActiveItem} name="Home" route="/" />
                            <NavItem activeItem={activeItem} setActiveItem={setActiveItem} name="Word" route="/word" />
                            <NavItem activeItem={activeItem} setActiveItem={setActiveItem} name="SNS" route="/post" />
                            <NavItem activeItem={activeItem} setActiveItem={setActiveItem} name="Game" route="/game" />
                        </div>        
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      {me ? (
                        <div className="flex">
                          <p className="mt-1 mr-3 text-white">
                            <span className="font-bold text-white">
                              {me?.nickname}
                            </span>
                            님
                          </p>
                          <Menu.Button className="flex mr-2 text-sm rounded-full bg-light-brown focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            {me.profileImg === "" || me.profileImg === null ? (
                              <img
                                alt="profile-img"
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <img
                                className="w-8 h-8 rounded-full"
                                src={`${me.profileImg}`}
                                alt={me.profileImg}
                              />
                            )}
                          </Menu.Button>
                          <DarkMode />
                        </div>
                      ) : (
                        <div className="flex">
                             <UserNavItem userNavItem={userNavItem} setUserNavItem={setUserNavItem} name="Login" route="/signin" />
                             <UserNavItem userNavItem={userNavItem} setUserNavItem={setUserNavItem} name="Sign Up" route="/signup" />
                             <DarkMode />
                        </div>
                      )}
                    </div>
                    {
                      (me !== null ? (
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right rounded-md bg-light-brown">
                            <Menu.Item>
                                <ProfileItem userNavItem={userNavItem} setUserNavItem={setUserNavItem} name="Profile" route="/profile" />
                            </Menu.Item>
                            <Menu.Item>
                            <LogoutItem 
                                 dispatch={dispatch} userNavItem={userNavItem} action={logoutRequest()} name="Sign Out" />
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
              <div className="grid grid-rows-3 ">
                 <Disclosure.Button className="h-10 mx-2 my-1 font-medium">
                   <NavItem activeItem={activeItem} setActiveItem={setActiveItem} name="Word" route="/word" />
                </Disclosure.Button>
                <Disclosure.Button>
                   <NavItem activeItem={activeItem} setActiveItem={setActiveItem} name="SNS" route="/post" />
                </Disclosure.Button>
                <Disclosure.Button>
                   <NavItem activeItem={activeItem} setActiveItem={setActiveItem} name="Game" route="/game" />
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
        </>
    )
}

export default Navbar