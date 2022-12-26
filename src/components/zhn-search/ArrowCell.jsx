const CL_BT = 'zhn-select__bt-arrow'
, S_ARROW_CELL = { top: 0 }
, S_ARROW = {
  display: 'inline-block',
  height: 0,
  width: 0,
  borderColor: '#999 transparent transparent',
  borderStyle: 'solid',
  borderWidth: '10px 8px 4px'
};

const ArrowCell = ({
  arrowStyle,
  tabIndex="-1",
  onClick
}) => (
  <button
     type="button"
     tabIndex={tabIndex}
     className={CL_BT}
     style={S_ARROW_CELL}
     onClick={onClick}>
    <span style={{...S_ARROW, ...arrowStyle}}/>
  </button>
);

export default ArrowCell
