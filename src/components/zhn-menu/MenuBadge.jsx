import React, { useContext, useCallback } from 'react';

import ThemeContext from '../hoc/ThemeContext'
import Button from '../zhn/ButtonCircle2'

const TH_ID = 'ELEMENT'
const CL = "menu__badge";

const S = {
  BADGE_OPENED : {
    color: '#a487d4'
  }
};

const MenuBadge = ({
  isOpen, counter,
  onClick, onBadgeClose
}) => {
  const theme = useContext(ThemeContext)
  , TS = theme.getStyle(TH_ID)
  , _btStyle = isOpen
       ? S.BADGE_OPENED
       : null
  , _hClick = useCallback((event) => {
      event.stopPropagation();
      if (!isOpen){
        onClick();
      } else {
        onBadgeClose();
      }
    }, [isOpen, onClick, onBadgeClose]);
  return (
    <Button
      tabIndex="-1"
      className={CL}
      style={{...S.BT, ..._btStyle, ...TS.BG}}
      caption={counter}
      onClick={_hClick}
    />
  );
};

export default MenuBadge
