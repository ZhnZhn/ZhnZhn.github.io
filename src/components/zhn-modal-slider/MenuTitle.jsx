import { crAbsoluteTopLeftStyle } from '../styleFn';
import MenuAriaItem from './MenuAriaItem';

const S_ITEM = { position: 'relative' }
, S_PREV_PAGE = crAbsoluteTopLeftStyle(0, 16)
  , S_TITLE = { paddingLeft: 22 };

const MenuTitle = ({
  refEl,
  titleCl,
  title,
  onClick
}) => title ? (
  <MenuAriaItem
    refEl={refEl}
    className={titleCl}
    style={S_ITEM}
    onClick={onClick}
  >
    <span style={S_PREV_PAGE}>
      {"<"}
    </span>
    <span style={S_TITLE}>
      {title}
    </span>
  </MenuAriaItem>
) : null;

export default MenuTitle
