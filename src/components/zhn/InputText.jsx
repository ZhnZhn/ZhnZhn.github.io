import React, { Component } from 'react';
//import PropTypes from "prop-types";

const S = {
  INPUT_TEXT : {
    display : 'inline',
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '26px',
    paddingLeft: '5px',
    color: 'green',
    width: '40px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor : '#E1E1CB',
    marginLeft : '5px',
    marginRight : '5px',
  }
};

const C = {
  BLANK: '',
  TEXT: 'text',
  //NEW_TEXT: 'new-text',
  ON: 'on',
  OFF: 'off'
}

const _isFn = fn => typeof fn === 'function';

const _getInitStateFrom = ({ initValue }) => ({
  initValue: initValue,
  value: initValue != null ? initValue : C.BLANK
});

class InputText extends Component {
  /*
  static propTypes = {
    style: PropTypes.object,
    initValue: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onEnter: PropTypes.func
  }
  */
  static defaultProps = {
    maxLenght: 125
  }

  constructor(props){
    super(props);

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
    , { maxLenght } = this.props;
    if (value.length <= maxLenght) {
      this.setState({ value })
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
           maxLenght
         } = this.props
        , { value } = this.state
        , _autoCorrect = spellCheck
             ? C.ON
             : C.OFF
        , _spellCheck = spellCheck
             ? true
             : false;
    return (
      <input
        style={{ ...S.INPUT_TEXT, ...style }}
        type={type || C.TEXT}
        name={C.TEXT}
        autoCapitalize={C.OFF}
        autoComplete={C.OFF}
        autoCorrect={_autoCorrect}
        spellCheck={_spellCheck}
        translate={false}
        value={value}
        placeholder={placeholder}
        maxLength={maxLenght}
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
}

export default InputText
