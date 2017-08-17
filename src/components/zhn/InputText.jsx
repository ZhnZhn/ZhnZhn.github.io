import React, { Component, PropTypes } from 'react';

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
  NEW_TEXT: 'new-text',
  ON: 'on',
  OFF: 'off'
}


class InputText extends Component {
  static propTypes = {
    initValue : PropTypes.string,
    style : PropTypes.object,
    onEnter : PropTypes.func
  }
  static defaultProps = {
    initValue : C.BLANK
  }

  constructor(props){
    super()
    this.isOnEnter = (typeof props.onEnter === "function" )
            ? true : false
    this.state = {
      value : props.initValue
    }
  }

  componentDidMount(){
    const { onReg } = this.props;
    if (typeof onReg === 'function'){
      onReg(this)
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props){
      this.setState({
        value: nextProps.initValue != null
           ? nextProps.initValue
           : C.BLANK
      })
    }
  }

  _handleInputChange = (event) => {
    this.setState({ value: event.target.value })
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
    const { style, spellCheck } = this.props
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
        type={C.TEXT}
        name={C.TEXT}
        autoCapitalize={C.OFF}
        autoComplete={C.NEW_TEXT}
        autoCorrect={_autoCorrect}
        spellCheck={_spellCheck}
        translate={false}
        value={value}
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
