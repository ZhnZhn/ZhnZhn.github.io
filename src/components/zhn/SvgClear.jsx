import React from 'react';
//import PropTypes from "prop-types";

import SvgX from './svg/SvgX'

const CL = "bt-svg-clear";

const SvgClear = ({ style, onClick }) => (
   <button
      tabIndex="-1"
      className={CL}
      style={style}
      onClick={onClick}
   >
     <SvgX />
   </button>
);

/*
SvgClear.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func
}
*/

export default SvgClear
