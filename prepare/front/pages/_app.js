import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";

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

export default EngWordSNS;
