import React from 'react'

import SvgClose from './SvgClose';

const STYLE = {
  ROOT : {
    backgroundColor: '#232F3B',
    color: 'rgba(164, 135, 212, 1)',
    height: '28px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    paddingTop: '4px',
    paddingLeft: '10px',
    marginRight: '5px',
    marginBottom: '10px'
  },
  CAPTION : {
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  }
};

const CaptionRow = ({ caption, children, onClose }) => (
  <div style={STYLE.ROOT}>
     <span
        className="not-selected"
        style={STYLE.CAPTION}
     >
       {caption}
    </span>
    {children}
    <SvgClose onClose={onClose} />
  </div>
)

export default CaptionRow;
