import { IfTrue } from '../uiApi';
import { crAbsoluteTopLeftStyle } from '../styleFn';

import SvgMore from '../zhn/SvgMore';
import { ModalSlider } from '../zhn-modal-slider/ModalSlider';

const CL_MENU_MORE = 'dialog__menu-more'
, S_BT_MORE = crAbsoluteTopLeftStyle(4, 2);

const MenuMore = (props) => (
  <IfTrue v={props.menuModel}>
    <>
      <SvgMore
        refEl={props.refEl}
        style={S_BT_MORE}
        onClick={props.toggle}
      />
      <ModalSlider
        isShow={props.isMore}
        className={CL_MENU_MORE}
        model={props.menuModel}
        onClose={props.toggle}
      />
    </>
  </IfTrue>
)

export default MenuMore
