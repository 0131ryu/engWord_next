import React from "react";
import Head from "next/head";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import wrapper from "../redux/store";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>engWord</title>
      </Head>
      <Component />
    </>
  );
};

export default wrapper.withRedux(App);
