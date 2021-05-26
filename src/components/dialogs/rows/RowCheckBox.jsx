import { useState, useCallback } from 'react';
//import PropTypes from "prop-types";
import useTheme from '../../hooks/useTheme';
import useRefInit from '../../hooks/useRefInit';
import SvgCheckBox from '../../zhn/SvgCheckBox';

const CL = "bt-chb"
, TH_ID = 'ROW_CHECKBOX'
, CHECKED_COLOR = '#1b2836';

const S = {
  ROOT: {
    paddingTop: 6,
    paddingLeft: 16
  },
  CAPTION: {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: 12,
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none',
    cursor: 'pointer'
  },
  CHECKED: {
    color: CHECKED_COLOR
  }
};

const _isFn = fn => typeof fn == 'function'
, _isUndefined = v => typeof v === 'undefined'
, _isBool = bool => typeof bool === 'boolean';

const _crCheckedStyle = color => ({ color });

const RowCheckBox = ({
  style,
  checkedColor=CHECKED_COLOR,
  value,
  initValue,
  caption,
  captionStyle,
  onCheck,
  onUnCheck,
  onToggle
}) => {
  const [valueState, setValueState] = useState(
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
  }, [onUnCheck, onToggle, _isValueState])
  , _hToggle = useCallback(() => {
      if (_value) {
        _hUnCheck()
      } else {
        _hCheck()
      }
  }, [_value, _hUnCheck, _hCheck])
  , TS = useTheme(TH_ID);

  const _style = _value
    ? {...captionStyle, ..._crCheckedStyle(checkedColor)}
    : captionStyle;

  return (
    <div style={{...S.ROOT, ...style}}>
      <SvgCheckBox
        value={_value}
        checkedRestStroke={checkedColor}
        checkedRestFill={checkedColor}
        checkedColor={TS.CHECKED_COLOR}
        onCheck={_hCheck}
        onUnCheck={_hUnCheck}
      />
      {
        caption && (
          <button
            className={CL}
            tabIndex="-1"
            style={{...S.CAPTION, ..._style}}
            onClick={_hToggle}
          >
            {caption}
          </button>
        )
      }
    </div>
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
