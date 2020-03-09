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
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop : 6,
    paddingBottom : 6,
    borderTopLeftRadius : 8,
    borderTopRightRadius : 8,
    cursor : 'pointer',

    fontWeight : 'bold',
    borderTop: '2px solid gray',
    borderLeft: '2px solid gray',
    borderRight: '2px solid gray',
    borderBottom : 'none',

  },
  SELECTED : {
    borderTop: '2px solid #a487d4',
    borderLeft: '2px solid #a487d4',
    borderRight: '2px solid #a487d4',
    color : '#a487d4'
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
