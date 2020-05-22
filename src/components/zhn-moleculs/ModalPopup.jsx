import React from 'react'

import useTheme from '../hooks/useTheme'
import ShowHide from '../zhn/ShowHide'
import ModalPane from './ModalPane'

const TH_ID = 'ELEMENT'

const ModalPopup = ({
  isShow, className, style,
  children, onClose
}) => {
  const TS = useTheme(TH_ID);
  return (
    <ModalPane
      isShow={isShow}
      onClose={onClose}
    >
      <ShowHide
        className={className}
        style={{ ...style, ...TS.BORDER}}
        isShow={isShow}
      >
        {children}
      </ShowHide>
    </ModalPane>
  );
};

export default ModalPopup
