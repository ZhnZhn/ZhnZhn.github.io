import React, { Component } from 'react';

import InputSlider from '../zhn/InputSlider'

const MSG = 'Before loading, please, enter sum using slider'

const S = {
  MSG : {
    color: 'grey',
    fontWeight: 'bold'
  },
  P_SUM : {
    textAlign: 'center',
    fontSize: '22px',
    paddingTop: '4px'
  },
  SUM_OK : {
    color: '#4caf50'
  },
  SUM_NOT_OK : {
    color: '#f44336'
  }
}

const _fnRandomNumber = (m=0, n=10) => {
  return m + (Math.floor((n-m+1)*Math.random()));
}

class MatchCaptcha extends Component {
  constructor(props){
    super()
    this.firstNumber = _fnRandomNumber(0, 10)
    this.secondNumber = _fnRandomNumber(0, 10)
    this.state = {
      isOk : false,
      resultSum : ''
    }
  }

  _handleChangeSlider = (event, value) => {
    const _isOk = (this.firstNumber + this.secondNumber === value)
            ? true
            : false
    this.setState({
       isOk : _isOk,
       resultSum : value
    })
  }

  render(){
    const { rootStyle } = this.props
    , { isOk, resultSum } = this.state
    , _sumStyle = (isOk)
        ? S.SUM_OK
        : S.SUM_NOT_OK
    return(
      <div style={rootStyle} >
        <p style={S.MSG}>
          {MSG}
        </p>
        <p style={S.P_SUM}>
          <span>
            {`${this.firstNumber} + ${this.secondNumber} = `}
          </span>
          <span style={_sumStyle}>
            {resultSum}
          </span>
        </p>
        <InputSlider
            onChange={this._handleChangeSlider}
        />
      </div>
    );
  }

  isOk = () => {
    return this.state.isOk;
  }

}

export default MatchCaptcha
