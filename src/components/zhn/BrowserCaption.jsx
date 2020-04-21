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
    height: 34,
    paddingLeft: 10,
    paddingRight: 42,
    marginBottom: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'clip'
  },
  CAPTION: {
    position: 'relative',
    top: 6,
    paddingRight: 8,
    fontSize: '18px',
    fontWeight: '500'
  },
  BT_MORE: {
    position: 'relative',
    top: 3
  },
  SVG_MORE: {
    fill: 'inherit',
    stroke: 'inherit'
  },
  CHECK_BOX: {
    marginLeft: 8,
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
  caption, captionStyle,
  children,
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
          style={S.BT_MORE}
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
        style={{...S.CAPTION, ...captionStyle}}
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
