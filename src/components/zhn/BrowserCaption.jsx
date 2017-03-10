import React, { PropTypes } from 'react'

import SvgClose from './SvgClose';

const STYLE = {
  ROOT : {
    backgroundColor: '#232F3B',
    color: 'rgba(164, 135, 212, 1)',
    lineHeight: '1.8',
    paddingTop: '4px',
    paddingLeft: '10px',
    marginBottom: '10px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px'
  },
  CAPTION : {
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  }
};

const BrowserCaption = ({ caption, children, onClose }) => (
  <div style={STYLE.ROOT}>
     <span
        className="not-selected"
        style={STYLE.CAPTION}
     >
       {caption}
    </span>
    {children}
    <SvgClose
      style={{ position: 'relative', top: '3px' }}
      onClose={onClose}
    />
  </div>
)
BrowserCaption.propTypes = {
  caption: PropTypes.string,
  onClose: PropTypes.func
}

export default BrowserCaption
