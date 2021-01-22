import { Component } from 'react';

import has from '../has'
import mathFns from '../../math/mathFn'
//import PropTypes from "prop-types";

/*
 Mostly from
 https://github.com/callemall/material-ui/blob/master/src/Slider/Slider.js
*/

const S = {
  ROOT: {
    position: 'relative',
    width: '100%',
    height: 18,
    marginTop: 8,
    marginBottom: 8,
    userSelect : 'none',
    cursor: 'default'
  },
  ROOT_LINE : {
    position: 'absolute',
    top: 8,
    left: 0,
    width: '100%',
    height: 2
  },
  LINE_BEFORE : {
    position: 'absolute',
    left: 0,
    width: 'calc(15%)',
    height: '100%',
    marginRight: 6,
    backgroundColor: 'rgb(0, 188, 212)',
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },
  LINE_AFTER : {
    position: 'absolute',
    right: 0,
    width: 'calc(85%)',
    height: '100%',
    marginLeft: 6,
    backgroundColor: 'rgb(189, 189, 189)',
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  },
  LINE_HOVERED : {
    backgroundColor: 'rgb(158, 158, 158)',
  },
  ROOT_CIRCLE : {
    boxSizing: 'borderBox',
    zIndex: '1',
    position: 'absolute',
    top: 0,
    left: '15%',
    width: 12,
    height: 12,
    cursor: 'pointer',
    pointerEvents: 'inherit',
    margin: '1px 0px 0px',
    backgroundColor: 'rgb(0, 188, 212)',
    backgroundClip: 'padding-box',
    border: '0px solid transparent',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'visible',
    outline: 'none',
    transition: 'background 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
  },
  CIRCLE_DRAGGED : {
    width: 20,
    height: 20
  },
  CIRCLE_INNER : {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    overflow: 'visible'
  },
  CIRCLE_INNER_EL : {
    position: 'absolute',
    top: -12,
    left: -12,
    width: '300%',
    height: 36,
    borderRadius: '50%',
    //opacity: '0.16',
    backgroundColor: 'rgba(0, 188, 212, 0.16)',
    transform: 'scale(1)'
  },
  EMBER : {
    top: -12,
    left: -12,
    width: '220%',
    height: 44,
    border: '1px solid #4caf50'
  }
};

const _isNaN = Number.isNaN
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
, hasTouch = has.touch
, _getClienX = hasTouch
  ? evt => (((evt || {}).touches || [])[0] || {}).clientX || 0
  : evt => evt.clientX
, _isUp = keyCode => keyCode === 39 || keyCode === 38
, _isDown = keyCode => keyCode === 37 || keyCode === 40;

class InputSlider extends Component {

  /*
  static propTypes = {
    step : PropTypes.number,
    min : PropTypes.number,
    max : PropTypes.number,
    onChange : PropTypes.func
  }
  */

  static defaultProps = {
    min: 0,
    max: 20,
    step: 1
  }

  state = {
    hovered: false,
    dragged: false,
    value: 4
  }

  _evtNameMove = hasTouch ? 'touchmove' : 'mousemove'
  _evtNameUp = hasTouch ? 'touchend' : 'mouseup'

  constructor(props){
    super(props)
    this._handlers = hasTouch ? {
       onTouchStart: this._hMouseDown
    } : {
      onMouseDown: this._hMouseDown,
      onMouseEnter: this._hMouseEnter,
      onMouseLeave: this._hMouseLeave
    }
    this._btHandlers = hasTouch ? void 0 : {
        onFocus: this._hFocusTrackBt,
        onKeyDown: this._hKeyDown,
        onBlur: this._hBlurTrackBt
    }
  }

  _hKeyDown = (evt) => {
    const { keyCode } = evt
    , { step } = this.props
    , { value } = this.state
    , _newValue = _isUp(keyCode)
        ? value + step
        : _isDown(keyCode) ? value - step : void 0;
    if (_newValue != null) {
      evt.preventDefault()
      this._updateValue(event, _newValue)
    }
  }
  _hFocusTrackBt = () => {
    this.setState({ hovered: true })
  }
  _hBlurTrackBt = () => {
    this.setState({ hovered: false })
  }

  _hMouseEnter = () => {
    this.setState({ hovered: true })
  }
  _hMouseLeave = () => {
    this.setState({ hovered: false })
  }
  _hMouseDown = (event) => {
    // Cancel text selection
    if (!hasTouch) {
      event.preventDefault()
    }
    document.addEventListener(this._evtNameMove, this._hDragMouseMove)
    document.addEventListener(this._evtNameUp, this._hDragMouseUp)
    this.setState({
      dragged : true
    })
  }

  _hDragMouseMove = (event) => {
    this._onDragUpdate(event)
  }
  _hDragMouseUp = () => {
     document.removeEventListener(this._evtNameMove, this._hDragMouseMove)
     document.removeEventListener(this._evtNameUp, this._hDragMouseUp)
     this.setState({
       dragged : false
     })
  }

  _onDragUpdate = (event) => {
    if (this.dragRunning) {
      return;
    }
    this.dragRunning = true;
    requestAnimationFrame(() => {
      this.dragRunning = false;
      const position = _getClienX(event) - this._calcTrackOffset()
      this._setValueFromPosition(event, position)
    })
  }

  _calcTrackOffset = () => {
    return this.trackComp.getBoundingClientRect()['left'];
  }

  _setValueFromPosition = (event, position) => {
    const positionMax = this.trackComp['clientWidth']
    if (position < 0) {
      position = 0;
    } else if (position > positionMax) {
      position = positionMax
    }

    const { step, min, max } = this.props;
    let value;
    value = position/positionMax * (max - min)
    value = Math.round(value / step) * step + min
    value = mathFns.roundBy(value, 5)

    this._updateValue(event, value)
  }

  _updateValue = (event, newValue) => {
    const { min, max, onChange } = this.props
    , { value } = this.state
    , _newValue = newValue > max
        ? max
        : newValue < min ? min : newValue;

    if (_newValue !== value) {
      this.setState({ value: _newValue })
      if (typeof onChange === 'function'){
        onChange(event, _newValue)
      }
    }
  }

  _refTrack = comp => this.trackComp = comp

  render(){
    const { step, min , max } = this.props
    , { hovered, dragged, value } = this.state
    , _lineAfterStyle = hovered
          ? {...S.LINE_AFTER, ...S.LINE_HOVERED}
          : S.LINE_AFTER
    , _circleStyle = dragged ? S.CIRCLE_DRAGGED : null
    , _emberStyle = dragged ? S.EMBER : null
    , _circleInnerEl = (hovered || dragged)
          ? <div style={{ ...S.CIRCLE_INNER_EL, ..._emberStyle }} />
          : null
    , _percent = _toPercent(value, min, max)
    , _widthBeforeStyle = _crWidthStyle(_percent)
    , _widthAfterStyle = _crWidthStyle(100 - _percent)
    , _leftStyle = _crLeftStyle(_percent)

    return (
      <div
        style={S.ROOT}
        {...this._handlers}
      >
        <div
           ref={this._refTrack}
           style={S.ROOT_LINE}
        >
          <div style={{...S.LINE_BEFORE, ..._widthBeforeStyle }} />
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
             style={{...S.ROOT_CIRCLE, ..._circleStyle, ..._leftStyle }}
             {...this._btHandlers}
          >
            <div style={{ ...S.CIRCLE_INNER, ..._circleStyle}} >
              {_circleInnerEl}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InputSlider
