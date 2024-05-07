import {
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
  getInputValue
} from '../uiApi';

import { crStyle2 } from '../styleFn';

import CellColor from '../zhn-moleculs/CellColor';
import { TRANSPARENT_COLOR } from '../styles/Color';
import BtCounter from './BtCounter';
import ColorList from './ColorList';

const COLORS1 = [
  '#8abb5d',
  '#f7a35c',
  '#795548',
  '#f15c80',
  '#f45b5b',

  '#d2b772',
  '#dda0dd',
  '#fffafa'
];
const COLORS2 = [
  '#f1d600',
  '#008b8b',
  '#2f7ed8',
  '#673ab7',
  '#000000',

  '#607d8b',
  '#7092be',
  '#c3c3c3'
];

const CL_INPUT_COLOR = 'va-b'
, S_ROOT = { padding: '6px 0 4px 4px' }
, S_ROW2 = { paddingTop: 4 }
, S_ROW2_PADDING = { paddingLeft: 56 }
, S_BT_COUNTER = {
  marginLeft: 14,
  marginRight: 16
}
, S_TO_CELL = { margin: '0 12px' };

const _hasLineWidth = ({
  value
} = {}) => !value
 || value === 'SPLINE'
 || value === 'LINE';

const SeriaColor = ({
  refEl,
  isLong,
  chartType
}) => {
  const _refLineWidth = useRef()
  , [
    color,
    setColor
  ] = useState(TRANSPARENT_COLOR)
  , [
    _hClick,
    _hReset
  ] = useMemo(() => [
    (nextColor) => {
      if (nextColor) {
        setColor(nextColor)
      }
    },
    () => {
      setColor(TRANSPARENT_COLOR)
    }
  ], []);

  useImperativeHandle(refEl, () => ({
    getValue: () => ({
       seriaColor: color !== TRANSPARENT_COLOR
          ? color
          : void 0,
       seriaWidth: _hasLineWidth(chartType)
         ? getInputValue(_refLineWidth)
         : void 0
    })
  }), [color, chartType])

  const _isLineWidth = _hasLineWidth(chartType)
  , _rowStyle = crStyle2(
      S_ROW2,
      !_isLineWidth && S_ROW2_PADDING
    );

  return (
    <div style={S_ROOT}>
      <div>
        <CellColor
          color={color}
          className={CL_INPUT_COLOR}
          style={S_TO_CELL}
          onClick={_hReset}
        />
        <ColorList
          isLong={isLong}
          colors={COLORS1}
          onClick={_hClick}
        />
      </div>
      <div style={_rowStyle}>
         <BtCounter
            refEl={_refLineWidth}
            isShow={_isLineWidth}
            style={S_BT_COUNTER}
            title="Line Width"
          />
          <ColorList
            isLong={isLong}
            colors={COLORS2}
            onClick={_hClick}
          />
      </div>
    </div>
  );
};

export default SeriaColor
