import React, { Component, PropTypes } from 'react';

const STYLE = {
  ROOT : {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '250px'
  },
  INPUT : {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  HR : {
    borderWidth: 'medium medium 1px',
    borderStyle: 'none none solid',
    borderColor: 'red',
    borderImage: 'none',
    margin: 0,
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '5px',
    width: 'auto'
    //width: '90%'
    //width: '230px'
  },
  HR_VALID : {
     borderColor: '#1B75BB'
  },
  HR_NOT_VALID : {
     borderColor: '#F44336'
  },
  ERR_MSG : {
    color: '#F44336',
    paddingLeft: '10px',
    paddingBottom: '5px',
    fontSize: '12px',
    fontWeight: 'bold'
  }
};

class InputPattern extends Component {
   static propTypes = {
     rootStyle: PropTypes.object,
     inputStyle: PropTypes.object,
     initValue: PropTypes.string,
     placeholder: PropTypes.string,
     errorMsg: PropTypes.string,
     onTest: PropTypes.func,
     onEnter: PropTypes.func
   }
   static defaultProps = {
      onTest: () => { return true; }
   }

   constructor(props){
     super();
     this.state = {
       value: props.initValue ? props.initValue : '',
       errorInput: undefined,
       isValid: true
     };
   }

  _handleChangeValue = (event) => {
    const { onTest } = this.props
         , value = event.target.value
    if (!onTest(value)){
      this.setState({
         value : value,
         isValid : false
      })
    } else {
      this.setState({
         value : value,
         isValid : true,
         errorInput : undefined
      })
    }
  }

  _handleBlurValue = () => {
    const { onTest,  errorMsg } = this.props
        , { value } = this.state;
    if (!onTest(value)){
      this.setState({
        errorInput : errorMsg,
        isValid : false
      })
    } else {
      this.setState({
        errorInput : undefined,
        isValid : true
      })
    }
  }

  _handleKeyDown = (event) => {
    if (event.keyCode === 13 && typeof this.props.onEnter === 'function'){
      this.props.onEnter(event.target.value)
    } else if (event.keyCode === 27){
      this.setState({
        value: this.props.initValue ? this.props.initValue : '',
        errorInput: undefined,
        isValid: true
      })
    }
  }


  render(){
    const {
            rootStyle, inputStyle,
            placeholder='Input Pattern'
          } = this.props
        , { value, errorInput, isValid } = this.state
        , _styleHr = isValid
            ? STYLE.HR_VALID
            : STYLE.HR_NOT_VALID;
    return (
      <div style={{...STYLE.ROOT, ...rootStyle}}>
        <input
           style={{...STYLE.INPUT, ...inputStyle}}
           name="text-date"
           autoComplete="new-text-date"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           ref={input => this.inputPattern = input }
           type="text"
           placeholder={placeholder}
           value={value}
           onChange={this._handleChangeValue}
           onBlur={this._handleBlurValue}
           onKeyDown={this._handleKeyDown}
        >
        </input>
        <hr style={{ ...STYLE.HR, ..._styleHr}}></hr>
        <div style={STYLE.ERR_MSG}>
          {errorInput}
        </div>
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
}

export default InputPattern
