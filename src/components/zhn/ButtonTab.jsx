import React from 'react';
//import PropTypes from "prop-types";

import useTheme from '../hooks/useTheme'

const TH_ID = 'ELEMENT';

const BT_TAB_CL = 'not-selected button-tab'
, BT_TAB__SHOW_CL = `${BT_TAB_CL} button-tab--show`
, ARROW_CL = 'arrow-down';

const _isBool = bool => typeof bool === 'boolean';
const _crBtClass = (isShow, className) => {
  const _btCl = _isBool(isShow) && isShow
    ? BT_TAB__SHOW_CL
    : BT_TAB_CL;
  return className
    ? `${_btCl} ${className}`
    : _btCl;
}


const ButtonTab = ({
  is=true,
  isShow, isMenu,
  className, style,
  caption, children,
  onClick
}) => {  
  const TS = useTheme(TH_ID)

  if (!is) { return null; }
  const _btClass = _crBtClass(isShow, className);

  return (
    <button
      className={_btClass}
      style={{...style, ...TS.BG}}
      onClick={onClick}
    >
       {caption}
       {isMenu && <span className={ARROW_CL} />}
       {children}
    </button>
  );
}

export default ButtonTab
