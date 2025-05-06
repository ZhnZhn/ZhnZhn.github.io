import { useCallback } from '../uiApi';
import {
  crElementBgCn,
  crBtCircle2Cn
} from '../styleFn';

import Button from '../zhn/Button';

const CL_MENU_BADGE = crBtCircle2Cn(crElementBgCn("menu__badge"))
, S_ITEM_OPEN = { color: '#a487d4'};

const MenuItemBadge = (props) => {
  const {
    onOpen,
    onClose
  } = props
  , {
    is,
    value
  } = props.atomBadge.useAtomValue()
  , _hClick = useCallback(evt => {
    evt.stopPropagation();
    if (is){
      onClose();
    } else {
      onOpen();
    }
  }, [is, onOpen, onClose]);
  return value ? <Button
    tabIndex="-1"
    className={CL_MENU_BADGE}
    style={is ? S_ITEM_OPEN : void 0}    
    onClick={_hClick}
  >{value}</Button> : null;
};

export default MenuItemBadge
