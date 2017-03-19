import React from 'react'

const S = {
  COLOR : '#f44336',
  ROOT : {
    display : 'inline-block',
    width: '14px',
    height: '14px',
    marginLeft: '5px'
  },
  SVG : {
    paddingTop: '3px',
    paddingLeft: '2px',
    paddingRight: '2px'
  }
};

const SvgDown = () => (
   <span style={S.ROOT}>
     <svg viewBox="0 0 12 12" width="100%" height="100%"
          style={S.SVG} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
      >
          <path
              d="M 0,0 L 11,0 6,12, 0,0"
              strokeWidth="1"
              //stroke="#ED5813"
              strokeLinejoin="miter"
              stroke={S.COLOR}
              fill={S.COLOR}
              //fill="#ED5813"
          >
          </path>
     </svg>
   </span>
)

export default SvgDown
