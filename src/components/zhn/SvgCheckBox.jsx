import { Component } from 'react';
//import PropTypes from "prop-types";

import isKeyEnter from './isKeyEnter';

import C from '../styles/Color';

const CL_CHB = 'chb';
const S = {
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

const _isBool = bool => typeof bool === 'boolean';
const _isFn = fn => typeof fn === 'function';

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
    super(props)
    const { value, initialValue } = props;
    this.state = {
      isChecked: _isBool(value)
        ? value
        : !!initialValue
    }
  }

  _hClick = () => {
    const {
      value=this.state.isChecked,
      onCheck, onUnCheck
    } = this.props;

    if (value && _isFn(onUnCheck)){
      onUnCheck(this);
    } else if (_isFn(onCheck)) {
      onCheck(this);
    }

    this.setState({ isChecked: !value });
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
         className={CL_CHB}
         style={style}
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
