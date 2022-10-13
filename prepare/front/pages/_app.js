import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { wrapper } from "../store/store";

const EngWordSNS = ({ Component }) => {
  return (
    <>
      <Head>
        <title>engWord</title>
      </Head>
      <Component />
    </>
  );
};

EngWordSNS.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(EngWordSNS);
