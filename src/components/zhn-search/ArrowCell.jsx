import { CL_TOGGLE_ARROW } from '../styleFn'

const CL_BT = 'zhn-select__bt-arrow'
, S_ARROW_CELL = { top: 0 };

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
     onClick={onClick}
  >
    <span
      className={CL_TOGGLE_ARROW}
      style={arrowStyle}
    />
  </button>
);

export default ArrowCell
