import React, { useCallback, useEffect, useRef, useState } from "react";
import { LockOpenIcon } from "@heroicons/react/20/solid";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { signupRequest } from "../redux/feature/userSlice";

import { emailRule, passwordRule, nicknameRule } from "../config/regRule";

const JoinForm = () => {
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [term, setTerm] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const userRef = useRef();

  const [validEmail, setValidEmail] = useState(false);
  const [validNickname, setValidNickname] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = emailRule.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = nicknameRule.test(nickname);
    setValidNickname(result);
  }, [nickname]);

  useEffect(() => {
    const result = nicknameRule.test(nickname);
    setValidNickname(result);
  }, [password]);

  useEffect(() => {
    const result = passwordRule.test(password);
    setValidPassword(result);
  }, [password]);

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
      !nicknameRule.test(nickname) ||
      term === false
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
          <h4 className="mt-20 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            회원가입
          </h4>
          <h4 className="mt-2 text-center text-light-orange font-bold">
            EngWord와 함께해요!
          </h4>
        </div>
        {/* <form className="mt-8 space-y-6"> */}
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-lg shadow-sm bg-gray-100 p-2">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            ref={userRef}
            id="email-address"
            value={email}
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mb-2 relative p-2 block w-full appearance-none shadow-lg shadow-black-500/40 rounded-lg dark:bg-white dark:text-black"
            placeholder="Email"
            onChange={onChangeEmail}
          />
          {email && !validEmail ? (
            <div className="bg-light-beige rounded-lg">
              <p className="ml-3 mt-1 dark:text-black">
                이메일 형식(ex) test.gmail.com)에 맞게 입력하세요.
              </p>
            </div>
          ) : null}

          <label htmlFor="nickname" className="sr-only">
            nickname
          </label>
          <input
            ref={userRef}
            id="nickname"
            value={nickname}
            name="nickname"
            type="text"
            autoComplete="current-nickname"
            required
            className="mb-2 relative p-2 block w-full appearance-none shadow-lg shadow-black-500/40 rounded-lg dark:bg-white dark:text-black"
            placeholder="Nickname"
            onChange={onChangeNickname}
          />

          {nickname && !validNickname ? (
            <div className="bg-light-beige rounded-lg">
              <p className="ml-3 mt-1 dark:text-black">
                닉네임은 한글, 영문, 숫자 포함 가능합니다.
              </p>
            </div>
          ) : null}

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
            className="mb-2 relative p-2 block w-full appearance-none shadow-lg shadow-black-500/40 rounded-lg dark:bg-white dark:text-black"
            placeholder="Password"
            onChange={onChangePassword}
          />

          {password && !validPassword ? (
            <div className="bg-light-beige rounded-lg">
              <p className="ml-3 mt-1 dark:text-black">
                숫자, 영문포함{" "}
                <span className="font-bold">6자리 이상 12자리 이하</span>로
                입력하세요.
              </p>
            </div>
          ) : null}

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
            className="mb-2 relative p-2 block w-full appearance-none shadow-lg shadow-black-500/40 rounded-lg dark:bg-white dark:text-black"
            placeholder="Password Check"
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <div className="bg-light-beige rounded-lg">
              <p className="ml-3 mt-1 text-red-500">
                비밀번호가 일치하지 않습니다
              </p>
            </div>
          )}

          <div className="form-check">
            <input
              className="dark:accent-light-orange accent-light-green mr-1 h-4 w-4 rounded cursor-pointer"
              type="checkbox"
              id="flexCheckChecked"
              value={term}
              checked={term}
              onChange={onChangeTerm}
            />
            <label
              className="form-check-label inline-block text-gray-800 mt-5"
              htmlFor="flexCheckChecked"
            >
              모든 정보를 입력 후 이상없다면,{" "}
              <span className="text-dark-green font-bold dark:text-light-orange">
                체크박스를 체크하세요.
              </span>
            </label>
            {termError && (
              <h4 className="text-red-400 font-bold">
                체크박스를 확인 바랍니다.
              </h4>
            )}
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
