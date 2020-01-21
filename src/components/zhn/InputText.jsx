import React, { Component } from 'react';
//import PropTypes from "prop-types";

const CL = {
  NUMBER_RANGE: 'input-minmax-number'
};

const S = {
  INPUT: {
    display: 'inline',
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: 26,
    paddingLeft: 5,
    color: 'green',
    width: 40,
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#e1e1cb',
    marginLeft: 5,
    marginRight: 5,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

const C = {
  BLANK: '',
  TEXT: 'text',
  //NEW_TEXT: 'new-text',
  ON: 'on',
  OFF: 'off'
};

const _isFn = fn => typeof fn === 'function';
const _isNumber = n => typeof n === 'number';

const _getInitStateFrom = ({ initValue }) => ({
  initValue: initValue,
  value: initValue != null ? initValue : C.BLANK
});

const _isMinMaxNumber = ({ type, min, max }) => type === 'number'
 && _isNumber(min)
 && _isNumber(max);

class InputText extends Component {
  /*
  static propTypes = {
    style: PropTypes.object,
    initValue: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onEnter: PropTypes.func
  }
  */
  static defaultProps = {
    maxLength: 125
  }

  constructor(props){
    super(props);
    this._refInput = React.createRef()
    this.isOnEnter = _isFn(props.onEnter)
       ? true : false
    this.state = _getInitStateFrom(props)
  }

  componentDidMount(){
    const { onReg } = this.props;
    if ( _isFn(onReg) ){
      onReg(this)
    }
  }

  static getDerivedStateFromProps(props, state) {
    return props.initValue !== state.initValue
      ? _getInitStateFrom(props)
      : null;
  }

  _handleInputChange = (event) => {
    const value = event.target.value
    , { maxLength, onInputChange } = this.props;
    if (value.length <= maxLength) {
      this.setState({ value })
      if ( _isFn(onInputChange)) {
        onInputChange(value)
      }
    }
  }
 _handleKeyDown = (event) => {
    switch(event.keyCode){
      case 27: case 46:
         event.preventDefault()
         this.setState({ value: C.BLANK })
         break;
      case 13:
         if (this.isOnEnter) {
           this.props.onEnter(event.target.value)
         }
         break;
      default: return;
    }
 }

  render(){
    const {
       style, type,
       spellCheck, placeholder,
       maxLength,
       min, max, step
     } = this.props
    , { value } = this.state
    , _autoCorrect = spellCheck
         ? C.ON
         : C.OFF
    , _spellCheck = spellCheck
         ? "true"
         : "false"
    , _className = _isMinMaxNumber(this.props)
         ? CL.NUMBER_RANGE
         : void 0;
    return (
      <input
        ref={this._refInput}
        className={_className}
        style={{ ...S.INPUT, ...style }}
        type={type || C.TEXT}
        name={C.TEXT}
        autoCapitalize={C.OFF}
        autoComplete={C.OFF}
        autoCorrect={_autoCorrect}
        spellCheck={_spellCheck}
        translate="false"
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
        onChange={this._handleInputChange}
        onKeyDown={this._handleKeyDown}
      />
    )
  }

  getValue() {
    return this.state.value;
  }
  setValue(value) {
    this.setState({ value })
  }
  focus(){
    const { current } = this._refInput;
    if (current) {
      current.focus()
    }
  }
}

export default InputText
