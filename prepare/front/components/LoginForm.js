import React, { useCallback, useEffect } from "react";
import { LockClosedIcon, BookmarkIcon } from "@heroicons/react/20/solid";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/feature/userSlice";
import { useRouter } from "next/router";

const LoginForm = () => {
  const { loginError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  const onSubmitForm = useCallback(() => {
    dispatch(
      loginRequest({
        email,
        password,
      })
    );
  }, [email, password]);

  const onSignup = useCallback(() => {
    router.push("/signup");
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="mt-20 mx-auto w-auto bg-light-beige rounded-md h-10 w-10">
            <BookmarkIcon />
          </div>
          <h4 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">
            <span className="text-light-brown">EngWord</span>에 환영합니다!
          </h4>
        </div>
        {/* <form
          onSubmit={onSubmitForm}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        > */}
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
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-lg border-2 border-light-beige px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark-green focus:outline-none focus:dark-green sm:text-sm"
              placeholder="Password"
              onChange={onChangePassword}
            />
          </div>
        </div>

        <div className="float-right">
          <p
            onClick={onSignup}
            className="mb-5 cursor-pointer text-gray-400 hover:text-light-green font-bold"
          >
            회원가입
          </p>
        </div>

        <div>
          <button
            onClick={onSubmitForm}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-dark-green py-2 px-4 text-sm font-medium text-white hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-light-beige focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-light-beige group-hover:text-light-beige"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default LoginForm;
