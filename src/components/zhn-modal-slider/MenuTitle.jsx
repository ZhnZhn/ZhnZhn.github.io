import { crMenuItemRole } from '../a11yFn';
import { crAbsoluteTopLeftStyle } from '../styleFn';

import { SvgArrowLeft } from '../zhn/svg/Svg';

const S_ITEM = { position: 'relative' }
, S_PREV_PAGE = crAbsoluteTopLeftStyle(7, 3)
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
    <SvgArrowLeft style={S_PREV_PAGE} />
    <span style={S_TITLE}>
      {title}
    </span>
  </div>
) : null;

export default MenuTitle
