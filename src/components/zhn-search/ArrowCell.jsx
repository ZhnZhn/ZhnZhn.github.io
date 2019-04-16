import React from 'react';

const S = {
  ARROW_CELL: {
    position: 'absolute',
    top: '10px',
    right: '0px',
    cursor: 'pointer',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '35px',
    paddingRight: '5px'
  },
  ARROW: {
    position: 'relative',
    top: '2px',
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '10px 8px 4px',
    display: 'inline-block',
    height: '0px',
    width: '0px'
  }
}

const ArrowCell = ({ arrowStyle, tabIndex="-1", onClick }) => (
  <button
     style={S.ARROW_CELL}
     tabIndex={tabIndex}
     onClick={onClick}>
    <span style={{ ...S.ARROW, ...arrowStyle}}/>
  </button>
);


export default ArrowCell
