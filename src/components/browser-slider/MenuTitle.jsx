import { crMenuItemRole } from '../a11yFn';

import {
  CL_MENU_ITEM,
  S_TITLE,
  S_TITLE_ARROW
} from './Style';

const MenuTitle = ({
  innerRef,
  title,
  onClick
}) => (
  <div
    {...crMenuItemRole(onClick, "0")}
    ref={innerRef}
    className={CL_MENU_ITEM}
    style={S_TITLE}
  >
    {title}
    <span style={S_TITLE_ARROW}>
      {'<'}
    </span>
  </div>
);

export default MenuTitle
