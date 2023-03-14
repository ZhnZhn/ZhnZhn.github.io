//import PropTypes from "prop-types";
import {
  useState,
  useCallback
} from '../../uiApi';

import useRefInit from '../../hooks/useRefInit';
import RowCheckBoxView from './RowCheckBoxView';

const _isFn = fn => typeof fn == 'function'
, _isUndefined = v => typeof v === 'undefined'
, _isBool = bool => typeof bool === 'boolean';

const RowCheckBox = (props) => {
  const {
    value,
    initValue,
    onCheck,
    onUnCheck,
    onToggle
  } = props
  , [
    valueState,
    setValueState
  ] = useState(
    ()=>_isUndefined(value) ? !!initValue : void 0
  )
  , _isValueState = useRefInit(() => _isBool(valueState))
  , _value = _isValueState ? valueState : value
  , _hCheck = useCallback(()=>{
     if (_isFn(onCheck)){
       onCheck()
     } else if (_isFn(onToggle)) {
       onToggle(true)
     }
     if (_isValueState) {
       setValueState(true)
     }
   }, [onCheck, onToggle, _isValueState])
, _hUnCheck = useCallback(() => {
    if (_isFn(onUnCheck)){
      onUnCheck()
    } else if (_isFn(onToggle)) {
      onToggle(false)
    }
    if (_isValueState) {
      setValueState(false)
    }
  }, [onUnCheck, onToggle, _isValueState]);

  return (
    <RowCheckBoxView
      style={props.style}
      caption={props.caption}
      captionStyle={props.captionStyle}
      checkedColor={props.checkedColor}
      value={_value}
      hCheck={_hCheck}
      hUnCheck={_hUnCheck}
    />
  );
};

/*
RowCheckBox.propTypes = {
  style: PropTypes.object,
  checkedColor: PropTypes.string,
  initValue: PropTypes.bool,
  value: PropTypes.bool,
  caption: PropTypes.string,
  captionStyle: PropTypes.object,
  onCheck: PropTypes.func,
  onUnCheck: PropTypes.func,
  onToggle: PropTypes.func
}
*/

export default RowCheckBox
