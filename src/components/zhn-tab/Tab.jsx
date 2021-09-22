//import PropTypes from "prop-types";
import crCn from '../zhn-utils/crCn';

const CL_TAB = 'tab'
, CL_TAB_SELECTED = 'tab--selected';

const Tab = ({
  id,
  title,
  isSelected,
  onClick
}) => {
  const _cn = crCn(CL_TAB, [isSelected, CL_TAB_SELECTED]);

  return (
    <button
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

/*
Tab.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
}
*/


export default Tab
