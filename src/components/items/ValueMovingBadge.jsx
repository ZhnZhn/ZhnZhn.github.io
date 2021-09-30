import { forwardRef, useState, useCallback, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";

import { Direction as D } from '../../constants/Type'

import SvgDown from '../zhn/SvgDown'
import SvgUp from '../zhn/SvgUp'
import SvgEqual from '../zhn/SvgEqual'

import SpanValue from '../zhn-span/SpanValue'
import SpanDate from '../zhn-span/SpanDate'
import ValueMovingModal from './ValueMovingModal'

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
  [D.DOWN]: [<SvgDown />, S_DOWN],
  [D.UP]: [<SvgUp />, S_UP],
  [D.EQUAL]: [<SvgEqual />, S_EQUAL]
};

const _getDirection = direction => _hmDirection[direction]
  || _hmDirection.DF;


const DF_VALUE_MOVING = {
  value: 0,
  delta: 0,
  percent: 0,
  direction: D.EQUAL,
  date: ''
};

const ValueMovingBadge = forwardRef(({
  isAdminMode,
  initialVm=DF_VALUE_MOVING,
  crValueMoving
}, ref) => {
  const [vm, setVm] = useState(initialVm)
  , [isShowModal, setIsShowModal] = useState(false)
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
     value, delta, percent,
     direction,
     date
   } = vm
   , [_svgDirection, _dStyle] = _getDirection(direction)
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
       <button className={CL_BT} onClick={_toggleModal} >
         <SpanDate style={S_DATE} date={date} />
       </button>
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
