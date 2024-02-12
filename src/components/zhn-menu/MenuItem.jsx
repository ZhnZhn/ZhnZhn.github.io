import { crCnNotSelected } from '../styleFn';
import { useKeyEnter } from '../hooks/fUseKey';

import LabelNew from './LabelNew';
import MenuItemBadge from './MenuItemBadge';

const CL_ROW = crCnNotSelected("row__topic");

const MenuItem = ({
  refItem,
  isNew,
  style,
  title,
  atomBadge,
  onBadgeClick,
  onBadgeClose,
  onClick
}) => {
  const _hKeyDown = useKeyEnter(onClick);
  return (
  <div
      ref={refItem}
      tabIndex="0"
      role="menuitem"
      className={CL_ROW}
      style={style}
      onClick={onClick}
      onKeyDown={_hKeyDown}
   >
     {title}
     {atomBadge != null && <MenuItemBadge
          atomBadge={atomBadge}
          onOpen={onBadgeClick}
          onClose={onBadgeClose}
       />
     }
     {isNew ? <LabelNew /> : null}
  </div>
  );
}

export default MenuItem
