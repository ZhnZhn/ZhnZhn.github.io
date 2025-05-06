import { CL_ROW_TOPIC } from '../styleFn';
import { useKeyEnter } from '../hooks/fUseKey';

import LabelNew from './LabelNew';
import MenuItemBadge from './MenuItemBadge';

const MenuItem = (props) => {
  const _hKeyDown = useKeyEnter(props.onClick);
  return (
    <div
      ref={props.refItem}
      tabIndex="0"
      role="menuitem"
      className={CL_ROW_TOPIC}
      style={props.style}
      onClick={props.onClick}
      onKeyDown={_hKeyDown}
   >
     {props.title}
     {props.atomBadge ? <MenuItemBadge
        atomBadge={props.atomBadge}
        onOpen={props.onBadgeClick}
        onClose={props.onBadgeClose}
     /> : null}
     {props.isNew ? <LabelNew /> : null}     
  </div>
  );
}

export default MenuItem
