import React from 'react';
//import PropTypes from "prop-types";

import SvgMore from './SvgMore'
import SvgClose from './SvgClose';

const S = {
  ROOT: {
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
  CAPTION: {
    //color: 'lightslategray',
    color: 'silver',
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
  },
  SVG_MORE: {
    fill: 'silver',
    stroke: 'silver'
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: '6px',
    right: 0
  }
};

const BrowserCaption = ({ isMore, caption, children, onMore, onClose }) => (
  <div style={S.ROOT}>
     {
       isMore &&
       <SvgMore
         svgStyle={S.SVG_MORE}
         onClick={onMore}
       />
     }
     <span
        className="not-selected"
        style={S.CAPTION}
     >
       {caption}
    </span>
    {children}
    <SvgClose
      style={S.SVG_CLOSE}
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
