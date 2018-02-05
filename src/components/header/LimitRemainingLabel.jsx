import React, { Component } from 'react'

const S = {
  LABEL : {
    display: 'inline-block',
    color:'#2f7ed8',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}

class LimitRemainingLabel extends Component {
  state = {
    value : ''
  }

  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.listenLimitRemaining(this._onStore)
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
       <span style={{ ...S.LABEL, ...style }}>
         {value}
       </span>
    );
  }
}

export default LimitRemainingLabel
