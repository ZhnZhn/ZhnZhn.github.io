import SvgMore from '../zhn/SvgMore';
import { ModalSlider } from '../zhn-modal-slider/ModalSlider';

const CL_MENU_MORE = 'popup-menu dialog__menu-more el-b'
, S_BT_MORE = {
  position: 'absolute',
  top: 1,
  left: 2
};

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
