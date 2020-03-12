import React, { useContext } from 'react';
//import PropTypes from "prop-types";

import ThemeContext from '../hoc/ThemeContext'

import SvgMore from './SvgMore';
import SvgCheckBox from './SvgCheckBox';
import SvgClose from './SvgClose';

const TH_ID = 'ELEMENT';

const CL = {
  ROOT: 'gap-right',
  NOT_SELECTED: 'not-selected'
};

const S = {
  ROOT: {
    position: 'relative',
    backgroundColor: '#1b2836',
    paddingTop: 4,
    paddingLeft: 10,
    paddingRight: 42,
    marginBottom: 10,
    lineHeight: '1.8',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'clip'
  },
  CAPTION: {
    paddingRight: 8,
    fontSize: '18px',
    fontWeight: '500'
  },
  SVG_MORE: {
    fill: 'inherit',
    stroke: 'inherit'
    //fill: 'silver',
    //stroke: 'silver'
  },
  CHECK_BOX: {
    marginLeft: 10,
    marginRight: 10
  },
  SVG_CLOSE: {
    position: 'absolute',
    top: 6,
    right: 0
  }
};

const _isFn = fn => typeof fn === 'function';

const BrowserCaption = ({
  style,
  caption, children,
  onMore,
  onCheck, onUnCheck,  
  onClose
}) => {
  const theme = useContext(ThemeContext)
  , TS = theme.getStyle(TH_ID);
  return (
  <div
    className={CL.ROOT}
    style={{...S.ROOT, ...style, ...TS.ROOT}}
  >
     {
       _isFn(onMore) &&
       <SvgMore
          svgStyle={S.SVG_MORE}
          onClick={onMore}
       />
     }
     {
        (_isFn(onCheck) && _isFn(onUnCheck)) &&
        <SvgCheckBox
           initValue={false}
           style={S.CHECK_BOX}
           onCheck={onCheck}
           onUnCheck={onUnCheck}
        />
     }
     <span
        className={CL.NOT_SELECTED}
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
  );
}
/*
BrowserCaption.propTypes = {
  caption: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  onMore: PropTypes.func,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func,
  onClose: PropTypes.func
}
*/

export default BrowserCaption
