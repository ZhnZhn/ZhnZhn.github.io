import { crMenuItemRole } from '../a11yFn';
import { CL_ROW_TOPIC } from '../styleFn';

import LabelNew from './LabelNew';
import MenuItemBadge from './MenuItemBadge';

const MenuItem = (props) => (
  <div
    {...crMenuItemRole(props.onClick, "0")}
    ref={props.refItem}
    className={CL_ROW_TOPIC}
    style={props.style}
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

export default MenuItem
