import React from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme';

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
    //color: 'rgba(164, 135, 212, 1)',
    //color: 'silver'
    lineHeight: '1.8',
    paddingTop: '4px',
    paddingLeft: '4px',
    paddingRight: '42px',
    marginBottom: '10px',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'clip'
  },
  CAPTION: {
    //color: 'silver',
    fontSize: '18px',
    fontWeight: '500',
    paddingRight: '8px'
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
    top: '6px',
    right: 0
  }
};

const _isFn = fn => typeof fn === 'function';

const BrowserCaption = ({
  theme,
  onMore,
  onCheck, onUnCheck,
  caption, children,
  onClose
}) => {
  const TS = theme.getStyle(TH_ID);
  return (
  <div className={CL.ROOT} style={{...S.ROOT, ...TS.ROOT}}>
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
  onMore: PropTypes.func,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func,
  caption: PropTypes.string,
  onClose: PropTypes.func
}
*/

export default withTheme(BrowserCaption)
