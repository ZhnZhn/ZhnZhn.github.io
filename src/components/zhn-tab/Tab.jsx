//import PropTypes from "prop-types";

const CL_TAB = 'tab';

const S_BT = {
  color: '#2f7ed8',
  borderBottom : '3px solid #2f7ed8'
},
S_TITLE = {
  color: '#2f7ed8'
};

const Tab = ({
  id,
  title,
  isSelected,
  onClick
}) => {
  const [_btStyle, _titleStyle] = isSelected
    ? [S_BT, S_TITLE] : [];
  return (
    <button
       className={CL_TAB}
       style={_btStyle}
       id={`tab-${id}`}
       role="tab"
       aria-selected={isSelected}
       aria-controls={`tabpanel-${id}`}
       onClick={onClick}
    >
       <span style={_titleStyle}>{title}</span>
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
