import React from 'react';
//import PropTypes from "prop-types";

import SvgClose from './SvgClose';

const STYLE = {
  ROOT : {
    position: 'relative',
    //backgroundColor: '#232F3B',
    backgroundColor: '#1B2836',
    color: 'rgba(164, 135, 212, 1)',
    lineHeight: '1.8',
    paddingTop: '4px',
    paddingLeft: '10px',
    paddingRight: '42px',
    marginBottom: '10px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px'
  },
  CAPTION : {
    //color: 'lightslategray',
    color: 'silver',
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: '6px',
    right: 0
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
      style={STYLE.SVG_CLOSE}
      onClose={onClose}
    />
  </div>
)
/*
BrowserCaption.propTypes = {
  caption: PropTypes.string,
  onClose: PropTypes.func
}
*/

export default BrowserCaption
