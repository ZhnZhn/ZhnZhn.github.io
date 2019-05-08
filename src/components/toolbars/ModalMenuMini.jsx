import React from 'react'

import ModalPopup from '../zhn-moleculs/ModalPopup'
import SubMenuItem from './SubMenuItem'

import STYLE from './ModalMenu.Style'

const _renderItems = (configs, onClickItem) => {
  return configs.map(c => {
    const { btTitle } = c;
    return (
      <SubMenuItem
        caption={btTitle}
        onClick={onClickItem.bind(null, btTitle)}
      />
    );
  })
};

const ModalMenuMini = ({
  isShow, onClose,
  configs, onClickItem
}) => (
  <ModalPopup
    isShow={isShow}
    style={STYLE.ROOT}
    onClose={onClose}
  >
    <div style={STYLE.PANE}>
      {configs && _renderItems(configs, onClickItem)}
    </div>
  </ModalPopup>
);

export default ModalMenuMini
