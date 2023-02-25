import React, { useCallback, useEffect, useRef, useState } from "react";
import { LockClosedIcon, BookmarkIcon } from "@heroicons/react/20/solid";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/feature/userSlice";
import { useRouter } from "next/router";

import { emailRule, passwordRule } from "../config/regRule";

const LoginForm = () => {
  const { loginError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const userRef = useRef();

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    const result = emailRule.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = passwordRule.test(password);
    setValidPassword(result);
  }, [password]);

  const onSubmitForm = useCallback(() => {
    if (!email || !password) {
      alert("이메일 혹은 비밀번호가 입력되지 않았습니다.");
    } else {
      dispatch(
        loginRequest({
          email,
          password,
        })
      );
    }
  }, [email, password]);

  const onSignup = useCallback(() => {
    router.push("/signup");
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="mt-20 mx-auto w-auto bg-light-beige rounded-md h-10 w-10">
            <BookmarkIcon className="h-10 w-10" />
          </div>
          <h4 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">
            <span className="text-light-brown">EngWord</span>에 환영합니다!
          </h4>
        </div>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="bg-gray-100 p-2 rounded-lg shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              ref={userRef}
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative p-2 block w-full appearance-none shadow-lg shadow-black-500/40 rounded-lg"
              placeholder="Email"
              onChange={onChangeEmail}
            />
          </div>
          {email && !validEmail ? (
            <div className="bg-light-beige rounded-lg">
              <p className="ml-3 mt-1">
                이메일 형식<span className="font-bold">(@포함)</span>으로 입력
                바랍니다.
              </p>
            </div>
          ) : null}
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
              className="relative p-2 mt-2 block w-full appearance-none shadow-lg shadow-black-500/40 rounded-lg"
              placeholder="Password"
              onChange={onChangePassword}
            />
          </div>
          {password && !validPassword ? (
            <div className="bg-light-beige rounded-lg">
              <p className="ml-3 mt-1">
                숫자, 영문포함{" "}
                <span className="font-bold">6자리 이상 12자리 이하</span>로
                입력하세요.
              </p>
            </div>
          ) : null}
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
      </div>
    </div>
  );
};

export default LoginForm;
