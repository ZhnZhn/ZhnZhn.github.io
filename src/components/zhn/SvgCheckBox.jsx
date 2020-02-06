import React, { Component } from 'react';
//import PropTypes from "prop-types";

import isKeyEnter from './isKeyEnter'

import C from '../styles/Color';

const S = {
  DIV: {
    display: 'inline-block',
    width: 16,
    height: 16,
    cursor: 'pointer'
  },
  SVG: {
    display: 'inline-block'
  }
};

const C_GREY = "#777777";

const SvgChecked = ({ stroke }) => (
  <path
      d="M 2,5 L 8,14 14,1"
      strokeWidth="2"
      strokeLinecap="round"
      stroke={stroke}
      fill={C.BLANK}
  />
);

const _isFn = fn => typeof fn === 'function';

const _getInitStateFrom = ({ initValue, value }) => ({
  initValue: initValue,
  isChecked: !!value
});

class SvgCheckBox extends Component {
  /*
  static propTypes = {
    initValue: PropTypes.bool,
    value: PropTypes.bool,
    style: PropTypes.object,
    checkedRestStroke: PropTypes.string,
    checkedRestFill: PropTypes.string,
    checkedColor: PropTypes.string,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */
  static defaultProps = {
    checkedRestStroke: C_GREY,
    checkedRestFill: C.BLANK,
    checkedColor: C.YELLOW
  }

  constructor(props){
    super(props);

    const { onCheck, onUnCheck } = props;
    this._isOnCheck = _isFn(onCheck)
    this._isOnUnCheck = _isFn(onUnCheck)

    this.state = _getInitStateFrom(props)
  }

  static getDerivedStateFromProps(props, state) {
    return props.initValue !== state.initValue
      ? _getInitStateFrom(props)
      : null;
  }

  _hClick = () => {
    const {
       _isOnCheck, _isOnUnCheck,
        state, props
      } = this
    , { onCheck, onUnCheck } = props
    , { isChecked } = state;

    if (!isChecked && _isOnCheck){
      onCheck(this);
    } else if (_isOnUnCheck){
      onUnCheck(this);
    }

    this.setState({ isChecked: !isChecked });
  }

  _hKeyDown = (evt) => {
    if (isKeyEnter(evt)){
      evt.preventDefault()
      this._hClick()
    }
  }

  render(){
    const {
      style,
      checkedRestStroke,
      checkedRestFill,
      checkedColor,
      value=this.state.isChecked
    } = this.props
    , _restStroke = value ? checkedRestStroke : C_GREY
    , _restFill = value ? checkedRestFill : C.BLANK;
    return (
      <div
         role="checkbox"
         tabIndex="0"
         aria-checked={value}
         //aria-labelledby
         style={{ ...S.DIV, ...style }}
         onClick={this._hClick}
         onKeyDown={this._hKeyDown}
      >
        <svg
          viewBox="0 0 16 16" width="100%" height="100%"
          preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
          style={S.SVG}
        >
          <rect
             x="1" y="1"
             height="14" width="14"
             strokeWidth="2" rx="3"
             stroke={_restStroke}
             fill={_restFill}
          />
          { value
             ? <SvgChecked stroke={checkedColor} />
             : null
          }
        </svg>
      </div>
    );
  }

  setUnchecked = () => {
    this.setState({ isChecked: false });
  }
}

export default SvgCheckBox
