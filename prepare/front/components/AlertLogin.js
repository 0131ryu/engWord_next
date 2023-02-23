import { useCallback } from "react";
import { useRouter } from "next/router";

const AlertLogin = () => {
  const router = useRouter();
  const onGoLogin = useCallback(() => {
    router.push("/signin");
  }, []);
  return (
    <section className="flex items-center h-[91.3vh] sm:p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-48 h-48 text-red-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>

        <p className="text-3xl">
          <span className="text-red-500 font-bold">로그인</span>이 필요합니다.
        </p>
        <button
          onClick={onGoLogin}
          rel="noopener noreferrer"
          className="px-8 py-3 font-semibold rounded dark:bg-light-orange"
        >
          로그인하기
        </button>
      </div>
    </section>
  );
};

export default AlertLogin;
