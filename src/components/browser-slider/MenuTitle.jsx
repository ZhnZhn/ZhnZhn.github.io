import { useKeyEnter } from '../hooks/fUseKey';

import {
  CL_MENU_ITEM,
  S_TITLE,
  S_TITLE_ARROW
} from './Style';

const MenuTitle = ({
  innerRef,
  title,
  onClick
}) => {
  const _hKeyDown = useKeyEnter(onClick);

  return (
    <div
      ref={innerRef}
      className={CL_MENU_ITEM}
      style={S_TITLE}
      role="menuitem"
      tabIndex="0"
      onClick={onClick}
      onKeyDown={_hKeyDown}
    >
      {title}
      <span style={S_TITLE_ARROW}>
        {'<'}
      </span>
    </div>
  );
}

export default MenuTitle
