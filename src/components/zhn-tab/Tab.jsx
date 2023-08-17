import { crCn } from '../styleFn';

import {
  CL_TAB,
  CL_TAB_SELECTED,
  crTabId,
  crTabPanelId
} from './tabPaneFn';

const Tab = ({
  id,
  title,
  isSelected,
  onClick,
  onKeyDown
}) => (
  <button
    type="button"
    className={crCn(
      CL_TAB,
      [isSelected, CL_TAB_SELECTED]
    )}
    id={crTabId(id)}
    role="tab"
    tabIndex={isSelected ? '0' : '-1'}
    aria-selected={isSelected}
    aria-controls={crTabPanelId(id)}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    {title}
  </button>
);

export default Tab
