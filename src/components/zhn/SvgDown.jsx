import React from 'react'

const CL = {
  ROOT: 'svg-move',
  SVG: 'svg-move__svg svg-down'
};

const SvgDown = () => (
   <span className={CL.ROOT}>
     <svg viewBox="0 0 12 12" width="100%" height="100%"
          className={CL.SVG}
          preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0,0 L 6,4 11,0 6,12, 0,0" />
     </svg>
   </span>
);

export default SvgDown
