import React from 'react';

const SvgPlus = ({ onClick }) => (
  <div className="button-circle" onClick={onClick}>
     <svg
          width="20px" height="20px"
          viewBox="0 0 20 20"
          preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
      >
      <path
            d="M 10,4 L 10,16 M 4,10 L 16,10"
            strokeWidth="2"
            strokeLinecap="round"
       >
      </path>
     </svg>
  </div>
)


export default SvgPlus
