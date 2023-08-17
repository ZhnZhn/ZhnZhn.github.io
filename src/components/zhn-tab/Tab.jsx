import { crCn } from '../styleFn';

const CL_TAB = 'tab'
, CL_TAB_SELECTED = `${CL_TAB}--selected`;

const Tab = ({
  id,
  title,
  isSelected,
  onClick
}) => {
  const _cn = crCn(
    CL_TAB,
    [isSelected, CL_TAB_SELECTED]
  );

  return (
    <button
       type="button"
       className={_cn}
       id={`tab-${id}`}
       role="tab"
       aria-selected={isSelected}
       aria-controls={`tabpanel-${id}`}
       onClick={onClick}
    >
       {title}
    </button>
  );
}

export default Tab
