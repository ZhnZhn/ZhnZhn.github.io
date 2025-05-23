//import PropTypes from "prop-types";
import { roundBy } from '../../math/mathFn';

import {
  useRef,
  useState,
  getClientX
} from '../uiApi';

import { HAS_TOUCH_EVENTS } from '../has';
import { crAbsoluteTopLeftStyle } from '../styleFn';

import { useBool } from '../hooks/useBool';

import CircleInner from './CircleInner';

const S_ROOT = {
  position: 'relative',
  width: '100%',
  height: 18,
  margin: '8px 0',
  userSelect : 'none',
  cursor: 'default'
},
S_ROOT_LINE = {
  ...crAbsoluteTopLeftStyle(8, 0),
  width: '100%',
  height: 2
},
S_LINE_BEFORE = {
  ...crAbsoluteTopLeftStyle(0, 0),
  width: 'calc(15%)',
  height: '100%',
  marginRight: 6,
  backgroundColor: '#00bcd4',
  transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
},
S_LINE_AFTER = {
  ...crAbsoluteTopLeftStyle(0, 0, !0),
  width: 'calc(85%)',
  height: '100%',
  marginLeft: 6,
  backgroundColor: '#bdbdbd',
  transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
},
S_LINE_AFTER_HOVERED = {
  ...S_LINE_AFTER,
  backgroundColor: '#9e9e9e',
},
S_ROOT_CIRCLE = {
  ...crAbsoluteTopLeftStyle(0, '15%'),
  zIndex: '1',
  width: 12,
  height: 12,
  cursor: 'pointer',
  pointerEvents: 'inherit',
  margin: '1px 0px 0px',
  backgroundColor: '#00bcd4',
  backgroundClip: 'padding-box',
  border: '0px solid transparent',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'visible',
  outline: 'none',
  transition: 'background 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
},
S_CIRCLE_DRAGGED = {
  width: 20,
  height: 20
},
S_EMBER = {
  top: -12,
  left: -12,
  width: '220%',
  height: 44,
  border: '1px solid #4caf50'
};


const _isNaN = Number.isNaN
, _FN_NOOP = () => {}
, [EVENT_NAME_MOVE, EVENT_NAME_UP] = HAS_TOUCH_EVENTS
    ? ['touchmove','touchend']
    : ['mousemove','mouseup']
, _checkValueInMinMax = (min, max, value) => value > max
    ? max
    : value < min ? min : value
, _toPercent = (value, min, max) => {
    const _percent = (value - min) / (max - min);
    return _isNaN(_percent) ? 0 : _percent*100;
}
, _crWidthStyle = percent => ({
    width: `calc(${percent}%)`
})
, _crLeftStyle = percent => ({
   left: `${percent}%`
})
, _isUp = keyCode => keyCode === 39 || keyCode === 38
, _isDown = keyCode => keyCode === 37 || keyCode === 40
, _calcValueByKeyCode = (value, step, keyCode) => _isUp(keyCode)
    ? value + step
    : _isDown(keyCode) ? value - step : void 0
, _isNumber = n => typeof n === 'number' && n-n === 0
, _getRefValue = ref => ref.current;

const useMouseDown = (setValueFromPosition) => {
  const [isDragged, setDraggedTrue, setDraggedFalse] = useBool(false)
  , _refDragRunning = useRef(false)
  , _hDragMouseMove = (event) => {
    if (_getRefValue(_refDragRunning)) {
      return;
    }
    _refDragRunning.current = true;
    requestAnimationFrame(() => {
      _refDragRunning.current = false;
      setValueFromPosition(event)
    })
  }
  , _hDragMouseUp = () => {
     document.removeEventListener(EVENT_NAME_MOVE, _hDragMouseMove)
     document.removeEventListener(EVENT_NAME_UP, _hDragMouseUp)
     setDraggedFalse()
  },
  _hMouseDown = (event) => {
    // Cancel text selection
    if (!HAS_TOUCH_EVENTS) {
      event.preventDefault()
    }
    document.addEventListener(EVENT_NAME_MOVE, _hDragMouseMove)
    document.addEventListener(EVENT_NAME_UP, _hDragMouseUp)
    setDraggedTrue()
  };
  return [isDragged, _hMouseDown];
};

const InputSlider = ({
  initialValue=4,
  step=1,
  min=0,
  max=20,
  onChange=_FN_NOOP
}) => {
  const _refTrack = useRef()
  , [isHovered, setHoveredTrue, setHoveredFalse] = useBool(false)
  , [value, setValue] = useState(initialValue)

  , _updateValue = (value) => {
    const _value = _checkValueInMinMax(min, max, value);
    setValue(_value)
    onChange(_value)
  }
  , _hKeyDown = (evt) => {
    const { keyCode } = evt
    , _value = _calcValueByKeyCode(value, step, keyCode);
    if (_value != null) {
      evt.preventDefault()
      _updateValue(_value)
    }
  }
  , _calcPositionFromEvent = (evt) => {
    const _trackOffset = _getRefValue(_refTrack).getBoundingClientRect()['left']
    return _isNumber(_trackOffset)
      ? getClientX(evt) - _trackOffset
      : NaN;
  }
  , _setValueFromPosition = (evt) => {
    const positionMax = _getRefValue(_refTrack).clientWidth;
    let position = _calcPositionFromEvent(evt);
    if (_isNumber(position) && _isNumber(positionMax)) {
      if (position < 0) {
        position = 0;
      } else if (position > positionMax) {
        position = positionMax
      }

      let v;
      v = position/positionMax * (max - min)
      v = Math.round(v / step) * step + min
      v = roundBy(v, 5)

      _updateValue(v)
    }
  }
  , [isDragged, _hMouseDown] = useMouseDown(_setValueFromPosition);

  const [_sliderHandlers, _btHandlers] = HAS_TOUCH_EVENTS
     ? [{onTouchStart: _hMouseDown}, void 0]
     : [{
         onMouseDown: _hMouseDown,
         onMouseEnter: setHoveredTrue,
         onMouseLeave: setHoveredFalse
        },{
         onFocus: setHoveredTrue,
         onKeyDown: _hKeyDown,
         onBlur: setHoveredFalse
       }]
  , _lineAfterStyle = isHovered
      ? S_LINE_AFTER_HOVERED
      : S_LINE_AFTER
  , [_circleStyle, _emberStyle] = isDragged
      ? [S_CIRCLE_DRAGGED, S_EMBER]
      : []
  , _percent = _toPercent(value, min, max)
  , _widthBeforeStyle = _crWidthStyle(_percent)
  , _widthAfterStyle = _crWidthStyle(100 - _percent)
  , _leftStyle = _crLeftStyle(_percent);

  return (
    <div
      style={S_ROOT}
      {..._sliderHandlers}
    >
      <div
         ref={_refTrack}
         style={S_ROOT_LINE}
      >
        <div style={{...S_LINE_BEFORE, ..._widthBeforeStyle }} />
        <div style={{..._lineAfterStyle, ..._widthAfterStyle }} />
        <input
          type="hidden"
          step={step}
          min={min}
          max={max}
          value={value}
          required={true}
        />
        <div
           role="slider"
           tabIndex={0}
           aria-valuenow={value}
           aria-valuemin={min}
           aria-valuemax={max}
           aria-orientation="horizontal"
           aria-labelledby="discrete-slider-custom"
           style={{...S_ROOT_CIRCLE, ..._circleStyle, ..._leftStyle }}
           {..._btHandlers}
        >
          <CircleInner
             is={isHovered || isDragged}
             circleStyle={_circleStyle}
             emberStyle={_emberStyle}
          />
        </div>
      </div>
    </div>
  );
}

/*
static propTypes = {
  initialValue : PropTypes.number,
  step : PropTypes.number,
  min : PropTypes.number,
  max : PropTypes.number,
  onChange : PropTypes.func
}
*/

export default InputSlider
