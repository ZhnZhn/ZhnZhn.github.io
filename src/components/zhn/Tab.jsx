import React, { PropTypes } from 'react';

const S = {
  LI : {
    float : 'left',
    display : 'inline-block',

    backgroundColor : '#232F3B',

    //color : 'rgba(164, 135, 212, 1)',
    color : 'gray',
    paddingLeft : '10px',
    paddingRight : '10px',
    paddingTop : '6px',
    paddingBottom : '6px',
    borderTopLeftRadius : '8px',
    borderTopRightRadius : '8px',
    cursor : 'pointer',

    fontWeight : 'bold',
    //border: '2px solid rgb(44, 40, 40)',
    border: '2px solid gray',
    borderBottom : 'none',
    //borderTop : 'none'
  },
  SELECTED : {
    borderColor : 'rgba(164, 135, 212, 1)',
    color : 'rgba(164, 135, 212, 1)'
  }
}


const Tab = ({ title, isSelected, onClick }) => {
    const _selectedStyle = (isSelected) ? S.SELECTED : null;
    return (
       <li
          style={Object.assign({}, S.LI, _selectedStyle)}
          onClick={onClick}
       >
          <span>{title}</span>
       </li>
    )
}

Tab.propTypes = {
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
}


export default Tab
