import { crCn } from '../styleFn';

const CL_TAB = 'tab'
, CL_TAB_SELECTED = `${CL_TAB}--selected`;

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
    id={`tab-${id}`}
    role="tab"
    tabIndex={isSelected ? '0' : '-1'}
    aria-selected={isSelected}
    aria-controls={`tabpanel-${id}`}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    {title}
  </button>
);

export default Tab
