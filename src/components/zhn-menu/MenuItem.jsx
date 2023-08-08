import useKeyEnter from '../hooks/useKeyEnter';

import LabelNew from './LabelNew';
import AtomBadge from './AtomBadge';

const CL_ROW = "row__topic not-selected";

const MenuItem = ({
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
      tabIndex="0"
      role="menuitem"
      className={CL_ROW}
      style={style}
      onClick={onClick}
      onKeyDown={_hKeyDown}
   >
     {title}
     {atomBadge != null && <AtomBadge
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
