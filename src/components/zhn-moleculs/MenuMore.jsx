import {
  crElementBorderCn,
  crAbsoluteTopLeftStyle
} from '../styleFn';

import SvgMore from '../zhn/SvgMore';
import { ModalSlider } from '../zhn-modal-slider/ModalSlider';

const CL_MENU_MORE = crElementBorderCn('dialog__menu-more')
, S_BT_MORE = crAbsoluteTopLeftStyle(1, 2);

const MenuMore = ({
  refEl,
  isMore,
  menuModel,
  toggle
}) => menuModel ? (
  <>
    <SvgMore
      refEl={refEl}
      style={S_BT_MORE}
      onClick={toggle}
    />
    <ModalSlider
      isShow={isMore}
      className={CL_MENU_MORE}
      model={menuModel}
      onClose={toggle}
    />
  </>
) : null;

export default MenuMore
