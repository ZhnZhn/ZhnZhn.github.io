import React from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme'

const TH_ID = 'ELEMENT';

const S = {
  LI : {
    float : 'left',
    display : 'inline-block',
    backgroundColor : '#1b2836',
    color : 'gray',
    paddingLeft : '10px',
    paddingRight : '10px',
    paddingTop : '6px',
    paddingBottom : '6px',
    borderTopLeftRadius : '8px',
    borderTopRightRadius : '8px',
    cursor : 'pointer',

    fontWeight : 'bold',
    border: '2px solid gray',
    borderBottom : 'none',

  },
  SELECTED : {
    borderColor : 'rgba(164, 135, 212, 1)',
    color : 'rgba(164, 135, 212, 1)'
  }
}


const Tab = ({ theme, title, isSelected, onClick }) => {
    const TS = theme.getStyle(TH_ID)
    const _selectedStyle = isSelected
               ? S.SELECTED : null;
    return (
       <li
          style={{ ...S.LI, ...TS.BG, ..._selectedStyle }}
          onClick={onClick}
       >
          <span>{title}</span>
       </li>
    )
}

/*
Tab.propTypes = {
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
}
*/


export default withTheme(Tab)
