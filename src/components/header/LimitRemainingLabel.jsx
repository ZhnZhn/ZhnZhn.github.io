import React, { Component } from 'react'

const STYLE = {
  LABEL : {
    display: 'inline-block',
    color:'#2f7ed8',
    //paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}

class LimitRemainingLabel extends Component {
  state = {
    value : ''
  }

  componentWillMount() {
    const { store } = this.props;
    this.unsubscribe = store.listenWithLimitRemaining(this._onStore)
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  _onStore = (value) => {
    if ( !(value == null) ) {
      this.setState({ value: value })
    }
  }

  render() {
    const { style } = this.props
        , { value } = this.state;

    return (
       <span style={{ ...STYLE.LABEL, ...style }}>
         {value}
       </span>
    );
  }
}

export default LimitRemainingLabel
