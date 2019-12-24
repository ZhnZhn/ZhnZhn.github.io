import React, { Component } from 'react';

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
    width: 'calc(15%)',
    height: '100%',
    left: 0,
    marginRight: 6,
    backgroundColor: 'rgb(0, 188, 212)',
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  },
  LINE_AFTER : {
    position: 'absolute',
    height: '100%',
    transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    right: '0px',
    backgroundColor: 'rgb(189, 189, 189)',
    marginLeft: '6px',
    width: 'calc(85%)'
  },
  LINE_HOVERED : {
    backgroundColor: 'rgb(158, 158, 158)',
  },
  ROOT_CIRCLE : {
    boxSizing: 'borderBox',
    position: 'absolute',
    cursor: 'pointer',
    pointerEvents: 'inherit',
    top: '0px',
    left: '15%',
    zIndex: '1',
    margin: '1px 0px 0px',
    width: '12px',
    height: '12px',
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
    width: '20px',
    height: '20px '
  },
  CIRCLE_INNER : {
    position: 'absolute',
    overflow: 'visible',
    height: '12px',
    width: '12px',
    top: '0px',
    left: '0px'
  },
  CIRCLE_INNER_EL : {
    position: 'absolute',
    height: '36px',
    width: '300%',
    borderRadius: '50%',
    //opacity: '0.16',
    backgroundColor: 'rgba(0, 188, 212, 0.16)',
    top: '-12px',
    left: '-12px',
    transform: 'scale(1)'
  },
  EMBER : {
    top: '-12px' ,
    left: '-12px',
    height: '44px',
    width: '220%',
    border: '1px solid #4caf50'
  }
}

const _toPercent = (value, min, max) => {
  const _percent = (value - min ) / (max - min);
  return isNaN(_percent) ? 0 : _percent*100;
}
const _crWidthStyle = percent => ({
  width: `calc(${percent}%)`
})
const _crLeftStyle = percent => ({
   left: `${percent}%`
})

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

  _handleMouseEnter = () => {
    this.setState({ hovered: true })
  }
  _handleMouseLeave = () => {
    this.setState({ hovered: false })
  }
  _handleMouseDown = (event) => {
    // Cancel text selection
    event.preventDefault()
    document.addEventListener('mousemove', this._handleDragMouseMove)
    document.addEventListener('mouseup', this._handleDragMouseUp)
    this.setState({
      dragged : true
    })
  }

  _handleDragMouseMove = (event) => {
    this._onDragUpdate(event)
  }
  _handleDragMouseUp = () => {
     document.removeEventListener('mousemove', this._handleDragMouseMove)
     document.removeEventListener('mouseup', this._handleDragMouseUp)
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
      const position = event.clientX - this._calcTrackOffset()
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

    const { step, min, max, onChange } = this.props
    let value
    value = position/positionMax * (max - min)
    value = Math.round(value / step) * step + min
    value = mathFns.roundBy(value, 5)

    if (value > max) {
      value = max
    } else if (value < min ) {
      value = min
    }

    if (this.state.value !== value) {
      this.setState({
        value: value
      })

      if (typeof onChange === 'function'){
        onChange(event, value)
      }
    }
  }

  _refTrack = comp => this.trackComp = comp

  render(){
    const { step, min , max } = this.props
    , { hovered, dragged, value } = this.state
    , _lineAfterStyle = (hovered)
          ? {...S.LINE_AFTER, ...S.LINE_HOVERED}
          : S.LINE_AFTER
    , _circleStyle = (dragged) ? S.CIRCLE_DRAGGED : null
    , _emberStyle = (dragged) ? S.EMBER : null
    , _circleInnerEl = (hovered || dragged)
          ? <div style={{ ...S.CIRCLE_INNER_EL, ..._emberStyle }} />
          : null
    , _percent = _toPercent(value, min, max)
    , _widthBeforeStyle = _crWidthStyle(_percent)
    , _widthAfterStyle = _crWidthStyle(100 - _percent)
    , _leftStyle = _crLeftStyle(_percent)

    return (
      <div style={S.ROOT}
        onMouseDown={this._handleMouseDown}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        <div
           ref={this._refTrack}
           style={S.ROOT_LINE}
        >
          <div style={{...S.LINE_BEFORE, ..._widthBeforeStyle }} />
          <div style={{..._lineAfterStyle, ..._widthAfterStyle }} />
          <div
             tabIndex={0}
             style={{...S.ROOT_CIRCLE, ..._circleStyle, ..._leftStyle }}
          >
            <div style={{ ...S.CIRCLE_INNER, ..._circleStyle}} >
              {_circleInnerEl}
            </div>
          </div>
          <input
            type="hidden"
            step={step}
            min={min}
            max={max}
            value={value}
            required={true}
          />
        </div>
      </div>
    );
  }
}

export default InputSlider
