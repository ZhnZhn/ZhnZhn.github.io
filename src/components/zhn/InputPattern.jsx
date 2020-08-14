import React, { Component } from 'react';
//import PropTypes from "prop-types";

import SvgClear from './SvgClear'

import STYLE from './Input.Style';

const S = {
  INPUT: {
    ...STYLE.INPUT,
    width: 'calc(100% - 50px)',
    paddingLeft: 0,
    marginLeft: 10,
    marginBottom: 5
  },
  INPUT_BORDER: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 1
  },
  BT_CLEAR: {
    float: 'right',
    position: 'relative',
    top: 4,
    right: 7
  }
};

const _isFn = fn => typeof fn === "function";

const ErrMsg = ({ msg }) => msg
 ? (<div style={STYLE.ERR_MSG}>
     {msg}
   </div>)
 : null;

const _getInitStateFrom = ({ initValue }) => ({
  initValue: initValue,
  value: initValue || '',
  errorInput: void 0,
  isValid: true
});


const _getIsValidColor = isValid => isValid
 ? '#1b75bb'
 : '#f44336';

const _crInputStyle = (isValid) => ({
  ...S.INPUT_BORDER,
  borderBottomColor: _getIsValidColor(isValid)
});

const _crBtClearStyle = (isValid) => ({
  ...S.BT_CLEAR,
  stroke: _getIsValidColor(isValid)
})


class InputPattern extends Component {
  /*
   static propTypes = {
     rootStyle: PropTypes.object,
     inputStyle: PropTypes.object,
     initValue: PropTypes.string,
     placeholder: PropTypes.string,
     maxLength: PropTypes.oneOfType([
       PropTypes.string,
       PropTypes.number
     ]),
     errorMsg: PropTypes.string,
     onTest: PropTypes.func,
     onEnter: PropTypes.func,
     onClear: PropTypes.func
   }
  */
   static defaultProps = {
      maxLength: 64,
      placeholder: 'Input Pattern',
      onTest: () => true,
      onClear: () => {}
   }

   constructor(props){
     super(props);
     this.state = _getInitStateFrom(props);
   }

   static getDerivedStateFromProps(props, state) {
     return props.initValue !== state.initValue
       ? _getInitStateFrom(props)
       : null;
   }

  _hChangeValue = (event) => {
    const { onTest } = this.props
         , value = event.target.value
    if (!onTest(value)){
      this.setState({
         value: value,
         isValid: false
      })
    } else {
      this.setState({
         value: value,
         isValid: true,
         errorInput: void 0
      })
    }
  }

  _hKeyDown = (event) => {
    switch(event.keyCode){
      case 13:
        if ( _isFn(this.props.onEnter) ) {
          this.props.onEnter(event.target.value)
        }
        break;
      case 27: case 46:
        event.preventDefault()
        this.setState(
          (prevState, props) => _getInitStateFrom(props)
        )
        break;
      default: return;
    }
  }

  _hClear = () => {
    this.props.onClear()
    if (this.inputPattern) {
      this.inputPattern.focus()
    }
    this.setState({
      value: '',
      isValid: true,
      errorInput: void 0
    })
  }

  _refInput = (input) => this.inputPattern = input
  _refBtClear = (bt) => this._btClear = bt

  render(){
    const {
        rootStyle, inputStyle,
        placeholder,
        maxLength
      } = this.props
    , { value, errorInput, isValid } = this.state
    , _inputStyle = _crInputStyle(isValid)
    , _btClearStyle = _crBtClearStyle(isValid);
    return (
      <div style={{...STYLE.ROOT, ...rootStyle}}>
        <input
           type="text"
           style={{...S.INPUT, ...inputStyle, ..._inputStyle }}
           ref={this._refInput}
           name="text-date"
           //autoComplete="new-text-date"
           autoComplete="off"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           placeholder={placeholder}
           value={value}
           maxLength={maxLength}
           onChange={this._hChangeValue}
           onKeyDown={this._hKeyDown}
        />
        { value || errorInput
            ? <SvgClear
                 ref={this._refBtClear}
                 style={_btClearStyle}
                 onClick={this._hClear}
              />
            : null
        }
        <ErrMsg msg={errorInput} />
      </div>
    );
  }

  getValue(){
    return String(this.state.value).trim();
  }
  isValid(){
    return this.props.onTest(this.state.value);
  }
  focusInput(){
    this.inputPattern.focus()
  }
  showErrMsg(){
    this.setState({
      errorInput: this.props.errorMsg,
      isValid: false
    })
  }
}

export default InputPattern
