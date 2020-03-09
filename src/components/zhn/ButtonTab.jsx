import React, { useContext } from 'react';
//import PropTypes from "prop-types";

import ThemeContext from '../hoc/ThemeContext'


const TH_ID = 'ELEMENT';

const CL = {
  BT_TAB: 'button-tab not-selected',
  BT_TAB__SHOW: 'button-tab button-tab--show not-selected',
  ARROW: 'arrow-down'
};

const _isBool = bool => typeof bool === 'boolean';

const ButtonTab = ({
  isShow, isMenu,
  className, style,
  caption, children,
  onClick
}) => {
  const theme = useContext(ThemeContext)
  , TS = theme.getStyle(TH_ID)
  , _rootClass = _isBool(isShow) & isShow
       ? CL.BT_TAB__SHOW
       : CL.BT_TAB
  , _btClass = className
       ? `${_rootClass} ${className}`
       : _rootClass;
  return (
    <button
      className={_btClass}
      style={{...style, ...TS.BG}}
      onClick={onClick}
    >
       {caption}
       {isMenu && <span className={CL.ARROW} />}
       {children}
    </button>
  );
}

export default ButtonTab
