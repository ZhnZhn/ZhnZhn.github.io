import ModalPopup from '../zhn-moleculs/ModalPopup'
import SubMenuItem from './SubMenuItem'

import {
  S_MODAL_MENU,
  S_MODAL_MENU_PANE
} from './ModalMenu.Style'

const _renderItems = (
  configs,
  onClickItem
) => (configs || [])
 .map(({btTitle}) => (
     <SubMenuItem
       key={btTitle}
       caption={btTitle}
       onClick={onClickItem.bind(null, btTitle)}
     />
 ));


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
      {_renderItems(configs, onClickItem)}
    </div>
  </ModalPopup>
);

export default ModalMenuMini
