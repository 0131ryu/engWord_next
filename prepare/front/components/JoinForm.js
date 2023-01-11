import React, { useCallback, useState } from "react";
import { LockOpenIcon } from "@heroicons/react/20/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";

import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest } from "../redux/feature/userSlice";
import SuccessSignup from "./SuccessSignup";

const JoinForm = () => {
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const emailRule =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const passwordRule = /^[A-Za-z0-9]{6,12}$/;
  const nicknameRule = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmitUserForm = useCallback(() => {
    if (
      !emailRule.test(email) ||
      !passwordRule.test(password) ||
      !nicknameRule.test(nickname)
    ) {
      alert("회원가입 기준에 맞지 않습니다. 다시 확인하세요.");
    } else {
      dispatch(
        signupRequest({
          email,
          password,
          nickname,
        })
      );
    }

    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
  }, [email, password, passwordCheck, term]);
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div className="mx-auto w-auto bg-light-beige rounded-md h-10 w-10">
            <BookmarkIcon className="w-10 h-10" />
          </div>
          <h4 className="mt-8 text-center text-3xl font-bold tracking-tight text-gray-900">
            회원가입
          </h4>
          <h4 className="mt-2 text-center text-light-brown font-medium">
            EngWord와 함께해요!
          </h4>
        </div>
        {/* <form className="mt-8 space-y-6"> */}
        <input type="hidden" name="remember" defaultValue="true" />
        <div className=" rounded-lg shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              value={email}
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative mb-2 block w-full appearance-none rounded-lg border-2 border-light-beige px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark-green focus:outline-none focus:dark-green sm:text-sm"
              placeholder="Email"
              onChange={onChangeEmail}
            />
          </div>
          {emailRule.test(email) ? null : (
            <p className="ml-3 text-red-500">
              이메일 형식(ex) test.gmail.com)에 맞게 입력하세요.
            </p>
          )}

          <div>
            <label htmlFor="nickname" className="sr-only">
              nickname
            </label>
            <input
              id="nickname"
              value={nickname}
              name="nickname"
              type="text"
              autoComplete="current-nickname"
              required
              className="relative mb-2 block w-full appearance-none rounded-lg border-2 border-light-beige px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark-green focus:outline-none focus:dark-green sm:text-sm"
              placeholder="Nickname"
              onChange={onChangeNickname}
            />
          </div>
          {nicknameRule.test(nickname) ? null : (
            <p className="ml-3 text-red-500">
              닉네임은 한글, 영문, 숫자 포함 가능합니다.
            </p>
          )}

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              value={password}
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative mb-2 block w-full appearance-none rounded-lg border-2 border-light-beige px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark-green focus:outline-none focus:dark-green sm:text-sm"
              placeholder="Password"
              onChange={onChangePassword}
            />
          </div>
          {passwordRule.test(password) ? null : (
            <p className="ml-3 text-red-500">
              비밀번호는 숫자, 영문포함 6자리 이상 12자리 이하로 입력하세요.
            </p>
          )}
          <div>
            <label htmlFor="passwordCheck" className="sr-only">
              Password Check
            </label>
            <input
              id="passwordCheck"
              value={passwordCheck}
              name="passwordCheck"
              type="password"
              autoComplete="current-password"
              required
              className="relative mb-2 block w-full appearance-none rounded-lg border-2 border-light-beige px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-dark-green focus:outline-none focus:dark-green sm:text-sm"
              placeholder="Password Check"
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <h4 className="text-red-400 font-bold">
                비밀번호가 일치하지 않습니다
              </h4>
            )}
          </div>
          <div>
            <div className="form-check">
              <input
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm  checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                id="flexCheckChecked"
                value={term}
                checked={term}
                onChange={onChangeTerm}
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="flexCheckChecked"
              >
                최종적으로 모든 정보가 이상 없습니까?
              </label>
              {termError && (
                <h4 className="text-red-400 font-bold">
                  체크박스를 확인 바랍니다.
                </h4>
              )}
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={onSubmitUserForm}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-dark-green py-2 px-4 text-sm font-medium text-white hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-light-beige focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockOpenIcon
                className="h-5 w-5 text-light-beige group-hover:text-light-beige"
                aria-hidden="true"
              />
            </span>
            Sign up
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default JoinForm;
