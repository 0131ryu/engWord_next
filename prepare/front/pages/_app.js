import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import wrapper from "../redux/store";
import { ThemeProvider } from "next-themes";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>engWord</title>
      </Head>
      <ThemeProvider attribute="class">
        <Component />
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(App);
