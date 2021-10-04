import { forwardRef } from 'react';

import SvgMore from '../zhn/SvgMore';
import ModalSlider from '../zhn-modal-slider/ModalSlider';

const CL_MENU_MORE = 'popup-menu dialog__menu-more'
, S_BT_MORE = {
  position: 'absolute',
  top: 1,
  left: 2
};

const MenuMore = forwardRef(({
  isMore,
  menuModel,
  TS,
  toggle
}, ref) => {
  if (!menuModel) { return null; }
  return (
    <>
      <SvgMore
        ref={ref}
        style={S_BT_MORE}
        onClick={toggle}
      />
      <ModalSlider
        isShow={isMore}
        className={CL_MENU_MORE}
        style={TS.EL_BORDER}
        model={menuModel}
        onClose={toggle}
      />
    </>
  );
});

export default MenuMore
