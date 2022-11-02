import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import store from "../redux/store";
// import { createWrapper } from "next-redux-wrapper";

const EngWordSNS = ({ Component }) => {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>engWord</title>
        </Head>
        <Component />
      </Provider>
    </>
  );
};

EngWordSNS.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default EngWordSNS;
// export default wrapper.withRedux(EngWordSNS);
