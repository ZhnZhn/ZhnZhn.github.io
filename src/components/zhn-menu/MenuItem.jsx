import useKeyEnter from '../hooks/useKeyEnter';

import LabelNew from './LabelNew';
import MenuBadge from './MenuBadge';

const CL_ROW = "row__topic not-selected";

const MenuItem = ({
  isNew,
  isOpen,
  style,
  title,
  counter,
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
     {counter !== 0
        ? <MenuBadge
           counter={counter}
           isOpen={isOpen}
           onClick={onBadgeClick}
           onBadgeClose={onBadgeClose}
        />
        : null
     }
     {isNew ? <LabelNew /> : null}
  </div>
  );
}

export default MenuItem
