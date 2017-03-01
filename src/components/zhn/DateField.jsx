import React, { Component } from 'react';

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
    marginBottom: '5px',
    width: '230px'
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

class DateField extends Component {
   constructor(props){
     super();
     this.state = {
       value: props.initValue ? props.initValue : '',
       errorInput: undefined,
       isValid: true
     }
   }

  _handleChangeValue = (event) => {
    const { onTest, nForecastDate } = this.props
         , value = event.target.value
    if (!onTest(value, nForecastDate)){
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
    const { onTest, nForecastDate, errorMsg } = this.props
        , { value } = this.state
    if (!onTest(value, nForecastDate)){
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

  render(){
    const  { value, errorInput, isValid } = this.state
        , _styleHr = isValid
            ? STYLE.HR_VALID
            : STYLE.HR_NOT_VALID;
    return (
      <div style={STYLE.ROOT}>
        <input
           name="text-date"
           autoComplete="new-text-date"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           ref={input => this.inputDate = input }
           type="text"
           style={STYLE.INPUT}
           placeholder="YYYY-MM-DD"
           value={value}
           onChange={this._handleChangeValue}
           onBlur={this._handleBlurValue}
        >
        </input>
        <hr style={Object.assign({}, STYLE.HR, _styleHr)}></hr>
        <div style={STYLE.ERR_MSG}>
          {errorInput}
        </div>
      </div>
    );
  }

  getValue = () => {
    return this.state.value;
  }
  isValid = () => {
    return this.state.isValid;
  }
  focusInput = () => {
    this.inputDate.focus();
  }
}

export default DateField
