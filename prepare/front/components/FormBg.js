import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  z-index: 5;
  position: relative;
`;

const FormBg = ({ children }) => {
  return (
    <>
      <FormWrapper>{children}</FormWrapper>
    </>
  );
};

FormBg.prototype = {
  children: PropTypes.node.isRequired,
};

export default FormBg;
