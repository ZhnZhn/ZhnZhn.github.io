import React from 'react'

const S = {
  BT: {
    verticalAlign: 'middle'
  },
  SVG: {
    fill: 'black',
    stroke: 'black'
  }
};

const SvgMore = ({ style, svgStyle, onClick }) => {
  return (
    <button
      style={{...S.BT, ...style }}
      onClick={onClick}
    >
      <svg
        style={{ ...S.SVG, ...svgStyle }}
        width="16px" height="22px"
        viewBox="0 0 16 22"
        preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="2" cy="4" r="2" />
        <circle cx="2" cy="11" r="2" />
        <circle cx="2" cy="18" r="2" />
      </svg>
    </button>
  );
};

export default SvgMore
