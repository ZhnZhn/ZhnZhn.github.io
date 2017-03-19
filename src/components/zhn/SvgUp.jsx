import React from 'react'

const S = {
  COLOR : '#4caf50',
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


const SvgUp = () => (
   <span style={S.ROOT}>
     <svg viewBox="0 0 12 12" width="100%" height="100%"
          style={S.SVG} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 0,12 L 11,12 6,0 0,12"
            strokeWidth="1"
            stroke={S.COLOR}
            fill={S.COLOR}
            strokeLinejoin="miter"
         >
        </path>
     </svg>
   </span>
)

export default SvgUp
