import { crMenuItemRole } from '../a11yFn';
import { crAbsoluteTopLeftStyle } from '../styleFn';

const S_ITEM = { position: 'relative' }
, S_PREV_PAGE = crAbsoluteTopLeftStyle(0, 16)
, S_TITLE = { paddingLeft: 22 };

const MenuTitle = ({
  refEl,
  titleCl,
  title,
  onClick
}) => title ? (
  <div
    ref={refEl}
    className={titleCl}
    style={S_ITEM}
    {...crMenuItemRole(onClick, "0")}
  >
    <span style={S_PREV_PAGE}>
      {"<"}
    </span>
    <span style={S_TITLE}>
      {title}
    </span>
  </div>
) : null;

export default MenuTitle
