//import PropTypes from "prop-types";
import {
  useState,
  useMemo,
  useImperativeHandle
} from '../uiApi';

import {
  crColorStyle
} from '../styleFn';

import { useToggleFalse } from '../hooks/useBool';
import { getDateFromVm } from '../../utils/dateFn';

import {
  DT_UP,
  DT_DOWN,
  DT_EQUAL
} from '../../constants/DirectionType';

import Button from '../zhn/Button';
import {
  SpanValue,
  SpanMove,
  SpanDate,
  SpanGap
} from '../zhn/SpanToken';

import ValueMovingModal from './ValueMovingModal';
import { CL_VM_BADGE_BT } from './Item.Style';

const S_ROOT = {
  position: 'relative',
  display: 'inline-block',
  marginLeft: 10
},
S_DATE = {
  padding: '4px 5px 2px 5px'
},
S_UP = crColorStyle('#4caf50'),
S_DOWN = crColorStyle('#f44336'),
S_EQUAL = crColorStyle('#2f7ed8');

const _hmDirection = {
  DF: [null],
  [DT_DOWN]: ["-", S_DOWN],
  [DT_UP]: ["+", S_UP],
  [DT_EQUAL]: ["", S_EQUAL]
};

const _getDirection = (
  direction
) => _hmDirection[direction]
 || _hmDirection.DF;

const DF_VALUE_MOVING = {
  value: 0,
  delta: 0,
  percent: 0,
  direction: DT_EQUAL,
  date: ''
};

const ValueMovingBadge = ({
  refEl,
  isAdminMode,
  initialVm=DF_VALUE_MOVING,
  crValueMoving
}) => {
  const [
    vm,
    setVm
  ] = useState(initialVm)
  , [
    isShowModal,
    _toggleModal,
    _closeModal
  ] = useToggleFalse()
  , _date = useMemo(
     () => getDateFromVm(initialVm),
     [initialVm]
  )
  /*eslint-disable react-hooks/exhaustive-deps */
  , _updateDateTo = useMemo(() => (dateTo) => {
     const _vm = crValueMoving(vm, dateTo);
     return _vm
       ? (setVm(_vm), _vm)
       : void 0;
  }, [vm]);
  //crValueMoving
  /*eslint-enable react-hooks/exhaustive-deps */

  useImperativeHandle(refEl, () => ({
    _updateDateTo
  }), [_updateDateTo])

  const {
    value,
    delta,
    percent,
    direction
  } = vm
  , [
   _strMove,
   _moveStyle
  ] = _getDirection(direction)
  , _percentToken = _strMove == null
     ? percent
     : `${_strMove}${percent}`;

  return (
    <span style={S_ROOT}>
      <SpanValue>{value}</SpanValue>
      <SpanGap width={10} />
      <SpanMove style={_moveStyle}>
      {_percentToken}
      </SpanMove>
      <SpanGap width={8} />
      <SpanMove style={_moveStyle}>
       {delta}
      </SpanMove>
      <SpanGap width={8} />
      <Button
       className={CL_VM_BADGE_BT}
       onClick={_toggleModal}
      >
       <SpanDate style={S_DATE}>
         {_date}
       </SpanDate>
      </Button>
      {
       _strMove && <ValueMovingModal
          isShow={isShowModal}
          isAdminMode={isAdminMode}
          valueMoving={vm}
          updateDateTo={_updateDateTo}
          onClose={_closeModal}
        />
      }
    </span>
  );
};

/*
ValueMovingBadge.propTypes = {
  refEl: PropTypes.ref,
  valueMoving: PropTypes.shape({
    value: PropTypes.number,
    delta: PropTypes.number,
    percent: PropTypes.number,
    direction: PropTypes.oneOf(
      'up',
      'down',
      'equal',
      'empty'
    ),
    date: PropTypes.string,
    valueTo: ?PropTypes.number,
    dateTo: ?PropTypes.string
  }),
  isAdminMode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  crValueMoving: PropTypes.func,
}
*/

export default ValueMovingBadge
