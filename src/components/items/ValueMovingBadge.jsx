//import PropTypes from "prop-types";
import {
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle
} from '../uiApi';

import {
  DT_UP,
  DT_DOWN,
  DT_EQUAL
} from '../../constants/DirectionType';

import Button from '../zhn/Button';
import SvgDown from '../zhn/SvgDown';
import SvgUp from '../zhn/SvgUp';
import SvgEqual from '../zhn/SvgEqual';

import SpanValue from '../zhn-span/SpanValue';
import SpanDate from '../zhn-span/SpanDate';
import ValueMovingModal from './ValueMovingModal';

const CL_BT = 'bt';

const S_ROOT = {
  position: 'relative',
  display: 'inline-block',
  marginLeft: 10
},
S_SPAN = {
  marginLeft: 5,
  fontWeight: 'bold'
},
S_W5 = {
  display: 'inline-block',
  width: 5
},
S_DATE = {
  display: 'inline-block',
  padding: '4px 5px 2px 5px'
},
S_UP = {
  color: '#4caf50'
},
S_DOWN = {
  color: '#f44336'
},
S_EQUAL = {
  color: '#2f7ed8'
};

const _hmDirection = {
  DF: [null],
  [DT_DOWN]: [<SvgDown />, S_DOWN],
  [DT_UP]: [<SvgUp />, S_UP],
  [DT_EQUAL]: [<SvgEqual />, S_EQUAL]
};

const _getDirection = direction => _hmDirection[direction]
  || _hmDirection.DF;


const DF_VALUE_MOVING = {
  value: 0,
  delta: 0,
  percent: 0,
  direction: DT_EQUAL,
  date: ''
};

const ValueMovingBadge = forwardRef(({
  isAdminMode,
  initialVm=DF_VALUE_MOVING,
  crValueMoving
}, ref) => {
  const [
    vm,
    setVm
  ] = useState(initialVm)
  , [
    isShowModal,
    setIsShowModal
  ] = useState(false)
  , _toggleModal = useCallback(() => setIsShowModal(is=>!is), [])
  , _closeModal = useCallback(() => setIsShowModal(false), [])
  /*eslint-disable react-hooks/exhaustive-deps */
  , _updateDateTo = useCallback(dateTo => {
     const _vm = crValueMoving(vm, dateTo);
     if (_vm) {
       setVm(_vm)
       return true;
     } else {
       return false;
     }
  }, [vm])
  //crValueMoving
  /*eslint-enable react-hooks/exhaustive-deps */

  useImperativeHandle(ref, () => ({
    _updateDateTo
  }), [_updateDateTo])

  const {
     value,
     delta,
     percent,
     direction,
     date
   } = vm
   , [
     _svgDirection,
     _dStyle
   ] = _getDirection(direction)
   , _spanStyle = {...S_SPAN, ..._dStyle};

  return (
    <span style={S_ROOT}>
       <SpanValue value={value} />
       {_svgDirection}
       <span style={_spanStyle}>
         {percent}
       </span>
       <span style={_spanStyle}>
         {delta}
       </span>
       <span style={S_W5} />
       <Button
         className={CL_BT}
         onClick={_toggleModal}
       >
         <SpanDate style={S_DATE} date={date} />
       </Button>
       {
         _svgDirection && <ValueMovingModal
            isShow={isShowModal}
            isAdminMode={isAdminMode}
            valueMoving={vm}
            updateDateTo={_updateDateTo}
            onClose={_closeModal}
          />
       }
    </span>
  );
});

/*
ValueMovingBadge.propTypes = {
  valueMoving: PropTypes.shape({
    value: PropTypes.number,
    delta: PropTypes.number,
    percent: PropTypes.number,
    direction: PropTypes.oneOf(
      'up', 'down', 'equal', 'empty'
    ),
    date: PropTypes.string
  }),
  isAdminMode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  crValueMoving: PropTypes.func,
}
*/

export default ValueMovingBadge
