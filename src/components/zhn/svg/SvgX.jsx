import React from 'react'

const S = {
  SVG: {
    padding: 3
  }
};

const SvgX = () => (
  <svg viewBox="0 0 12 12" width="100%" height="100%"
       style={S.SVG} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
       strokeWidth="2"
       strokeLinecap="round"
   >
     <path d="M 0,0 L 12,12" />
     <path d="M 12,0 L 0,12" />
  </svg>
);

export default SvgX
