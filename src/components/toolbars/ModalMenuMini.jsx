import { bindTo } from '../uiApi';

import ModalPopup from '../zhn-moleculs/ModalPopup';
import SubMenuItem from './SubMenuItem';

import {
  S_MODAL_MENU,
  S_MODAL_MENU_PANE
} from './ModalMenu.Style';

const ModalMenuMini = ({
  isShow,
  style,
  onClose,
  configs,
  onClickItem
}) => (
  <ModalPopup
    isShow={isShow}
    style={{...S_MODAL_MENU, ...style}}
    onClose={onClose}
  >
    <div style={S_MODAL_MENU_PANE}>
      {
        (configs || []).map(({ btTitle }) => (
             <SubMenuItem
               key={btTitle}
               caption={btTitle}
               onClick={bindTo(onClickItem, btTitle)}
             />
         ))
      }
    </div>
  </ModalPopup>
);

export default ModalMenuMini
