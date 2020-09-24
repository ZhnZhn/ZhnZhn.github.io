import React from 'react';
//import PropTypes from "prop-types";

const CL = 'tab';

const S = {
  BT : {
    color: '#2f7ed8',
    borderBottom : '3px solid #2f7ed8'
  },
  TITLE: {
    color: '#2f7ed8'
  }
};

const Tab = ({ id, title, isSelected, onClick }) => {
  const _btStyle = isSelected ? S.BT : null
  , _titleStyle = isSelected ? S.TITLE : null;
  return (
    <button
       className={CL}
       style={_btStyle}
       id={`tab-${id}`}
       role="tab"
       aria-selected={isSelected}
       aria-controls={`tabpanel-${id}`}
       tabIndex="0"
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
