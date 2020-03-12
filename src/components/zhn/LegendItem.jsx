import React, { useState } from 'react';
//import PropTypes from "prop-types";

const CL = 'bt-item';

const S = {
  ITEM : {
    display : 'inline-block',
    paddingLeft : 5,
    paddingRight : 6
  },
  CIRCLE : {
    display : 'inline-block',
    backgroundColor : 'grey',
    width : 12,
    height : 12,
    marginLeft : 6,
    border: '1px solid grey',
    borderRadius : '50%'
  }
}

const DF_STYLES = ['grey', {}];
const DECOR_STYLE = { borderWidth: 2, fontWeight: 'bold' };
const _useStyles = (is, color) => {
  const [borderColor, _decorStyle] = is
    ? [ color, DECOR_STYLE ]
    : DF_STYLES;
  return [
    { color: color, borderColor, ..._decorStyle },
    { backgroundColor: borderColor, borderColor}
  ];
};

const LegendItem = ({ item={}, onClickItem }) => {
  const { color, name, isVisible } = item
  , [is, setIs] = useState(isVisible)
  , [ btStyle, circleStyle ] = _useStyles(is, color)
  , _hClick = () => {
      onClickItem(item);
      setIs(v => !v)
  };
  return (
    <button
       className={CL}
       style={btStyle}
       onClick={_hClick}
    >
      <span style={{...S.CIRCLE, ...circleStyle}} />
      <span style={S.ITEM}>{name}</span>
   </button>
  );
}

/*
LegendItem.propTypes = {
  item: PropTypes.shape({
    isVisible: PropTypes.bool,
    color: PropTypes.string,
    name: PropTypes.string
  })
  onClickItem: PropTypes.func
}
*/

export default LegendItem
