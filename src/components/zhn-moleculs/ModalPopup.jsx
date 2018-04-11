import React from 'react'

import ShowHide from '../zhn/ShowHide'
import ModalPane from './ModalPane'

import withTheme from '../hoc/withTheme'

const TH_ID = 'ELEMENT'

const ModalPopup = ({
  theme,
  isShow, className, style, children, onClose
}) => {
  const TS = theme.getStyle(TH_ID);
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

export default withTheme(ModalPopup)
