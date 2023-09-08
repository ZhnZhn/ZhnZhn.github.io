import { useCallback } from '../uiApi';
import { crElementBgCn } from '../styleFn';

import ButtonCircle2 from '../zhn/ButtonCircle2';

const CL_MENU_BADGE = crElementBgCn("menu__badge")
, S_ITEM_OPEN = { color: '#a487d4'};

const MenuItemBadge = ({
  atomBadge,
  onOpen,
  onClose
}) => {
  const {
    is,
    value
  } = atomBadge.useAtomValue()
  , _hClick = useCallback(evt => {
    evt.stopPropagation();
    if (is){
      onClose();
    } else {
      onOpen();
    }
  }, [is, onOpen, onClose]);
  return value === 0 ? null : (
    <ButtonCircle2
      tabIndex="-1"
      className={CL_MENU_BADGE}
      style={is ? S_ITEM_OPEN : void 0}
      caption={value}
      onClick={_hClick}
    />
  );
};

export default MenuItemBadge
