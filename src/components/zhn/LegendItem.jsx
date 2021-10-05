//import PropTypes from "prop-types";
import useToggle from '../hooks/useToggle'

const CL = 'bt-item'
, S_ITEM = {
  display: 'inline-block',
  padding: '0 6px'
}
, S_CIRCLE = {
  display: 'inline-block',
  width: 12,
  height: 12,
  marginLeft: 6,
  backgroundColor: 'grey',
  border: '1px solid grey',
  borderRadius: '50%'
}
, DF_BORDER_COLOR = 'grey'
, DECOR_STYLE = { borderWidth: 2, fontWeight: 'bold' }
, _crStyles = (is, color) => {
  const [borderColor, _decorStyle] = is
    ? [color, DECOR_STYLE]
    : [DF_BORDER_COLOR];
  return [
    { color: color, borderColor, ..._decorStyle },
    { backgroundColor: borderColor, borderColor}
  ];
};

const LegendItem = ({
  item,
  onClickItem
}) => {
  const { color, name, isVisible } = item ?? {}
  , [is, toggleIs] = useToggle(isVisible)
  , [btStyle, circleStyle] = _crStyles(is, color)
  , _hClick = () => {
      onClickItem(item);
      toggleIs();
  };
  return (
    <button
       className={CL}
       style={btStyle}
       onClick={_hClick}
    >
      <span style={{...S_CIRCLE, ...circleStyle}} />
      <span style={S_ITEM}>{name}</span>
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
