import { filterBoolean } from '../../utils/arrFn';
import CellColor from '../zhn-moleculs/CellColor';

const N_SHORT = 5
, CL_INPUT_COLOR = 'va-b'
, S_CELL = { marginRight: 4 };

const ColorList = ({
  isLong,
  colors,
  onClick
}) => {
  const _max = isLong
    ? colors.length
    : N_SHORT;
  return filterBoolean(colors.map((color, i) => i < _max
    ? (<CellColor
         key={color}
         className={CL_INPUT_COLOR}
         style={S_CELL}
         color={color}
         onClick={onClick}
       />)
    : null
  ));
}

export default ColorList
