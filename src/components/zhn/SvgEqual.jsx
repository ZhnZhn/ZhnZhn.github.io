import React from 'react';

const CL = {
  ROOT: 'svg-move',
  SVG: 'svg-move__svg svg-equal'
};

const SvgEqual = () => (
   <span className={CL.ROOT}>
     <svg viewBox="0 0 12 12" width="100%" height="100%"
          className={CL.SVG}
          preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M 0,3 L 12,3 M 0,7 L 12,7" />
     </svg>
   </span>
);

export default SvgEqual
